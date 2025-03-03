const DevAnim = document.getElementById("Devanim");
const WebAnim = document.getElementById("Webanim");
const LogoAnim = document.getElementById("Logoanim");
const anim = document.querySelectorAll(".anim");
const nav = document.querySelector("nav");
const buttons = document.querySelectorAll(".btn");
const moves = document.querySelectorAll(".move");
const popup = document.querySelector(".pop-up");
const close = document.getElementById("closeBtn");
const bouton = document.querySelector(".bouton");
const clics = document.querySelectorAll(".clic_scale");
let activeClic = null;
let activeCroix = null;
let lastScroll = 0;

function Scroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
      nav.style.opacity = 1;
    } else {
      nav.style.opacity = 0;
    }

    lastScroll = window.scrollY;

    if (window.scrollY > 520 && window.scrollY < 1200) {
      DevAnim.style.transform = "translateX(0)";
      DevAnim.style.opacity = 1;
    }
    if (window.scrollY > 660 && window.scrollY < 1200) {
      WebAnim.style.transform = "translateX(0)";
      WebAnim.style.opacity = 1;
    }
    if (window.scrollY > 760 && window.scrollY < 1200) {
      LogoAnim.style.transform = "translateX(0)";
      LogoAnim.style.opacity = 1;
    } else if (window.scrollY > 1200) {
      anim.forEach((animAll) => {
        animAll.style.opacity = 1;
        animAll.style.transform = "translateX(0)";
        animAll.style.transition = "none";
      });
    }
  });
}
Scroll();
function handleClick() {
  clics.forEach((clic) => {
    clic.addEventListener("click", () => {
      if (activeClic && activeClic !== clic) {
        activeClic.style.transform = "scale(1)";
        activeClic.style.zIndex = "1";
        if (activeCroix) activeCroix.remove();
      }
      if (activeClic === clic) {
        activeClic.style.transform = "scale(1)";
        activeClic.style.zIndex = "1";
        if (activeCroix) activeCroix.remove();
        activeClic = null;
        activeCroix = null;
        return;
      }

      clic.style.transform = "scale(2.5)";
      clic.style.zIndex = "10";
      let croix = document.createElement("span");
      croix.innerHTML = "&#x274C;";
      croix.classList.add("close");
      document.body.appendChild(croix);

      let rect = clic.getBoundingClientRect();
      croix.style.top = `${rect.top + window.scrollY + 10}px`;
      croix.style.left = `${rect.right + window.scrollX - 40}px`;

      croix.addEventListener("click", (e) => {
        e.stopPropagation();
        clic.style.transform = "scale(1)";
        clic.style.zIndex = "1";
        croix.remove();
        activeClic = null;
        activeCroix = null;
      });
      activeClic = clic;
      activeCroix = croix;
    });
  });
}
handleClick();

let moveArray = [...moves];
// Animation du caroussel
function updateEvent() {
  moveArray.forEach((element) => {
    element.classList.remove("effect-1");
    element.classList.remove("effect-2");
    element.classList.remove("effect-3");
    element.classList.remove("effect-4");
    element.classList.remove("effect-5");
    element.classList.remove("effect-6");
    element.classList.remove("effect-7");
  });

  moveArray.slice(0, 7).forEach((element, i) => {
    element.classList.add(`effect-${i + 1}`);
  });
}

function clickEvent() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.id === "prev") {
        moveArray.unshift(moveArray.pop());
        updateEvent();
      } else {
        moveArray.push(moveArray.shift());
        updateEvent();
      }
      updateEvent();
    });
  });
}
clickEvent();

bouton.addEventListener("click", () => {
  popup.style.transform = "translate(0)";
  popup.style.opacity = 1;
});

close.addEventListener("click", (e) => {
  console.log(e);

  popup.remove();
});
console.log(bouton);
