# BOUNCING BALLS by <a href="https://www.linkedin.com/in/francisco-javier-prieto-gut/">FRAN PRIETO</a>


- I made this small project as an introduction to the JS possibilities to draw on a canvas. Is is the beginning to start learning basic concepts which will allow me digging on collisions, little games, 3d... and maybe one day Augmented or Virtual Reality. There are JS frameworks ready to do that like <a href="https://aframe.io/">A-frame</a>, based on <a href="https://threejs.org/">three.js</a>, the most popular Javascript library for using 3D graphics in a web browser. As you see, JavaScript if a world full of possibilities!

- This is a version addapted from this MDN tutorial https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice

- I made some changes, like using Classes instead of using a simple function 
as a constructor for the ball object
- The same way, I created methods for tasks like draw() or update() instead of adding them as functions to the prototype of the object
- I also use my own way to "erase the ball" from the last position where the ball has been before current position. When a ball is updated, on the last occupied position by that ball, another ball with more size and the same color of background is drawn. More size for the "erasing-effect" ball is needed to avoid we see borders and other "fingerprints" or "halos" from our visible ball. Take in mind, if we don´t do something to restore last position to default color, we will have not balls, but a snake effect due to the balls being drawn one after another.
- Please check the generated JSDOC files from the "out" folder on the GitHub repository https://github.com/Franweb79/bouncing-balls
- Don´t forget follow me on <a href="https://www.linkedin.com/in/francisco-javier-prieto-gut/">LinkedIn</a> and <a href="https://twitter.com/@FranDeveloper79">Twitter</a>



## NOTES FOR DEVELOPERS

1- 

    Next, we use the arc() method to trace an arc shape on the paper. Its   parameters are:

    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

        - The x and y position of the arc's center — we are specifying the ball's x and y properties.
        - The radius of the arc — in this case, the ball's size property.
        - The last two parameters specify the start and end number of degrees around the circle that the arc is drawn between. Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians.That gives us a complete circle. If you had specified only 1 * PI, 
        you'd get a semi-circle (180 degrees).

2-

    Last of all, we use the fill() method, which basically states "finish drawing the path we started with beginPath(),  and fill the area it takes up with the color we specified earlier in fillStyle."
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill

3-

    ball initial position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors, that is why we create the size local variable, we need to know it to calculate.

    This would mean for example, is size (radius) is 10, a random between 10 and 1490, assuming that canvas width is 1500)