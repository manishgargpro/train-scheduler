var config = {
    apiKey: "AIzaSyBERfN4WTqyLzqJAl4kfuOiiqVQRBgZ8-8",
    authDomain: "train-scheduler-f2c98.firebaseapp.com",
    databaseURL: "https://train-scheduler-f2c98.firebaseio.com",
    projectId: "train-scheduler-f2c98",
    storageBucket: "train-scheduler-f2c98.appspot.com",
    messagingSenderId: "483191377070"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-button").on("click", function(event) {
  event.preventDefault();

  var trainOrigin = $("#train-origin").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainFrequency = $("#train-frequency").val().trim();
  var trainFirstTime = $("#train-first-time").val().trim();

  var newTrain = {
    origin: trainOrigin,
    destination: trainDestination,
    frequency: trainFrequency,
    firstTime: trainFirstTime
  };

  database.ref().push(newTrain);

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainOrigin = childSnapshot.val().origin;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainFirstTime = moment(childSnapshot.val().firstTime, "HH:mm").subtract(1, "days");

  console.log(trainFrequency, trainFirstTime);

  var diffTime = moment().diff(moment(trainFirstTime), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);
  var trainMinutes = trainFrequency - tRemainder;

  var trainNext = moment().add(trainMinutes, 'minutes').format("HH:mm");

  $("#train-table > tbody").append("<tr><td>" + trainOrigin + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + trainNext + "</td><td>" + trainMinutes + "</td></tr>");
});