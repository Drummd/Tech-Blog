const { Post } = require('../models');

const postData = [
    {
        title: "Ethereum Extends Gains to Rise 8%; Bitcoin Firms",
        content: "Cryptocurrency Ethereum extended gains to rise more than 8% on Monday to $2,587 but remained 40% below a record high of above $4,300 hit earlier this month. At 1153 GMT, it was trading up 7.4% at $2,565.69. Larger rival Bitcoin also gained in its wake with the world's biggest and best-known cryptocurrency rising 3.7% to $36,977 in quiet trading with London and U.S. markets shut for holidays.",
        user_id: 1
    },
    {
        title: "npm 7 is the latest and the greatest!",
        content: "npm 7 was just published as latest to the npm registry last week, and it’s now the default version you get when you run npm install --global npm. Workspaces – By far the most-requested feature by npm users everywhere, this new set of npm CLI features lets you manage multiple packages from within a singular, top-level root package.",
        user_id: 2
    },
    {
        title: "Chrome will soon warn you when you might not want to trust an extension",
        content: "A Google is rolling out new safety features for Chrome which are designed to make it easier to spot dubious downloads and extensions. They build upon the browser’s Enhanced Safe Browsing feature, which launched last year to offer better warnings against phishing sites. In order to be trusted, extensions need to come from a developer that has followed Google’s Developer Program Policies.",
        user_id: 2

    }
    
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;