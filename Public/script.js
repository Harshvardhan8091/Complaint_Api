async function submitComplaint() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;

  if (!name || !email || !subject || !description) {
    alert("All fields required");
    return;
  }

  const res = await fetch("/complaints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, description })
  });

  const data = await res.json();

  document.getElementById("message").innerText =
    "Complaint submitted. ID: " + data.id;

  document.querySelectorAll("input, textarea").forEach(i => i.value = "");
}


async function loadComplaints() {
  const res = await fetch("/complaints");
  const complaints = await res.json();

  const list = document.getElementById("complaintList");
  if (!list) return;

  let total = complaints.length;
  let pending = 0, resolved = 0, rejected = 0;

  list.innerHTML = "";

  complaints.forEach(c => {
    if (c.status === "pending") pending++;
    if (c.status === "resolved") resolved++;
    if (c.status === "rejected") rejected++;

    const div = document.createElement("div");
div.className = `complaint ${c.status}`;


    div.innerHTML = `
      <p><b>ID:</b> ${c.id}</p>
      <p><b>Name:</b> ${c.name}</p>
      <p><b>Email:</b> ${c.email}</p>
      <p><b>Subject:</b> ${c.subject}</p>
      <p><b>Description:</b> ${c.description}</p>
      <p><b>Status:</b> ${c.status}</p>

      <div class="complaint-actions">
  <select onchange="updateStatus(${c.id}, this.value)">
    <option value="pending" ${c.status === "pending" ? "selected" : ""}>pending</option>
    <option value="resolved" ${c.status === "resolved" ? "selected" : ""}>resolved</option>
    <option value="rejected" ${c.status === "rejected" ? "selected" : ""}>rejected</option>
  </select>

  <button class="delete" onclick="deleteComplaint(${c.id})">
    Delete
  </button>
</div>

    `;

    list.appendChild(div);
  });

  

  document.getElementById("total").innerText = total;
  document.getElementById("pending").innerText = pending;
  document.getElementById("resolved").innerText = resolved;
  document.getElementById("rejected").innerText = rejected;
}


async function updateStatus(id, status) {
  await fetch(`/complaints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  loadComplaints();
}

async function deleteComplaint(id) {
  await fetch(`/complaints/${id}`, {
    method: "DELETE"
  });

  loadComplaints();
}

function goToAdmin() {
  window.location.href = "admin.html";
}

function goToUser() {
  window.location.href = "index.html";
}


loadComplaints();
