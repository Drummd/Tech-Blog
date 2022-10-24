const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'new_create'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_str', 'post_id', 'user_id', 'new_create'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', auth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'new_create'
        ],
        include: [{
            model: User,
            atttributes: ['username']
        },{
            model: Comment,
            attributes: ['id', 'comment_str', 'post_id', 'user_id', 'new_create'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'no post found with this id'});
            return;
        }
        const post = postData.get({plain: true});
        res.render('edit-post', {post, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router