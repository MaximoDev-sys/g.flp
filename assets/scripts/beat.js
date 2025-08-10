const audio = document.getElementById("music");
const character = document.querySelector(".character");

let audioContext, source, analyser, dataArray, lastPeak = 0;

audio.addEventListener('play', () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        detectBeats();
    }
});

function detectBeats() {
    requestAnimationFrame(detectBeats);

    analyser.getByteFrequencyData(dataArray);

    // Volumen promedio
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    let average = sum / dataArray.length;

    // Detecta pico (beat) si el volumen supera cierto umbral y pasó algo de tiempo desde el último
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