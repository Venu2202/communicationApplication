// Get the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get("id"));

// Retrieve users from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find((user) => user.id === userId);

// Populate the form fields if the user is found
if (user) {
  document.getElementById("fullname").value = user.fullname || "";
  document.getElementById("email").value = user.email || "";
}

// Handle form submission to update user details
document.getElementById("editUserForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get updated values from the form
  const updatedFullname = document.getElementById("fullname").value;
  const updatedEmail = document.getElementById("email").value;

  // Update user details in the users array
  if (updatedFullname && updatedEmail) {
    user.fullname = updatedFullname;
    user.email = updatedEmail;

    // Save updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("User details updated successfully!");
    window.location.href = "userList.html"; // Redirect back to user list
  }
});
