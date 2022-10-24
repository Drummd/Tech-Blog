const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "No way!",
        user_id: 2,
        post_id: 3,
        
    },
    {
        comment_text: "First Comment :)",
        user_id: 2,
        post_id: 5,
        
    },
    {
        comment_text: "Is this believable?",
        user_id: 4,
        post_id: 1,
        
    },
    {
        comment_text: "Nice.",
        user_id: 3,
        post_id: 5,
        
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
