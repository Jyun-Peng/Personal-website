let sections = document.querySelectorAll('section');
let navs = document.querySelectorAll('.nav');
let header = document.querySelector('header');

function throttling(func, wait = 50) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        let delay = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        if (!timeout) {
            func.apply(context, args);
            timeout = setTimeout(delay, wait);
        }
    };
}

function renderHeader(scrolledPosition, targetOffset) {
    if (scrolledPosition + 56 > targetOffset) {
        header.classList.add('color-change');
    } else {
        header.classList.remove('color-change');
    }
}

function getCurrentSection(scrolledPosition) {
    let currentSection = 'main';
    for (let i = 1; i < sections.length; i++) {
        if (scrolledPosition + window.innerHeight / 2 >= sections[i].offsetTop) currentSection = sections[i].className;
        else break;
    }

    return currentSection;
}
function renderNavStay(position) {
    navs.forEach((nav) => {
        if (nav.classList.contains(`nav--${position}`)) nav.classList.add('stay-in');
        else nav.classList.remove('stay-in');
    });
}

renderHeader(window.scrollY);
let startSection = getCurrentSection(window.scrollY);
renderNavStay(startSection);

function onScroll() {
    let scrolledPosition = window.scrollY;
    let targetOffset = document.querySelector('.works').offsetTop;

    let currentSection = getCurrentSection(scrolledPosition);
    renderNavStay(currentSection);
    renderHeader(scrolledPosition, targetOffset);
}

window.addEventListener('scroll', throttling(onScroll, 50));

// experience & skill

function renderSelected(target) {
    document.querySelector('.experiences-skills .content__item.selected').classList.remove('selected');
    setTimeout(() => {
        document.querySelector(`.experiences-skills .content__${target}`).classList.add('selected');
    }, 300);
}

function renderSelector() {
    if (!this.classList.contains('selected')) {
        document.querySelector('.selector__item.selected').classList.remove('selected');
        this.classList.add('selected');
        renderSelected(this.dataset.target);
    }
}
const selector = document.querySelectorAll('.selector>.selector__item');

selector.forEach((item) => item.addEventListener('click', renderSelector));

// start animation

let main = document.querySelector('.js-top');
let portrait = main.querySelector('.js-portrait');
let intro = main.querySelector('.js-intro');

// function portraitFadeout() {
//     let startPos = intro.offsetTop;
//     let opacity = window.scrollY > startPos ? 1 - (window.scrollY - startPos) / 400 : 1;
//     portrait.style.opacity = `${opacity}`;
//     portrait.style.top = `calc(3.5rem - ${window.scrollY / 5}px)`;
// }

function portraitDarken() {
    let startPos = intro.offsetTop;
    if (window.scrollY > startPos) {
        portrait.classList.add('darken');
    } else {
        portrait.classList.remove('darken');
    }
    // portrait.style.top = `calc(3.5rem - ${window.scrollY / 5}px)`;
}

function checkOnTop() {
    if (window.scrollY === 0) {
        main.classList.add('active');
    }
}
function portraitAppear() {
    portrait.querySelector('.portrait').classList.add('active');
}

window.addEventListener('scroll', throttling(portraitDarken, 10));
window.addEventListener('scroll', throttling(checkOnTop, 10));

checkOnTop();
portraitDarken();

// refresh go to top
// if (history.scrollRestoration) {
//     history.scrollRestoration = 'manual';
// } else {
//     window.onbeforeunload = function () {
//         window.scrollTo(0, 0);
//     }
// }
