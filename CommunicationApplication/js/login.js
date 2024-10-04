// Check if a user is already logged in
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// If user is logged in, redirect to loginSuccess.html
if (loggedInUser) {
  window.location.href = "loginSuccess.html";
}

// Add event listener for form submission
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validation for email and password
  if (!email || !password) {
    alert("Email and Password are mandatory.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged in user
    window.location.href = "loginsuccess.html"; // Redirect to user list page
  } else {
    alert("Email or Password is invalid!");
  }
});

// Function to check if user is logged in
const checkAuth = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "Login.html"; // Redirect to login page if not logged in
  }
};
