const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance: new DbService();
    }

    async getAllData(){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM student_registration;"
                
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async insertNewRecord(student_number, first_name, last_name, email, course_code, course_title){
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO student_registration(student_number, first_name, last_name, email, course_code, course_title) \
                                VALUES (?, ?, ?, ?, ?, ?);";
                
                connection.query(query,[student_number, first_name, last_name, email, course_code, course_title], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return {
                // id: insertId,
                student_number: student_number,
                first_name: first_name,
                last_name: last_name,
                email: email,
                courseCode: course_code,
                courseTitle: course_title
            };
        } catch (error) {
            console.log(error);
        }
    }



    async  deleteRowByStuNum(student_number) {

        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM student_registration WHERE student_number = ?";
                
                connection.query(query, [student_number], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;

        } catch (error) {
            console.log(error)
            return false;
        }

        
    }

    async updateStudent(student_number, first_name, last_name, email, course_code, course_title) {
        try {
            // console.log(student_number + first_name + last_name + email + course_code + course_title)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE student_registration \
                                SET first_name = ?, \
                                last_name = ?, \
                                email = ?, \
                                course_code = ?, \
                                course_title = ? \
                                WHERE student_number = ?";
                
                connection.query(query, [first_name, last_name, email, course_code, course_title, student_number], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;

        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async searchByStudentNumber(student_number){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM student_registration WHERE student_number = ?";
                
                connection.query(query, [student_number], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = DbService;