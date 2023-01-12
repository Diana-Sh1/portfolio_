

document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball() {
    let eye = document.querySelectorAll('.eye');
    eye.forEach(function (eye){
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = "rotate("+ rot +"deg)";
    })
}
//BEE
// document.querySelector('body').addEventListener('mousemove', rotateBee);
// function randomSize (min,max) {
//     min = Math.ceil(60);
//     max = Math.ceil(500);
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
//
// let bee = document.querySelectorAll('.bee');
// for (let i = 0; i < bee.length; i++) {
//     bee[i].style.left = Math.floor(Math.random()*99) + 'vw';
//     bee[i].style.top = Math.floor(Math.random()*99) + 'vh';
//     bee[i].style.width = randomSize() + 'px';
// }
//
// function rotateBee() {
//     bee.forEach(function (bee){
//         let x = (bee.getBoundingClientRect().left) + (bee.clientWidth / 2);
//         let y = (bee.getBoundingClientRect().top) + (bee.clientHeight / 2);
//         let radian = Math.atan2(event.pageX - x, event.pageY - y);
//         let rot = (radian * (180 / Math.PI) * -1) + 270;
//         bee.style.transform = "rotate("+ rot +"deg)";
//     })
// }
gsap.registerPlugin(Observer);
function rotate(value) {
    gsap.to(".face", {
        rotate: value + '_short',
        ease: 'back.out',
        duration: 0.2,
        overwrite: true,
        transformOrigin: 'center center'
    })
}
Observer.create ({
    target: window,
    type: "wheel, touch, scroll, pointer",
    onUp: () => {rotate(0)},
    onDown: () => {rotate(180)},
    onLeft: () => {rotate(270)},
    onRight: () => {rotate(90)},

});

