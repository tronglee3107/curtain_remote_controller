// Controll ON/OFF button
function controlButton() {
    //get the value of button ON/OFF
    var button_state = document.querySelector('.slider')
    var style = window.getComputedStyle(button_state, ":after").content;

    //if button is on, auto mode is on then we will disable manual button
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

// control Open/Close Button
function controlOpenButton() {
    document.getElementById('state').innerText = "Opening";
    document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
    document.getElementById("button_one").style.backgroundColor = "rgba(24, 231, 24, 0.515)";

    setTimeout(() => {
        document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById('state').innerText = "Opened";

    }, 5000);


}


function controlCloseButton() {
    document.getElementById('state').innerText = "Closing";
    document.getElementById("button_one").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
    document.getElementById("button_two").style.backgroundColor = "rgba(223, 32, 32, 0.64)";
    setTimeout(() => {
        document.getElementById("button_two").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        document.getElementById('state').innerText = "Closed";

    }, 5000);
}


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

$(document).ready(function () {
    console.log("hello")
    var database = firebase.database();
    var autoMode;
    var action;
    // database.ref().on("value", function(snap){
    // 	autoMode = snap.val().autoMode;
    // 	if(autoMode == 1){
    // 		document.getElementById("unact").style.display = "none";
    // 		document.getElementById("act").style.display = "block";
    // 	} else {
    // 		document.getElementById("unact").style.display = "block";
    // 		document.getElementById("act").style.display = "none";
    // 	}
    // });

    $("#toggle").click(function () {
        console.log("This is the testing line")
        var firebaseRef = firebase.database().ref().child("autoMode");

        if (autoMode == 1) {
            firebaseRef.set(0);
            autoMode = 0;
        } else {
            firebaseRef.set(1);
            autoMode = 1;
        }
    });
    
    $("#button_one").click(function () {
        console.log("This is button one")
        var firebaseRef = firebase.database().ref().child("action");
        firebaseRef.set(0) //open curtain
        
    });

    $("#button_two").click(function () {
        console.log("This is button two")
        var firebaseRef = firebase.database().ref().child("action");
        firebaseRef.set(1) //close curtain
        
    });


});