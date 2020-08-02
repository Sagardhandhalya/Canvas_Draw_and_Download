const canvas = document.querySelector("canvas");
var p = canvas.getContext('2d');
canvas.height = window.innerHeight - 150;
canvas.width = window.innerWidth-30;
canvas.style.border = "1px solid red";

// download 
var downloadbtn = document.createElement('a');
var Text = document.createTextNode('Download ');
downloadbtn.appendChild(Text);
downloadbtn.download = "Mycanvas";
var rect = canvas.getBoundingClientRect();
downloadbtn.width = 200;
document.body.appendChild(downloadbtn);

// set up line 

let coord = { x: 0, y: 0 };
let paint = false;

// color

var st = "black";

// stroke width
var sd = 1;

// font size
 var fs = "30px Arial";

    var currenttool = "line";
canvas.addEventListener('mousemove', draw);

function draw(e)
{

    
        line(e);
    
}

function tool(e){
    var te = document.getElementById('text');

    if(e.value == "line")
    {
        te.style.display = "none";
    }
    else{
        te.style.display = "inline";
    }
    currenttool = e.value;
    

    
}


canvas.addEventListener('mouseup', function (e) {
    paint = false;
    p.beginPath()
});
canvas.addEventListener('mousedown', function (e) {

    if(currenttool == "line")
    {
    paint = true;

    coord.x = Number(e.clientX - rect.x);
    coord.y = Number(e.clientY - rect.y);
    }
    else{

        text(e);

    }
});

var str = document.getElementsByName("st");
// font size 

function fontsize(e) {

    fs = e.value;
    fs += "px Robot";

    console.log(fs);
}

// chane color 
function change(e) {
    
    st = e.value;
}

// chane line width

function changeline(e)
{
    if(e.value > 20) 
    {
        sd = 20;
        return ;
    }
    sd = e.value;
}

// draw line on canvas

function line(e) {
    
    if (!paint) return;
    var x = Number(e.clientX - rect.x);
    var y = Number(e.clientY - rect.y);
    p.strokeStyle = st;
    p.lineWidth = sd;
    p.moveTo(coord.x, coord.y);
    p.lineTo(x, y);
    coord.x = Number(e.clientX - rect.x);
    coord.y = Number(e.clientY - rect.y);
    p.stroke();



}

// connvert  to image
function convertoimage() {

    var can = canvas.toDataURL('image/png', 1.0);
    let img = document.getElementById("output");
    img.style.display = "inline"
    img.src = can;
    downloadbtn.href = can;


}

function text(e) {
    

    var x = Number(e.clientX - rect.x);
    var y = Number(e.clientY - rect.y);
    var te = document.getElementById('text');
  
    te.style.top = y;
    te.style.left = x;
    p.font = fs;
    p.fillStyle = st;
    p.fillText(te.value, x , y);

}

var inputfile = document.getElementById('imageLoader');

inputfile.addEventListener('change',function(){

    
    
    const file = this.files[0];
    if(file)
    {
        var x = new Image();
        var FR = new FileReader();
        
        FR.addEventListener('load',function(){
            x.addEventListener('load',function(){
                
                
                p.drawImage(x, coord.x, coord.y,500,500);
            })
              
            x.setAttribute('src', this.result);
        });
        FR.readAsDataURL(file);
        
    }


    
     
    
})

// Hide image 

function Hideimage()
{

    let img = document.getElementById("output");
    img.style.display = "none"
}

// clear canvas 

function clearcanvas()
{
    p.clearRect(0, 0, canvas.width, canvas.height);
}

// web camp...



// stop only camera
function stopVideoOnly(stream) {
    stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

// stop only mic
function stopAudioOnly(stream) {
    stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'audio') {
            track.stop();
        }
    });
}
function getvideo(){
   
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localMediaStream =>{
       
        var video = document.getElementsByClassName("vi")[0];
  
        video.style.display = "inline";
      
        video.srcObject = localMediaStream; 
      video.play(); 
      console.log("video started....");
    }).catch(
        err=>{
            console.log(err);
        }
    );
   
    
}

var webcam = false;

function webcamera(){
    
    webcam = !webcam;
   
    var control = document.getElementById("webcamcontrol");
   
    control.innerHTML = webcam ? "Disable webcam" : "enable Webcam";
    if(webcam == true) {
     
        getvideo();
        
    }
   else {
        console.log(webcam);
      
    
        var video = document.getElementsByClassName("vi")[0];
        var str = video.srcObject.getTracks();

        str.forEach(function(t){
            t.stop();
        });

        video.pause();
        video.src = "";
        video.style.display = "none";
        
    }
    
}



