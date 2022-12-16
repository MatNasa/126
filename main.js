left_x = 0 ;
left_y = 0 ;
right_x = 0 ; 
right_y = 0 ;
song_left = "" ;
song_right = "" ;
status_song_right = "" ;
status_song_left = "" ;
score_left = 0 ;
score_right = 0 ;

function preload () {
    song_left = loadSound("music.mp3") ;
    song_right = loadSound("badhabits.mp3") ;
}

function setup () {
    canvas = createCanvas( 600, 500 );
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet( video, modelLoaded );
    poseNet.on('pose', gotposes);
}

function modelLoaded() {
    console.log("el modelo poseNet ha iniciado");
}

function gotposes(results) {
    if (results.length>0) {
        score_right = results[0].pose.keypoints[10].score;
        score_left = results[0].pose.keypoints[9].score;
        console.log("el puntaje de la muñeca derecha es: " + score_right);
        console.log("el puntaje de la muñeca izquierda es: " + score_left);
        right_x = results[0].pose.rightWrist.x ;
        right_y = results[0].pose.rightWrist.y ;
        console.log("la posicion x de tu muñeca derecha es: " + right_x + "y la posicion y de tu muñeca derecha es: " + right_y);
        left_x = results[0].pose.leftWrist.x ;
        left_y = results[0].pose.leftWrist.y ;
        console.log("la posicion x de tu muñeca izquierda es: " + left_x + "y la posicion y de tu muñeca izquierda es: " + left_y);
    }
}

function draw () {
    image(video, 0, 0, 600, 500);

    status_song_left = song_left.isPlaying();
    status_song_right = song_right.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if (score_left > 0.2) {
        circle(left_x, left_y, 20);

        song_left.stop();

        if (status_song_left == false) {
            song_left.play();
            document.getElementById("cancion").innerHTML = "Reproduciendo : cancion de harry potter";
        }
    }

    if (score_right > 0.2) {
        circle(right_x, right_y, 20);

        song_right.stop();

        if (status_song_right == false) {
            song_right.play();
            document.getElementById("cancion").innerHTML = "Reproduciendo : cancion de bad habits";
        }
    }
}

function play () {
    song.play();
    song.setVolume( 1 );
    song.rate( 1 )  ;  
}
