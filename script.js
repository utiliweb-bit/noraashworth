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

/*=============================
MENU MOBILE
=============================*/

const toggle = document.getElementById("menuToggle");

const menu = document.getElementById("menu");

toggle.addEventListener("click",()=>{

menu.classList.toggle("active");

});

document.querySelectorAll(".menu a").forEach(link=>{

link.addEventListener("click",()=>{

menu.classList.remove("active");

});

});

.hero{

position:relative;

overflow:hidden;

}

.hero::after{

content:"";

position:absolute;

left:0;

bottom:0;

width:100%;

height:220px;

background:linear-gradient(

to top,

#f8f6f2,

transparent

);

}

.hero-content{

animation:heroFade 1.5s ease;

}

@keyframes heroFade{

0%{

opacity:0;

transform:translateY(60px);

}

100%{

opacity:1;

transform:translateY(0);

}

}

.primary-button{

position:relative;

overflow:hidden;

}

.primary-button::before{

content:"";

position:absolute;

top:0;

left:-120%;

width:70%;

height:100%;

background:linear-gradient(

90deg,

transparent,

rgba(255,255,255,.4),

transparent

);

transition:.8s;

}

.primary-button:hover::before{

left:150%;

}

/*==========================
SCROLL REVEAL
==========================*/

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:.15
});

document.querySelectorAll(".reveal").forEach(item=>{

observer.observe(item);

});
