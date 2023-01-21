// gsap.registerPlugin(ScrollTrigger);
// let section = document.querySelector('.page1');
// let centerSectionWidth = section.offsetWidth / 2;
// let centerSectionHeigh = section.offsetHeight / 2;
// const tl = gsap.timeline();
// tl.to(".blob", {
//     scrollTrigger: {
//         trigger: ".blob",
//         start: "3%",
//         ease: "slow(0.7, 0.7, false)",
//         toggleClass: "scale",
//         scrub: true,
//         markers: true
//     }})
//     .to(".blob", {
//     x: 500,
//     y: () => centerSectionHeigh,
//     scrollTrigger: {
//         trigger: ".blob",
//         start: "3%",
//         end: "100%",
//         // onLeaveBack: () => {
//         //     document.querySelector(".blob").classList.remove("scale");
//         // },
//         // onEnter: () => {
//         //     document.querySelector(".blob").classList.add("scale");
//         // },
//         scrub: true,
//         markers: true,
//     },
//
// })
let button = document.querySelector('#button')

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        background: "#b2bec3",
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight
    }
});

// let createbox = () => {

    // let box = Bodies.circle(400, 0, 100, {
    //     render: {
    //         fillStyle: 'rgba(255, 118, 117, 0.5)',
    //
    //     }
    // }, 60);
let box =  Bodies.circle(Math.random()*600 + 30, 30, 60)
// }
let rect = Bodies.rectangle(200, 200, 100, 200)

let polygon = Bodies.polygon(500, 700, 5, 50)
Composite.add(engine.world, [rect, box, polygon]);
// create  ground
let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 30,
    { isStatic: true,
    render: {
    fillStyle: 'transparent'
    }});

// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// button.addEventListener('click', createbox)


let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});


Composite.add(engine.world, mouseConstraint)
