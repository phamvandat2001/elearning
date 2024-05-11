module.exports = (app) => {
    const morgan = require('morgan');
    app.use(morgan('dev'));
    // app.use(morgan('[:date[iso]] ":method :url" :status :response-time ms'));
}