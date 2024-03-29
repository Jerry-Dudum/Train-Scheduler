$(document).ready(function () {
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKd9dUWojUS8agnkFTkUT48BJt9J8q2MM",
    authDomain: "train-scheduler-b2f2c.firebaseapp.com",
    databaseURL: "https://train-scheduler-b2f2c.firebaseio.com",
    projectId: "train-scheduler-b2f2c",
    storageBucket: "",
    messagingSenderId: "384480561690",
    appId: "1:384480561690:web:caf699376c280269a89fa3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-button").on("click", function(event){

    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destinationName: destinationName,
        time: time,
        frequency: frequency
    });

    trainName = $("#train-name-input").val("");
    destinationName = $("#destination-input").val("");
    time = $("#time-input").val("");
    frequency = $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnap) {

    console.log(childSnap.val().trainName);
    console.log(childSnap.val().destinationName);
    console.log(childSnap.val().time);
    console.log(childSnap.val().frequency);

    //Need to incorporate moment js to get newArrival and newMinutes

    var newTrain = $("<tr>");
    var newName = $("<td scope='col'>").text(childSnap.val().trainName);
    var newDestination = $("<td scope='col'>").text(childSnap.val().destinationName);
    var newFrequency = $("<td scope='col'>").text(childSnap.val().frequency);
    //need to incorporate moment js here to create these values
    var firstTrainTime = childSnap.val().time;
    var momentFirstTrain = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(momentFirstTrain), "minutes");
    var trainFrequency = childSnap.val().frequency;
    var timeRemaining = timeDifference % trainFrequency;
    var minutesAway = trainFrequency - timeRemaining;
    var nextTrain = moment().add(minutesAway, "minutes");
    var newArrival = $("<td scope='col'>").text(moment(nextTrain).format("HH:mm"));
    var newMinutes = $("<td scope='col'>").text(minutesAway);

    newTrain.append(newName).append(newDestination).append(newFrequency).append(newArrival).append(newMinutes);
    console.log(newTrain);

    $("#table-body").append(newTrain);
});

});