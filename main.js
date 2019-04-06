let song;
let fft;

let w;

function drawEq() {
  clear();
  let spectrum = fft.linAverages(64);
  noStroke();
  fill('rgba(255,30,30, .75)'); 
  for (let i = 0; i< spectrum.length; i++){
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    let h = -height + map(amp, 0, 255, height, 0);
    if ((h >= -2)) {
      if (h > 2*(-height + map(spectrum[i-1], 0, 255, height, 0))) {
        h = 0.5*(-height + map(spectrum[i-1], 0, 255, height, 0)) - 2;
      }
      else {
        h = -2;
      }
    }
    rect(i * w, height, w - 3, h);
  }
}

function preload() {
  song = loadSound('assets/feint-time-bomb.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth - 400, 250);
  canvas.parent('canvas-holder');
  canvas.mouseClicked(togglePlay);
  song.setVolume(.1);
  song.play();
  fft = new p5.FFT(0.8, 1024);
  w = width / 64;
}

function draw(){

  // let spectrum = fft.analyze();
  fft.analyze();
  let spectrum = fft.linAverages(64);
  drawEq();
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.loop();
    loop();
  }
}