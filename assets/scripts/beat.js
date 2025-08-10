const btn = document.getElementById("continueBtn");
const audio = document.getElementById("music");
const character = document.querySelector(".character");

let audioContext, source, analyser, dataArray, lastPeak = 0;

btn.addEventListener("click", async () => {
    btn.style.display = "none"; // Ocultar botón

    audio.play(); // Reproduce la música

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume(); // Asegura que el contexto esté activo

    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    detectBeats();
});

function detectBeats() {
    requestAnimationFrame(detectBeats);

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    let average = sum / dataArray.length;

    if (average > 150 && Date.now() - lastPeak > 200) {
        lastPeak = Date.now();
        triggerFlash();
    }
}

function triggerFlash() {
    character.classList.add("flash");
    setTimeout(() => {
        character.classList.remove("flash");
    }, 100);
}