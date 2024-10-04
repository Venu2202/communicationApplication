// Get logged-in user
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const loggedInUserElement = document.getElementById("loggedInUser");

if (loggedInUser) {
  loggedInUserElement.textContent = loggedInUser.fullname; // Display logged-in user's name
} else {
  // Redirect to the login page if not logged in
  window.location.href = "Login.html"; // Change to your login page path
}

// Load chat messages from localStorage
const loadChat = () => {
  const chats = JSON.parse(localStorage.getItem("chats")) || [];
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML = ""; // Clear existing messages

  chats.forEach((chat) => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<small class="text-muted">[${chat.timestamp}]</small> <strong>${chat.sender}:</strong> ${chat.message}`;
    chatMessages.appendChild(messageElement);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
};

// Load chat history on page load
window.onload = () => {
  loadChat();
};

// Function to send a message and store it in localStorage
document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("chatMessage");
  const message = messageInput.value.trim();
  if (message && loggedInUser) {
    addChatMessage(loggedInUser.fullname, message, loggedInUser.id);
    messageInput.value = "";
  }
});

// Refresh button to load chat and clear input field
document.getElementById("refreshChat").addEventListener("click", () => {
  loadChat();
  document.getElementById("chatMessage").value = ""; // Clear the input field
});

// Function to add a chat message
const addChatMessage = (sender, message, userId) => {
  const chats = JSON.parse(localStorage.getItem("chats")) || [];
  const newChat = {
    chatId: Date.now(),
    id: userId,
    sender: sender,
    message: message,
    timestamp: new Date().toLocaleString(),
  };
  chats.push(newChat);
  localStorage.setItem("chats", JSON.stringify(chats));
  loadChat(); // Load the chat after adding a new message
};
