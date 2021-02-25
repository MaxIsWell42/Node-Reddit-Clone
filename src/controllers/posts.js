const Post = require('../models/posts');

module.exports = (app) => {
    app.get('/', (req, res) => {
        Post.find({}).lean()
        .then(posts => {
            res.render('posts-index', { posts });
        })
        .catch(err => {
            console.log(err.message);
        })
    })
    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        console.log(req.body)
        const post = new Post(req.body);
        console.log(post)
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save().catch(err => {
            console.log(err.message)
        })
        res.redirect('/')
    });
    // GET POST INFO
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    })
    // LOOK UP THE POST
    app.get("/posts/:id", function(req, res) {
        Post.findById(req.params.id).lean().populate('comments').then((post) => {
            res.render('post-show', { post })
        }).catch((err) => {
            console.log(err.message)
        })
    });
    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err);
            });
    });
};