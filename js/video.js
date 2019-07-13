// import AgoraRTC from 'agora-rtc-sdk'


// helper to catch errors
let handleFail = function(err){
    console.log("Error: ", err);
};

let remoteContainer = document.getElementById("remote-container");
let canvasContainer = document.getElementById("canvas-container");

// helper function to add video stream to remote-container div
function addVideoStream(streamId){
    let streamDiv = document.createElement("div"); // Create a new div for every stream
    streamDiv.id = streamId; // Assigning id to div
    streamDiv.style.transform = "rotateY(180deg)"; // Takes care of lateral inversion (mirror image)
    remoteContainer.appendChild(streamDiv); //Add new div to container
}

// helper function to remove stream from remote-container div
function removeVideoStream(evt){
    let stream = evt.stream;
    stream.stop();
    let remDiv = document.getElemenbyById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);
    console.log("Remote stream is removed " + stream.getId());
}

// helper function to render video stream to canvas
function addCanvas(streamId){
    let video = document.getElementById('video${streamId}');
    let canvas = document.createElement("canvas");
    canvasContainer.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', function(){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    video.addEventListener('play', function(){
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                if($this.width !== canvas.width){
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }
                ctx.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // 30fps
            }
        })();
    }, 0);
}

let client = AgoraRTC.createClient({
    mode: 'live',
    codec: 'h264'
});

client.init("e96f19842ed049e083fe3d99fa37f0bf", ()=>console.log("Client initialized !"));
client.join(null, 'agora-demo', null, (uid)=>{
    let localStream = AgoraRTC.createStream({
        streamId: uid,
        audio: true,
        video: true,
        screen: false

    });

    localStream.init(function (){
        localStream.play('me');
        client.publish(localStream, handleFail);

        client.on('stream-added', function(evt){
            client.subscribe(evt.stream, handleFail);
        });

        client.on('stream-subscribed', function(evt){
            let stream = evt.stream;
            addVideoStream(stream.getId());
            stream.play(stream.getId());
            addCanvas(stream.getId());
        });

        client.on('stream-removed', removeVideoStream);
    }, handleFail)
}, handleFail);