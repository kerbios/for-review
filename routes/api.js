const { Message, User } = require('../services/postgres');

module.exports = app => {
    app.get('/api/messages', async (req, res) => {
        if (req.user) {
            let messages = await Message.findAll(
                {
                    limit: 100
                }
            );
            // associations much better option, but need to spend a time to catch up implementation
            messages = await Promise.all(messages.map(async (message) => {
                const user = await User.findOne({ googleId: message.from });
                message.from = `${user.firstName} ${user.lastName}`;
                return message;
            }));
            console.log("messages:", messages);
            res.status(200).send(messages);
        } else {
            res.status(401).send({ error: 'authorization required.' }); // here we could create middleware for checking auth
        }
    });
};