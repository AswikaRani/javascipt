const link = new URL(window.location.href);
const id = link.searchParams.get("id");
console.log(id);

openview(id);
function openview(id) {

    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'apllication/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let editImgPreview = document.getElementById('view_emp_img')
            editImgPreview.src = `http://localhost:3000/employees/${id}/avatar`;

            let view_popup_img = document.getElementById('view_popup_img')
            view_popup_img.src = `http://localhost:3000/employees/${id}/avatar`;

            document.getElementById("view_select").innerHTML = data.salutation
            document.getElementById('view_firstname').innerHTML = data.firstName
            document.getElementById('view_lastname').innerHTML = data.lastName
            document.getElementById('view_email').innerHTML = data.email
            document.getElementById('view_gender').innerHTML = data.gender
            document.getElementById('view_phone').innerHTML = data.phone
            document.getElementById('view_Username').innerHTML = data.username
            document.getElementById('view_Qualifications').innerHTML = data.qualifications
            document.getElementById('view_address').innerHTML = data.address
            document.getElementById('view_country').innerHTML = data.country
            document.getElementById('view_state').innerHTML = data.state
            document.getElementById('view_city').innerHTML = data.city
            document.getElementById('view_pin').innerHTML = data.pin
            document.getElementById('view_dob').innerHTML = data.dob


            let originalDate = data.dob;
            let parts = originalDate.split("-");
            var currentDate = new Date();
            let age = currentDate.getFullYear() - parts[2]
            console.log(age);
            document.getElementById('view_age').innerHTML = age

        })
}





function overla() {
    let variable = document.getElementById('newEmployee')
    variable.style.visibility = "hidden";
    let back = document.getElementById('overlay')
    back.style.display = "none";
    let closedlt = document.getElementById('deleat_emplayee')
    closedlt.style.visibility = "hidden";
    let view_popup_img = document.getElementById('view_popup_img')
    view_popup_img.style.display = "none"
}


function closetag() {
    let variable = document.getElementById('newEmployee')
    variable.style.visibility = "hidden";
    let back = document.getElementById('overlay')
    back.style.display = "none";

}



// view => edit



function viewopenedit(id) {
    let variable = document.getElementById('newEmployee')
    variable.style.visibility = "visible";
    let back = document.getElementById('overlay')
    back.style.display = "unset";
    let uplod = document.getElementById('upload')
    uplod.style.display = "none";
    let change = document.getElementById('change_avatar')
    change.style.display = "block";



}


let submit = document.getElementById('view_id')
submit.addEventListener("click", () => {
    editGet(id);
    clearBugOnEdit()
})

function clearBugOnEdit() {
    document.getElementById("erroradd_dob").textContent = "";
    document.getElementById("erroradd_gender").textContent = "";
    document.getElementById("erroradd_number").textContent = "";
    document.getElementById("erroradd_email").textContent = "";
    document.getElementById("erroradd_firstName").textContent = "";
    document.getElementById("erroradd_secondName").textContent = "";
    document.getElementById("erroradd_password").textContent = "";
    document.getElementById("erroradd_select").textContent = "";
    document.getElementById("erroradd_username").textContent = "";
    document.getElementById("erroradd_address").textContent = "";
    document.getElementById("erroradd_qualification").textContent = "";
    document.getElementById("erroradd_country").textContent = "";
    document.getElementById("erroradd_State").textContent = "";
    document.getElementById("erroradd_city").textContent = "";
    document.getElementById("erroradd_pin").textContent = "";
}



function img_change() {
    const clickToChange = document.getElementById('change_avatar')
    clickToChange.src = URL.createObjectURL(event.target.files[0]);
}

