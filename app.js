// gsap.registerPlugin(ScrollTrigger);

//HELLO
const THICCNESS = 60;
const SVG_PATH_SELECTOR = ".matter-path";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.1;

const matterContainer = document.querySelector(".grid");

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

// group = Body.nextGroup(true);

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
//
//
createSvgBodies();
createCircle();

function createCircle() {
    let circleDiameter =
        matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH;
    let circle = Bodies.circle(
        matterContainer.clientWidth / 2,
        10,
        circleDiameter / 2,
        {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.8,
            render: {
                fillStyle: "#f7b731",
                strokeStyle: "#f7b731"
            }
        }
    );
    Composite.add(engine.world, circle);
}

// function createSvgBodies() {
//     const paths = document.querySelectorAll(SVG_PATH_SELECTOR);
//     paths.forEach((path, index) => {
//         let vertices = Svg.pathToVertices(path);
//         let scaleFactor =
//             (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
//             SVG_WIDTH_IN_PX;
//         vertices = Vertices.scale(vertices, scaleFactor, scaleFactor);
//         let svgBody = Bodies.fromVertices(
//             index * SVG_WIDTH_IN_PX + 200,
//             0,
//             [vertices], {
//                 friction: 1,
//                 frictionAir: 0.00001,
//                 restitution: 0.8,
//                 render: {
//                     fillStyle: "#f7b731",
//                     strokeStyle: "#f7b731",
//                     lineWidth: 1
//                 }
//             }
//         );
//         Composite.add(engine.world, svgBody);
//     });
// }
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
            [vertices], {
                friction: 1,
                frictionAir: 0.00001,
                restitution: 0.8,
                render: {
                    fillStyle: "#f7b731",
                    strokeStyle: "#f7b731",
                    lineWidth: 1
                }
            }
        );
        Composite.add(engine.world, svgBody);
    });
}

var ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 3.5,
    27184,
    THICCNESS,

    { isStatic: true,
    render: {
        fillStyle: '#6D214F'
    }},

);

let leftWall = Bodies.rectangle(
    0 - THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    {
        isStatic: true,
        render: {
            fillStyle: 'transparent'
        }
    }
);

let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true,
    render: {
        fillStyle: 'transparent'
    }}
);

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

//run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);



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
// let centerSectionHeight = section.offsetHeight / 2;
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
//     y: () => centerSectionHeight,
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