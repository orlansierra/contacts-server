const fromCreate = document.querySelector("#form-create");
const inputCreate = document.querySelector("#create-input");
const notificacion = document.querySelector(".notification");
const fromLogin = document.querySelector("#form-login");
const inputCreateLogin = document.querySelector("#login-input");

fromLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/user", { method: "GET" });
  const users = await response.json();
  const user = users.find((user) => user.username === inputCreateLogin.value);

  if (!user) {
    notificacion.innerHTML = "El usuario no existe, crea uno :)";
    notificacion.classList.add("show-notification");
    setTimeout(() => {
      notificacion.classList.remove("show-notification");
    }, 1000);
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "../contacts/index.html";
  }
});

fromCreate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/user", { method: "GET" });
  const users = await response.json();
  const user = users.find((user) => user.username === inputCreate.value);

  if (inputCreate.value === "") {
    notificacion.innerHTML = "El campo usuario no puede estar vacío";
    notificacion.classList.add("show-notification");
    setTimeout(() => {
      notificacion.classList.remove("show-notification");
    }, 2000);
  } else if (user) {
    notificacion.innerHTML = "El usuario ya existe :)";
    notificacion.classList.add("show-notification");
    setTimeout(() => {
      notificacion.classList.remove("show-notification");
    }, 2000);
  } else {
    await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: inputCreate.value }),
    });
    notificacion.innerHTML = `El usuario usuario ${inputCreate.value} ha sido creado:)`;
    notificacion.classList.add("show-notification");
    setTimeout(() => {
      notificacion.classList.remove("show-notification");
    }, 2000);
  }
  inputCreate.value = "";
});
