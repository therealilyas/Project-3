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


let id;

addBtn.addEventListener('click', () => {
    db.collection('employees').add({
        name: employeeForm.name.value,
        job: employeeForm.job.value,
        passport: employeeForm.passport.value,
        country: employeeForm.country.value
    });


    employeeForm.name.value = '';
    employeeForm.job.value = '';
    employeeForm.passport.value = '';
    employeeForm.country.value = '';
})

searchInput.addEventListener("keyup", () => {
    db.collection('employees').get().then(doc => {
        searchResultDiv.innerHTML = "";

        if (searchInput.value == "") {
            searchResultDiv.innerHTML = "";
            return;
        }

        let searchedName = searchInput.value;
        let result = [];

        for (let i = 0; i < db.collection('employees').length; i++) {
            if (doc.data().name.toLowerCase().includes(searchedName.toLowerCase())) {
                result.push(doc.data(id));
            }
        }

        if (searchedName.length > 0) {
            for (let i = 0; i < searchedName.length; i++) {
                let searchedResultP = document.createElement("p");
                searchedResultP.className = "searched-result-p";
                // searchedResultP.innerText = ;

                searchResultDiv.appendChild(searchedResultP);

                searchedResultP.onclick = function() {
                    let editName = document.getElementById('editName');
                    let editJob = document.getElementById("editJob");
                    let editPassport = document.getElementById("editPassport");
                    let editCountry = document.getElementById("editCountry");
                    let saveEditedInfoBtn = document.getElementById("saveEditedInfoBtn");

                    if (editEmployeeContainer.style.display == "none") {
                        editEmployeeContainer.style.display = "block";
                    }

                    editName.value = doc.data(id).name;
                    editJob.value = doc.data(id).job;
                    editPassport.value = doc.data(id).passport;
                    editCountry.value = doc.data(id).country;


                    saveEditedInfoBtn.onclick = function() {
                        console.log("Clicked!")
                        result[i].name = editName.value;
                        result[i].job = editJob.value;
                        result[i].passport = editPassport.value;
                        result[i].country = editCountry.value

                        employees.forEach((employee) => {
                            if (employee.id == result[i].id) {
                                employee = result[i];
                            }
                        });

                        loadEmployees(employees);

                        console.log(result);

                        editEmployeeContainer.style.display = "none";
                    }
                }
            }
        }
    })
});

searchTimesBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResultDiv.innerHTML = "";
})

db.collection('employees').get().then(doc => {
    loadEmployees(doc);

});

function loadEmployees(employees) {
    employeesUL.innerHTML = "";


    employees.forEach((employee, id) => {

        const employeeLI = document.createElement('li');
        employeeLI.className = "employee-li";
        const employeeId = employee.id
        id = employeeId;
        employeeLI.setAttribute("data-id", id)

        const employeeNameSpan = document.createElement('span');
        employeeNameSpan.innerText = employee.data().name;

        const deleteEmployeeBtn = document.createElement("button");
        deleteEmployeeBtn.className = 'delete-employee-btn';
        deleteEmployeeBtn.innerText = "X";

        employeeLI.appendChild(employeeNameSpan);
        employeeLI.appendChild(deleteEmployeeBtn);


        deleteEmployeeBtn.addEventListener("click", () => {
            console.log("Number of employees in company " + employees.length);

            db.collection('employees').doc(id).delete().then(() => {
                console.log('Document succesfully deleted!');
            }).catch(err => {
                console.log('Error removing document', err);
            });
            employeeLI.remove();
        });

        const employeeDetails = document.createElement("div");
        employeeDetails.style.display = 'none';

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

        employeeLI.onclick = function() {
            if (employeeDetails.style.display == 'block') {
                employeeDetails.style.display = 'none';

                employeeLI.style.backgroundColor = 'white';
                employeeLI.style.color = 'black';

                deleteEmployeeBtn.style.backgroundColor = 'maroon';
                deleteEmployeeBtn.style.color = 'white';

            } else {
                employeeDetails.style.display = 'block';
                employeeLI.style.backgroundColor = 'maroon';
                employeeLI.style.color = 'white';

                deleteEmployeeBtn.style.backgroundColor = 'white';
                deleteEmployeeBtn.style.color = 'maroon';
            }

        }

        employeesUL.appendChild(employeeLI);
    });
}