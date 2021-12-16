const myCanvas = document.getElementById('myCanvas');



const ctx = myCanvas.getContext('2d');


const width = myCanvas.width = window.innerWidth;
const height = myCanvas.height = window.innerHeight;

// function to generate random number

let random = (min, max)=> {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

/* 
this method is not on tutorial, but I do so, we will also use the random method already created
*/
let randomColor=()=>{
    let color=`rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;


    return color;
    

}


//ball class constructor

/*

    PROPERTIES:

    -x and y coordinates — the horizontal and vertical coordinates where the ball starts on the screen. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
    -horizontal and vertical velocity (velX and velY) — each ball is given a horizontal and vertical velocity; in real terms these values are regularly added to the x/y coordinate values when we animate the balls, to move them by this much on each frame.
    -color — each ball gets a color.
    -size — each ball gets a size — this is its radius, in pixels.

    METHODS:


    instead of the example provided in the docs, we will make with classes

*/

class Ball{

    constructor(x, y, velX, velY, color, size){

        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;
        this.color=color;
        this.size=size;
    
    }

    draw(){

        //First, we use beginPath() to state that we want to draw a shape on the paper.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath

       
        //console.log(ctx);

        ctx.beginPath();

        //Next, we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle

        ctx.fillStyle = this.color;

        console.log (ctx.fillStyle);

        /*
            Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:
            https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
                - The x and y position of the arc's center — we are specifying the ball's x and y 
                properties.
                - The radius of the arc — in this case, the ball's size property.
                //TODO entender esto del radio,
                que es la mitad de la circ, y el size 
                - The last two parameters specify the start and end number of degrees 
                around the circle that the arc is drawn between. Here we specify 0 degrees, 
                and 2 * PI, which is the equivalent of 360 degrees 
                in radians (annoyingly, you have to specify this in radians). 
                
                That gives us a complete circle. If you had specified only 1 * PI, 
                you'd get a semi-circle (180 degrees).
                
        */

        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        /*
            - Last of all, we use the fill() method, which basically states 
            "finish drawing the path we started with beginPath(), 
            and fill the area it takes up with the color we specified earlier in fillStyle."
            https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill

        */

        ctx.fill();

        console.log ("dibujada");
    }

    /*
        We can draw the ball in position, 
        but to actually move the ball, we need an update function of some kind
    */

    deleteOldPosition(){
        XPositionToDelete=this.x;
        YPositionToDelete=this.y;

    }  

    update(){

        if((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

     /*   console.log ('old updated');
                console.log (this.x);
                console.log (this.y);
                console.log (this.size);*/

        /*

            The first four parts of the function check whether the ball has reached the edge 
            of the canvas. If it has, we reverse the polarity of the relevant velocity 
            to make the ball travel in the opposite direction. 
            
            So for example, 
            if the ball was traveling upwards (positive velY), then the vertical velocity 
            is changed so that it starts to travel downwards instead (negative velY).
        */

        let XPositionToDelete=this.x;
        let YPositionToDelete=this.y;

        
        
        
        this.x += this.velX;
        this.y += this.velY;

        /*
            In the four cases, we are checking to see:

                if the x coordinate is greater than the width of the canvas (the ball is going off the right edge).
                if the x coordinate is smaller than 0 (the ball is going off the left edge).
                if the y coordinate is greater than the height of the canvas (the ball is going off the bottom edge).
                if the y coordinate is smaller than 0 (the ball is going off the top edge).

                In each case, we include the size of the ball in the calculation because the x/y coordinates are in the center of the ball, but we want the edge of the ball to bounce off the perimeter — we don't want the ball to go halfway off the screen before it starts to bounce back.

                The last two lines add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.

                This will do for now; let's get on with some animation!

        */

               /* console.log ('updated');
                console.log (this.x);
                console.log (this.y);
                console.log (this.size);*/

                ctx.beginPath();


                ctx.fillStyle = 'black';
                //ctx.strokeStyle = 'black';
        
                //we delete the last arc by creating another one with more size than original
                //and the same color as background
                ctx.arc(XPositionToDelete, YPositionToDelete, this.size+2, 0, 2 * Math.PI);
               
                ctx.fill();

               // document.body.style.backgroundColor = "black";

    }

    

}

/*
    //test the ball object

    let testBall=new Ball(50, 100, 4, 4, 'blue', 10);

    //show its members and "draw" it

    console.log (testBall.x, testBall.size, testBall.color);

    testBall.draw();

*/
//TODO comentar bien, con jsdoc, y explicar diferencias con el metodo del tutorial
//randomColor();
//ANIMATING THE BALLs, we create them, draw them, and animate them

let balls = [];


while (balls.length <30){

    let size = random(10,20);

    let ball=new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors,
        //that is why we create the size local variable, we need to know it 
        //to calculate

        /*this would mean for example, is size (radius) is 10, a random
        between 10 and 1490, assuming that canvas width is 1500)
        */
        random(0 + size,width - size),
        /*same goes here for vertical*/
        random(0 + size,height - size),
        /*velx and vely will also be random numbers, which
        will be added to x and y and will cause the animate-movement-effect*/
        random (-7,7),
        random (-7,7),
        randomColor(),
        size


    );

    //ball.draw();

    balls.push(ball);

    /*setInterval(() => {

        ball.update();
        ball.draw();
        
    }, 10);*/
   
  

}

let drawAllBalls=()=>{
    for(let i=0;i<balls.length;++i){
        balls[i].draw();
    }
}

let updateAllBalls=()=>{

    
    for(let i=0;i<balls.length;++i){

        
        balls[i].update();
      
          
    }
    
   
}


drawAllBalls();

setInterval(() => {

    updateAllBalls();

    drawAllBalls();
    
}, 10);

    