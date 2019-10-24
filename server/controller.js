module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const newUser = await db.create_user([username, password]);
    req.session.user = newUser;
    // console.log(req.session);
    res.status(201).send(newUser);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, id } = req.body;
    const user = await db.find_user([username, password]);
    req.session.user = user[0];
    res.status(200).send(user);
    // console.log(req.session);
  },
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { title } = req.query;
    const posts = await db.get_posts([]);
    res.status(200).send(posts);
  },

  getUserPosts: async (req, res) => {
    const db = req.app.get("db");
    const { title, myPosts } = req.query;
    // console.log(req.session.user);
    const { userid } = req.session.user;
    console.log("query", req.query);

    if (title !== "" && myPosts === 'true') {
      console.log('hit');
      const posts = await db.search_post_title([`%${title}%`]);
      res.status(200).send(posts);
    } else if (title === "" && myPosts === "false") {
      console.log('hit2')
      const posts = await db.non_users_posts([userid]);
      res.status(200).send(posts);
    } else if (title !== "" && myPosts === "false") {
      console.log("hit3");
      const posts = await db.non_user_search_posts([userid, `%${title}%`]);
      res.status(200).send(posts);
    } else {
      console.log('hit4')
      const posts = await db.get_posts();
      res.status(200).send(posts);
    }
  },
  getAPost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;

    const post = await db.get_a_post([postid]);
    res.status(200).send(post);
  },
  post: async (req, res) => {
    const db = req.app.get("db");
    const { userid } = req.session.user;
    // console.log("params", req.params.user.id);
    console.log("sessions", req.session.user.id);
    const { img, title, content } = req.body;
    const posts = await db.create_posts([
      title,
      img,
      content,
      req.session.user.id
    ]);
    res.status(200).send(posts);
  },
  // post: async(req,res) => {
  //   const db = req.app.get('db')
  //   const {userid} = req.session.user.id
  //   console.log('params',req.params.userid)
  //   console.log('sessions',req.session.user.id)
  //   const {img,title,content} = req.body
  //   const posts = await db.create_post([title,img,content,req.session.user.id])
  //   res.status(200).send(posts)
  // },
  getSession: (req, res) => {
    if (req.session) {
      res.status(200).send(req.session);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    // console.log("hit", req.session);
    res.status(200).send({ message: "Logged out" });
  }
};
