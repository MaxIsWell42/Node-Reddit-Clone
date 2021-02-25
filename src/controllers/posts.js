const Post = require('../models/posts');

module.exports = (app) => {
    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({}).lean()
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        })
    })
// CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
        var post = new Post(req.body);
    
        post.save(function(err, post) {
            return res.redirect(`/`);
        });
        } else {
        return res.status(401); // UNAUTHORIZED
        }
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