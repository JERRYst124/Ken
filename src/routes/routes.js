export const routes = {
  home: '/',
  map: '/map',
  station1: '/station/1',
  station2: '/station/2',
  station3: '/station/3',
  station4: '/station/4',
  passport: '/passport',
  account: '/account',
};

export const navigationItems = [
  { label: 'Làng nghề', path: routes.home },
  { label: 'Bản đồ ảo', path: routes.map },
  { label: 'Hộ chiếu', path: routes.passport },
  { label: 'Tài khoản', path: routes.account },
];

export function getRoute(pathname = window.location.pathname) {
  return Object.entries(routes).find(([, path]) => path === pathname)?.[0] ?? 'home';
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
