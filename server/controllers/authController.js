module.exports = {
  async login(req, res) {
    let { username, password } = req.body;
    //Would get user by username and compare hashed passwords here to authenticate
    let result = (await username) && password ? true : false;
    if (result) {
      req.session.user = {
        username: username,
        profilePic: `https://robohash.org/${username}`,
        loggedIn: true
      };
      res.status(200).send(req.session.user);
    } else res.status(401).send("Username or password incorrect.");
  },
  logout(req, res) {
    console.log("Logged out!");
    req.session.destroy();
    res.sendStatus(200);
  }
};
