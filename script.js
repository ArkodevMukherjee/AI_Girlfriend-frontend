const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const form = document.getElementById("auth-form");
const errorP = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await authenticate("login");
});

signupBtn.addEventListener("click", async () => {
  await authenticate("register");
});

async function authenticate(endpoint) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log(password)

  const res = await fetch(`https://luna-girlfriend-ai-friend-dqesh3azdja6frbt.canadacentral-01.azurewebsites.net/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  console.log(data)
  if (res.ok) {
    localStorage.setItem("token", data.access_token);
    window.location.href = "chat.html";
  } else {
    errorP.textContent = data.msg || "Login/Signup failed.";
  }
}

