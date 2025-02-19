const songsList = [
    {
        name: "محمد عبده",
        artist: "جرح العيون",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "محمد عبده",
        artist: "تدري أحبك ولا ارضى",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "نواف الجبرتي",
        artist: "يا غايبة",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    },
    {
        name: "عبد المجيد عبدالله",
        artist: "أذهلتني",
        src: "assets/4.mp3",
        cover: "assets/4.jpg"
    },
    {
        name: "محمد عبده",
        artist: "من يقول الزين مايكمل حلاه",
        src: "assets/5.mp3",
        cover: "assets/5.jpg"
    }
];


const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');
const volumeUpBtn = document.getElementById('volumeUp');
const volumeDownBtn = document.getElementById('volumeDown');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
    volumeUpBtn.addEventListener('click', increaseVolume);
    volumeDownBtn.addEventListener('click', decreaseVolume);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}

function increaseVolume() {
    if (song.volume < 1.0) {
        song.volume = Math.min(1, song.volume + 0.1);
    }
}

function decreaseVolume() {
    if (song.volume > 0.0) {
        song.volume = Math.max(0, song.volume - 0.1);
    }
}
