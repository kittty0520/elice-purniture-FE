/* MENU BUTTON */
const toMenu = document.querySelector('#btn_menu');
const sideMenuBarTab = document.getElementById('side_menu_bar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(toMenu, 0.5, {
            x: 0,
        });
    } else {
        gsap.to(toMenu, 0.5, {
            x: 100,
        });
    }
});

toMenu.addEventListener('click', () => {
    sideMenuBarTab.style.display = 'flex';
});

/* TOP BUTTON */
const toTop = document.querySelector('#btn_top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(toTop, 0.5, {
            x: 0,
        });
    } else {
        gsap.to(toTop, 0.5, {
            x: 100,
        });
    }
});

toTop.addEventListener('click', () => {
    gsap.to(window, 0.7, {
        scrollTo: 0,
    });
});
