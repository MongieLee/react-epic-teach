import AV, { User } from "leancloud-storage";
AV.init({
  appId: "Kc0QDljlBKBOkjj5aStP8bD3-gzGzoHsz",
  appKey: "biXtXKFhABMP7718qg9HGyPN",
  serverURL: "https://kc0qdljl.lc-cn-n1-shared.com",
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

const Uploader = {
  upload(file, filename) {
    const item = new AV.Object("Image");
    const avFile = new AV.File(filename, file);
    item.set("filename", filename);
    item.set("owner", AV.User.current());
    item.set("url", avFile);
    return new Promise((resolve, reject) => {
      item.save().then(
        (serverFile) => resolve(serverFile),
        (error) => reject(error)
      );
    });
  },

  find({ page = 0, limit = 10 }) {
    const query = new AV.Query("Image");
    query.include("owner");
    query.limit(limit);
    query.skip(page);
    query.descending("createdAt");
    query.equalTo("owner", AV.User.current());
    return new Promise((resolve, reject) => {
      query.find().then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};

export { Auth, Uploader };
