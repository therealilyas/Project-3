import { searchTimesBtn, addBtn, searchInput } from '../modules/variable.js'

searchTimesBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchResultDiv.innerHTML = "";
});
addBtn.addEventListener('click', () => {
    addEmployee();
});
searchInput.addEventListener("keyup", () => {
    searchResultDiv.innerHTML = "";
    if (searchInput.value == "") {
        searchResultDiv.innerHTML = "";
        return;
    }
    createEmployee()
});