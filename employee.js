import db from '../modules/db.js'


import {
    employeesUL,
    employeeName,
    employeeJob,
    employeePassport,
    employeeCountry
} from '../modules/variable.js'

export default function fetchEmployees() {
    db.collection('employees').get().then(doc => {
        loadEmployees(doc);
    });
}

function loadEmployees(employees) {
    employeesUL.innerHTML = "";
    employees.forEach((employee, id) => {
        id = employee.id;
        const employeeLI = document.createElement('li');
        employeeLI.className = "employee-li";
        employeeLI.setAttribute("data-id", id);

        const deleteEmployeeBtn = document.createElement("button");
        deleteEmployeeBtn.className = 'delete-employee-btn';
        deleteEmployeeBtn.innerText = "X";

        employeeLI.appendChild(deleteEmployeeBtn);

        deleteEmployee(employeeLI, id, deleteEmployeeBtn);

        loadEmployeeDetails(employeeLI, employee);
    });
}

function deleteEmployee(employeeLI, id, btn) {
    btn.addEventListener("click", () => {
        db.collection('employees').doc(id).delete().then(() => {
            console.log('Document succesfully deleted!');
        }).catch(err => {
            console.log('Error removing document', err);
        });
        employeeLI.remove();
    });
}

function loadEmployeeDetails(employeeLI, employee) {
    const employeeDetails = document.createElement("div");
    employeeDetails.style.display = 'none';

    const employeeNameSpan = document.createElement('span');
    employeeNameSpan.innerText = employee.data().name;
    employeeLI.appendChild(employeeNameSpan);

    const employeeJobP = document.createElement("p");
    employeeJobP.innerText = employee.data().job;
    employeeDetails.appendChild(employeeJobP);

    const employeePassportP = document.createElement("p");
    employeePassportP.innerText = employee.data().passport;
    employeeDetails.appendChild(employeePassportP);

    const employeeCountryP = document.createElement("p");
    employeeCountryP.innerText = employee.data().country;
    employeeDetails.appendChild(employeeCountryP);

    employeeLI.appendChild(employeeDetails);

    onclickStyleEmployee(employeeLI, employeeDetails, employeeLI)

    employeesUL.appendChild(employeeLI);
}

function onclickStyleEmployee(btn, efirstElement, secondElement) {
    btn.onclick = function() {
        if (efirstElement.style.display == 'block') {
            efirstElement.style.display = 'none';

            secondElement.style.backgroundColor = 'white';
            secondElement.style.color = 'black';
        } else {
            efirstElement.style.display = 'block';
            secondElement.style.backgroundColor = 'maroon';
            secondElement.style.color = 'white';
        }
    }
}

export function clearEmployee() {
    employeeName.value = '';
    employeeJob.value = '';
    employeePassport.value = '';
    employeeCountry.value = '';
}