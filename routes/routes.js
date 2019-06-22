const express = require('express');
const routes = express.Router();


//Require Routes
const index = require('./index');
const users = require('./users');
const notice = require('./noticeRouter');
const assignment = require('./assignmentRouter');
const exam = require('./examRouter');
const course = require('./CourseRouter');
const marksRouter = require('./marksRouter');
const courseRouter = require('./courseMarksRouter');
const subjectRouter = require('./subjectMarksRouter');

//Routes
routes.use('/', index);
routes.use('/users', users);
routes.use('/notice',notice);
routes.use('/assignments', assignment);
routes.use('/exams', exam);
routes.use('/courses', course);
routes.use('/marks/', marksRouter);
routes.use('/course/', courseRouter);
routes.use('/subject/', subjectRouter);

module.exports = routes;