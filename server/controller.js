

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const newUser = await db.create_user([username, password]);
    req.session.user = newUser;
    console.log(req.session)
    res.status(201).send(newUser);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password,id} = req.body;
    const user = await db.find_user([username, password]);
    req.session.user = user[0];
    res.status(200).send(user);
    console.log(req.session)
  },
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { title } = req.query;
    const posts = await db.get_posts([]);
    res.status(200).send(posts);
  },

  getSession: (req, res) => {
    if (req.session) {
      res.status(200).send(req.session);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    console.log('hit',req.session)
    res.status(200).send({ message: "Logged out" });
  },
    getUserPosts: async (req, res) => {
      const db = req.app.get("db");
      const { title, myPosts } = req.query;
      const { userid } = req.session.user;
      if(title !== '' && myPosts === true){
          const posts = await db.search_post_title([`%${title}%`])
          res.status(200).send(posts)
      } else if (title === '' && myPosts === 'false'){
          const posts = await db.non_user_posts([userid])
          res.status(200).send(posts)
      } else if (title !== '' && myPosts === 'false'){
          console.log('hit2')
          const posts = await db.non_user_search_posts([userid, `%${title}%`])
          res.status(200).send(posts)
      } else {
          const posts = await db.get_all_posts()
          res.status(200).send(posts)
      }
    }
};
