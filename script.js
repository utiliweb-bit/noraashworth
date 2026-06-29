/* ===========================================================
   Nora Ashworth
   Premium Website
=========================================================== */

// Navbar muda ao rolar

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});


// Scroll Reveal

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    reveals.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// Rolagem suave

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});


// Fade Hero

window.addEventListener("scroll",()=>{

    const hero = document.querySelector(".hero");

    if(!hero) return;

    hero.style.opacity = 1 - window.scrollY/900;

});


// Ano automático

const footer = document.querySelector("footer p");

if(footer){

    footer.innerHTML =
    `© ${new Date().getFullYear()} Nora Ashworth`;

}
