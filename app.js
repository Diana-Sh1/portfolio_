// gsap.registerPlugin(ScrollTrigger);

//HELLO
const THICCNESS = 60;
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.1;
const width = window.innerWidth;
const height = window.innerHeight;
const matterContainer = document.querySelector(".container-canvas");

// module aliases

 let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Body = Matter.Body,
        Svg = Matter.Svg,
        Vector = Matter.Vector,
        Vertices = Matter.Vertices,
        Constraint = Matter.Constraint,
        World = Matter.World;

// create an engine
    let engine = Engine.create({
        enableSleeping: true
    });
    world = engine.world; //


// create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

// add bodies
// var group = Body.nextGroup(true);

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
    Render.run(render);

//creating segments for rope
    let ropeSegments = Composites.stack(width / 2, 50, 20, 1, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 10, 10, {
            density: 1, // really high density but you get the idea
            isSensor: true,
            frictionAir: 0.0005,
            render: {

            }
        });
    });
//////
//     let ropeSegments2 = Composites.stack(width / 2, 50, 20, 1, 0, 0, function (x, y) {
//         return Bodies.rectangle(x, y, 10, 10, {
//             density: 1, // really high density but you get the idea
//             isSensor: true,
//             frictionAir: 0.0005
//         });
//     });
////
//     let ropeSegments3 = Composites.stack(width / 2, 50, 20, 1, 0, 0, function (x, y) {
//         return Bodies.rectangle(x, y, 10, 10, {
//             density: 1, // really high density but you get the idea
//             isSensor: true,
//             frictionAir: 0.0005
//         });
//     });

// // chain Stack together
    let rope = Composites.chain(ropeSegments, 0, 0.5, 0, -0.5, {
        length: 0,
        stiffness: 0.5,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: {
            lineWidth: 0,
            anchors: false
        }
    });
///////
//     let rope2 = Composites.chain(ropeSegments2, 0, 0.5, 0, -0.5, {
//         length: 0,
//         stiffness: 1,
//         friction: 0,
//         frictionAir: 0,
//         frictionStatic: 0,
//         render: {
//             lineWidth: 0,
//             anchors: false
//         }
//     });
// ///////
//     let rope3 = Composites.chain(ropeSegments3, 0, 0.5, 0, -0.5, {
//         length: 0,
//         stiffness: 1,
//         friction: 0,
//         frictionAir: 0,
//         frictionStatic: 0,
//         render: {
//             lineWidth: 0,
//             anchors: false
//         }
//     });
// top anchor
    Composite.add(ropeSegments,
        Constraint.create({
            bodyB: ropeSegments.bodies[0],
            pointA: {x: width / 1.3 , y: 0},
            pointB: {x: 0, y: -5},
            length: 0,
            stiffness: 1,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 4,
            render: {
                lineWidth: 0,
                anchors: false
            }
        }));

///////////
//     Composite.add(ropeSegments2,
//         Constraint.create({
//             bodyB: ropeSegments2.bodies[0],
//             pointA: {x: width / 2 + 650, y: 0},
//             pointB: {x: 0, y: -5},
//             length: 0,
//             stiffness: 1,
//             friction: 0,
//             frictionAir: 0,
//             frictionStatic: 4,
//             render: {
//                 lineWidth: 0,
//                 anchors: false
//             }
//         }));
//////
//     Composite.add(ropeSegments3,
//         Constraint.create({
//             bodyB: ropeSegments3.bodies[0],
//             pointA: {x: width / 2 + 700, y: 0},
//             pointB: {x: 0, y: -5},
//             length: 0,
//             stiffness: 1,
//             friction: 0,
//             frictionAir: 0,
//             frictionStatic: 4,
//             render: {
//                 lineWidth: 0,
//                 anchors: false
//             }
//         }));
///

    World.add(world, rope);

    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: width, y: height}
    });

    let x = ropeSegments.bodies[ropeSegments.bodies.length - 1].position.x;
    let y = ropeSegments.bodies[ropeSegments.bodies.length - 1].position.y;
/////
    let pixelHeight = 0.2 * height;

/////////////
    const pathH = document.querySelector('#matter-pathH');
    const pathE = document.querySelector('#matter-pathE');
    const pathY = document.querySelector('#matter-pathY');