function editGet(id) {
    console.log(id);

    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'apllication/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);


            let editImgPreview = document.getElementById('change_avatar')
            editImgPreview.src = `http://localhost:3000/employees/${data.id}/avatar`;

            document.getElementById("add_select").value = data.salutation
            document.getElementById('add_firstName').value = data.firstName
            document.getElementById('add_secondName').value = data.lastName
            document.getElementById('add_email').value = data.email
            document.getElementById('add_number').value = data.phone
            document.querySelector(`input[name="add_gender"][value='${data.gender}']`).checked = true;
            document.getElementById('add_username').value = data.username
            document.getElementById('add_password').value = data.password
            document.getElementById('add_qualification').value = data.qualifications
            document.getElementById('add_address').value = data.address
            document.getElementById('add_country').value = data.country
            document.getElementById('add_State').value = data.state
            document.getElementById('add_city').value = data.city
            document.getElementById('add_pin').value = data.pin


            let originalDate = data.dob;
            let parts = originalDate.split("-");
            let reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
            console.log(reversedDate);
            document.getElementById('add_dob').value = reversedDate


            const finishValidationedit = document.getElementById('save_change')
            finishValidationedit.addEventListener('click', () => {
                const validations = addFormValidation()
                if (!validations) {
                    return;
                }
                else {
                    saveChanges(id)
                    closetag()
                    showPopupToEdit()
                }
            })
        })
}


function showPopupToEdit() {
    let popup = document.getElementById('popup');
    popup.style.display = 'block';
    document.getElementById('popupMsg').textContent = "Successfully edited!"
    setTimeout(function () {
        popup.style.opacity = '1';
        document.querySelector('.tick-mark').style.opacity = '1';
    }, 10);
    setTimeout(hidePopup, 2000);
}

function hidePopup() {
    let popup = document.getElementById('popup');
    popup.style.opacity = '0';
    document.querySelector('.tick-mark').style.opacity = '0';
    setTimeout(function () {
        popup.style.display = 'none';
    }, 300);
}


function saveChanges(id) {
    const salutation = document.getElementById("add_select").value;
    const firstName = document.getElementById('add_firstName').value;
    const lastName = document.getElementById('add_secondName').value;
    const email = document.getElementById('add_email').value;
    const phone = document.getElementById('add_number').value;
    const dob = document.getElementById('add_dob').value;
    const gender = document.querySelector('input[name="add_gender"]:checked').value;
    const username = document.getElementById('add_username').value;
    const password = document.getElementById('add_password').value;
    const qualifications = document.getElementById('add_qualification').value;
    const address = document.getElementById('add_address').value;
    const country = document.getElementById('add_country').value;
    const state = document.getElementById('add_State').value;
    const city = document.getElementById('add_city').value;
    const pin = document.getElementById('add_pin').value;


    let originalDate = dob;
    let parts = originalDate.split("-");
    let reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
    console.log(reversedDate);


    const newData = {
        salutation,
        firstName,
        phone,
        gender,
        username,
        dob: reversedDate,
        lastName,
        email,
        password,
        qualifications,
        address,
        country,
        state,
        city,
        pin,
    }
    console.log(newData);


    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Data posted successfully", data);

            const imgUplode = document.getElementById('change');
            let imgObject = new FormData();

            imgObject.append("avatar", imgUplode.files[0]);

            fetch(`http://localhost:3000/employees/${id}/avatar`, {
                method: "POST",
                body: imgObject,
            });
        })
        .then(() => {
            openview(id)
        })
}




// view => delete



function canceldelete() {
    let variable = document.getElementById('deleat_emplayee')
    variable.style.visibility = "hidden";
    let back = document.getElementById('overlay')
    back.style.display = "none";

}

let DLT = document.getElementById('delete')
DLT.addEventListener("click", () => {
    confirmDelete(id);
})


function opendelete(id) {
    let variable = document.getElementById('deleat_emplayee')
    variable.style.visibility = "visible";
    let back = document.getElementById('overlay')
    back.style.display = "unset";

}
function confirmDelete(id) {
    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'apllication/json',
        }
    })
        .then((response) => {
            return response.json
        })
        .then((data) => {
            console.log("delete");
        })
        
}

// popup  img

function img_popup() {
    let view_popup_img = document.getElementById('view_popup_img')
    view_popup_img.style.display = "block"
    let back = document.getElementById('overlay')
    back.style.display = "unset";
}



