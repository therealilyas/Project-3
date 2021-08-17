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
init();

function init() {
    fetchEmployees()
}

function fetchEmployees() {
    db.collection('employees').get().then(doc => {
        loadEmployees(doc);
    });
}
addBtn.addEventListener('click', () => {
    addEmployee();
});

function addEmployee() {
    db.collection('employees').add({
        name: employeeForm.name.value,
        job: employeeForm.job.value,
        passport: employeeForm.passport.value,
        country: employeeForm.country.value
    });
    clearEmployee()
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

searchInput.addEventListener("keyup", () => {
    searchResultDiv.innerHTML = "";
    if (searchInput.value == "") {
        searchResultDiv.innerHTML = "";
        return;
    }
    createEmployee()
});

function clearEmployee() {
    employeeForm.name.value = '';
    employeeForm.job.value = '';
    employeeForm.passport.value = '';
    employeeForm.country.value = '';
}

function createEmployee() {
    let searchedName = searchInput.value;
    db.collection('employees').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            id = doc.id;
            if (searchedName.length > 0) {
                for (let i = 0; i < searchedName.length; i++) {
                    let searchedResultP = document.createElement("p");
                    searchedResultP.className = "searched-result-p";
                    if (doc.data().name.toLowerCase().includes(searchedName.toLowerCase())) {
                        searchedResultP.setAttribute('id', id);
                        searchedResultP.innerText = doc.data().name;
                        searchResultDiv.appendChild(searchedResultP);
                    }
                    searchedResultP.onclick = function() {
                        editEmployeeForm(doc);

                        let saveEditedInfoBtn = document.getElementById("saveEditedInfoBtn");
                        saveEditedInfoBtn.onclick = function() {
                            if (id == doc.id) {
                                updateEmployee(id)
                                fetchEmployees()
                                editEmployeeContainer.style.display = "none";
                            }
                        }
                    }
                }
            }
        });
    });
}

searchTimesBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResultDiv.innerHTML = "";
});

function updateEmployee(id) {
    db.collection('employees').doc(id).update({
        name: editName.value,
        job: editJob.value,
        passport: editPassport.value,
        country: editCountry.value,
    });
}

function editEmployeeForm(doc) {
    id = doc.id;
    let editName = document.getElementById('editName');
    let editJob = document.getElementById("editJob");
    let editPassport = document.getElementById("editPassport");
    let editCountry = document.getElementById("editCountry");
    if (editEmployeeContainer.style.display == "none") {
        editEmployeeContainer.style.display = "block";
    }
    editName.value = doc.data().name;
    editJob.value = doc.data().job;
    editPassport.value = doc.data().passport;
    editCountry.value = doc.data().country;
}