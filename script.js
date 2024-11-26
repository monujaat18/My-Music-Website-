let Songs;

function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad with leading zeros if needed
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Fetch songs from the JSON file
async function getsongs() {
    const response = await fetch("https://raw.githubusercontent.com/monujaat18/My-Music-Website-/main/songs.json");
    const data = await response.json();
    return data.songs;
}

const currentsong = new Audio();

const playMusic = (track) => {
    currentsong.src = track.url; // Use the URL from the JSON
    currentsong.play();
    play.src = "/allsvg/pause.svg"; // Ensure this path is correct
    document.querySelector(".info").innerHTML = track.name; // Use the song name from the JSON
    document.querySelector(".duration").innerHTML = "00:00";
}

async function main() {
    Songs = await getsongs();
    let songlist = document.querySelector(".song").getElementsByTagName("ul")[0];
    for (const song of Songs) {
        songlist.innerHTML += `
        <li>
            <img class="invert radio" src="/allsvg/songmusic.svg" alt="">
            <div>${song.name}</div>
            <img class="invert playSong" src="/allsvg/play button.svg" alt="">
        </li>`;
    }
    
    Array.from(document.querySelector(".song").getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(Songs[index]); // Pass the entire song object
        });
    });

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "/allsvg/pause.svg";
        } else {
            currentsong.pause();
            play.src = "/allsvg/play button.svg";
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".duration").innerHTML = `${secondsToMinutesAndSeconds(currentsong.currentTime).split(".")[0]}/
        ${secondsToMinutesAndSeconds(currentsong.duration).split(".")[0]}`;
        document.querySelector(".circle").style.left = ((currentsong.currentTime / currentsong.duration) * 100 + "%");
    });

    document.querySelector(".seekbar").addEventListener("dblclick", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = (percent + "%");
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".right-box").style.right = "0%";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".right-box").style.right = "-100%";
    });

    document.querySelector("#next").addEventListener("click", () => {
        let index = Songs.findIndex(song => song.url === currentsong.src);
        if (index + 1 < Songs.length) {
            playMusic(Songs[index + 1]);
        }
    });

    document.querySelector("#back").addEventListener("click", () => {
        let index = Songs.findIndex(song => song.url === currentsong.src);
        if (index - 1 >= 0) {
            playMusic(Songs[index - 1]);
        }
    });
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
          </div>
      </div>
   </div>`;
    let element = document.createElement("div");
    element.innerHTML = html;
    element.addEventListener("click", () => {
        playMusic({ name: songname, url: songurl }); // Pass an object with name and URL
    });
    document.querySelector(".song-cont").appendChild(element);
}

// Example usage of album function with JSON data
album("52 Bars", "/allimg/karan1.jpeg", "Karan Aujla", "52%20Bars-KARAN%20AUJLA.mp3");
album("Players", "allimg/karan3.jpeg", "Karan Aujla","Karan%20Aujla%20-%20Players.mp3");
album("Bachke Bachke", "allimg/karan2.jpeg", "Karan Aujla","Bachke%20Bachke-Karan%20Aujla.mp3");
album("Chitta Kurta", "allimg/karan4.jpg", "Karan Aujla","Chitta%20Kurta%20Karan%20Aujla.mp3");
album("Game Over", "allimg/karan5.jpg", "Karan Aujla","Game%20Over%20Karan%20Aujla.mp3");
album("Goin Off", "allimg/karan6.jpg", "Karan Aujla","Goin%20Off%20Karan%20Aujla.mp3");
album("100 Million", "allimg/karan7.jpg", "Karan Aujla","100%20Million%20-KARAN%20AUJLA.mp3");
album("It Ain't Legal", "allimg/karan8.jpg", "Karan Aujla","KARAN-%20IT%20AIN'T%20LEGAL.mp3");
album("Take It Easy", "allimg/karan9.webp", "Karan Aujla","Take%20It%20Easy%20Karan%20Aujla.mp3");
