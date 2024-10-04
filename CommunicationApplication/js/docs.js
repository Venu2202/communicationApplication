// Array to hold uploads data from localStorage
let uploads = JSON.parse(localStorage.getItem("Documents")) || [];
let editingIndex = -1;

// Function to get the logged-in user's ID
const getLoggedInUserId = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return loggedInUser ? loggedInUser.id : null;
};

// Function to check if a label already exists
const labelExists = (label, excludeIndex = -1) => {
  return uploads.some(
    (upload, index) =>
      index !== excludeIndex &&
      upload.label.toLowerCase() === label.toLowerCase()
  );
};

// Render the uploads table
const renderUploads = () => {
  const uploadsTable = document.getElementById("uploadsTable");
  uploadsTable.innerHTML = "";
  uploads.forEach((upload, index) => {
    uploadsTable.innerHTML += `
      <tr>
        <td>${upload.label}</td>
        <td>${upload.fileName}</td>
        <td class="action-btns">
          <a class="edit-btn" onclick="openEditModal(${index})">Edit</a>
          <span>|</span>
          <a class="delete-btn" onclick="confirmDelete(${index})">Delete</a>
        </td>
      </tr>
    `;
  });
};

// Open the upload modal
const openUploadModal = () => {
  document.getElementById("uploadModal").style.display = "flex";
};

// Close the upload modal
const closeUploadModal = () => {
  document.getElementById("uploadModal").style.display = "none";
  document.getElementById("fileLabel").value = ""; // Clear input field
  document.getElementById("fileInput").value = ""; // Clear file input
  document.getElementById("fileNameDisplay").textContent = ""; // Clear file name display
};

// Display selected file name
const displayFileName = () => {
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  fileNameDisplay.textContent =
    fileInput.files.length > 0 ? fileInput.files[0].name : "No file chosen";
};

// Add a new upload at the top of the table
const addUpload = () => {
  const fileLabel = document.getElementById("fileLabel").value.trim();
  const fileInput = document.getElementById("fileInput");
  if (!fileLabel && fileInput.files.length === 0) {
    alert("No label input and no file uploaded");
    return;
  } else if (!fileLabel) {
    alert("Please enter a label.");
    return;
  } else if (fileInput.files.length === 0) {
    alert("Please choose a file.");
    return;
  }

  if (labelExists(fileLabel)) {
    alert("This label already exists. Please choose a unique label.");
    return;
  }

  const fileName = fileInput.files[0].name;
  const userId = getLoggedInUserId();

  if (!userId) {
    alert("No user is currently logged in.");
    return;
  }

  // Save upload details to local storage
  uploads.unshift({ userId, label: fileLabel, fileName: fileName }); // Add to the top
  localStorage.setItem("Documents", JSON.stringify(uploads));

  // Close modal and re-render table
  closeUploadModal();
  renderUploads();
};

// Open the edit modal
const openEditModal = (index) => {
  editingIndex = index;
  const upload = uploads[index];
  document.getElementById("editLabel").value = upload.label;
  document.getElementById("editModal").style.display = "flex";
};

// Close the edit modal
const closeEditModal = () => {
  document.getElementById("editModal").style.display = "none";
};

// Save the edited label
const saveEdit = () => {
  const newLabel = document.getElementById("editLabel").value.trim();
  if (newLabel) {
    if (labelExists(newLabel, editingIndex)) {
      alert("This label already exists. Please choose a unique label.");
      return;
    }
    uploads[editingIndex].label = newLabel;
    localStorage.setItem("Documents", JSON.stringify(uploads));
    renderUploads();
    closeEditModal();
  } else {
    alert("Label cannot be empty.");
  }
};

// Confirm and delete an upload
const confirmDelete = (index) => {
  const confirmation = confirm("Are you sure you want to delete this upload?");
  if (confirmation) {
    deleteUpload(index);
  }
};

// Delete an upload
const deleteUpload = (index) => {
  uploads.splice(index, 1);
  localStorage.setItem("Documents", JSON.stringify(uploads));
  renderUploads();
};

// Initial render
renderUploads();
