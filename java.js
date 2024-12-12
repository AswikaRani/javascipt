// storing the fetched data as array on a variable
let rank = [];

// fetching data from the API
fetchData();
function fetchData() {
  fetch("http://localhost:3000/employees")
    .then((data) => {
      return data.json();
    })
    .then((empData) => {
      rank = empData.reverse();
      displayTablerows();
    });
}

function displayTablerows() {
  let tabledata = "";
  rank.map((values) => {
    tabledata += `<tr>
          <td></td>
          <td><img class="view_avatar" src="http://localhost:3000/employees/${values.id}/avatar" >
          ${values.salutation} ${values.firstName} ${values.lastName}</td>
          <td>${values.email}</td>
          <td>${values.phone}</td>
          <td>${values.gender}</td>
          <td>${values.dob}</td>
          <td>${values.country}</td>
          <td>             
              <div class="dropdown" >
                 <button id="edit"  class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span class="material-symbols-outlined">
                      more_horiz
                      </span>  
                  </button>
                  <ul class="dropdown-menu">
                      <li><a onclick="openview('${values.id}')" href="info.html?id=${values.id}">View Details</a></li>
                      <li><a onclick="openedit('${values.id}')" >Edit</a></li>
                      <li><a onclick="opendelete('${values.id}')">Delete</a></li>
                  </ul>
              </div>
          </td>
          </tr>`;
  });
  document.getElementById("tbody_table").innerHTML = tabledata;
}

// to open add element form
function openForm() {
  let variable = document.getElementById("newEmployee");
  variable.style.visibility = "visible";
  let btn = document.getElementById("add_employee");
  btn.style.display = "unset";
  let head = document.getElementById("add_head");
  head.style.display = "unset";
  let editbtn = document.getElementById("edit_head");
  editbtn.style.display = "none";
  let edithead = document.getElementById("save_change");
  edithead.style.display = "none";
  let back = document.getElementById("overlay");
  back.style.display = "unset";
  let uplod = document.getElementById("upload");
  uplod.style.display = "block";
  let change = document.getElementById("change_avatar");
  change.style.display = "none";
  let cng_btn = document.getElementById("change_btn");
  cng_btn.style.display = "none";
  let div_add_img = document.getElementById("div_add_img");
  div_add_img.style.display = "none";
  clearInput();
}

// to clear all the inputes and validation text content
function clearInput() {
  document.getElementById("add_select").value = "select";
  document.getElementById("add_firstName").value = "";
  document.getElementById("add_secondName").value = "";
  document.getElementById("add_email").value = "";
  document.getElementById("add_number").value = "";
  document.getElementById("add_dob").value = "";
  const radioButtons = document.querySelectorAll('input[name="add_gender"]');
  document.getElementById("add_username").value = "";
  document.getElementById("add_password").value = "";
  document.getElementById("add_qualification").value = "";
  document.getElementById("add_address").value = "";
  document.getElementById("add_country").value = "select";
  document.getElementById("add_State").value = "select";
  document.getElementById("add_city").value = "";
  document.getElementById("add_pin").value = "";

  radioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });

  document.getElementById("erroradd_dob").textContent = "";
  document.getElementById("errorGender").textContent = "";
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

// closing delete and employe form while clicking on the overlay
function overlay() {
  let newEmployee = document.getElementById("newEmployee");
  newEmployee.style.visibility = "hidden";
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  let deleat_emplayee = document.getElementById("deleat_emplayee");
  deleat_emplayee.style.visibility = "hidden";
}

// closing delete and employe form while clicking on the cancel or on the close mark
function closetag() {
  let variable = document.getElementById("newEmployee");
  variable.style.visibility = "hidden";
  let back = document.getElementById("overlay");
  back.style.display = "none";
  let uplod = document.getElementById("upload");
  uplod.style.display = "none";
}

// to add the details if the validation is finished
let add_employee = document.getElementById("add_employee");
add_employee.addEventListener("click", () => {
  const validations = FormValidation();
  if (!validations) {
    return;
  } else {
    closetag();
    addEmployee();
    showPopupToAdd();
  }
});

