const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// create
app.post('/insert', (request, response) => {
    const {student_number, first_name, last_name, email, course_code, course_title} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewRecord(student_number, first_name, last_name, email, course_code, course_title);
    result
    .then(data => response.json({data: data}))
    .catch(error => console.log(error));
})

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
    
})

// update
app.patch('/update', (request, response) => {
    const { student_number, first_name, last_name, email, course_code, course_title} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.updateStudent(student_number, first_name, last_name, email, course_code, course_title);

    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
})

// delete
app.delete('/delete/:student_number', (request, response) => {
    const { student_number } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowByStuNum(student_number);

    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
});


// search
app.get('/search/:student_number', (request, response) => {
    const { student_number } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByStudentNumber(student_number);

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})



app.listen(process.env.PORT, () => console.log('app is running'));