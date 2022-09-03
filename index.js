const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./model/BlogPost");

const app = new express();
const Schema = mongoose.Schema;
app.set('view engine', 'ejs');

// use static file 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database and default
mongoose.connect('mongodb://localhost:27017/my_database', {useNewUrlParser: true});
const BlogPostSchema = new Schema({
    title: String,
    body: String
})



// create Routes
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts,
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    // console.log(req.params.id)
    res.render('post',  {
        blogpost
    });
});

app.get('/post/new', (req, res) => {
    res.render('create');
});
app.post('/post/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/');
});





app.listen(3000, console.log("sever running on port 4000"));