// Navigation


document.addEventListener("click", () => {
  const checkbox = document.querySelector("#check");
  const burgerMenu = document.querySelector(".burger-menu");
  
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      burgerMenu.style.display = "block"; 
      requestAnimationFrame(() => {
        burgerMenu.classList.add("open"); 
      });
    } else {
      burgerMenu.classList.remove("open");
      burgerMenu.addEventListener("transitionend",() => {
        if (!burgerMenu.classList.contains("open")) {
          burgerMenu.style.display = "none"; 
        }
      },
    );
  }
});
});



window.addEventListener('scroll', () => {

    const scrollPosition = window.scrollY;
    const targetElement = document.querySelector('.burger-wrapper');
    console.log(scrollPosition);
    
  
    if (scrollPosition >= 95) {
      targetElement.classList.add('active'); 
    } else {
      targetElement.classList.remove('active'); 
    }
  });