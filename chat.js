const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html"; // not logged in
}

// Optional: store messages locally
let messages = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage("user", userMsg);
  input.value = "";

  const response = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message: userMsg }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data.respone)
    appendMessage("luna", data.response);
  } else {
    appendMessage("luna", "Error: " + (data.msg || "Something went wrong."));
  }
});



function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
