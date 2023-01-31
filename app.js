
//HELLO
const THICCNESS = 60;
const SVG_PATH_SELECTOR = ".matter-path";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.1;

const matterContainer = document.querySelector("#matter-container");

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Body = Matter.Body,
    Svg = Matter.Svg,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices,
    Constraint = Matter.Constraint;

// create an engine
var engine = Engine.create();

// add bodies


// create a renderer
var render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,

    }
});


createSvgBodies();
createCircle();
/////////////////////
// let boxA  = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 20, 100, {
//
//             friction: 0.3,
//             frictionAir: 0.00001,
//             restitution: 0.8,
//             isStatic: true,
//             render: {
//                 fillStyle: "#F99fff",
//                 strokeStyle: "#F99fff"
//             }
//         });
// let boxB  = Bodies.rectangle(200, 100, 50, 20, {
//             friction: 0.3,
//             frictionAir: 0.00001,
//             restitution: 0.8,
//             render: {
//                 fillStyle: "#F99fff",
//                 strokeStyle: "#F99fff"
//             }
//         });
// let boxC  = Bodies.rectangle(200, 100, 50, 20, {
//     friction: 0.3,
//     frictionAir: 0.00001,
//     restitution: 0.8,
//     render: {
//         fillStyle: "#F99fff",
//         strokeStyle: "#F99fff"
//     }
// });
// let AtoB = Constraint.create({
//     bodyA:boxA,
//     bodyB:boxB,
//     bodyC:boxC,
//     length: 200,
//     stiffness: 0.5,
//     pointA: {
//         x: 0,
//         y: 40
//     }
// })
// let AtoC = Constraint.create({
//     bodyA:boxA,
//     bodyB:boxC,
//     length: 100,
//     stiffness: 0.5,
//     pointC: {
//         x: 0,
//         y: 0
//     }
// })
// // let options = {
// //     bodyA: p1.body,
// //     bodyB: p2.body,
// //     length: 50,
// //     stiffness: 0.4
// // }
// // let constraint = Constraint.create(options);
// Composite.add(engine.world, [boxA, boxB, boxC, AtoB, AtoC]);

//////////////
////////

///////////


var ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 3.5,
    27184,
    THICCNESS,
    { isStatic: true }
);

let leftWall = Bodies.rectangle(
    0 - THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    {
        isStatic: true
    }
);

let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall]);



let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


function createCircle() {
    let circleDiameter =
        matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH;
    let circle = Bodies.circle(
        matterContainer.clientWidth / 3,
        10,
        circleDiameter / 2,
        {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.8,
            render: {
                fillStyle: "#ef5566",
                strokeStyle: "#ef5566"
            }
        }
    );
    Composite.add(engine.world, circle);
}

