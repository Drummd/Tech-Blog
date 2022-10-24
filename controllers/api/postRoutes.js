
const router = require('express').Router();
const { compare } = require('bcrypt');
//double check route for models
const { Post, User, Comment } = require('../../models');
const auth = require('../../utils/auth');
const sequelize = require('../../utils/auth');
//find all
router.get('/', (req, res) => {
    console.log('=====');
    Post.findAll({
        attributes: ['id',
            'title',
            'content',
            'new_create'
        ],
        order: [
            ['new_create', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_str', 'post_id', 'new_create'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(postData => res.json(postData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//find one id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'content',
            'title',
            'new_create'
        ],
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Comment,
            attributes: ['id', 'comment_str', 'post_id', 'user_id', 'new_create'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with the id used' });
                return;
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//post create with auth
router.post('/', auth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//put update with id and auth
router.put('/:id', auth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData) {
            res.status(404).json({message: 'No post found with this id'})
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//delete with id and auth
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData) {
            res.status(404).json({message: 'No post found with this id'})
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;