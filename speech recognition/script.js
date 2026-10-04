let recognition;

// Check browser support
if ("webkitSpeechRecognition" in window) {

    recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = function() {

        document.getElementById("status").innerHTML =
            "Status: 🎤 Listening...";

    };

    recognition.onresult = function(event) {

        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {

            let transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalText += transcript + " ";
            }
        }

        document.getElementById("result").value += finalText;
    };

    recognition.onerror = function(event) {

        document.getElementById("status").innerHTML =
            "Error: " + event.error;
    };

    recognition.onend = function() {

        document.getElementById("status").innerHTML =
            "Status: Ready";
    };

} else {

    document.getElementById("status").innerHTML =
        "Speech recognition is not supported in this browser.";
}


// Start speech recognition
function startRecognition() {

    if (recognition) {
        recognition.start();
    }
}


// Stop speech recognition
function stopRecognition() {

    if (recognition) {
        recognition.stop();

        document.getElementById("status").innerHTML =
            "Status: Stopped";
    }
}


// Clear text
function clearText() {

    document.getElementById("result").value = "";

    document.getElementById("status").innerHTML =
        "Status: Ready";
}