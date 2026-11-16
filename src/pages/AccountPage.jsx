import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getCompletedStations, getVisitedLocations } from '../data/journeyProgress';
import { supabase } from '../integrations/supabase/client';

export function AccountPage() {
  const { authError, authLoading, isConfigured, user } = useAuth();
  const [mode, setMode] = useState('sign-in');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [, setProgressVersion] = useState(0);

  const maxBirthDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    const refreshProgress = () => setProgressVersion((version) => version + 1);
    window.addEventListener('ken:station-progress', refreshProgress);
    window.addEventListener('ken:map-progress', refreshProgress);
    return () => {
      window.removeEventListener('ken:station-progress', refreshProgress);
      window.removeEventListener('ken:map-progress', refreshProgress);
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (mode === 'sign-up') {
      if (!fullName.trim()) {
        setError('Vui lòng nhập họ tên.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận chưa trùng khớp.');
        return;
      }
    }

    setBusy(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === 'sign-up') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              date_of_birth: birthDate,
            },
          },
        });
        if (signUpError) throw signUpError;
        setMessage(data.session
          ? 'Tài khoản đã được tạo và đăng nhập thành công.'
          : 'Yêu cầu đăng ký đã được xử lý nhưng chưa thể đăng nhập tự động. Nếu email đã có tài khoản, hãy đăng nhập; nếu chưa, hãy kiểm tra cài đặt xác minh email trong Supabase.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (submitError) {
      console.error('Không thể xử lý yêu cầu tài khoản KÉN.', submitError);
      const errorText = `${submitError.code || ''} ${submitError.message || ''}`.toLowerCase();
      if (submitError.status === 429 || /rate.?limit|too many requests|over_email_send_rate_limit/.test(errorText)) {
        setError('Bạn đã thử quá nhiều lần. Vui lòng chờ một lúc rồi thử lại.');
      } else if (/invalid login credentials|invalid_credentials/.test(errorText)) {
        setError('Email hoặc mật khẩu không chính xác. Hãy kiểm tra lại thông tin hoặc tạo tài khoản nếu bạn chưa đăng ký.');
      } else if (/password.*(weak|short)|weak password/.test(errorText)) {
        setError('Mật khẩu chưa đủ mạnh. Hãy dùng ít nhất 8 ký tự.');
      } else {
        setError('Không thể xử lý yêu cầu tài khoản. Vui lòng kiểm tra thông tin và thử lại.');
      }
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setError('');
    setBusy(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    } catch (signOutError) {
      console.error('Không thể đăng xuất tài khoản KÉN.', signOutError);
      setError(signOutError.message || 'Không thể đăng xuất. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  };

  if (authLoading) {
    return <main className="account-page"><div className="account-card"><p role="status">Đang kiểm tra phiên đăng nhập…</p></div></main>;
  }

  if (!isConfigured) {
    return (
      <main className="account-page">
        <section className="account-card">
          <p className="eyebrow">KÉN · Tài khoản</p>
          <h1 className="headline-lg">Kết nối Supabase</h1>
          <p className="body-md">Đăng nhập chưa được bật. Hãy thêm Project URL và publishable/anon key vào tệp <code>.env.local</code>, rồi khởi động lại Vite.</p>
          <p className="account-setup">Tiến độ khách vẫn được lưu trên thiết bị; chưa có dữ liệu nào bị mất.</p>
        </section>
      </main>
    );
  }

  if (user) {
    const completed = getCompletedStations();
    const visited = getVisitedLocations();
    return (
      <main className="account-page">
        <section className="account-card">
          <p className="eyebrow">KÉN · Tài khoản</p>
          <h1 className="headline-lg">Chào mừng trở lại</h1>
          <p className="body-md">{user.email}</p>
          <div className="account-stats">
            <span><b>{completed.length}/4</b> trạm hoàn thành</span>
            <span><b>{visited.length}</b> địa điểm đã ghé</span>
          </div>
          <p className="account-setup">Tiến độ chỉ được đồng bộ từ tài khoản hiện tại.</p>
          {error && <p className="account-message is-error" role="alert">{error}</p>}
          <button className="button button--secondary" disabled={busy} onClick={signOut} type="button">
            {busy ? 'Đang đăng xuất…' : 'Đăng xuất'}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page">
      <section className="account-card">
        <p className="eyebrow">KÉN · Tài khoản</p>
        <h1 className="headline-lg">{mode === 'sign-up' ? 'Tạo tài khoản KÉN' : 'Đăng nhập'}</h1>
        <p className="body-md">Lưu tiến độ làm quạt và những địa điểm bạn đã khám phá để tiếp tục hành trình trên thiết bị khác.</p>
        {authError && <p className="account-message is-error" role="alert">{authError}</p>}
        {error && <p className="account-message is-error" role="alert">{error}</p>}
        {message && <p className="account-message is-success" role="status">{message}</p>}
        <form className="account-form" onSubmit={submit}>
          {mode === 'sign-up' && (
            <>
              <label htmlFor="account-full-name">Họ và tên</label>
              <input
                autoComplete="name"
                id="account-full-name"
                maxLength={100}
                onChange={(event) => setFullName(event.target.value)}
                required
                type="text"
                value={fullName}
              />
              <label htmlFor="account-birth-date">Ngày sinh</label>
              <input
                autoComplete="bday"
                id="account-birth-date"
                max={maxBirthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                required
                type="date"
                value={birthDate}
              />
            </>
          )}
          <label htmlFor="account-email">Email</label>
          <input
            autoComplete="email"
            id="account-email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
          <label htmlFor="account-password">Mật khẩu</label>
          <input
            autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            id="account-password"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          {mode === 'sign-up' && <small>Mật khẩu cần ít nhất 8 ký tự.</small>}
          {mode === 'sign-up' && (
            <>
              <label htmlFor="account-confirm-password">Xác nhận mật khẩu</label>
              <input
                autoComplete="new-password"
                id="account-confirm-password"
                minLength={8}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type="password"
                value={confirmPassword}
              />
            </>
          )}
          <button className="button button--primary" disabled={busy} type="submit">
            {busy ? 'Đang xử lý…' : mode === 'sign-up' ? 'Tạo tài khoản' : 'Đăng nhập'}
          </button>
        </form>
        <button
          className="account-text-button"
          onClick={() => {
            setMode((current) => current === 'sign-up' ? 'sign-in' : 'sign-up');
            setError('');
            setMessage('');
            setPassword('');
            setConfirmPassword('');
          }}
          type="button"
        >
          {mode === 'sign-up' ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Tạo tài khoản'}
        </button>
      </section>
    </main>
  );
}
