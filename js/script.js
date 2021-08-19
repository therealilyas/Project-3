import updateEmployee from '../modules/update.js'
import fetchEmployees from '../modules/employee.js'

import {
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
} from '../modules/variable.js'


init();

function init() {
    fetchEmployees()
}
import clearBtn from '../modules/eventListener.js'
clearBtn


// export default function createEmployee() {
//     let searchedName = searchInput.value;
//     db.collection('employees').get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//             id = doc.id;
//             if (searchedName.length > 0) {
//                 for (let i = 0; i < searchedName.length; i++) {
//                     let searchedResultP = document.createElement("p");
//                     searchedResultP.className = "searched-result-p";
//                     if (doc.data().name.toLowerCase().includes(searchedName.toLowerCase())) {
//                         searchedResultP.setAttribute('id', id);
//                         searchedResultP.innerText = doc.data().name;
//                         searchResultDiv.appendChild(searchedResultP);
//                     }
//                     searchedResultP.onclick = function() {
//                         editEmployeeForm(doc);

//                         let saveEditedInfoBtn = document.getElementById("saveEditedInfoBtn");
//                         saveEditedInfoBtn.onclick = function() {
//                             if (id == doc.id) {
//                                 updateEmployee(id)
//                                 fetchEmployees()
//                                 editEmployeeContainer.style.display = "none";
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     });
// }

// export function editEmployeeForm(doc) {
//     console.log('clicked');
//     id = doc.id;
//     let editName = document.getElementById('editName');
//     let editJob = document.getElementById("editJob");
//     let editPassport = document.getElementById("editPassport");
//     let editCountry = document.getElementById("editCountry");
//     if (editEmployeeContainer.style.display == "none") {
//         editEmployeeContainer.style.display = "block";
//     }
//     editName.value = doc.data().name;
//     editJob.value = doc.data().job;
//     editPassport.value = doc.data().passport;
//     editCountry.value = doc.data().country;
// }