// to get the input and store it as data
function addEmployee() {
  const salutation = document.getElementById("add_select").value;
  const firstName = document.getElementById("add_firstName").value;
  const lastName = document.getElementById("add_secondName").value;
  const email = document.getElementById("add_email").value;
  const phone = document.getElementById("add_number").value;
  const dob = document.getElementById("add_dob").value;
  console.log(dob);
  
  const gender = document.querySelector(
    'input[name="add_gender"]:checked'
  ).value;
  const username = document.getElementById("add_username").value;
  const password = document.getElementById("add_password").value;
  const qualifications = document.getElementById("add_qualification").value;
  const address = document.getElementById("add_address").value;
  const country = document.getElementById("add_country").value;
  const state = document.getElementById("add_State").value;
  const city = document.getElementById("add_city").value;
  const pin = document.getElementById("add_pin").value;

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
  };
  console.log(newData);
  postData(newData);
}

// posting the data
function postData(newData) {
  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      fetchData();
    });
}

// to show a popup msg if the validtion is correct
function showPopupToAdd() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.opacity = "1";
    document.querySelector(".tick-mark").style.opacity = "1";
  }, 10);
  setTimeout(hidePopup, 2000);
}

// to hide the popup after 2 sec
function hidePopup() {
  let popup = document.getElementById("popup");
  popup.style.opacity = "0";
  document.querySelector(".tick-mark").style.opacity = "0";
  setTimeout(function () {
    popup.style.display = "none";
  }, 300);
}

//to make the form valid to use
function FormValidation() {
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
  const qualifications = document
    .getElementById("add_qualification")
    .value.trim();

  // DOB

  const dob = document.getElementById("add_dob");
  const addDovValidation = document.getElementById("erroradd_dob");
  const dobvalue = dob.value.trim();

  const gender = document.querySelector('input[name="add_gender"]:checked');
  const addGenderValidation = document.getElementById("errorGender");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z]+$/;

  let Valid = true;

  // validating DOB and Gender

  if (gender) {
    addGenderValidation.textContent = "";
  } else {
    addGenderValidation.textContent = "* please select gender";
    Valid = false;
  }

  if (dobvalue === "") {
    addDovValidation.textContent = "* please select Date of Birth";
    Valid = false;
  }

  //to display error msg of the validation

  if (!phonePattern.test(phone)) {
    document.getElementById("erroradd_number").textContent =
      "* phone number should contain 10n digits";
    Valid = false;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("erroradd_email").textContent = "* Invalid email";
    Valid = false;
  }

  if (!namePattern.test(firstName)) {
    document.getElementById("erroradd_firstName").textContent =
      "* please enter first name";
    Valid = false;
  }

  if (!namePattern.test(lastName)) {
    document.getElementById("erroradd_secondName").textContent =
      "* please enter last name";
    Valid = false;
  }

  if (password == "") {
    document.getElementById("erroradd_password").textContent =
      "* please enter password";
    Valid = false;
  }

  if (salutation == "" || salutation == "select") {
    document.getElementById("erroradd_select").textContent =
      "* saluration is needed";
    Valid = false;
  }

  if (username == "") {
    document.getElementById("erroradd_username").textContent =
      "* username is needed";
    Valid = false;
  }

  if (address == "") {
    document.getElementById("erroradd_address").textContent =
      "* address is needed";
    Valid = false;
  }

  if (qualifications == "") {
    document.getElementById("erroradd_qualification").textContent =
      "* qualification is needed";
    Valid = false;
  }

  if (country == "" || country == "select") {
    document.getElementById("erroradd_country").textContent =
      "* country is needed";
    Valid = false;
  }

  if (state == "" || state == "select") {
    document.getElementById("erroradd_State").textContent = "* state is needed";
    Valid = false;
  }

  if (city == "" || city == "select") {
    document.getElementById("erroradd_city").textContent = "* city is needed";
    Valid = false;
  }

  if (pin == "") {
    document.getElementById("erroradd_pin").textContent = "* pin is needed";
    Valid = false;
  }

  // gender validation

  const male = document.getElementById("editMale");
  const female = document.getElementById("editFemale");
  const others = document.getElementById("editothers");

  male.addEventListener("click", () => {
    document.getElementById("errorGender").textContent = "";
  });

  female.addEventListener("click", () => {
    document.getElementById("errorGender").textContent = "";
  });

  others.addEventListener("click", () => {
    document.getElementById("errorGender").textContent = "";
  });

  // to clear the text contend after inputing values

  document.getElementById("newEmployee").addEventListener("input", (event) => {
    inputId = event.target.id;
    const errorId = `error${inputId}`;
    console.log("error id is ", errorId);
    document.getElementById(errorId).textContent = "";
  });

  return Valid;
}

//to open delet section
function opendelete(id) {
  let variable = document.getElementById("deleat_emplayee");
  variable.style.visibility = "visible";
  let back = document.getElementById("overlay");
  back.style.display = "unset";

  clickToDelete(id);
}