function createSvgBodies() {
    const paths = document.querySelectorAll(SVG_PATH_SELECTOR);
    paths.forEach((path, index) => {
        let vertices = Svg.pathToVertices(path);
        let scaleFactor =
            (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
            SVG_WIDTH_IN_PX;
        vertices = Vertices.scale(vertices, scaleFactor, scaleFactor);
        let svgBody = Bodies.fromVertices(
            index * SVG_WIDTH_IN_PX + 200,
            0,
            [vertices],
            {
                friction: 0.3,
                frictionAir: 0.00001,
                restitution: 0.8,
                render: {
                    fillStyle: "#ef5566",
                    strokeStyle: "#ef5566",
                    lineWidth: 1
                }
            }
        );
        Composite.add(engine.world, svgBody);
    });
}

function scaleBodies() {
    const allBodies = Composite.allBodies(engine.world);

    allBodies.forEach((body) => {
        if (body.isStatic === true) return; // don't scale walls and ground
        const { min, max } = body.bounds;
        const bodyWidth = max.x - min.x;
        let scaleFactor =
            (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
            bodyWidth;

        Body.scale(body, scaleFactor, scaleFactor);
    });
}

function handleResize(matterContainer) {
    // set canvas size to new values
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    // reposition ground
    Body.setPosition(
        ground,
        Vector.create(
            matterContainer.clientWidth / 2,
            matterContainer.clientHeight + THICCNESS / 2
        )
    );

    // reposition right wall
    Body.setPosition(
        rightWall,
        Vector.create(
            matterContainer.clientWidth + THICCNESS / 2,
            matterContainer.clientHeight / 2
        )
    );

    scaleBodies();
}

window.addEventListener("resize", () => handleResize(matterContainer));










//BLOB
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

//MATTER JS
// let button = document.querySelector('#button')
//
// // module aliases
// let Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite,
//     Mouse = Matter.Mouse,
//     MouseConstraint = Matter.MouseConstraint;
//
//
// // create an engine
// let engine = Engine.create();
//
// // create a renderer
// let render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         background: "#b2bec3",
//         wireframes: false,
//         width: window.innerWidth,
//         height: window.innerHeight
//     }
// });
//
// // let createbox = () => {
//
//     // let box = Bodies.circle(400, 0, 100, {
//     //     render: {
//     //         fillStyle: 'rgba(255, 118, 117, 0.5)',
//     //
//     //     }
//     // }, 60);
// let box =  Bodies.circle(Math.random()*600 + 30, 30, 60)
// // }
// let rect = Bodies.rectangle(Math.random()*600, 200, 100, 200)
// let polygon = Bodies.polygon(Math.random()*600, 0, 6, 50);
// let stick = Bodies.rectangle(Math.random()*600, 0, 600, 30)
//
// //add bodies to world
// Composite.add(engine.world, [rect, box, polygon, stick]);
//
//
// // create  ground, walls
// let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 30,
//     { isStatic: true,
//     render: {
//     fillStyle: 'transparent'
//     }});
// let leftWall = Bodies.rectangle(0, window.innerHeight, 30, window.innerHeight, {
//     isStatic: true,
//     render: {
//         fillStyle: '#000'
//     }
// })
// let rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight, 30, 420,{
//     isStatic: true,
//     render: {
//         fillStyle: '#000'
//     }
// })
//
// Composite.add(engine.world, [ground, leftWall, rightWall]);
//
//
// // run the renderer
// Render.run(render);
//
// // create runner
// let runner = Runner.create();
//
// // run the engine
// Runner.run(runner, engine);
//
// // button.addEventListener('click', createbox)
//
//
// let mouse = Mouse.create(render.canvas);
// let mouseConstraint = MouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint: {
//         stiffness: 0.2,
//         render: {
//             visible: false
//         }
//     }
// });
//
//
// Composite.add(engine.world, mouseConstraint)




//LAMP
// const {
//     gsap: {set, to, timeline },
//     MorphSVGPlugin,
//     Draggable } =
//     window;
//
//
// // Used to calculate distance of "tug"
// let startX;
// let startY;
//
// const AUDIO = {
//     CLICK: new Audio('https://assets.codepen.io/605876/click.mp3') };
//
// const STATE = {
//     ON: false };
//
// const CORD_DURATION = 0.1;
//
// const CORDS = document.querySelectorAll('.toggle-scene__cord');
// const HIT = document.querySelector('.toggle-scene__hit-spot');
// const DUMMY = document.querySelector('.toggle-scene__dummy-cord');
// const DUMMY_CORD = document.querySelector('.toggle-scene__dummy-cord line');
// const PROXY = document.createElement('div');
// // set init position
// const ENDX = DUMMY_CORD.getAttribute('x2');
// const ENDY = DUMMY_CORD.getAttribute('y2');
//
// const RESET = () => {
//     set(PROXY, {
//         x: ENDX,
//         y: ENDY });
//
// };
//
// RESET();
//
// const CORD_TL = timeline({
//     paused: true,
//     onStart: () => {
//         STATE.ON = !STATE.ON;
//         set(document.documentElement, { '--on': STATE.ON ? 1 : 0 });
//         set([DUMMY, HIT], { display: 'none' });
//         set(CORDS[0], { display: 'block' });
//         AUDIO.CLICK.play();
//     },
//     onComplete: () => {
//         set([DUMMY, HIT], { display: 'block' });
//         set(CORDS[0], { display: 'none' });
//         RESET();
//     } });
//
//
// for (let i = 1; i < CORDS.length; i++) {
//     CORD_TL.add(
//         to(CORDS[0], {
//             morphSVG: CORDS[i],
//             duration: CORD_DURATION,
//             repeat: 1,
//             yoyo: true }));
//
//
// }
//
// Draggable.create(PROXY, {
//     trigger: HIT,
//     type: 'x,y',
//     onPress: e => {
//         startX = e.x;
//         startY = e.y;
//     },
//     onDrag: function () {
//         set(DUMMY_CORD, {
//             attr: {
//                 x2: this.x,
//                 y2: this.y } });
//
//
//     },
//     onRelease: function (e) {
//         const DISTX = Math.abs(e.x - startX);
//         const DISTY = Math.abs(e.y - startY);
//         const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
//         to(DUMMY_CORD, {
//             attr: { x2: ENDX, y2: ENDY },
//             duration: CORD_DURATION,
//             onComplete: () => {
//                 if (TRAVELLED > 50) {
//                     CORD_TL.restart();
//                 } else {
//                     RESET();
//                 }
//             } });
//
//     } });