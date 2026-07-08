let students = JSON.parse(localStorage.getItem("students")) || [];

const studentList = document.getElementById("studentList");
const total = document.getElementById("total");
const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

// Display Students
function displayStudents(data = students) {

    studentList.innerHTML = "";

    data.forEach((student, index) => {

        studentList.innerHTML += `
        <tr>

            <td>
                <img src="${student.photo}" class="student-photo">
            </td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.age}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button class="edit"
                onclick="editStudent(${index})">

                Edit

                </button>

                <button class="delete"
                onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

    total.innerHTML = students.length;

    localStorage.setItem("students", JSON.stringify(students));

}

// Add Student

function addStudent(){

let name=document.getElementById("name").value;

let course=document.getElementById("course").value;

let age=document.getElementById("age").value;

let email=document.getElementById("email").value;

let phone=document.getElementById("phone").value;

let file=document.getElementById("photo").files[0];

if(name=="" || course=="" || age=="" || email=="" || phone==""){

alert("Fill All Fields");

return;

}

let reader=new FileReader();

reader.onload=function(e){

students.push({

photo:e.target.result,

name:name,

course:course,

age:age,

email:email,

phone:phone

});

displayStudents();

clearForm();

}

if(file){

reader.readAsDataURL(file);

}else{

students.push({

photo:"https://via.placeholder.com/60",

name:name,

course:course,

age:age,

email:email,

phone:phone

});

displayStudents();

clearForm();

}

}

// Clear Form

function clearForm(){

document.getElementById("name").value="";

document.getElementById("course").value="";

document.getElementById("age").value="";

document.getElementById("email").value="";

document.getElementById("phone").value="";

document.getElementById("photo").value="";

}

// Delete

function deleteStudent(index){

if(confirm("Delete Student?")){

students.splice(index,1);

displayStudents();

}

}

// Edit

function editStudent(index){

let student=students[index];

document.getElementById("name").value=student.name;

document.getElementById("course").value=student.course;

document.getElementById("age").value=student.age;

document.getElementById("email").value=student.email;

document.getElementById("phone").value=student.phone;

students.splice(index,1);

displayStudents();

}

// Search

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let filter=students.filter(student=>{

return student.name.toLowerCase().includes(value)

||

student.course.toLowerCase().includes(value)

||

student.email.toLowerCase().includes(value);

});

displayStudents(filter);

});

// Dark Mode

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeBtn.innerHTML="☀️ Light Mode";

}else{

themeBtn.innerHTML="🌙 Dark Mode";

}

});

// First Load

displayStudents();