//EventListener for clicking
function clickToDelete(id) {
  let dlt = document.getElementById("delete");
  dlt.addEventListener("click", () => {
    confirmDelete(id);
    canceldelete();
  });
}

//to close dealet section
function canceldelete() {
  let variable = document.getElementById("deleat_emplayee");
  variable.style.visibility = "hidden";
  let back = document.getElementById("overlay");
  back.style.display = "none";
}

//delecting the detailes using the id
function confirmDelete(id) {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "apllication/json",
    },
  })
    .then((response) => {
      return response.json;
    })
    .then((data) => {
      console.log("delete");
    })
    .then(() => {
      fetchData();
    });
}

// to open the edit form
function openedit(id) {
  let variable = document.getElementById("newEmployee");
  variable.style.visibility = "visible";
  let head = document.getElementById("edit_head");
  head.style.display = "unset";
  let btn = document.getElementById("save_change");
  btn.style.display = "unset";
  let addbtn = document.getElementById("add_employee");
  addbtn.style.display = "none";
  let addhead = document.getElementById("add_head");
  addhead.style.display = "none";
  let back = document.getElementById("overlay");
  back.style.display = "unset";
  let uplod = document.getElementById("upload");
  uplod.style.display = "none";
  let change = document.getElementById("change_avatar");
  change.style.display = "block";
  let cng_btn = document.getElementById("change_btn");
  cng_btn.style.display = "block";
  let div_add_img = document.getElementById("div_add_img");
  div_add_img.style.display = "none";

  editGet(id);
  clearBugOnEdit();
}

//to get the datas using the id
function editGet(id) {
  console.log(id);
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "apllication/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let editImgPreview = document.getElementById("change_avatar");
      editImgPreview.src = `http://localhost:3000/employees/${data.id}/avatar`;

      document.getElementById("add_select").value = data.salutation;
      document.getElementById("add_firstName").value = data.firstName;
      document.getElementById("add_secondName").value = data.lastName;
      document.getElementById("add_email").value = data.email;
      document.getElementById("add_number").value = data.phone;
      document.querySelector(
        `input[name="add_gender"][value='${data.gender}']`
      ).checked = true;
      document.getElementById("add_username").value = data.username;
      document.getElementById("add_password").value = data.password;
      document.getElementById("add_qualification").value = data.qualifications;
      document.getElementById("add_address").value = data.address;
      document.getElementById("add_country").value = data.country;
      document.getElementById("add_State").value = data.state;
      document.getElementById("add_city").value = data.city;
      document.getElementById("add_pin").value = data.pin;

      let originalDate = data.dob;
      let parts = originalDate.split("-");
      let reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      console.log(reversedDate);
      document.getElementById("add_dob").value = reversedDate;

      const finishValidationedit = document.getElementById("save_change");
      finishValidationedit.addEventListener("click", () => {
        const validations = FormValidation();
        if (!validations) {
          return;
        } else {
          saveChanges(id);
          closetag();
          showPopupToEdit();
        }
      });
    });
}

//to show the popup msg after editing
function showPopupToEdit() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    document.getElementById("popupMsg").textContent = "Successfully edited!";
    setTimeout(function () {
      popup.style.opacity = "1";
      document.querySelector(".tick-mark").style.opacity = "1";
    }, 10);
    setTimeout(hidePopup, 2000);
  }

//to get the edited details on the variablel
function saveChanges(id) {
  const salutation = document.getElementById("add_select").value;
  const firstName = document.getElementById("add_firstName").value;
  const lastName = document.getElementById("add_secondName").value;
  const email = document.getElementById("add_email").value;
  const phone = document.getElementById("add_number").value;
  const dob = document.getElementById("add_dob").value;
  const gender = document.querySelector(
    'input[name="add_gender"]:checked'
  ).value;
  const username = document.getElementById("add_username").value;
  const password = document.getElementById("add_password").value;
  const qualifications = document.getElementById("add_qualification").value;
  const address = document.getElementById("add_address").value;
  const country = document.getElementById("add_country").value;
  const state = document.getElementById("add_State").value;
  const city = document.getElementById("add_city").value;
  const pin = document.getElementById("add_pin").value;

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
  };
  console.log(newData);

  //to save the editded details
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then(() => {
      fetchData();
    });
}

//to clear all input and validation textcontent
function clearBugOnEdit() {
    document.getElementById("erroradd_dob").textContent = "";
    document.getElementById("errorGender").textContent = "";
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