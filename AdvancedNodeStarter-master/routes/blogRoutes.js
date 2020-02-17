const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    //generalize cachein login thats why we write in here
    const redis = require("redis");
    const redisUrl = "redis://127.0.0.1:6379";
    const clent = redis.createClient(redisUrl);
    const util = require("util"); //promisify function will make things return promise
    client.get = util.promisify(client.get);

    //do we have any cached date in redis related to do query?
    const cachedBlogs = await client.get(req.user.id); //dont have to use a call  back because it returns a promise

    //if yes then respond to the request right away and return
    if (cachedBlogs){
      console.log("serving from cache");
      return res.send(JSON.parse(cachedBlogs));
    }
    //if no we need to respond to request and update our cache to store data
    console.log("serving from mongoDB");
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);

    client.set(req.user.id, JSON.stringify(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
