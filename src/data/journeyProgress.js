const completedStationsKey = 'ken-completed-stations';
const visitedLocationsKey = 'ken-map-visited';
const progressOwnerKey = 'ken-progress-owner';
const validLocations = new Set([
  'gate',
  'station-1',
  'station-2',
  'station-3',
  'station-4',
  'pond',
  'courtyard',
  'bamboo-cart',
]);

function emitProgressEvent(name, source) {
  window.dispatchEvent(new CustomEvent(name, { detail: { source } }));
}

function readArray(key, isValid) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(key) || '[]');
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter(isValid))];
  } catch (error) {
    console.error(`Không thể đọc dữ liệu tiến độ KÉN (${key}).`, error);
    return [];
  }
}

export function getCompletedStations() {
  return readArray(completedStationsKey, (station) => Number.isInteger(station) && station >= 1 && station <= 4)
    .sort((a, b) => a - b);
}

export function getVisitedLocations() {
  return readArray(visitedLocationsKey, (location) => validLocations.has(location));
}

export function getProgressOwner() {
  return window.localStorage.getItem(progressOwnerKey);
}

export function setProgressOwner(userId) {
  window.localStorage.setItem(progressOwnerKey, userId);
}

export function replaceCompletedStations(stations, source = 'cloud') {
  const completed = [...new Set(stations.filter((station) => Number.isInteger(station) && station >= 1 && station <= 4))]
    .sort((a, b) => a - b);
  window.localStorage.setItem(completedStationsKey, JSON.stringify(completed));
  emitProgressEvent('ken:station-progress', source);
}

export function replaceVisitedLocations(locations, source = 'cloud') {
  const visited = [...new Set(locations.filter((location) => validLocations.has(location)))];
  window.localStorage.setItem(visitedLocationsKey, JSON.stringify(visited));
  emitProgressEvent('ken:map-progress', source);
}

export function markStationCompleted(station) {
  if (!Number.isInteger(station) || station < 1 || station > 4) {
    throw new RangeError(`Trạm không hợp lệ: ${station}`);
  }

  const completed = getCompletedStations();
  if (!completed.includes(station)) {
    replaceCompletedStations([...completed, station], 'local');
  }
}

export function markLocationVisited(location) {
  if (!validLocations.has(location)) {
    throw new RangeError(`Địa điểm không hợp lệ: ${location}`);
  }

  const visited = getVisitedLocations();
  if (visited.includes(location)) return visited;

  const next = [...visited, location];
  replaceVisitedLocations(next, 'local');
  return next;
}

export function clearLocalProgress() {
  window.localStorage.removeItem(completedStationsKey);
  window.localStorage.removeItem(visitedLocationsKey);
  window.localStorage.removeItem(progressOwnerKey);
  emitProgressEvent('ken:station-progress', 'cloud');
  emitProgressEvent('ken:map-progress', 'cloud');
}
