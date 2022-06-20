document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
})


document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn"){
        deleteRowByStuNum(event.target.dataset.num)
    }
    if (event.target.className === "edit-row-btn"){
        handleEditRow(event.target.dataset.num)
    }
})

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;
    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowByStuNum(student_number){
    fetch('http://localhost:5000/delete/' + student_number, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(stu_num){
    console.log("The number is >>>>>>>>>>>> :" + stu_num)
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    // document.querySelector("#update-number-input").dataset.id = stu_num;
    document.querySelector("#update-fname-input").dataset.id = stu_num;
    document.querySelector("#update-lname-input").dataset.id = stu_num;
    document.querySelector("#update-email-input").dataset.id = stu_num;
    document.querySelector("#update-cCode-input").dataset.id = stu_num;
    document.querySelector("#update-cTitle-input").dataset.id = stu_num;
}


updateBtn.onclick = function(e){
    e.preventDefault();
    const updateFirstNameInput = document.querySelector("#update-fname-input");
    const updateLastNameInput = document.querySelector("#update-lname-input");
    const updateEmailInput = document.querySelector("#update-email-input");
    const updateCourseCodeInput = document.querySelector("#update-cCode-input");
    const updateCourseTitleInput = document.querySelector("#update-cTitle-input");
    console.log(updateFirstNameInput.dataset.id + " " + updateFirstNameInput.value);

    fetch('http://localhost:5000/update', {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            student_number: updateFirstNameInput.dataset.id,
            first_name: updateFirstNameInput.value,
            last_name: updateLastNameInput.value,
            email: updateEmailInput.value,
            course_code: updateCourseCodeInput.value,
            course_title: updateCourseTitleInput.value
        })
        
        
    })
    .then(response => response.json())

    // .then(response => console.log(response.json()))
    .then(data => {
        if(data.success){
            location.reload();
        }
    })
}

const addBtn = document.querySelector('#add-name-btn');
const deletBtn = document.querySelector('#delete-row-btn');



addBtn.onclick = (e) =>{
    e.preventDefault();
    const studentNumberInput = document.querySelector('#stu-num');
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');;
    const emailInput = document.querySelector('#email');
    const courseCodeInput = document.querySelector('#course-code');;
    const courseTitleInput = document.querySelector('#course-title');

    const stuNum = studentNumberInput.value;
    const fname = firstNameInput.value;
    const lname = lastNameInput.value;
    const email = emailInput.value;
    const course_code = courseCodeInput.value;
    const course_title = courseTitleInput.value;

    studentNumberInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    courseCodeInput.value = ""; 
    courseTitleInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({student_number: stuNum, first_name: fname, last_name: lname, 
                    email: email, course_code: course_code, course_title: course_title})
    })
    .then(response => response.json())
    .then(data =>insertRowIntoTable(data['data']));
}


function insertRowIntoTable (data){
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data){
        if (data.hasOwnProperty(key)){
            tableHtml += `<td> ${data[key]}</td>`
        }
    }
    
        tableHtml += `<td><button class="delete-row-btn" data-num=${data}>Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-num=${data}>Edit</button></td>`;
    

    tableHtml += "</tr>";

    if(isTableData){
        table.innerHTML = tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }


}




function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    console.log(data);
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return; 
    }
    
    let tableHtml = "";

    data.forEach(function({student_number, first_name, last_name, email, course_code, course_title}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${student_number}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${course_code}</td>`;
        tableHtml += `<td>${course_title}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-num=${student_number}>Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-num=${student_number}>Edit</button></td>`;
        tableHtml += `</tr>`;
    });

    table.innerHTML = tableHtml;
}