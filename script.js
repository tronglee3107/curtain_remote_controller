//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3LYR7axlF2QC8iu-lL5HkyjUwdCPobHs",
    authDomain: "curtain-controller-7ebbd.firebaseapp.com",
    databaseURL: "https://curtain-controller-7ebbd-default-rtdb.firebaseio.com",
    projectId: "curtain-controller-7ebbd",
    storageBucket: "curtain-controller-7ebbd.appspot.com",
    messagingSenderId: "428881873348",
    appId: "1:428881873348:web:8e5d688ef7d470eaf13c91",
    measurementId: "G-E201D6STNH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//update data in firebase realtime database based on UI
$(document).ready(function () {

    var autoMode;
    //Store data of auto mode
    // 0: auto, 1: manual
    $("#toggle").click(function () {
        var firebaseRef = firebase.database().ref().child("autoMode");
        if (autoMode == 1) {
            firebaseRef.set(0);
            autoMode = 0;
        } else {
            firebaseRef.set(1);
            autoMode = 1;
        }
    });
    //store data of action
    // 0: open, 1: close
    $("#button_one").click(function () {
        var firebaseRef = firebase.database().ref().child("action");
        firebaseRef.set(0) //open curtain

    });

    $("#button_two").click(function () {
        var firebaseRef = firebase.database().ref().child("action");
        firebaseRef.set(1) //close curtain
    });
});

// Controll ON/OFF button state
function controlButton() {
    //get the value of button ON/OFF
    var button_state = document.querySelector('.slider')
    var style = window.getComputedStyle(button_state, ":after").content;

    //If the auto mode is on -> disable Open/close button.
    if (style == '"ON"') {
        document.getElementById("button_one").disabled = true;
        document.getElementById("button_two").disabled = true;
        document.getElementById("button_one").style.backgroundColor = "rgba(21, 3, 3, 0.25)";
        document.getElementById("button_two").style.backgroundColor = "rgba(21, 3, 3, 0.25)";
        document.getElementById('state').innerText = "AUTO";
    }
    else {
        document.getElementById("button_one").disabled = false;
        document.getElementById("button_two").disabled = false;
        document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById('state').innerText = "MANUAL";
    }
}

var onOffButton = "";
// Control Open/Close Button state

function controlOpenButton() {
    if (onOffButton == 0) {
        document.getElementById('state').innerText = "Opening";
        document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById("button_one").style.backgroundColor = "rgba(24, 231, 24, 0.515)";

        setTimeout(() => {
            document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            document.getElementById('state').innerText = "Opened";

        }, 5000);
        onOffButton =1;
    }
    else{
        document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById("button_one").style.backgroundColor = "rgba(195, 208, 6, 0.848)";

        setTimeout(() => {
            document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            document.getElementById('state').innerText = "Opened";

        }, 2000);
    }
}


function controlCloseButton() {
    if (onOffButton == 1){
        document.getElementById('state').innerText = "Closing";
        document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById("button_two").style.backgroundColor = "rgba(223, 32, 32, 0.64)";
        setTimeout(() => {
            document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            document.getElementById('state').innerText = "Closed";
        }, 5000);
        onOffButton = 0;
    }
    else{
        document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById("button_two").style.backgroundColor = "rgba(195, 208, 6, 0.848)";
        setTimeout(() => {
            document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            document.getElementById('state').innerText = "Closed";
        }, 2000);
    }
    
}


