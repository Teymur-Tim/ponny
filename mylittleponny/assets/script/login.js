let form = document.querySelector("form")
let nameInput = document.querySelector(".name")
let passwordInput = document.querySelector(".password")
let registerButton = document.querySelector(".register_submit")
let url ="http://localhost:3000/users"

let userArr = JSON.parse(localStorage.getItem("user"))

// let nav_login_register_buttons = document.querySelector(".nav_login_register_buttons")
// if (userArr.isLogged==true) {
//     nav_login_register_buttons.innerHTML =`
//     <div class="profile_button"><a href="profile.html">Profile</a></div>
//     <div class="logout"><a href="login.html">logOut</a></div>
//     `
// }
localStorage.setItem("user",JSON.stringify(
    {
        isLogged:false
   
    }

) )

form.addEventListener("submit",function(e){
    e.preventDefault()
    fetch(url).then((res)=>res.json()).then((data)=>{
       let found =data.find(element =>element.username == nameInput.value && element.password == passwordInput.value)
       if (found) {
        localStorage.setItem("user",JSON.stringify(
            {
                isLogged:true,
            userID :found.id,
            username: found.username,
            email: found.email,
            balance: found.balance,
            orders: [
                {
                   orders:  found.orders
                }
            ]
            }

        ) )
            Swal.fire({
               
                icon: 'success',
                title: 'you entered account',
                showConfirmButton: false,
                timer: 1500,
                
                
              }) 
              window.location.href = "index.html"
       }
       else{
        localStorage.setItem("user",JSON.stringify(
            {
                isLogged:false
           
            }

        ) )
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password or Username are wrong!',
           
          })
        
       }
       nameInput.value="";
       passwordInput.value="";
    })
    
})

   




































let basketsub = document.querySelector(".basketcount")
let wishsub= document.querySelector(".wishcount")
let basketlength = JSON.parse(localStorage.getItem("basket"));
basketsub.textContent = basketlength != null ? basketlength.length : 0;
console.log(basketlength);
let wishlength = JSON.parse(localStorage.getItem("wish"))
wishsub.textContent = wishlength != null ? wishlength.length : 0;