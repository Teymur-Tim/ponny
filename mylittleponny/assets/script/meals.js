let cards = document.querySelector(".cards");
let mealsUrl= "http://localhost:3000/meals"
let nameInput = document.querySelector(".name")
let basketsub = document.querySelector(".basketcount")
let wishsub= document.querySelector(".wishcount")
let userArr = JSON.parse(localStorage.getItem("user"))

let nav_login_register_buttons = document.querySelector(".nav_login_register_buttons")
if (userArr.isLogged==true) {
    nav_login_register_buttons.innerHTML =`
    <div class="profile_button"><a href="profile.html">Profile</a></div>
    <a href="login.html"><i  class="fa-solid fa-right-from-bracket logout"></i></a>
    `
}

fetch(mealsUrl).then((res)=>res.json()).then((data)=>{
   nameInput.addEventListener("input",function(){
    cards.innerHTML = "";
    data.forEach(element => {
        if (element.name.toLowerCase().trim().includes(nameInput.value.toLowerCase().trim())) {
            cards.innerHTML +=`
        <div class="card  ">
        <div class="card_image">
          <img
            src=${element.imageLink}
            alt=""
          />
        </div>
        <div class="card_text">
          <div class="card_title"><h3>${element.name}</h3></div>
          <div class="card_description">Price: <b>${element.price}$</b></p></div>
        </div>
        <div class="card_buttons">
         <a href="mealDetail.html?id=${element.id}"> <button class="detail">Detail</button></a>
          <button class="basket"><i class="fa-solid fa-basket-shopping"></i></button>
        </div>
      </div>
        `
        }
      
    });
   })
})


fetch(mealsUrl).then((res)=>res.json()).then((data)=>{
    data.forEach(element => {
        cards.innerHTML +=`
        <div class="card  ">
        <div class="card_image">
          <img
            src=${element.imageLink}
            alt=""
          />
        </div>
        <div class="card_text">
          <div class="card_title"><h3>${element.name}</h3></div>
          <div class="card_description">Price: <b>${element.price}$</b></p></div>
        </div>
        <div class="card_buttons">
         <a href="mealDetail.html?id=${element.id}"> <button class="detail">Detail</button></a>
          <button id="${element.id}" class="basket add_to_basket"><i class="fa-solid fa-basket-shopping"></i></button>
        </div>
      </div>
        `
    });
    
    let basketData = JSON.parse(localStorage.getItem("basket"));
    
    let basketArr = [];
    
    if(basketData){
    basketArr=basketData
    }
    
   
    
    let add_to_basket = document.querySelectorAll(".add_to_basket");
    
    
    add_to_basket.forEach((button) => {
    
    
      button.addEventListener("click",  function() {
      // if (!basketArr.find((element) => element.id == button.id)) {
     if (!basketArr.some(element => element.id==button.id)) {
      data.find((element) => element.id == button.id).count = 1;
      basketArr.push(data.find((element) => element.id == button.id))
      Swal.fire({
        icon: 'success',
        title: 'the product was thrown into the basket',
        showConfirmButton: false,
        timer: 1500
      })
      
     }
     

     else{
      basketArr.find((element) => element.id == button.id).count++;
      Swal.fire({
        icon: 'success',
        title: 'the number of products in the basket increased',
        showConfirmButton: false,
        timer: 1500
      })
     }
     console.log(basketArr);
    
     localStorage.setItem("basket", JSON.stringify(basketArr));
    
        
      // }
    
      
      // let heart =document.querySelectorAll(".heart");
      // heart.forEach(heartbtn =>{
      //   if (wishArr.find((element) => element.id == heartbtn.id)) {
      //     heartbtn.classList.replace("fa-regular","fa-solid")
          
      //   }
       
      // })
      
      
    
      let basketlength = JSON.parse(localStorage.getItem("basket"));
      basketsub.textContent = basketlength != null ? basketlength.length : 0;
      let wishcount = JSON.parse(localStorage.getItem("wish"))
  wishsub.textContent = wishcount != null ? wishcount.length : 0;
        
        
      });
    });
    let basketlength = JSON.parse(localStorage.getItem("basket"));
    basketsub.textContent = basketlength != null ? basketlength.length : 0;
    let wishcount = JSON.parse(localStorage.getItem("wish"))
wishsub.textContent = wishcount != null ? wishcount.length : 0;

   
})


