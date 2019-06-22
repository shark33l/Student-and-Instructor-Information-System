const express = require('express');
const routes = express.Router();


//Require Routes
const index = require('./index');
const users = require('./users');
const notice = require('./noticeRouter');

const studentEnrollment = require('./StudentEnrollmentRouter');
const studentAssignment = require('./StudentAssignmentRouter');
const studentExam = require('./StudentExamRouter');
const studentCourses = require('./StudentCoursesRouter');
const studentAssignmentUpload = require('./StudentAssignmentUploadRouter');

//Routes
routes.use('/', index);
routes.use('/users', users);
routes.use('/notice',notice);

routes.use('/StudentEnrollmentRouter', studentEnrollment);
routes.use('/StudentAssignmentRouter', studentAssignment);
routes.use('/StudentExamRouter', studentExam);
routes.use('/StudentCoursesRouter', studentCourses);
routes.use('/StudentAssignmentUploadRouter', studentAssignmentUpload);



module.exports = routes;