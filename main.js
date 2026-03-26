function loadContacts() {
    let contacts = localStorage.getItem("employees");
    return contacts ? JSON.parse(contacts) : [];
}

// ---------- Save Contacts ----------
function saveContacts(data) {
    localStorage.setItem("employees", JSON.stringify(data));
}

// ---------- Add New Contact ----------
function addEmployee(event) {
    event.preventDefault();

    let id = document.getElementById("idNumber").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let gender = document.getElementById("gender").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let dob = document.getElementById("dob").value.trim();
    let position = document.getElementById("position").value.trim();

    if (!id || !firstName || !lastName || !gender || !phone || !email || !dob || !position) {
        alert("Please fill in all fields.");
        return;
    }

    let employees = loadContacts();

    let newEmployee = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phone: phone,
        email: email,
        dob: dob,
        position: position
    };

    employees.push(newEmployee);
    saveContacts(employees);

    alert("Contact added successfully!");
    document.getElementById("employeeForm").reset();
}

// ---------- Display Contacts in Table ----------
function displayContacts() {
    let employees = loadContacts();
    let tableBody = document.getElementById("contactTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    employees.forEach((emp) => {
        let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.gender}</td>
                <td>${emp.phone}</td>
                <td>${emp.email}</td>
                <td>${emp.dob}</td>
                <td>${emp.position}</td>
                <td>
                    <button class="btn-details" onclick="viewDetails('${emp.id}')">Details</button>
                    <button class="btn-edit" onclick="editEmployee('${emp.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteEmployee('${emp.id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// ---------- View Contact (Details Pop-up) ----------
function viewDetails(id) {
    let employees = loadContacts();
    let emp = employees.find(e => e.id === id);

    alert(
        "Contact Details:\n" +
        "ID Number: " + emp.id + "\n" +
        "First Name: " + emp.firstName + "\n" +
        "Last Name: " + emp.lastName + "\n" +
        "Gender: " + emp.gender + "\n" +
        "Phone: " + emp.phone + "\n" +
        "Email: " + emp.email + "\n" +
        "Date of Birth: " + emp.dob + "\n" +
        "Position: " + emp.position
    );
}

// ---------- Edit Contact ----------
function editEmployee(id) {
    let employees = loadContacts();
    let emp = employees.find(e => e.id === id);

    let newFirst = prompt("Enter new first name:", emp.firstName);
    let newLast = prompt("Enter new last name:", emp.lastName);
    let newGender = prompt("Enter new gender (Male/Female):", emp.gender);
    let newPhone = prompt("Enter new phone:", emp.phone);
    let newEmail = prompt("Enter new email:", emp.email);
    let newDob = prompt("Enter new date of birth:", emp.dob);
    let newPosition = prompt("Enter new position:", emp.position);

    if (newFirst && newLast && newGender && newPhone && newEmail && newDob && newPosition) {
        emp.firstName = newFirst;
        emp.lastName = newLast;
        emp.gender = newGender;
        emp.phone = newPhone;
        emp.email = newEmail;
        emp.dob = newDob;
        emp.position = newPosition;

        saveContacts(employees);
        alert("Contact updated!");
        location.reload();
    }
}

// ---------- Delete Contact ----------
function deleteEmployee(id) {
    let confirmDelete = confirm("Are you sure you want to delete this contact?");

    if (confirmDelete) {
        let employees = loadContacts();
        let updated = employees.filter(e => e.id !== id);
        saveContacts(updated);
        alert("Contact deleted!");
        location.reload();
    }
}

// ---------- Auto-run display on view page ----------
document.addEventListener("DOMContentLoaded", () => {
    displayContacts();
});