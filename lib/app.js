const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/boxers', require('./controllers/boxers'));
app.use('/api/v1/contacts', require('./controllers/contacts'));
app.use('/api/v1/cars', require('./controllers/cars'));
app.use('/api/v1/cannabis', require('./controllers/strains'));
app.use('/api/v1/users', require('./controllers/users'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