picture = Bodies.rectangle(x, y, pixelHeight *0.724, pixelHeight, {
    density: 0.01704 / height,
    render: {
        sprite: {
            texture: "img/hey2.svg"
        }
    }

})
    // let vertices = Svg.pathToVertices(pathH);
    let scaleFactor =
        (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
        SVG_WIDTH_IN_PX;
    // vertices = Vertices.scale(vertices, scaleFactor, scaleFactor);
    // let svgBody = Bodies.fromVertices(
    //     100,
    //     0,
    //     [vertices], {
    //         // friction: 1,
    //         // frictionAir: 0.00001,
    //         // restitution: 0.8,
    //         render: {
    //             fillStyle: "#f7b731",
    //             strokeStyle: "#f7b731",
    //             lineWidth: 1
    //         }
    //     }
    // );
////
//     let vertices2 = Svg.pathToVertices(pathE);
//     vertices2 = Vertices.scale(vertices2, scaleFactor, scaleFactor);
//     let svgBody2 = Bodies.fromVertices(
//         100,
//         0,
//         [vertices2], {
//             friction: 1,
//             frictionAir: 0.00001,
//             restitution: 0.8,
//             render: {
//                 fillStyle: "#f7b731",
//                 strokeStyle: "#f7b731",
//                 lineWidth: 1
//             }
//         }
//     );
//////
//     let vertices3 = Svg.pathToVertices(pathY);
//     vertices3 = Vertices.scale(vertices3, scaleFactor, scaleFactor);
//     let svgBody3 = Bodies.fromVertices(
//         100,
//         0,
//         [vertices3], {
//             friction: 1,
//             frictionAir: 0.00001,
//             restitution: 0.8,
//             render: {
//                 fillStyle: "#f7b731",
//                 strokeStyle: "#f7b731",
//                 lineWidth: 1
//             }
//         }
//     );

/////
    Composite.add(ropeSegments, Constraint.create({
        pointA: {x: 0 , y: 50},
        bodyA: ropeSegments.bodies[ropeSegments.bodies.length - 1],
        bodyB: picture,
        length: 0,
        angularStiffness: 1,
        render: {
            lineWidth: 0
        }
    }));
////
//     Composite.add(ropeSegments2,
//         Constraint.create(
//             {
//                 pointA: {x: -50 , y: 50},
//                 bodyA: ropeSegments2.bodies[ropeSegments2.bodies.length - 1],
//                 bodyB: picture,
//                 length: 0,
//                 angularStiffness: 1,
//                 render: {
//                     lineWidth: 0
//                 }
//             }));
/////
//     Composite.add(ropeSegments3,
//         Constraint.create(
//             {
//                 bodyA: ropeSegments3.bodies[ropeSegments3.bodies.length - 1],
//                 bodyB: svgBody3,
//                 length: 0,
//                 angularStiffness: 1,
//                 render: {
//                     lineWidth: 0
//                 }
//             }));
World.add(world, picture);
    // World.add(world, [svgBody, svgBody2, svgBody3]);
///////////////


// createSvgBodies();
// createCircle();

// function createCircle() {
//     let circleDiameter =
//         matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH;
//     let circle = Bodies.circle(
//         matterContainer.clientWidth / 2,
//         10,
//         circleDiameter / 2,
//         {
//             friction: 0.3,
//             frictionAir: 0.00001,
//             restitution: 0.8,
//             render: {
//                 fillStyle: "#f7b731",
//                 strokeStyle: "#f7b731"
//             }
//         }
//     );
//     Composite.add(engine.world, circle);
// }


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


    var ground = Bodies.rectangle(
        matterContainer.clientWidth / 2,
        matterContainer.clientHeight + THICCNESS / 3.5,
        27184,
        THICCNESS,

        {
            isStatic: true,
            render: {
                fillStyle: '#6D214F'
            }
        },
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
        {
            isStatic: true,
            render: {
                fillStyle: 'transparent'
            }
        }
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

// //run the renderer
// Render.run(render);
//
// // create runner
// var runner = Runner.create();
//
// // run the engine
// Runner.run(runner, engine);


    function scaleBodies() {
        const allBodies = Composite.allBodies(engine.world);

        allBodies.forEach((body) => {
            if (body.isStatic === true) return; // don't scale walls and ground
            const {min, max} = body.bounds;
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