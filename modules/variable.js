let employeeName = document.getElementById("name");
let employeeJob = document.getElementById("job");
let employeePassport = document.getElementById("passport");
let employeeCountry = document.getElementById("country");

let employeesUL = document.getElementById('employeesUL');
let searchInput = document.getElementById("searchInput");
let searchContainer = document.getElementById("containerSearch");
let searchResultDiv = document.getElementById("searchResultDiv");
let searchTimesBtn = document.getElementById("searchTimesBtn");

let editEmployeeContainer = document.getElementById("editEmployeeContainer");
editEmployeeContainer.style.display = 'none';

const employeeForm = document.querySelector('.container-form .form');
const addBtn = document.querySelector('.add-employee-btn');

let id = '';
export {
    employeeName,
    employeeJob,
    employeePassport,
    employeeCountry,
    employeesUL,

    searchInput,
    searchContainer,
    searchResultDiv,
    searchTimesBtn,

    editEmployeeContainer,
    employeeForm,
    addBtn,
    id,

}