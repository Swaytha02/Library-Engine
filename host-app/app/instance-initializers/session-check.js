export function initialize(appInstance) {
  let session = appInstance.lookup('service:session');
  let router = appInstance.lookup('router:main');
  window.addEventListener('storage', (event) => {
    if (event.key === 'loggedInUser' && event.newValue === null) {
      session.logOut();
      router.transitionTo('login-page');
    }
  });
}
export default {
  initialize
};
