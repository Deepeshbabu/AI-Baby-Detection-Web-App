img = "" ;
status = "" ;
objects = [] ;
sound = "" ;

function setup() 
{
    canvas = createCanvas(380,380) ;
    canvas.position(575,200) ;

    video = createCapture(VIDEO) ;
    video.size(380,380) ;
    video.hide() ;
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Objects" ;
}

function modelLoaded() 
{
    console.log("Model Loaded !");
    status = true ;
}

function preload() 
{
    img = loadImage("dog_cat.jpg") ;
    sound = loadSound("s.mp3")
}

function draw() 
{
    image(video,0,0,380,380) ;

    if(status != "")
    {
        r = random(255) ;
        g = random(255) ;
        b = random(255) ;
        objectDetector.detect(video, gotResult) ;
        for (let i = 0; i < objects.length; i++) 
        {
            if(objects[i].label == "person") 
            {
                sound.stop() ;
                document.getElementById("status").innerHTML = "Status : Objects Detected" ;
                document.getElementById("nob").innerHTML = "Baby Found" ;
    
                fill(r,g,b) ;
                percent = floor(objects[i].confidence * 100) ;
                text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15) ;
                noFill() ;
                stroke(r,g,b) ;
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height) ;
            }
            else
            {
                sound.play() ;
            }
        }
    }
}

function gotResult(error, results) 
{
    if(error) 
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results ;
    }
}