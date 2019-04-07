let song;
let fft;

let songId = 0;
let w;

const prevBtn = document.querySelector('#prev-track');
prevBtn.onclick = playPrev;

const nextBtn = document.querySelector('#next-track');
nextBtn.onclick = playNext;

const pauseBtn = document.querySelector('#pause');
pauseBtn.onclick = togglePlay;

const songName = document.querySelector('#song-details__name'); 
const songAuthor = document.querySelector('#song-details__author');
const songCover = document.querySelector('#cover');


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
  song = loadSound(tracks[songId].url);
}

changeData()

function setup() {
  let canvas = createCanvas(windowWidth - 400, 250);
  canvas.parent('canvas-holder');
  song.setVolume(.1);
  //song.play();
  fft = new p5.FFT(0.8, 1024);
  w = width / 64;
}

function draw(){

  // let spectrum = fft.analyze();
  fft.analyze();
  let spectrum = fft.linAverages(64);
  drawEq();

  if ((song.isLoaded()) && (!song.isPlaying()) && (!song.isPaused())){
    song.play();
  }
  song.onended(playNext);
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

function playPrev() {
  if (songId > 0) {
    songId--;
    changeSong();
    changeData();
  } else {
    console.log('fuck you amerika');
  }
}

function playNext() {
  if (songId < tracks.length - 1) {
    songId++;
    changeSong();
    changeData();
  } else {
    console.log('fuck you amerika');
  }
}

function changeSong() {
  song.stop();
  song = loadSound(tracks[songId].url);
  song.setVolume(.1);
}

function changeData() {
  songName.textContent = tracks[songId].name;
  songAuthor.textContent = tracks[songId].author;
  songCover.src = tracks[songId].img;
}