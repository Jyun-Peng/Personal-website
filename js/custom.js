let sections = document.querySelectorAll('section');
let navs = document.querySelectorAll('.nav');
let header = document.querySelector('header');


function renderHeader(scrolledPosition,targetOffset) {
    if(scrolledPosition+56 >targetOffset){
        header.classList.add('color-change')
    }
    else{
        header.classList.remove('color-change')
    }
}

function getCurrentSection(scrolledPosition) {
    let currentSection = 'main';
    for(let i=1; i<sections.length; i++) {
        if(scrolledPosition + window.innerHeight/2 >= sections[i].offsetTop) currentSection = sections[i].className;
        else break;
    }

    return currentSection;
}
function renderNavStay(position) {
    navs.forEach((nav) => {
        if(nav.classList.contains(`nav--${position}`)) nav.classList.add('stay-in');
        else nav.classList.remove('stay-in')
    })
}


renderHeader(window.scrollY);
let startSection = getCurrentSection(window.scrollY);
renderNavStay(startSection);

window.addEventListener('scroll', () => {
    let scrolledPosition = window.scrollY;
    let targetOffset = document.querySelector('.works').offsetTop;

    let currentSection = getCurrentSection(scrolledPosition);    
    renderNavStay(currentSection);
    renderHeader(scrolledPosition, targetOffset)
})



function renderSelected(target){
    document.querySelector('.experiences-skills__item.selected').classList.remove('selected');
    setTimeout(()=>{document.querySelector(`.experiences-skills__item.${target}`).classList.add('selected');},300)
}

function renderSelector(){
    if(!this.classList.contains('selected')) {
        document.querySelector('.selector__item.selected').classList.remove('selected');
        this.classList.add('selected');
        renderSelected(this.dataset.target);
    }
}
const selector = document.querySelectorAll('.selector>.selector__item');

selector.forEach( item => item.addEventListener('click', renderSelector));