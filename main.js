let song;
let fft;

let w;

function preload() {
  song = loadSound('assets/feint-time-bomb.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth - 400, windowHeight - 300);
  canvas.parent('canvas-holder');
  background('#eeeeee');
  canvas.mouseClicked(togglePlay);
  song.setVolume(.1);
  song.play();
  let columns = 64;
  fft = new p5.FFT(0.85, columns);
  w = width / columns;
}

function draw(){
  background(0);

  var spectrum = fft.analyze();
  //strokeWeight(5);
  noStroke();
  fill(255,30,30); // spectrum is green
  for (let i = 0; i< spectrum.length; i++){
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    let h = -height + map(amp, 0, 255, height, 0);
    if (h >= -2) {
      h = -2;
    }
    rect(i * w, height, w - 3, h);
  }
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.loop();
    loop();
  }
}