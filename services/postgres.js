const { Sequelize } = require('sequelize');
const { db_url, force } = require('../config');
/* 
* NOTE: we could create logger instance here
* collect errors, events, send to logstash, visualize in Kibana
* but console.log is enough for this app 
*/

/* connect to db */
const sequelize = new Sequelize(db_url);

const errorHandler = (err) => {
    console.error(err);
};

const technicalUserCreated = (user) => {
    console.log('Technical account created successfuly.', user);
};

const userModelCreated = () => {
    console.log('User model created successfuly.');
};

const createTechnicalUser = () => {
    /* return User.create({
        firstName: 'ALL',
        email: 'test@task.com',
        googleId: '0'
    }); */
};

const messageModelCreated = () => {
    console.log('Message model created successfuly.');
};

const User = require('../models/user')(sequelize);
const Message = require('../models/message')(sequelize);

sequelize.authenticate()
    .then(() => User.sync({ force: Boolean(force) }))
    .then(userModelCreated)
    .then(createTechnicalUser)
    .then(technicalUserCreated)
    .then(() => Message.sync({ force: Boolean(force) }))
    .then(messageModelCreated)
    .catch(errorHandler);

module.exports = { 
    User,
    Message
    /* here we could export all functions for unit testing */
 };