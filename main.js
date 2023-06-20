status ="";
objects= [];

function setup(){
    canvas= createCanvas(600,400);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input= document.getElementById("input").value;

    
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0, 0, 600, 400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("number").innerHTML="The number of objects detected are "+objects.length;
    
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
    
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop()
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML="Status: Object Found";
                synth = window.speechSynthesis;
                utterThis = new speechSynthesisUtterance("Object Mentioned Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML="Object Not Found"
            }
        }
    }
}

