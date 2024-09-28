let Songs;
function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad with leading zeros if needed
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
const totalSeconds = 90; // Change this value as needed
const formattedTime = secondsToMinutesAndSeconds(totalSeconds);

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}
const currentsong = new Audio();
const playMusic = (track) => {
    currentsong.src = "/songs/" + track;
    currentsong.play();
    play.src = "/allsvg/pause.svg";
    document.querySelector(".info").innerHTML = track;
    document.querySelector(".duration").innerHTML = "00:00";
}
async function main() {
    Songs = await getsongs();
    let songlist = document.querySelector(".song").getElementsByTagName("ul")[0];
    for (const songall of Songs) {
        songlist.innerHTML = songlist.innerHTML + `
        <li>
                                <img class="invert radio" src="/allsvg/songmusic.svg" alt="">
                               <div>${songall.replaceAll("%20", " ")}</div>
                                <img class="invert playSong" src="/allsvg/play button.svg" alt="">
                            </li>`;
    }
    Array.from(document.querySelector(".song").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.getElementsByTagName("div")[0].innerHTML.trim());
        })
    })
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "/allsvg/pause.svg";
        } else {
            currentsong.pause();
            play.src = "/allsvg/play button.svg";
        }
    })
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".duration").innerHTML = `${secondsToMinutesAndSeconds(currentsong.currentTime).split(".")[0]}/
        ${secondsToMinutesAndSeconds(currentsong.duration).split(".")[0]}`;
        document.querySelector(".circle").style.left = ((currentsong.currentTime / currentsong.duration) * 100 + "%");
    })

    document.querySelector(".seekbar"), addEventListener("dblclick", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = (percent + "%");
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".right-box").style.right = "0%";
    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".right-box").style.right = "-100%";
    })
    next.addEventListener("click", () => {
        let index = Songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        console.log(index);
        if ((index + 1) > length) {
            playMusic(Songs[index + 1].replaceAll("%20", " "));
        }
    })
    back.addEventListener("click", () => {
        let index = Songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        console.log(index);
        if ((index - 1) > 0) {
            playMusic(Songs[index - 1].replaceAll("%20", " "));
        }
    })
}
main();
function album(songname, img, artistname, songurl) {
    let html = `
   <div class="song-cont">
  <div class="songbox">
                <div class="card">
                    <img src="${img}" alt="">
                    <div class="songName">${songname}</div>
                    <div class="artistName">${artistname}</div>
              
                </div>      </div>
            </div>`
    let element = document.createElement("div");
    element.innerHTML = html;
    element.addEventListener("click", () => {
        playMusic(songurl.replaceAll("%20", " "));
    });
    document.querySelector(".song-cont").appendChild(element);
}
album("52 Bars", "/allimg/karan1.jpeg", "Karan Aujla", "52%20Bars-KARAN%20AUJLA.mp3");
album("Players", "allimg/karan3.jpeg", "Karan Aujla","Karan%20Aujla%20-%20Players.mp3");
album("Bachke Bachke", "allimg/karan2.jpeg", "Karan Aujla","Bachke%20Bachke-Karan%20Aujla.mp3");
album("Chitta Kurta", "allimg/karan4.jpg", "Karan Aujla","Chitta%20Kurta%20Karan%20Aujla.mp3");
album("Game Over", "allimg/karan5.jpg", "Karan Aujla","Game%20Over%20Karan%20Aujla.mp3");
album("Goin Off", "allimg/karan6.jpg", "Karan Aujla","Goin%20Off%20Karan%20Aujla.mp3");
album("100 Million", "allimg/karan7.jpg", "Karan Aujla","100%20Million%20-KARAN%20AUJLA.mp3");
album("It Ain't Legal", "allimg/karan8.jpg", "Karan Aujla","KARAN-%20IT%20AIN'T%20LEGAL.mp3");
album("Take It Easy", "allimg/karan9.webp", "Karan Aujla","Take%20It%20Easy%20Karan%20Aujla.mp3");
