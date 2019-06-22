const express = require('express');
const routes = express.Router();


//Require Routes
const index = require('./index');
const users = require('./users');
const notice = require('./noticeRouter');
const assignment = require('./assignmentRouter');
const exam = require('./examRouter');
const course = require('./CourseRouter');

const studentEnrollment = require('./StudentEnrollmentRouter');
const studentAssignment = require('./StudentAssignmentRouter');
const studentExam = require('./StudentExamRouter');
const studentCourses = require('./StudentCoursesRouter');
const studentAssignmentUpload = require('./StudentAssignmentUploadRouter');

//Routes
routes.use('/', index);
routes.use('/users', users);
routes.use('/notice',notice);
routes.use('/assignments', assignment);
routes.use('/exams', exam);
routes.use('/courses', course);

routes.use('/StudentEnrollmentRouter', studentEnrollment);
routes.use('/StudentAssignmentRouter', studentAssignment);
routes.use('/StudentExamRouter', studentExam);
routes.use('/StudentCoursesRouter', studentCourses);
routes.use('/StudentAssignmentUploadRouter', studentAssignmentUpload);



module.exports = routes;