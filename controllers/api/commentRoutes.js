const router = require('express').Router();
const {Comment} = require('../../models');
const auth = require('../../utils/auth');

//find all
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
//find all id
router.get('/id', (req, res) => {
    Comment.findAll({
        where: {
            id:req.params.id
        }
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
//post using auth
router.post('/', auth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_str: req.body.comment_str,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});
//put with id and auth
router.put('/:id', auth, (req, res) => {
    Comment.update({
        comment_str: req.body.comment_str,
    }, {
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if(!commentData) {
            res.status(404).json({message: 'No comment with this id'});
            return;
        }
        res.json(commentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
//delete with id and auth
router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
            id:req.params.user_id
        }
    }).then(commentData => {
        if(!commentData) {
            res.status(404).json({message: 'no comment with this id'});
            return;
        }
        res.json(commentData);
    }).catch(err => {
        res.status(500).json(err)
    });
});

module.exports = router;