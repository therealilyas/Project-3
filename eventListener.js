import createEmployee from '../modules/service.js'
import {
    searchTimesBtn as clearBtn,
    addBtn as addForm,
    searchInput as searchForm,
} from '../modules/variable.js'

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResultDiv.innerHTML = "";
});
addForm.addEventListener('click', () => {
    addEmployee();
});
searchForm.addEventListener("keyup", () => {
    searchResultDiv.innerHTML = "";
    if (searchInput.value == "") {
        searchResultDiv.innerHTML = "";
        return;
    }
    createEmployee()
});

export default clearBtn