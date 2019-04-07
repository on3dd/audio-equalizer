let song;
let fft;

let songId = 0;
let w;

// const prevBtn = document.querySelector('#prev-track');
// prevBtn.onclick = playPrev;

// const nextBtn = document.querySelector('#next-track');
// nextBtn.onclick = playNext;

// const pauseBtn = document.querySelector('#pause');
// pauseBtn.onclick = togglePlay;

const songName = document.querySelector('#song-details__name'); 
const songAuthor = document.querySelector('#song-details__author');
let songCover;

// function getColor() {

// }


// function drawEq() {
//   clear();
//   let spectrum = fft.linAverages(64);
//   noStroke();
//   fill('rgba(255,30,30, .75)'); 
//   for (let i = 0; i< spectrum.length; i++){
//     let amp = spectrum[i];
//     let y = map(amp, 0, 256, height, 0);
//     let h = -height + map(amp, 0, 255, height, 0);
//     if ((h >= -2)) {
//       if (h > 2*(-height + map(spectrum[i-1], 0, 255, height, 0))) {
//         h = 0.5*(-height + map(spectrum[i-1], 0, 255, height, 0)) - 2;
//       }
//       else {
//         h = -2;
//       }
//     }
//     rect(i * w, height, w - 3, h);
//   }
// }

let sketch1 = function(p) {

    p.preload = function() {
      song = p.loadSound(tracks[songId].url);
      songName.textContent = tracks[songId].name;
      songAuthor.textContent = tracks[songId].author;
      songCover = tracks[songId].img;
    }
  
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth - 400, 250);
      canvas.parent('canvas-holder');
      song.setVolume(.1);
      //song.play();
      fft = new p5.FFT(0.8, 1024);
      w = p.width / 64;
    }
  
    p.draw = function() {
      // let spectrum = fft.analyze();
      fft.analyze();
      let spectrum = fft.linAverages(64);
      p.drawEq();
    
      if ((song.isLoaded()) && (!song.isPlaying()) && (!song.isPaused())){
        song.play();
      }
      // song.onended(playNext);
    }
    p.drawEq = function() {
      p.clear();
      let spectrum = fft.linAverages(64);
      p.noStroke();
      p.fill('rgba(255,30,30, .75)'); 
      for (let i = 0; i< spectrum.length; i++){
        let amp = spectrum[i];
        let y = p.map(amp, 0, 256, p.height, 0);
        let h = -p.height + p.map(amp, 0, 255, p.height, 0);
        if ((h >= -2)) {
          if (h > 2*(-p.height + p.map(spectrum[i-1], 0, 255, p.height, 0))) {
            h = 0.5*(-p.height + p.map(spectrum[i-1], 0, 255, p.height, 0)) - 2;
          }
          else {
            h = -2;
          }
        }
        p.rect(i * w, p.height, w - 3, h);
      }
    }
    p.togglePlay = function() {
      if (song.isPlaying()) {
        song.pause();
        p.noLoop();
      } else {
        song.loop();
        p.loop();
      }
    }
    
    p.playPrev = function() {
      if (songId > 0) {
        songId--;
        p.changeSong();
        p.changeData();
      } else {
        console.log('fuck you amerika');
      }
    }
    
    p.playNext = function() {
      if (songId < tracks.length - 1) {
        songId++;
        p.changeSong();
        p.changeData();
      } else {
        console.log('fuck you amerika');
      }
    }
    
    p.changeSong = function() {
      song.stop();
      song = p.loadSound(tracks[songId].url);
      song.setVolume(.1);
    }

    p.changeData = function() {
      songName.textContent = tracks[songId].name;
      songAuthor.textContent = tracks[songId].author;
      songCover = tracks[songId].img;
      coverSketch.redraw();
    }
}

let sketch2 = function(p) {
  let cover;

  p.preload = function() {
    cover = p.loadImage(songCover);
  }

  p.setup = function() {
    let canvas = p.createCanvas(100, 100);
    canvas.parent('cover-canvas');
    p.image(cover, 0, 0, p.width, p.height);
  }

  p.getColor = function() {
    p.loadPixels();
     let r = 0, g = 0, b = 0;
     let color;

     for (let i = 0; i < p.pixels.length; i += 4) {
       r += p.pixels[i];
       g += p.pixels[i + 1];
       b += p.pixels[i + 2];
     }

     r /= (p.pixels.length/4);
     g /= (p.pixels.length/4);
     b /= (p.pixels.length/4);

     return [Math.ceil(r), Math.floor(g), Math.floor(b)];
  }

  p.changeCover = function() {
    console.log('пизда');
    console.log(cover);
    p.redraw();
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

coverSketch.getColor = function() {
  coverSketch.loadPixels();
   let r = 0, g = 0, b = 0;
   let color;

   for (let i = 0; i < p.pixels.length; i += 4) {
     r += coverSketch.pixels[i];
     g += coverSketch.pixels[i + 1];
     b += coverSketch.pixels[i + 2];
   }

   r /= (coverSketch.pixels.length/4);
   g /= (coverSketch.pixels.length/4);
   b /= (coverSketch.pixels.length/4);

   return [Math.ceil(r), Math.ceil(g), Math.ceil(b)];
}



// songName.textContent.onchange = coverSketch.changeCover;

// function preload() {
//   song = loadSound(tracks[songId].url);
//   songName.textContent = tracks[songId].name;
//   songAuthor.textContent = tracks[songId].author;
//   songCover.src = tracks[songId].img;
// }

// function setup() {
//   let canvas = createCanvas(windowWidth - 400, 250);
//   canvas.parent('canvas-holder');
//   song.setVolume(.1);
//   //song.play();
//   fft = new p5.FFT(0.8, 1024);
//   w = width / 64;
// }

// function draw(){

//   // let spectrum = fft.analyze();
//   fft.analyze();
//   let spectrum = fft.linAverages(64);
//   drawEq();

//   if ((song.isLoaded()) && (!song.isPlaying()) && (!song.isPaused())){
//     song.play();
//   }
//   // song.onended(playNext);
// }

// function togglePlay() {
//   if (song.isPlaying()) {
//     song.pause();
//     noLoop();
//   } else {
//     song.loop();
//     loop();
//   }
// }

// function playPrev() {
//   if (songId > 0) {
//     songId--;
//     changeSong();
//     changeData();
//   } else {
//     console.log('fuck you amerika');
//   }
// }

// function playNext() {
//   if (songId < tracks.length - 1) {
//     songId++;
//     changeSong();
//     changeData();
//   } else {
//     console.log('fuck you amerika');
//   }
// }

// function changeSong() {
//   song.stop();
//   song = loadSound(tracks[songId].url);
//   song.setVolume(.1);
// }

// function changeData() {
//   songName.textContent = tracks[songId].name;
//   songAuthor.textContent = tracks[songId].author;
//   songCover.src = tracks[songId].img;
// }