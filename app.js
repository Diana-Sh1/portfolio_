gsap.registerPlugin(ScrollTrigger);

//HEY
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
                fillStyle: 'transparent'
            }
        });
    });


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

// top anchor
    Composite.add(ropeSegments,
        Constraint.create({
            bodyB: ropeSegments.bodies[0],
            pointA: {x: width / 1.3 , y: -200},
            pointB: {x: 0, y: -5},
            length: 0,
            stiffness: 1,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 4,
            render: {
                lineWidth: 0,
                anchors: false,
            }
        }));

    World.add(world, rope);

    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: width, y: height}
    });

    let x = ropeSegments.bodies[ropeSegments.bodies.length - 1].position.x;
    let y = ropeSegments.bodies[ropeSegments.bodies.length - 1].position.y;
    let pixelHeight = 0.2 * height;



picture = Bodies.rectangle(x, y, pixelHeight *0.724, pixelHeight, {
    density: 0.01704 / height,
    render: {
        sprite: {
            texture: "img/hey4.svg"
        }
    }

})

    let scaleFactor =
        (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
        SVG_WIDTH_IN_PX;

    Composite.add(ropeSegments, Constraint.create({
        pointA: {x: 0 , y: 0},
        bodyA: ropeSegments.bodies[ropeSegments.bodies.length - 1],
        bodyB: picture,
        length: 0,
        angularStiffness: 1,
        render: {
            lineWidth: 0
        }
    }));
World.add(world, picture);





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



    // function scaleBodies() {
    //     const allBodies = Composite.allBodies(engine.world);
    //
    //     allBodies.forEach((body) => {
    //         if (body.isStatic === true) return; // don't scale walls and ground
    //         const {min, max} = body.bounds;
    //         const bodyWidth = max.x - min.x;
    //         let scaleFactor =
    //             (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
    //             bodyWidth;
    //
    //         Body.scale(body, scaleFactor, scaleFactor);
    //     });
    // }

    // function handleResize(matterContainer) {
    //     // set canvas size to new values
    //     render.canvas.width = matterContainer.clientWidth;
    //     render.canvas.height = matterContainer.clientHeight;
    //
    //     // reposition ground
    //     Body.setPosition(
    //         ground,
    //         Vector.create(
    //             matterContainer.clientWidth / 2,
    //             matterContainer.clientHeight + THICCNESS / 2
    //         )
    //     );
    //
    //     // reposition right wall
    //     Body.setPosition(
    //         rightWall,
    //         Vector.create(
    //             matterContainer.clientWidth + THICCNESS / 2,
    //             matterContainer.clientHeight / 2
    //         )
    //     );
    //
    //     scaleBodies();
    // }
    //
    // window.addEventListener("resize", () => handleResize(matterContainer));


const description = gsap.utils.toArray('.description');
description.forEach(box => {
    const anim = gsap.to(box, { x: 300, paused: true });

    ScrollTrigger.create({
        trigger: description,
        start: "center 70%",
        onEnter: () => anim.play()
    });

    ScrollTrigger.create({
        trigger: description,
        start: "top bottom",
        onLeaveBack: () => anim.pause(0)
    });
});
