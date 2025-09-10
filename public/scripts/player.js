import WaveSurfer from 'wavesurfer.js';

const songChips = document.querySelectorAll("[data-song]");
const songTextBlock = document.getElementById("category-text");
const mainPlay = document.getElementById("mainPlay");
const tt = document.getElementById("turntable");
const icon = document.getElementById("playIcon");
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");
const audio = document.getElementById("audio");

let currentSrc = "/songs/dontlookback.mp3";

const waveformContainer = document.getElementById('waveform');
const wavesurfer = WaveSurfer.create({
    container: waveformContainer,
    waveColor: '#ccc',
    progressColor: 'black',
    cursorColor: '#fff',
    height: 60,
    barWidth: 2,
    responsive: true,
});
wavesurfer.load(currentSrc);

mainPlay?.addEventListener("click", () => {
    wavesurfer.playPause();
    if (wavesurfer.isPlaying()) {
        tt?.classList.add("is-playing");
        icon.src = "/images/pause.svg";
    } else {
        tt?.classList.remove("is-playing");
        icon.src = "/images/play.svg";
    }
});

document.querySelectorAll(".playlist").forEach((item) => {
    const src = item.dataset.src;
    const songBtn = item.querySelector(".songPlay img");

    item.querySelector(".songPlay")?.addEventListener("click", () => {
        if (!src) return;

        if (src === currentSrc && !audio.paused) {
            audio.pause();
            songBtn.src = "/images/play.svg";
            return;
        }

        if (src !== currentSrc) {
            audio.src = src;
            currentSrc = src;
        }

        document.querySelectorAll(".songPlay img").forEach((btnIcon) => {
            btnIcon.src = "/images/play.svg";
        });

        audio.play();
        songBtn.src = "/images/pause.svg";
    });
});

audio.addEventListener("ended", () => {
    document.querySelectorAll(".songPlay img").forEach((btnIcon) => {
        btnIcon.src = "/images/play.svg";
    });
});

if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
        const value = e.target.value;
        wavesurfer.setVolume(value / 100);
        audio.volume = value / 100;

        if (value == 0) {
            volumeIcon.src = "/images/volume-mute-svgrepo-com.svg";
        } else if (value < 60) {
            volumeIcon.src = "/images/volume-medium-svgrepo-com.svg";
        } else {
            volumeIcon.src = "/images/volume-high-svgrepo-com.svg";
        }
    });
    volumeSlider.value = wavesurfer.getVolume() * 100;
}

const songInfo = {
    "Stop Crying Your Heart Out":
        "When I listen to Stop Crying Your Heart Out, it feels less like a song and more like a message from something greater than myself — as if a higher being is speaking directly to me through the words. The repeated phrase isn’t just comfort, it’s instruction: that I have to endure, that I must carry the weight of my struggles with resilience, and that in time, moving on is not just possible but necessary. It’s a song that doesn’t sugarcoat grief or pain, but instead meets me in the middle of it, demanding strength in the face of despair. In its soaring chorus I hear not weakness but resolve, a reminder that even if I falter, the world keeps moving, and I have no choice but to toughen myself and grow into someone stronger than who I was yesterday.",
    Nuts:
        "Nuts opens with the line “I can see it in your eyes that you wanna get out,” and it drags me back into a place I thought I had long escaped but never truly left behind. It speaks to the darkness I carried — the unspoken pain I still wear beneath the surface. Every time I hear it, I can’t help but wish someone, anyone, could look deep enough to recognize it, to see through the facade and acknowledge the cracks. It’s a haunting reminder of that silent plea for understanding, that hope that one day I won’t need to explain myself because the truth will already be visible in my eyes. The song keeps that memory alive, not to torment me, but to remind me of what I survived and what I continue to endure.",
    K:
        "The song K is inseparable from the memory of someone who once made the world feel like it revolved around the two of us. Those first few months were filled with a dizzying intimacy, where nothing else seemed to matter — not responsibilities, not fears, not even the future. It was the kind of connection that convinced me, however briefly, that eternity could exist in stolen moments. But like all things that burn too brightly, it couldn’t last. When I listen to it now, it’s like reopening a diary from that time: the passion, the weight of feeling irreplaceable to someone else, and the inevitable heartbreak when that illusion cracked. K captures both the beauty of being chosen and the pain of learning that love, no matter how consuming, is never guaranteed to remain.",
    Sparks:
        "The first line of Sparks — “Did I drive you away?” — has always cut straight through me, because it reminds me of my father and of everyone I’ve ever held close who eventually left. It echoes that lingering belief I’ve carried for years: that maybe no one cares enough to stay, that I am destined to drive people away whether I intend to or not. The song becomes less about Coldplay’s quiet melancholy and more about the stories I attach to it — the empty seats at the table, the phone calls that stopped coming, the silence where voices used to be. It’s painful, yes, but it’s also honest; Sparks forces me to confront the fear of abandonment that I bury in my day-to-day life, making it both a wound and a mirror.",
    "I Don't Love You":
        "Listening to I Don’t Love You is like hearing his voice again — the same person who once made me feel like the center of his world in K, only now reminding me in brutal clarity of how it ended. The words sting because they aren’t abstract lyrics, but echoes of what he said to me, of how deeply it cut when affection turned into indifference. And yet, I keep this song close, not as a form of self-punishment, but as a talisman. By keeping it as one of my favorites, I remind myself that I cannot allow my heart to be broken in the same way again. It hurts to listen, but in that hurt there is resolve — a warning etched into melody that protects me from forgetting the lesson I had to learn the hardest way possible.",
};

songChips.forEach((chip) => {
    chip.addEventListener("click", () => {
        songChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const key = chip.dataset.song;
        songTextBlock.textContent = songInfo[key] || "Info not available.";
    });
});
