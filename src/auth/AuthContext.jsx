import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  clearLocalProgress,
  getCompletedStations,
  getProgressOwner,
  getVisitedLocations,
  replaceCompletedStations,
  replaceVisitedLocations,
  setProgressOwner,
} from '../data/journeyProgress';
import { isSupabaseConfigured, supabase } from '../integrations/supabase/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(Boolean(isSupabaseConfigured));
  const [authError, setAuthError] = useState('');
  const [syncError, setSyncError] = useState('');
  const userRef = useRef(null);

  const syncProgress = useCallback(async (userId) => {
    if (!supabase || !userId) return;

    try {
      const owner = getProgressOwner();
      const mayMergeLocal = owner === userId;
      if (!mayMergeLocal) clearLocalProgress();
      const localStations = mayMergeLocal ? getCompletedStations() : [];
      const localVisits = mayMergeLocal ? getVisitedLocations() : [];
      const [stationResult, visitResult] = await Promise.all([
        supabase.from('station_progress').select('station_id').eq('user_id', userId),
        supabase.from('map_visits').select('location_id').eq('user_id', userId),
      ]);

      if (stationResult.error) throw stationResult.error;
      if (visitResult.error) throw visitResult.error;

      const remoteStations = stationResult.data.map((row) => row.station_id);
      const remoteVisits = visitResult.data.map((row) => row.location_id);
      const mergedStations = [...new Set([...remoteStations, ...localStations])].sort((a, b) => a - b);
      const mergedVisits = [...new Set([...remoteVisits, ...localVisits])];
      const missingStations = localStations.filter((station) => !remoteStations.includes(station));
      const missingVisits = localVisits.filter((location) => !remoteVisits.includes(location));

      const writes = [];
      if (missingStations.length) {
        writes.push(supabase.from('station_progress').upsert(
          missingStations.map((station_id) => ({ user_id: userId, station_id })),
          { onConflict: 'user_id,station_id', ignoreDuplicates: true },
        ));
      }
      if (missingVisits.length) {
        writes.push(supabase.from('map_visits').upsert(
          missingVisits.map((location_id) => ({ user_id: userId, location_id })),
          { onConflict: 'user_id,location_id', ignoreDuplicates: true },
        ));
      }

      const writeResults = await Promise.all(writes);
      const writeError = writeResults.find((result) => result.error)?.error;
      if (writeError) throw writeError;

      replaceCompletedStations(mergedStations, 'cloud');
      replaceVisitedLocations(mergedVisits, 'cloud');
      setProgressOwner(userId);
      setSyncError('');
    } catch (error) {
      console.error('Không thể đồng bộ tiến độ KÉN lên Supabase.', error);
      setSyncError('Chưa đồng bộ được tiến độ. Vui lòng kiểm tra kết nối rồi thử lại.');
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;
    const handleProgressChange = (event) => {
      const user = userRef.current;
      if (event.detail?.source === 'cloud' || !user) return;
      syncProgress(user.id).catch(() => {});
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      userRef.current = nextSession?.user ?? null;

      if (event === 'SIGNED_OUT') {
        try {
          clearLocalProgress();
          setSyncError('');
        } catch (error) {
          console.error('Không thể xóa bản tiến độ cục bộ sau khi đăng xuất.', error);
          setSyncError('Không thể xóa bản tiến độ đang lưu trên thiết bị. Hãy tải lại trang trước khi dùng tài khoản khác.');
        }
      } else if (event === 'SIGNED_IN' && nextSession?.user) {
        window.setTimeout(() => {
          if (active) syncProgress(nextSession.user.id).catch(() => {});
        }, 0);
      }
    });

    window.addEventListener('ken:station-progress', handleProgressChange);
    window.addEventListener('ken:map-progress', handleProgressChange);

    const loadSession = async () => {
      let userId;
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!active) return;
        setSession(data.session);
        userRef.current = data.session?.user ?? null;
        userId = data.session?.user?.id;
        setAuthError('');
      } catch (error) {
        console.error('Không thể khôi phục phiên KÉN.', error);
        if (active) setAuthError(`Không thể khôi phục phiên đăng nhập. ${error.message || ''}`.trim());
      } finally {
        if (active) setAuthLoading(false);
      }
      if (active && userId) syncProgress(userId).catch(() => {});
    };

    loadSession();

    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener('ken:station-progress', handleProgressChange);
      window.removeEventListener('ken:map-progress', handleProgressChange);
    };
  }, [syncProgress]);

  const retryProgressSync = useCallback(() => {
    const user = userRef.current;
    if (!user) return Promise.resolve();
    return syncProgress(user.id);
  }, [syncProgress]);

  return (
    <AuthContext.Provider
      value={{
        authError,
        authLoading,
        isConfigured: isSupabaseConfigured,
        retryProgressSync,
        session,
        syncError,
        user: session?.user ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider.');
  return context;
}
