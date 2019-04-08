let song;
let fft;

let songId = 0;
let w;

const songName = document.querySelector('#song-details__name');
const songAuthor = document.querySelector('#song-details__author');

let songCover;
let mainColor = [255, 255, 255];
let oldColor = [255, 255, 255];

const colors = [
  [255, 30, 30],
  [30, 255, 30],
  [30, 30, 255]
]

function arraysEqual(a, b) {
  if (a === b) { return true };
  if (a == null || b == null) { return false }
  if (a.length != b.length) { return false };

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false }
  }
  return true;
}

let sketch1 = function (p) {

  p.preload = function () {
    song = p.loadSound(tracks[songId].url);
    songName.textContent = tracks[songId].name;
    songAuthor.textContent = tracks[songId].author;
    songCover = tracks[songId].img;
  }

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth - 400, 250);
    canvas.parent('canvas-holder');
    song.setVolume(.1);
    fft = new p5.FFT(0.8, 1024);
    w = p.width / 53;
  }

  p.draw = function () {
    fft.analyze();
    let spectrum = fft.linAverages(64);
    p.drawEq();

    if ((song.isLoaded()) && (!song.isPlaying()) && (!song.isPaused())) {
      song.play();
    }
    // song.onended(playNext);
  }
  p.drawEq = function () {
    p.clear();
    let spectrum = fft.linAverages(64);
    p.noStroke();
    p.fill('rgba('+ mainColor[0] + ',' + mainColor[1] +',' + mainColor[2] +', .75)');

    for (let i = 0; i < spectrum.length; i++) {

      let amp = spectrum[i];
      let y = p.map(amp, 0, 256, p.height, 0);
      let h = -p.height + p.map(amp, 0, 255, p.height, 0);

      if ((h >= -2)) {
        h = -2;
      }
      p.rect(i * w, p.height, w - 3, h);
    }
  }

  p.togglePlay = function () {
    if (song.isPlaying()) {
      song.pause();
      p.noLoop();
    } else {
      song.loop();
      p.loop();
    }
  }

  p.playPrev = function () {
    if (songId > 0) {
      songId--;
      p.changeSong();
      p.changeData();
      coverSketch.changeCover();
    } else {
      console.log('fuck you amerika');
    }
  }

  p.playNext = function () {
    if (songId < tracks.length - 1) {
      songId++;
      p.changeSong();
      p.changeData();
      coverSketch.changeCover();
    } else {
      console.log('fuck you amerika');
    }
  }

  p.changeSong = function () {
    p.loop();
    song.stop();
    song = p.loadSound(tracks[songId].url);
    song.setVolume(.1);
  }

  p.changeData = function () {
    songName.textContent = tracks[songId].name;
    songAuthor.textContent = tracks[songId].author;
  }
}

let sketch2 = function (p) {

  let flag = true;

  p.preload = function () {
    songCover = p.loadImage(tracks[songId].img);
  }

  p.setup = function () {
    p.frameRate(30);
    let canvas = p.createCanvas(100, 100);
    canvas.parent('cover-canvas');
  }

  p.draw = function () {

    p.image(songCover, 0, 0, p.width, p.height);

    p.getMainColor();

    if (!colors.includes(mainColor)) {
      p.setMainColor();
    }
  }

  p.changeCover = function () {
    flag = !flag;
    oldColor = mainColor;
    songCover = p.loadImage(tracks[songId].img);
    p.image(songCover, 0, 0, p.width, p.height);
    p.redraw();
  }

  p.getColor = function () {
    coverSketch.loadPixels();
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < p.pixels.length; i += 4) {
      r += coverSketch.pixels[i];
      g += coverSketch.pixels[i + 1];
      b += coverSketch.pixels[i + 2];
    }

    r /= (coverSketch.pixels.length / 4);
    g /= (coverSketch.pixels.length / 4);
    b /= (coverSketch.pixels.length / 4);

    return [Math.ceil(r), Math.ceil(g), Math.ceil(b)];
  }

  p.getMainColor = function() {
    try {
      if (arraysEqual(mainColor, oldColor)) {
        mainColor = p.getColor();
      }
      else {
        if (flag) {
          p.setMainColor();
          flag = !flag;
        }
      }
    }
    catch {
      console.log('блять обама');
    }
  }

  p.setMainColor = function() {
    if ((mainColor[0] > mainColor[1]) && (mainColor[0] > mainColor[2])) {
      mainColor = [255, 30, 30];
    }
    if ((mainColor[1] > mainColor[0]) && (mainColor[1] > mainColor[2])) {
      mainColor = [30, 255, 30];
    }
    if ((mainColor[2] > mainColor[0]) && (mainColor[2] > mainColor[1])) {
      mainColor = [30, 30, 255];
    }
    // console.log(mainColor);
  }
}


let eqSketch = new p5(sketch1);
let coverSketch = new p5(sketch2);


let prevBtn = document.querySelector('#prev-track');
prevBtn.onclick = eqSketch.playPrev;

let nextBtn = document.querySelector('#next-track');
nextBtn.onclick = eqSketch.playNext;

let pauseBtn = document.querySelector('#pause');
pauseBtn.onclick = eqSketch.togglePlay;

// function getColor() {
//   coverSketch.loadPixels();
//    let r = 0, g = 0, b = 0;
//    let color;

//    for (let i = 0; i < p.pixels.length; i += 4) {
//      r += coverSketch.pixels[i];
//      g += coverSketch.pixels[i + 1];
//      b += coverSketch.pixels[i + 2];
//    }

//    r /= (coverSketch.pixels.length/4);
//    g /= (coverSketch.pixels.length/4);
//    b /= (coverSketch.pixels.length/4);

//    return [Math.ceil(r), Math.ceil(g), Math.ceil(b)];
// }

