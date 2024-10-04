// Retrieve users from local storage or initialize as an empty array
let users = JSON.parse(localStorage.getItem("users")) || [];
// Retrieve the currently logged-in user from local storage
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Function to navigate to the edit user page with the specified user ID
const editUser = (id) => {
  const user = users.find((user) => user.id === id); // Find the user by ID
  if (user) {
    window.location.href = `manageUser.html?id=${id}`; // Redirect to manageUser.html with user ID
  }
};

// Function to delete a user and their associated documents and chat messages
const deleteUser = (id) => {
  // Confirm deletion from the user
  if (
    confirm(
      "Are you sure you want to delete this user? This will also delete all their documents and chat messages."
    )
  ) {
    try {
      // Delete user
      users = users.filter((user) => user.id !== id); // Remove user from the users array
      localStorage.setItem("users", JSON.stringify(users)); // Update local storage with the new users array

      // Delete user's documents
      let documents = JSON.parse(localStorage.getItem("Documents")) || [];
      const initialDocCount = documents.length; // Store the initial document count
      documents = documents.filter((doc) => doc.userId !== id); // Filter out documents belonging to the user
      localStorage.setItem("Documents", JSON.stringify(documents)); // Update local storage
      const deletedDocCount = initialDocCount - documents.length; // Calculate deleted document count

      // Delete user's chat messages
      let chats = JSON.parse(localStorage.getItem("chats")) || [];
      const initialChatCount = chats.length; // Store the initial chat count
      chats = chats.filter((chat) => chat.id !== id); // Filter out chat messages belonging to the user
      localStorage.setItem("chats", JSON.stringify(chats)); // Update local storage
      const deletedChatCount = initialChatCount - chats.length; // Calculate deleted chat count

      // Refresh the user list display
      displayUsers();
      // Alert the user of the successful deletion and counts of deleted items
      alert(
        `User deleted successfully.\nDeleted ${deletedDocCount} document(s) and ${deletedChatCount} chat message(s).`
      );
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error during user deletion:", error);
      alert("An error occurred while deleting the user. Please try again.");
    }
  }
};

// Function to display the list of users in a table format
const displayUsers = () => {
  const userTableBody = document.getElementById("userTableBody"); // Get the table body element
  userTableBody.innerHTML = ""; // Clear existing table rows

  // Iterate over the users array to create table rows
  users.forEach((user) => {
    const row = document.createElement("tr"); // Create a new table row
    row.innerHTML = `
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>
                <div class="action-btns">
                    <a href="#" onclick="editUser(${user.id})">Edit</a>
                    ${
                      user.id !== loggedInUser.id
                        ? `<span>|</span><a href="#" class="delete" onclick="deleteUser(${user.id})">Delete</a>`
                        : ""
                    }
                </div>
            </td>
        `;
    userTableBody.appendChild(row); // Append the new row to the table body
  });
};

// Call the displayUsers function to initially populate the user table
displayUsers();
