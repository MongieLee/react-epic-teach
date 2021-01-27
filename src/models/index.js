import AV, { User } from 'leancloud-storage';
AV.init({
  appId: 'Kc0QDljlBKBOkjj5aStP8bD3-gzGzoHsz',
  appKey: 'biXtXKFhABMP7718qg9HGyPN',
  serverURL: 'https://kc0qdljl.lc-cn-n1-shared.com',
});

const Auth = {
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        (loginedUser) => resolve(loginedUser),
        (error) => reject(error)
      );
    });
  },

  login(username, password) {
    console.log('------');
    console.log(username, password);
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        (loginedUser) => resolve(loginedUser),
        (error) => reject(error)
      );
    });
  },

  logout() {
    User.logOut();
  },

  getCurrentUser() {
    return User.current();
  },
};

export default Auth;
