export default function updateEmployee(id) {
    db.collection('employees').doc(id).update({
        name: editName.value,
        job: editJob.value,
        passport: editPassport.value,
        country: editCountry.value,
    });
}