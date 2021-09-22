const carousel = document.querySelector('.carousel');
const carouselItems = carousel.querySelectorAll('.carousel__item');
const itemNumber = carouselItems.length;
const gutter = 16;
const carouselDots = carousel.querySelector('.carousel__dots'); 


let carouselData = {
    carouselItemNumber: 0,
    currentFirstItem: 0,
    itemSize: 0,
    pageNumber: 0
}

function setCarouselSize() {
    let itemSize = (carousel.clientWidth - (carouselData.carouselItemNumber-1)*gutter)/carouselData.carouselItemNumber
    carouselItems.forEach(item => item.style.setProperty('width', `${itemSize}px`))
    carousel.style.setProperty('height', `${itemSize}px`);

    return itemSize;
}

function renderCarousel(currentItem){    
    let pos = -currentItem*(carouselData.itemSize + gutter);
    carouselItems.forEach(item => {
        item.style.setProperty('left', `${pos}px`);
        pos += (carouselData.itemSize + gutter);
    });
    renderDots();
}

function renderDots(){
    let dot = "<div class='dot'></div>";
    let dotActive = "<div class='dot active'></div>";
    let dots = '';

    for(let i=0; i<carouselData.pageNumber; i++) {
        if(i === carouselData.currentFirstItem){
            dots += dotActive;
            continue;
        }
        dots += dot;
    }

    carouselDots.innerHTML = dots;
}

function getPageNumber(){
    console.log(itemNumber - carouselData.carouselItemNumber + 1)
    return itemNumber - carouselData.carouselItemNumber + 1;
}

function onClick(e){
    if(carouselData.carouselItemNumber > itemNumber)return;
    // console.log(`Direction is ${e.target.dataset.direction}`);
    let direction = e.target.dataset.direction;

    if(direction === 'prev'){
        carouselData.currentFirstItem = carouselData.currentFirstItem > 0 ? carouselData.currentFirstItem - 1 : (itemNumber - carouselData.carouselItemNumber);
    }else if(direction === 'next'){
        carouselData.currentFirstItem = (carouselData.currentFirstItem + carouselData.carouselItemNumber) < itemNumber ? carouselData.currentFirstItem + 1 : carouselData.currentFirstItem = 0;
    }
    renderCarousel(carouselData.currentFirstItem);
}

document.querySelector('.carousel__btn.prev').addEventListener('click',onClick);
document.querySelector('.carousel__btn.next').addEventListener('click',onClick);



window.addEventListener('resize', ()=>{
    carouselData.itemSize = setCarouselSize();
    renderCarousel(carouselData.currentFirstItem);
})


let mediaMatch_1 = window.matchMedia('screen and (min-width: 1024px)');
let mediaMatch_2 = window.matchMedia('screen and (min-width: 768px) and (max-width: 1023px)');
let mediaMatch_3 = window.matchMedia('screen and (min-width: 576px) and (max-width: 767px)');
let mediaMatch_4 = window.matchMedia('screen and (max-width: 575px)');


function resize_1(e) {
    if(e.matches) {
        carouselData.currentFirstItem = 0;
        carouselData.carouselItemNumber = 3;
        carousel.style.setProperty('width','80%');
        carouselData.itemSize = setCarouselSize();
        carouselData.pageNumber = getPageNumber();
        renderCarousel(carouselData.currentFirstItem);
    }
}
function resize_2(e) {
    if(e.matches) {
        carouselData.currentFirstItem = 0;
        carouselData.carouselItemNumber = 3;
        carousel.style.setProperty('width','90%');
        carouselData.itemSize = setCarouselSize();
        carouselData.pageNumber = getPageNumber();
        renderCarousel(carouselData.currentFirstItem);
    }
}
function resize_3(e) {
    if(e.matches) {
        carouselData.currentFirstItem = 0;
        carouselData.carouselItemNumber = 2;
        carousel.style.setProperty('width','90%');
        carouselData.itemSize = setCarouselSize();
        carouselData.pageNumber = getPageNumber();
        renderCarousel(carouselData.currentFirstItem);
    }
}
function resize_4(e) {
    if(e.matches) {
        carouselData.currentFirstItem = 0;
        carouselData.carouselItemNumber = 1;
        carousel.style.setProperty('width','70%');
        carouselData.itemSize = setCarouselSize();
        carouselData.pageNumber = getPageNumber();
        renderCarousel(carouselData.currentFirstItem);
    }
}

resize_1(mediaMatch_1);
resize_2(mediaMatch_2);
resize_3(mediaMatch_3);
resize_4(mediaMatch_4);

mediaMatch_1.addListener(resize_1);
mediaMatch_2.addListener(resize_2);
mediaMatch_3.addListener(resize_3);
mediaMatch_4.addListener(resize_4);
