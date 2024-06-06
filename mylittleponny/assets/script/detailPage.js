let id = new URLSearchParams(location.search).get("id");

let userArr = JSON.parse(localStorage.getItem("user"));

let nav_login_register_buttons = document.querySelector(
  ".nav_login_register_buttons"
);
if (userArr.isLogged == true) {
  nav_login_register_buttons.innerHTML = `
    <div class="profile_button"><a href="profile.html">Profile</a></div>
    <a href="login.html"><i  class="fa-solid fa-right-from-bracket logout"></i></a>
    `;
}
console.log(id);
let cards = document.querySelector(".cards");
fetch("http://localhost:3000/singers")
  .then((res) => res.json())
  .then((data) => {
    let element = data.find((element) => element.id == id);
    cards.innerHTML = `
   <div class="detailCard">
                    <div class="card_image">
                      <img
                        src=${element.imageLink}
                        alt=""
                      />
                    </div>
                    <div class="card_text">
                      <div class="card_title"><h3>${element.name}</h3></div>
                      <div class="card_description"><p>${element.name} is ${element.nationality} </p></div>
                      <div class="age"><p>Age: ${element.age}</p></div>
                      <div class="genre"><p>Genre: ${element.genre}</p></div>

                    </div>
                    <div class="card_buttons">
                     <a href="./index.html">
                     <button class="home">Home</button>
                     
                     </a>
                    </div>
                  </div>
   `;
  });

