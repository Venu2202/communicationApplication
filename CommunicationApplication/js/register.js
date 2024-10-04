// Add an event listener for the form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve values from the input fields
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation for empty fields
    if (!fullname || !email || !password || !confirmPassword) {
      alert("All fields are mandatory."); // Alert if any field is empty
      return;
    }

    // Email validation using a regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid Email"); // Alert if the email format is invalid
      return;
    }

    // Password validation for minimum length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long."); // Alert if the password is too short
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match."); // Alert if the passwords do not match
      return;
    }

    // Check if user already exists in local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      alert("User with this email already exists."); // Alert if the user already exists
      return;
    }

    // Register new user
    const newUserId = users.length ? users[users.length - 1].id + 1 : 1; // Generate a new user ID
    users.push({ id: newUserId, fullname, email, password }); // Add the new user to the array
    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users array to local storage

    // Redirect to success page after registration
    window.location.href = "registerSuccess.html"; // Navigate to the registration success page
  });
