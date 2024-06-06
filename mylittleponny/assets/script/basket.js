let baskett_box = document.querySelector(".baskett_box");
let basketArr = [];
let arrLocalFav = JSON.parse(localStorage.getItem("basket"));
let baskett = document.querySelector(".baskett");
let container = document.querySelector(".basket_container");
let sum = 0;
let basketsub = document.querySelector(".basketcount");
let wishsub = document.querySelector(".wishcount");
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

if (arrLocalFav) {
  basketArr = arrLocalFav;
}

function render() {
  basketArr.forEach((element) => {
    baskett_box.innerHTML += `
           <div id="${ element.price * element.count}" class="baskett_item">
              <div class="baskett_image">
                  <img src="${element.imageLink}" alt="">
                </div>
                <div class="baskett_name">
                            <h3>${element.name}</h3>
                </div>
                <div class="baskett_price">
                <p><b>Price:</b> ${element.price} $</p>
              </div>
                <div class="baskett_count">
                <p>Quantity:</p>
                <form>

                  <input style="border:none; width:10px; font-weight:700;" class="quantity" value="${
                    element.count
                  }">
                  </form>
            
              </div>
                
               

                <div id="${element.price * element.count}" class="basket_total_price"><b>TotalPrice</b>: ${
                  element.price * element.count
                }$</div>
                <button id="${element.id}" class="basket_increase">-</button>
                <button id="${element.id}" class="baseket_decrease">+</button>

               
                <div class="baskett_delete_from_fav" >
                  <i   id="${
                    element.id
                  }"  class="fa-solid fa-trash deleteButton "></i>
                </div>
              </div>
    `;

    addFunctions();
    sum += element.price * element.count;
  });
}
render();
baskett.innerHTML += `
<div class="total_price">
<p class="total_change" >Total:${sum.toFixed(2)}$</p>
<button class="order_button">Order</button>
</div>`;

let totalChange = document.querySelector(".total_change");

// Remove=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
let baskett_delete_from_fav = document.querySelector(
  ".baskett_delete_from_fav"
);


// ARTIRMAQ=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-
let basketIncrease = document.querySelectorAll(".basket_increase");
let baseketDecrease = document.querySelectorAll(".baseket_decrease");
baseketDecrease.forEach((btn,index) => {
  btn.addEventListener("click", function () {
    let productcount = ++btn.parentElement.children[3].children[1].children[0]
      .value;

    // console.log(basketArr[btn.id]);
    // console.log(btn.id);
    // console.log(btn.id-3);
    basketArr[index].count = productcount;



    btn.previousElementSibling.previousElementSibling.innerHTML = `<b>TotalPrice</b>: ${
     ( productcount * arrLocalFav[index].price).toFixed(2)
    }$`;
    priceRender()
    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
})
// for (let btn of baseketDecrease) {
 
// }
// AZALTMAQ=-=-=-=-=-=---=-=-=-=-=-=-=-=-=-
basketIncrease.forEach((btn,index) => {
  btn.addEventListener("click", function () {


    if (basketArr[index].count == 1) {
      localStorage.setItem("basket", JSON.stringify(basketArr));
    }
    else{
      let productcount = --btn.parentElement.children[3].children[1].children[0]
      .value;

    // console.log(basketArr[btn.id]);
    // console.log(btn.id);
    // console.log(btn.id-3);
    basketArr[index].count = productcount;


    btn.previousElementSibling.innerHTML = `<b>TotalPrice</b>: ${
   (productcount * arrLocalFav[index].price).toFixed(2)
    }$`;
    }
   priceRender();

    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
})



// Remove=-=-=-=-=-==-=--=-=-=--=-=-=-=-=-=-=-=-
function addFunctions() {
  let basketDelete = document.querySelectorAll(".deleteButton");

  basketDelete.forEach((heartdel) => {



    heartdel.addEventListener("click", function () {
    

      Swal.fire({
        icon: "success",
        title: "removed",
        showConfirmButton: false,
        timer: 1500,
      });
      basketArr = basketArr.filter((element) => element.id != heartdel.id);
      heartdel.parentElement.parentElement.remove();

      priceRender();

      localStorage.setItem("basket", JSON.stringify(basketArr));

      render();
    });
  // console.log(   totalChange.textContent = 0);
   
  });
  


}
addFunctions();
function priceRender(){
  let sum = 0;
  basketArr.forEach(item => {
    sum += item.count * item.price;
  })
  totalChange.textContent = `ToTal:$${sum.toFixed(2)}`;
}
priceRender();
// Sub Count=-=-=-=-=-=-=--

let basketlength = JSON.parse(localStorage.getItem("basket"));
basketsub.textContent = basketlength != null ? basketlength.length : 0;


// Order Button-=-=---=-=-=--=-=-=-=-=-=-=-=
let total_price = document.querySelector(".total_price");
let basketItem = document.querySelectorAll(".baskett_item");

basketItem.forEach((element) => {
  let userArr = JSON.parse(localStorage.getItem("user"));
  console.log(userArr);

  let orders = [];
  let order_button = document.querySelector(".order_button");
  order_button.addEventListener("click", function () {
    if (userArr.isLogged == true) {
      if (userArr.balance > sum) {
        userArr.balance = userArr.balance - sum;
        // userArr.orders.push();

        element.remove();
        basketArr = [];
        total_price.innerText = "ToTal:0$";
        localStorage.setItem("basket", JSON.stringify(basketArr));
        localStorage.setItem("user", JSON.stringify(userArr));
        fetch("http://localhost:3000/users/" + `${userArr.userID}`)
          .then((res) => res.json())
          .then((data) => {
            fetch("http://localhost:3000/users/" + `${userArr.userID}`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "PATCH",
              body: JSON.stringify({
                balance: userArr.balance,
                orders: [
                 data.orders,
                  {
                    total_price: sum,
                    order_date: new Date(),
                    id: Math.random().toString(30).slice(2),
                  },
                ],
                // HELP-==-=-=-=-=-=-=-=-=-
              }),
            });
          });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ordered",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",

          text: "Balance is not enough",
        });
      }
    } else {
      window.location.href = "login.html";
    }
  });
// RemoveAll=--==-=-=-=-=--=-=-=-=-=

  let removeAll = document.querySelector(".remove_all");
  removeAll.addEventListener("click", function () {
    //  baskett_box.innerHTML = `sadasd`;
    Swal.fire({
      icon: "success",
      title: "All removed",
      showConfirmButton: false,
      timer: 1500,
    });
    element.remove();
    total_price.innerText = "ToTal:0$";
    basketArr = [];
    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
});
