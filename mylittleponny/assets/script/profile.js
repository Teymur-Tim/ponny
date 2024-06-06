let aboutProfile = document.querySelector(".about_profile");
let userArr = JSON.parse(localStorage.getItem("user"));
let basketsub = document.querySelector(".basketcount");
let profileName = document.querySelector(".profile_username");
let profileEmail = document.querySelector(".profile_email");
let profileMoney = document.querySelector(".money")


let basketlength = JSON.parse(localStorage.getItem("basket"));
basketsub.textContent = basketlength != null ? basketlength.length : 0;
console.log(userArr);
profileName.innerHTML = `<h1>User:${userArr.username}</h1>`;
profileEmail.innerHTML = `<h1>Email:${userArr.email}</h1>`;
profileMoney.innerHTML = `<h1>Balance:${userArr.balance}$</h1>`;

let products = document.querySelector(".products");
let nav_login_register_buttons = document.querySelector(
  ".nav_login_register_buttons"
);
if (userArr.isLogged == true) {
  nav_login_register_buttons.innerHTML = `
    <div class="profile_button"><a href="profile.html">Profile</a></div>
    <a href="login.html"><i  class="fa-solid fa-right-from-bracket logout"></i></a>
    `;
}
console.log(userArr.orders[0].orders[0].total_price);
let profile_basket_info = document.querySelector(".products");
console.log(userArr);
userArr.orders[0].orders.forEach((element) => {
  profile_basket_info.innerHTML += `
<div class="product">

<div class="product_name">
<p> Id:${element.id}</p>
</div>
<div class="product_price">
 <p>TotalPrice: ${element.total_price}$</p>
  
</div>
</div>
`;
});
