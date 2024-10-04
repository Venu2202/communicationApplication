// Function to check if user is logged in
function checkAuth() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "Login.html"; // Redirect to login page if not logged in
  }
}

// Run the check when the page loads
checkAuth();
