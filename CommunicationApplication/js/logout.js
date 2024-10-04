const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser && loggedInUser.email) {
  document.getElementById("email").textContent = loggedInUser.email;
}

function confirmLogout(event) {
  event.preventDefault(); // Prevent default anchor behavior
  const confirmation = window.confirm("Are you sure you want to log out?");
  if (confirmation) {
    localStorage.setItem("logoutMessage", "true"); // Set the logout message
    localStorage.removeItem("loggedInUser"); // Remove user session
    alert("You have successfully logged out.");
    window.location.href = "index.html"; // Redirect to the index page
  }
}