// validation

function addFormValidation() {
    const salutation = document.getElementById("add_select").value.trim();
    const firstName = document.getElementById("add_firstName").value.trim();
    const lastName = document.getElementById("add_secondName").value.trim();
    const email = document.getElementById("add_email").value.trim();
    const phone = document.getElementById("add_number").value.trim();
    const address = document.getElementById("add_address").value.trim();
    const country = document.getElementById("add_country").value.trim();
    const state = document.getElementById("add_State").value.trim();
    const city = document.getElementById("add_city").value.trim();
    const pin = document.getElementById("add_pin").value.trim();
    const username = document.getElementById("add_username").value.trim();
    const password = document.getElementById("add_password").value.trim();
    const qualifications = document.getElementById("add_qualification").value.trim();

    // DOB

    const dob = document.getElementById("add_dob")
    const addDovValidation = document.getElementById('erroradd_dob')
    const dobvalue = dob.value.trim();

    const gender = document.querySelector('input[name="add_gender"]:checked')
    const addGenderValidation = document.getElementById('erroradd_gender')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^\d{10}$/
    const namePattern = /^[A-Za-z]+$/

    let valid = true;

    // validating DOB and Gender

    if (gender) {
        addGenderValidation.textContent = ""

    }
    else {
        addGenderValidation.textContent = "* please select gender"
        valid = false
    }

    if (dobvalue === "") {
        addDovValidation.textContent = "* please select Date of Birth"
        valid = false
    }

    // validating rest

    if (!phonePattern.test(phone)) {
        document.getElementById('erroradd_number').textContent = "* phone number should contain 10n digits"
        valid = false
    }

    if (!emailPattern.test(email)) {
        document.getElementById('erroradd_email').textContent = "* Invalid email"
        valid = false
    }

    if (!namePattern.test(firstName)) {
        document.getElementById('erroradd_firstName').textContent = "* please enter first name"
        valid = false
    }

    if (!namePattern.test(lastName)) {
        document.getElementById('erroradd_secondName').textContent = "* please enter last name"
        valid = false
    }

    if (password == "") {
        document.getElementById('erroradd_password').textContent = "* please enter password"
        valid = false
    }

    if (salutation == "" || salutation == "select") {
        document.getElementById('erroradd_select').textContent = "* saluration is needed"
        valid = false
    }

    if (username == "") {
        document.getElementById('erroradd_username').textContent = "* username is needed"
        valid = false
    }

    if (address == "") {
        document.getElementById('erroradd_address').textContent = "* address is needed"
        valid = false
    }

    if (qualifications == "") {
        document.getElementById('erroradd_qualification').textContent = "* qualification is needed"
        valid = false

    }

    if (country == "" || country == "select") {
        document.getElementById('erroradd_country').textContent = "* country is needed"
        valid = false
    }

    if (state == "" || state == "select") {
        document.getElementById('erroradd_State').textContent = "* state is needed"
        valid = false
    }

    if (city == "" || city == "select") {
        document.getElementById('erroradd_city').textContent = "* city is needed"
        valid = false
    }

    if (pin == "") {
        document.getElementById('erroradd_pin').textContent = "* pin is needed"
        valid = false
    }

    // validation text event

    document.getElementById('newEmployee').addEventListener('input', (event) => {
        inputId = event.target.id;
        const errorId = `error${inputId}`;
        console.log("error id is ", errorId);
        document.getElementById(errorId).textContent = "";
    })

    // gender validation

    const male = document.getElementById("editMale")
    const female = document.getElementById("editFemale")
    const others = document.getElementById("editothers")


    male.addEventListener("click", () => {
        document.getElementById("editGenderError").textContent = "";
    })

    female.addEventListener("click", () => {
        document.getElementById("editGenderError").textContent = "";
    })

    others.addEventListener("click", () => {
        document.getElementById("editGenderError").textContent = "";
    })

    return valid;
}

