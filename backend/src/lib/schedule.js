module.exports = (app) => {
    const schedule = require('node-schedule');

    app.scheduler = {
        execute: (timeStamp, job) => {
            schedule.scheduleJob(timeStamp, job);
        }
    };
};