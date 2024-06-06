let form = document.querySelector("form");
let nameInput = document.querySelector(".name");
let passwordInput = document.querySelector(".password");
let emailInput = document.querySelector(".email");
let balanceInput = document.querySelector(".balance");
let registerButton = document.querySelector(".register_submit");
let url = "http://localhost:3000/users";
let userArr = JSON.parse(localStorage.getItem("user"))

let nav_login_register_buttons = document.querySelector(".nav_login_register_buttons")
if (userArr.isLogged==true) {
    nav_login_register_buttons.innerHTML =`
    <div class="profile_button"><a href="profile.html">Profile</a></div>
    <a href="login.html"><i  class="fa-solid fa-right-from-bracket logout"></i></a>
    `
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    form.addEventListener("submit", function (e) {
      let user = {};
      e.preventDefault();
      user.username = nameInput.value;
      user.email = emailInput.value;
      user.password = passwordInput.value;
      user.balance = balanceInput.value;

      let find = data.find((x) => x.username === nameInput.value);
      if (find) {
        nameInput.value = "";

        Swal.fire({
          icon: "error",
          text: "This username already exists",
        });
      } else if (nameInput.value.length <= 3) {
        Swal.fire({
          icon: "error",
          text: "Username must be at least 4 characters long",
        });
      } else if (balanceInput.value <= 0) {
        balanceInput.value = "";

        Swal.fire({
          icon: "error",
          text: "Balance must be greater than 0",
        });
      } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordInput.value = "";

        Swal.fire({
          icon: "error",
          text: "Password must contain at least 1 capital letter",
        });
      } else {
        
        fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        })
          .then(function (res) {
            console.log(res);

            Swal.fire({
              icon: "success",
              title: "You have successfully created an account",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = "login.html";
            });
          })
          .catch(function (res) {
            console.log(res);
          });
          nameInput.value = "";
          emailInput.value = "";
          passwordInput.value = "";
          balanceInput.value = "";
      }

 
    });
  });


let basketsub = document.querySelector(".basketcount");
let wishsub = document.querySelector(".wishcount");
let basketlength = JSON.parse(localStorage.getItem("basket"));
basketsub.textContent = basketlength != null ? basketlength.length : 0;

let wishlength = JSON.parse(localStorage.getItem("wish"));
wishsub.textContent = wishlength != null ? wishlength.length : 0;
