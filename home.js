// Redirect to login if not logged in, and show welcome message
function Overlay() {
  // Check if overlay already exists
  if (document.getElementById('overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.className = 'overlay';

  const content = document.createElement('div');
  content.className = 'overlay-content';
  content.innerHTML = `
      <p class="text12">Add Contact</p>

    

      <div class="form-row">
          <p class="text13">Full name of contact:</p>
          <input class="place-Fname" id="fullName" type="text" placeholder="Full Name">
      </div>
      <div class="form-row">
          <p class="text13">Email:</p>
          <input class="place-Fname" id="email" type="email" placeholder="Email">
      </div>
      <div class="form-row">
          <p class="text13">Phone Number:</p>
          <input class="place-Fname" id="phone" type="text" placeholder="Phone Num.">
      </div>
      <div class="form-row">
          <p class="text13">Company / School:</p>
          <input class="place-Fname" id="company" type="text" placeholder="Company / School">
      </div>
      <div class="form-row">
          <p class="text13">Notes:</p>
          <input class="place-Fname" id="notes" type="text" placeholder="">
      </div>
      <button class="save-contact-btn" onclick="handleContactFormSubmit(event)">Save Contact</button>
      <button class="close-ovrl-btn" onclick="document.body.removeChild(document.getElementById('overlay'))">Close</button>
  
      `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);
}

document.addEventListener("DOMContentLoaded", () => {
  // login check and welcome message setup can go here if needed
});


function handleContactFormSubmit(event) {
  event.preventDefault();

  const fullName = getInputValue("#fullName");
  const email = getInputValue("#email");
  const phone = getInputValue("#phone");
  const company = getInputValue("#company");

  if (isFormValid(fullName, email, phone, company)) {
    // Only save contact; do not set loggedInUser or redirect
    saveContact();
  } else {
    alert("Please fill out all contact fields.");
  }
}

function getInputValue(selector) {
  const input = document.querySelector(selector);
  return input ? input.value.trim() : "";
}

function isFormValid(fullName, email, phone, company) {
  return fullName !== "" && email !== "" && phone !== "" && company !== "";
}

function loadContacts() {
  const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  savedContacts.forEach(contact => renderContact(contact));
}

function renderContact({ fullName, email, phone, company, notes }) {
  const contactDisplay = document.getElementById("contactDisplay");

  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-card";
  contactInfo.innerHTML = `
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company/School:</strong> ${company}</p>
    <p><strong>Notes:</strong> ${notes}</p>
    <button class="delete-contact-btn">Delete contact</button>
    <hr>
  `;

  contactInfo.querySelector(".delete-contact-btn").addEventListener("click", () => {
  contactInfo.remove();
  removeContactFromStorage(fullName); // this works now
});

  contactDisplay.appendChild(contactInfo);
}
function saveContact(redirectAfterSave = false) {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;
  const notes = document.getElementById('notes').value;

  const newContact = { fullName, email, phone, company, notes };

  const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");

  savedContacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(savedContacts));

  renderContact(newContact);
  document.body.removeChild(document.getElementById('overlay'));

  if (redirectAfterSave) {
    window.location.href = "home.html";
  }
}
function removeContactFromStorage(nameToRemove) {
  let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts = contacts.filter(contact => contact.fullName !== nameToRemove);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
window.onload = () => {
  loadContacts();
};
