// next task - update mytargets picture for changes in status, working in login only now

'use strict';

// // Each data field within a player array - Not used?
// const INDEX_PLAYER_ID = 0;
// const INDEX_PLAYER_NAME = 1;
// const INDEX_PLAYER_STATUS = 2;
// const INDEX_PLAYER_TARGET = 3;
// const IND_OWED = 3;
// const IND_TOTAL = 4;

// game status constants
const GAME_STATUS_NOT_STARTED = 0;
const GAME_STATUS_ACTIVE = 1;
const GAME_STATUS_COMPLETED = 2;
const GAME_STATUS_NOT_STARTED_TEXT = "Not Started";
const GAME_STATUS_ACTIVE_TEXT = "Active";
const GAME_STATUS_COMPLETED_TEXT = "Completed";
const GAME_STATUS_UNKNOWN_TEXT = "Unknown Status";

// Player status constants
const PLAYER_STATUS_LOGGED_OFF = -1;
const PLAYER_STATUS_LOGGED_OFF_TEXT = "Logged Off";
const PLAYER_STATUS_WAITING = 0;
const PLAYER_STATUS_WAITING_TEXT = "Waiting";
const PLAYER_STATUS_ACTIVE = 1;
const PLAYER_STATUS_ACTIVE_TEXT = "Active";
const PLAYER_STATUS_INACTIVE = 2;
const PLAYER_STATUS_INACTIVE_TEXT = "Inactive";
const PLAYER_STATUS_BREAK = 3;
const PLAYER_STATUS_BREAK_TEXT = "On Break";
const PLAYER_STATUS_REGISTERED = 4;
const PLAYER_STATUS_BREAK_REGISTERED = "Registered";
const PLAYER_STATUS_UNKNOWN_TEXT = "Unknown Status";

const EVENT_TYPE_LOGIN = 3;
const EVENT_TYPE_INCORRECT_LOGIN = 4;
const EVENT_TYPE_LOGOFF = 5;
const EVENT_TYPE_CONFIRM_BOUNTY = 6;
const EVENT_TYPE_BOUNTY_FAILED = 7;
const EVENT_TYPE_BUY_BACK_IN = 12;
const EVENT_TYPE_PING_TARGET = 14;  // not implemented yet
const EVENT_TYPE_ANSWER_PING = 15;  // not implemented yet
const EVENT_TYPE_TAKE_BREAK = 16;
const EVENT_TYPE_RETURN_FROM_BREAK = 17;
const EVENT_TYPE_ASSASSINATED = 18;
const EVENT_TYPE_ACTIVATED = 19;

const OFF = 0;
const ON = 1;

const MESSAGE_TEXT_LOGIN = "Successul log in.";
const MESSAGE_TEXT_INCORRECT_LOGIN = "Incorrect log in.";
const MESSAGE_TEXT_LOGOFF = "Successful log off.";
const MESSAGE_TEXT_CONFIRM_BOUNTY = "Bounty Confirmed!";
const MESSAGE_TEXT_BOUNTY_FAILED = "Confirm Bounty Failed.";
const MESSAGE_TEXT_BUY_BACK_IN = "Successful re-buy.";
const MESSAGE_TEXT_PING_TARGET = "Are you still at PorcFest?";  // not implemented yet
const MESSAGE_TEXT_ANSWER_PING = "Yes, I'm still at PorcFest.";  // not implemented yet
const MESSAGE_TEXT_TAKE_BREAK = "Successful Break.";
const MESSAGE_TEXT_RETURN_FROM_BREAK = "Successful Return From Break.";
const MESSAGE_TEXT_ASSASSINATED = "You have been assassinated!";
const MESSAGE_TEXT_ACTIVATED = "You are activated!";

// ----- Initialize Firebase -----------------------------------------------------
// Get the config info from the database settings area on your firestore database

var config = {
     apiKey: "AIzaSyBB4kKWj-T1TH59Lyk_gaic5f1ElgLwJLE",
     authDomain: "assassinfirestoretest1.firebaseapp.com",
     databaseURL: "https://assassinfirestoretest1.firebaseio.com",
     projectId: "assassinfirestoretest1",
     storageBucket: "assassinfirestoretest1.appspot.com",
     messagingSenderId: "54139984085"
};

// init firebase
firebase.initializeApp(config);

// create shorthand reference to the database
var db = firebase.firestore();

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

// https://firebasestorage.googleapis.com/v0/b/assassinfirestoretest1.appspot.com/o/jon%20baby.jpg?alt=media&token=642c2834-1004-4188-9874-ecac774e05ce

// Get a reference to the storage service, which is used to create references in your storage bucket
// Create a reference with an initial file path and name

// Create a reference with an initial file path and name
var storage = firebase.storage();
var storageRef = storage.ref();

// ------------------Download picture test area -----------------------------------------------------------------
//
// fileRef.getDownloadURL().then(function(url)
// {
//   console.log("getDownloadURL worked");
//
//   var targetPicture = document.getElementById("targetPicture");
//   targetPicture.src = url;
// }).catch(function(error)
//   {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code)
//     {
//       case 'storage/object-not-found':
//         console.log("File not found");
//         // File doesn't exist
//         break;
//
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         console.log("No permissions");
//         break;
//
//       case 'storage/canceled':
//         console.log("Storage cancelled");
//         // User canceled the upload
//         break;
//
//       case 'storage/unknown':
//         console.log("Unknown error");
//         // Unknown error occurred, inspect the server response
//         break;
//     // Handle any errors
//   }
//
// }
//
// );

// ------------------  Upload pic test area ------------------------

uploadPictureButton.addEventListener('click', function (e)
{
    var fileChosen = document.getElementById("playerPictureInput");
    var curFiles = fileChosen.files;

    if(curFiles.length === 1)
    {
        console.log("1 file chosen");

        // get player reference to update picture field
        // zzz

        myPicFileName = curFiles[0].name;   // set global var

        var playerRef = db.collection("players").doc(id);
        playerRef.get().then(function(doc)
        {
          if (doc.exists)
          {
                // update player picture name field
                playerRef.update({
                  pictureName: myPicFileName
                })
                .then(function() {
                  console.log("Players pic name update success");
                })
                .catch(function(error) {
                  console.error("Error player pic name update", error);
                });
          } // end if player doc exists - need error checking

        });

        var fullPath = String(id) + "/" + myPicFileName;

        // 'images/mountains.jpg'

        // Create a reference
        var myFileRef = storageRef.child(fullPath);
        // var metadata = {
        //   contentType: 'image/jpeg',
        // };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = myFileRef.put(curFiles[0]);

        // error check the upload and monitor progress

    } // end if 1 file chosen
    else {
      console.log("You must choose 1 file");
    }

});

// ------------------------------------------------------------------

viewMyPictureButton.addEventListener('click', function (e)
{
      var myPictureRef = storageRef.child(String(id) + "/" + myPicFileName);

      myPictureRef.getDownloadURL().then(function(url)
      {
        console.log("getDownloadURL worked");

        var myPic = document.getElementById("myPicture");
        myPic.src = url;
      }).catch(function(error)
        {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code)
          {
            case 'storage/object-not-found':
              console.log("File not found");
              // File doesn't exist
              break;

            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log("No permissions");
              break;

            case 'storage/canceled':
              console.log("Storage cancelled");
              // User canceled the upload
              break;

            case 'storage/unknown':
              console.log("Unknown error");
              // Unknown error occurred, inspect the server response
              break;
          // Handle any errors
        }

      }

      );

});

//
//
//
//
//     var fileChosen = document.getElementById("playerPictureInput");
//
//     var curFiles = fileChosen.files;
//
//     if(curFiles.length === 1)
//     {
//         console.log("1 file chosen");
//
//         var fullPath = String(id) + "/" + curFiles[0].name;
//
//         // 'images/mountains.jpg'
//
//         // Create a reference
//         var myFileRef = storageRef.child(fullPath);
//         // var metadata = {
//         //   contentType: 'image/jpeg',
//         // };
//
//         // Upload file and metadata to the object 'images/mountains.jpg'
//         var uploadTask = myFileRef.put(curFiles[0]);
//
//         // error check the upload and monitor progress
//
//     } // end if 1 file chosen
//     else {
//       console.log("You must choose 1 file");
//     }
//
// });
//




// // --------------------------------------------------------------------
//
// var file = 'Player567.jpg';
// //
// // // Create the file metadata
// // var metadata = {
// //   contentType: 'image/jpeg'
// // };
//
// // Create a reference to 'mountains.jpg'
// var fileRef2 = storageRef.child('Player567.jpg');
// var metadata = {
//   contentType: 'image/jpeg',
// };
//

// console.log("Got here 1");
//
// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = fileRef2.put(file, metadata);
//
// console.log("Got here 2");
//
// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         console.log('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         console.log('Upload is running');
//         break;
//     }
//   }, function(error) {
//
//   // A full list of error codes is available at
//   // https://firebase.google.com/docs/storage/web/handle-errors
//   switch (error.code) {
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       break;
//
//     case 'storage/canceled':
//       // User canceled the upload
//       break;
//
//     case 'storage/unknown':
//       // Unknown error occurred, inspect error.serverResponse
//       break;
//   }
// }, function() {
//   // Upload completed successfully,
// });
//

// -----  end init firebase ---------------------------------------

// Global vars to hold player data
var id;
var name;
var status = PLAYER_STATUS_LOGGED_OFF;
var target;
var nameOfTargetsTarget;
var myLinkRef; // reference to my link in the chain
var myPicFileName;

var lastEvent;  // for event tracking

// create reference to message board
var message = document.getElementById("messageBoard");

renderGame(status);
// ----------------------------------------------------------------

function getScreenData()
{
  // Grab data from input boxes and store in global vars
  id = document.getElementById("idInputBox").value;
  // name = document.getElementById("nameInputBox").value;
  // status = document.getElementById("statusInputBox").value;
  // target = document.getElementById("targetInputBox").value;
  nameOfTargetsTarget = document.getElementById("targetsTargetNameInputBox").value;

  //console.log("Form data: id = " + id + "  Name = " + name + "  status = " + status + "  target = " + target + "  name of targets target = " + nameOfTargetsTarget );
}

// --------------------------------------------------------------
// Log into the game

logInButton.addEventListener('click', function (e)
{
    getScreenData();

    // create a reference to the document
    var playerRef = db.collection("players").doc(id);

    playerRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          // fill in data on screen - rely on renderGame
          document.getElementById("myId").innerHTML = id;
          document.getElementById("myName").innerHTML = doc.data().name;
          document.getElementById("myStatus").innerHTML = decodePlayerStatus(doc.data().status);
          document.getElementById("myOwed").innerHTML = doc.data().owed;
          document.getElementById("myTotal").innerHTML = doc.data().total;

          // set global vars
          status = doc.data().status;
          console.log("Setting global status var to " + doc.data().status + " in log in.");
          name = doc.data().name;
          myPicFileName = doc.data().pictureName;

          // create listener on my player record, change in status is important **************  Subscribe *************
          playerRef.onSnapshot(function(doc)
          {
                if (doc.exists)
                {
                  console.log("Listener snapshot called player doc exists name is: " + doc.data().name + " - current status is " + decodePlayerStatus(status) + " - incoming status is " + decodePlayerStatus(doc.data().status) + " - last event was " + lastEvent );

                  // update screen - rely on renderGame for now
                  document.getElementById("myStatus").innerHTML = decodePlayerStatus(doc.data().status);
                  document.getElementById("myOwed").innerHTML = doc.data().owed;
                  document.getElementById("myTotal").innerHTML = doc.data().total;

                  // I was assassinated
                  if ((status == PLAYER_STATUS_ACTIVE) && (doc.data().status == PLAYER_STATUS_INACTIVE))
                  {
                    console.log(MESSAGE_TEXT_ASSASSINATED);
                    message.innerHTML = MESSAGE_TEXT_ASSASSINATED;
                    lastEvent = EVENT_TYPE_ASSASSINATED;
                    status = PLAYER_STATUS_INACTIVE;
                    /// update status on screen here?  zzz
                    renderGame(PLAYER_STATUS_INACTIVE);
                  }
                  else if // I was moved from queue into the game
                    ((status == PLAYER_STATUS_WAITING) && (doc.data().status == PLAYER_STATUS_ACTIVE))
                      {
                        console.log(MESSAGE_TEXT_ACTIVATED);
                        message.innerHTML = MESSAGE_TEXT_ACTIVATED;
                        lastEvent = EVENT_TYPE_ACTIVATED;
                        status = PLAYER_STATUS_ACTIVE;
                        /// update status on screen here?  zzz
                        renderGame(PLAYER_STATUS_ACTIVE);
                      } // end if else - moved from queue into game

                }
                else {
                  console.log("Doc doesn't exist - Player must have been deleted.");
                }
          });  // ******** end subscribe on my player record  *********************************************************

          // get game status and update field,  create a reference to the document
          var gameDataRef = db.collection("gameData").doc("gameData");
          gameDataRef.get().then(function(doc)
          {
            if (doc.exists)
            {
                // update needed here or nearby - need to create a listener on game status
                document.getElementById("gameStatus").innerHTML = decodeGameStatus(doc.data().status);
            }

          }).catch(function(error) {
            console.log("Error getting gameRefData.get() document:", error);
            });

          // Display success in message area
          message.innerHTML = MESSAGE_TEXT_LOGIN;

          // check my status, retrieve my target's name and pic if I am Active
          if (status == PLAYER_STATUS_ACTIVE)
          {
              // temp helper vars to make code more readable
              var myTargetsID;
              var myTargetsName;

              // create a reference to my link document in the chain first
              myLinkRef = db.collection("chain").doc(id);

              myLinkRef.get().then(function(doc)
              {
                if (doc.exists)
                {
                    myTargetsID = doc.data().target;
                    console.log("Doc exists for me - Login - Active status - My target is " + myTargetsID);

                    // create a reference to my target's player record to get name and pic name
                    var myTargetsPlayerRef = db.collection("players").doc(myTargetsID);

                    myTargetsPlayerRef.get().then(function(doc)
                    {
                      if (doc.exists)
                      {
                          console.log("Doc exists for my target - Name is " + doc.data().name);
                          myTargetsName = doc.data().name;

                          // try to rely on renderGame here
                          document.getElementById("myTargetsName").innerHTML = myTargetsName;

                          // update my targets picture - I need targetID and the filename from the player record
                          // ----------------------------------------------

                          var myTargetsPictureRef = storageRef.child(String(myTargetsID) + "/" + doc.data().pictureName);

                          myTargetsPictureRef.getDownloadURL().then(function(url)
                          {
                            console.log("getDownloadURL worked - targets picture");

                            var myTargetsPic = document.getElementById("targetPicture");
                            myTargetsPic.src = url;
                          }).catch(function(error)
                            {
                              // A full list of error codes is available at
                              // https://firebase.google.com/docs/storage/web/handle-errors
                              switch (error.code)
                              {
                                case 'storage/object-not-found':
                                  console.log("File not found");
                                  // File doesn't exist
                                  break;

                                case 'storage/unauthorized':
                                  // User doesn't have permission to access the object
                                  console.log("No permissions");
                                  break;

                                case 'storage/canceled':
                                  console.log("Storage cancelled");
                                  // User canceled the upload
                                  break;

                                case 'storage/unknown':
                                  console.log("Unknown error");
                                  // Unknown error occurred, inspect the server response
                                  break;
                              // Handle any errors
                            }

                          }

                          );

                          // ------------------------------------------

                      }
                      else {
                        // my target's player record doesn't exist
                      }
                    }); // end .get on target's player record
                    //  need error catching here

                } // end if doc exists on search for my link record
                else {
                  // my link record doesn't exist
                }

              }); // end .get on my link
              //  error checking here

              // create Listener to my link reference ********************** Subscribe ************************************
              myLinkRef.onSnapshot(function(doc)
              {
                  console.log("My link listener called on the way in.");

                    //console.log("Listener Link id is: " + doc.data() + "  New target is " + doc.data().target );
                    //console.log("Listener Link id is: " + doc.data() + "  New target is " + doc.data().target );
                    if (doc.exists)  // Only process something if doc exists, otherwise, my link was deleted and I don't care, I'm also listening to my status
                    {
                        console.log("My link listener called - Doc exists");

                        myTargetsID = doc.data().target;

                        // get my target's name and update screen
                        // create a reference to my target's player record
                        var myTargetsPlayerRef = db.collection("players").doc(myTargetsID);
                        // line above blows up when link is deleted and there is no data.

                        myTargetsPlayerRef.get().then(function(doc)
                        {
                          if (doc.exists)
                          {
                              console.log("Doc exists for my target - Name is " + doc.data().name);

                              // target = doc.data().name;  // not sure if I need this
                              // rely on renderGame for update to screen
                              document.getElementById("myTargetsName").innerHTML = doc.data().name;

                              // update my targets picture - I need targetID and the filename from the player record
                              var myTargetsPictureRef = storageRef.child(String(myTargetsID) + "/" + doc.data().pictureName);

                              myTargetsPictureRef.getDownloadURL().then(function(url)
                              {
                                console.log("getDownloadURL worked - targets picture");

                                var myTargetsPic = document.getElementById("targetPicture");
                                myTargetsPic.src = url;
                              }).catch(function(error)
                                {
                                  // A full list of error codes is available at
                                  // https://firebase.google.com/docs/storage/web/handle-errors
                                  switch (error.code)
                                  {
                                    case 'storage/object-not-found':
                                      console.log("File not found");
                                      // File doesn't exist
                                      break;

                                    case 'storage/unauthorized':
                                      // User doesn't have permission to access the object
                                      console.log("No permissions");
                                      break;

                                    case 'storage/canceled':
                                      console.log("Storage cancelled");
                                      // User canceled the upload
                                      break;

                                    case 'storage/unknown':
                                      console.log("Unknown error");
                                      // Unknown error occurred, inspect the server response
                                      break;
                                  // Handle any errors
                                }

                              }

                              );

                            } // end if my targets player ref doc exists
                            else {
                              // my target's player record doesn't exist
                            }
                          }); // end .get on target's player record
                          //  need error catching here


                              // message.innerHTML = "zzz Listener on my link called.  Why?";
                    }
                    else {
                      // my target's player record doesn't exist
                    }
              }); // end .get on target's player record


          }   // end if my status was active
          else {
            console.log("My link listener called - Doc doesn't exist - hopefully I was intentially deleted.");
          }

          renderGame(doc.data().status);

      }   // end if doc exists
      else
      {
        message.innerHTML = "Player login failed " + id + " not found.";
      }

    }).catch(function(error) {
      console.log("Error getting adminsRef.get() document:", error);
      });

}); // end login button listener

// ---------------------------------------------------------

logOffButton.addEventListener('click', function (e)
{
  // rely on renderGame
  document.getElementById("myId").innerHTML = "";
  document.getElementById("myName").innerHTML = "";
  document.getElementById("myStatus").innerHTML = "";
  document.getElementById("gameStatus").innerHTML = "";

  message.innerHTML = MESSAGE_TEXT_LOGOFF;
  renderGame(PLAYER_STATUS_LOGGED_OFF);

});  // end logOff button listener -----------------------------------

// Start confirmAssassination function ----------------------

confirmAssassinationButton.addEventListener('click', function (e)
{
    // temp helper vars to make code more readable
    var myTargetsID;
    var myTargetsTargetID;
    var myTargetsTargetsName;

    // assume I am Jon, get data from getScreenData
    getScreenData();

    // create a reference to my link document in the chain first
    var myLinkRef = db.collection("chain").doc(id);

    myLinkRef.get().then(function(doc)
    {
      if (doc.exists)
      {
        console.log("Doc exists for me");

          myTargetsID = doc.data().target;

          // create a reference to my target's link
          var myTargetsLinkRef = db.collection("chain").doc(doc.data().target);

          myTargetsLinkRef.get().then(function(doc)
          {
            if (doc.exists) // my targets link doc exists
            {
                myTargetsTargetID = doc.data().target;

               // create a reference to the player db for my target's target
                var myTargetsTargetPlayerRef = db.collection("players").doc(doc.data().target);

                myTargetsTargetPlayerRef.get().then(function(doc)
                {
                  if (doc.exists) // my target's target player doc exists
                  {
                      console.log("Got here 4 - 2 names are" + nameOfTargetsTarget + " and " + doc.data().name);

                      if (nameOfTargetsTarget == doc.data().name)
                      {
                        console.log("Names match - good assassination  --------------------------");
                        message.innerHTML = MESSAGE_TEXT_CONFIRM_BOUNTY;

                        // update my player record with +1 bounty owed and +1 to total
                        // get my playerRef first

                        // create a reference to the document
                        var playerRef = db.collection("players").doc(id);

                        playerRef.get().then(function(doc)
                        {
                            if (doc.exists)
                            {
                                // add 1 to owed, add 1 to total
                                db.collection("players").doc(id).update({
                                  owed: doc.data().owed + 1,
                                  total: doc.data().total + 1
                                })
                                .then(function() {
                                  console.log("Players owed and total update success within assassination.");
                                })
                                .catch(function(error) {
                                  console.error("Error player owed and total update to db within assassination.", error);
                                });
                            } // end if doc exists
                            else {
                              console.log("Player doc doesn't exist in confirm assassination bump owed")
                            }
                        });

                        // update my target - Check waiting queue First
                        // get the waiting queue
                        var queueRef = db.collection("queue").doc("queue");
                        queueRef.get().then(function(doc)
                        {
                          if (doc.exists) // waiting queue doc exists
                          {
                              console.log("Waiting queue Doc exists");

                              if (doc.data().players != 0)  // bring in waiting players if queue not empty
                              {
                                  var i;
                                  var tempArray = new Array;
                                  tempArray = doc.data().players;   // create local array to shuffle players

                                  for (i=0;i<tempArray.length*50;i++)
                                  {
                                    var index1 = Math.floor((Math.random() * doc.data().players.length));
                                    var index2 = Math.floor((Math.random() * doc.data().players.length));
                                    var tempPlayer = tempArray[index1];
                                    tempArray[index1] = tempArray[index2];
                                    tempArray[index2] = tempPlayer;
                                  }

                                  // assign my target to the first person in the queue
                                  myLinkRef.update({
                                        target: tempArray[0]
                                      })
                                      .then(function() {
                                        console.log("Players update assign my target to first in queue success.");
                                      })
                                      .catch(function(error) {
                                        console.error("Error assign my target to first in queue.", error);
                                  });

                                  // create the rest of the chain and activate players
                                  var i;
                                  for (i=0; i<tempArray.length-1;i++)
                                  {
                                    console.log("Iteration " + i + " within create links loop within assassination")
                                    // create a link in the chain
                                    db.collection("chain").doc(tempArray[i]).set({
                                        target: tempArray[i+1]
                                      })
                                      .then(function() {
                                        console.log("Success writing to chain within assassination");
                                      })
                                      .catch(function(error) {
                                        console.error("Error writing to chain  within assassination", error);
                                      });

                                      // update player status to Active
                                      db.collection("players").doc(tempArray[i]).update({
                                        status: PLAYER_STATUS_ACTIVE
                                      })
                                      .then(function() {
                                        console.log("Players status update success within assassination.");
                                      })
                                      .catch(function(error) {
                                        console.error("Error player status update to db within assassination.", error);
                                      });

                                  } // end for loop

                                  // assign the target of the last player in the queue to original target's target
                                  // create the last link in the chain
                                  db.collection("chain").doc(tempArray[i]).set({
                                      target: myTargetsTargetID
                                    })
                                    .then(function() {
                                      console.log("Success last link within assassination");
                                    })
                                    .catch(function(error) {
                                      console.error("Error last link within assassination", error);
                                    });

                                    // update last player status to Active
                                    db.collection("players").doc(tempArray[i]).update({
                                      status: PLAYER_STATUS_ACTIVE
                                    })
                                    .then(function() {
                                      console.log("Players status update success within assassination.");
                                    })
                                    .catch(function(error) {
                                      console.error("Error player status update to db within assassination.", error);
                                    });

                                    // delete the waiting queue - looks like this worked
                                    db.collection("queue").doc("queue").update({
                                      players: []
                                    })
                                    .then(function() {
                                      console.log("Queue delete success within assassination.");
                                    })
                                    .catch(function(error) {
                                      console.error("Error queue delete within assassination.", error);
                                    });


                              } // end if there are players in the queue
                              else {  // queue is empty

                                  // Pickup of my targets target (No players waiting)
                                  myLinkRef.update({
                                        target: myTargetsTargetID
                                      })
                                      .then(function() {
                                        console.log("Players update assign my target to my targets target's id.");
                                      })
                                      .catch(function(error) {
                                        console.error("Error assign my target to my targets target's id.", error);   // zzz
                                  });

                              }

                              // delete old target's link
                              db.collection("chain").doc(myTargetsID).delete().then(function() {
                                  console.log("Document successfully deleted!");
                              }).catch(function(error) {
                                  console.error("Error removing document: ", error);
                              });

                              // change my original target's status to inactive
                              var myTargetsPlayerRef = db.collection("players").doc(myTargetsID);
                              myTargetsPlayerRef.update({
                                    status: PLAYER_STATUS_INACTIVE
                                  })
                                  .then(function() {
                                    console.log("Players update success.");
                                  })
                                  .catch(function(error) {
                                    console.error("Error player update to db.", error);
                                  });

                                console.log("Success");

                          } // end waiting queue doc exists
                          else {
                            console.log("Waiting queue doc does not exist");
                          }

                        }).catch(function(error) {
                          console.log("Error getting playerRef.get() document:", error);
                          });
                      } // end if name matched
                      else
                      {
                          console.log("Attempted assassination names don't match.");
                          message.innerHTML = MESSAGE_TEXT_BOUNTY_FAILED;
                      }

                  }   // end if doc exists - my targets player ref
                  else {
                    console.log("My targets player ref doc doesnt exist")
                  }

                }).catch(function(error) {
                  console.log("Error getting playerRef.get() document:", error);
                  });

            } // end if doc exists - myTargetsLinkRef.get()
            else {
              console.log("My myTargetsTargetPlayerRef.get doc doesnt exist");
            }

          }).catch(function(error) {
            console.log("Error getting myTargetsPlayerRef.get() document:", error);
          });

      } // end if mylink doc exists
      else {
        console.log("Mylink Doc doesnt exist - confirmAssassination");
      }

    }).catch(function(error) {
      console.log("Error getting myLinkRef.get() document:", error);
    });

});   // end confirmAssassination button

// -----------------------------------------------------------------------------------

buyBackInButton.addEventListener('click', function(e)
{
    // assume this button is only enabled if owed is 1 or greater and in Inactive status
    // get player ref
    var playerRef = db.collection("players").doc(id);

    playerRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          // check status and owed
          if ((doc.data().status == PLAYER_STATUS_INACTIVE) && (doc.data().owed > 0))
          {
            // proceed with buy back in process - ok
            // update player status to Waiting
            playerRef.update({
              status: PLAYER_STATUS_WAITING,
              owed: Number(doc.data().owed) - 1
            })
            .then(function() {
              console.log("Players status update success - waiting buy back in.");
            })
            .catch(function(error) {
              console.error("Error player status update to db - waiting buy back in", error);
            });

            // add player to waiting queue
            var tempQueue = new Array;
            console.log("About to check DB for waiting queue --------------");

            // get the waiting queue and add player
            var queueRef = db.collection("queue").doc("queue");
            queueRef.get().then(function(doc)
            {
              if (doc.exists)
              {
                  tempQueue = doc.data().players; // save queue locally

                  // add new player to local queue
                  tempQueue.push(id);

                  // update db queue with local queue
                  db.collection("queue").doc("queue").set({
                      players: tempQueue
                    })
                    .then(function() {
                      console.log("db setting waiting queue players array success");
                    })
                    .catch(function(error) {
                      console.error("db setting waiting queue players array failed", error);
                    });

              } else
              {
                console.log("Error Doc doesnt exists");
              }
            }).catch(function(error) {
                console.log("Error getting queue document:", error);
                });

            lastEvent = EVENT_TYPE_BUY_BACK_IN;
            message.innerHTML = MESSAGE_TEXT_BUY_BACK_IN;
            status = PLAYER_STATUS_WAITING;
            renderGame(PLAYER_STATUS_WAITING);

            // lastMessage = "Reactivate successful.  Awaiting assignment."
            // events.push([EVENT_TYPE_BUY_BACK_IN, players[currentPlayerIndex][IND_ID], new Date()]);
            // players[currentPlayerIndex][IND_OWED] = players[currentPlayerIndex][IND_OWED] - 1;
            // players[currentPlayerIndex][IND_STATUS] = PLAYER_STATUS_WAITING;

          } // end if inactive and owed bounty
          else {
            // can't buy back in
            console.log("Can't buy back in.");
          }
      } // end if player doc exists

    }); // end player ref get - need error checking

});  // end buyBackInButton button listener

// ---------------------------------------------------------

takeABreakButton.addEventListener('click', function(e)
{
  // get player ref
  var playerRef = db.collection("players").doc(id);
  var myTargetsID;  // save this for later use

  console.log("Take a break button pressed");

  playerRef.get().then(function(doc)
  {
    if (doc.exists)
    {
        // only take a break if active - What about waiting?
        if (doc.data().status == PLAYER_STATUS_ACTIVE)
        {
          status = PLAYER_STATUS_BREAK;

          console.log("Take a break button pressed while I am active - Continue processing.")
          // proceed with taking a break
          // update player status to on break
          playerRef.update({
            status: PLAYER_STATUS_BREAK
          })
          .then(function() {
            console.log("Players status update success - break.");
          })
          .catch(function(error) {
            console.error("Error player status update to db - break", error);
          });

          // Update chain to bypass me, first get my chain doc and save my target, then check for queue
          // create a reference to my link document in the chain
          var myLinkRef = db.collection("chain").doc(id);
          myLinkRef.get().then(function(doc)
          {
            if (doc.exists) // I'm in the chain
            {
                myTargetsID = doc.data().target;
            }
            else {
              console.log("My link in chain doesn't exist - take break");
            }
          });

          // delete my link - Maybe move this down
          myLinkRef.delete().then(function() {
              console.log("my link take a break Document successfully deleted!");
          }).catch(function(error) {
              console.error("my link take a break Error removing document: ", error);
          });

          // Determine which player has me as their target
          var myAssassinsId;
          // query db for the document where target = my id
          var linksRef = db.collection("chain");
          var query = linksRef.where("target", "==", id);

          query.get().then((snapshot) => {

                // console.log("Inside the query get");
                // alert("Snapshot Jonny data is - id: " + snapshot.docs + "  Snapshot target data is " + snapshot.docs);
                console.log("Snapshot size is " + snapshot.size); // + "  Snapshot target data is " + snapshot.docs);
                console.log("Snapshot docs array 0 element id is " + snapshot.docs[0].id); // + "  Snapshot target data is " + snapshot.docs);

                myAssassinsId = snapshot.docs[0].id;

                // move this inside! ??
                var myAssassinsLinkRef = db.collection("chain").doc(myAssassinsId);

                // Update chain - either
                // get the waiting queue
                var queueRef = db.collection("queue").doc("queue");
                queueRef.get().then(function(doc)
                {
                  console.log("Inside queue ref up front");

                  if (doc.exists) // waiting queue doc exists
                  {
                      console.log("Waiting queue Doc exists");

                      if (doc.data().players != 0)  // bring in waiting players if queue not empty
                      {
                          var i;
                          var tempArray = new Array;
                          tempArray = doc.data().players;   // create local array to shuffle players

                          for (i=0;i<tempArray.length*50;i++)
                          {
                            var index1 = Math.floor((Math.random() * doc.data().players.length));
                            var index2 = Math.floor((Math.random() * doc.data().players.length));
                            var tempPlayer = tempArray[index1];
                            tempArray[index1] = tempArray[index2];
                            tempArray[index2] = tempPlayer;
                          }

                          // assign the person that had me to the first person in the queue
                          myAssassinsLinkRef.update({
                                target: tempArray[0]
                              })
                              .then(function() {
                                console.log("Players update assign my target to first in queue success.");
                              })
                              .catch(function(error) {
                                console.error("Error assign my target to first in queue.", error);
                          });

                          // create the rest of the chain and activate players
                          var i;
                          for (i=0; i<tempArray.length-1;i++)
                          {
                            console.log("Iteration " + i + " within create links loop within assassination")
                            // create a link in the chain
                            db.collection("chain").doc(tempArray[i]).set({
                                target: tempArray[i+1]
                              })
                              .then(function() {
                                console.log("Success writing to chain within assassination");
                              })
                              .catch(function(error) {
                                console.error("Error writing to chain  within assassination", error);
                              });

                              // update player status to Active
                              db.collection("players").doc(tempArray[i]).update({
                                status: PLAYER_STATUS_ACTIVE
                              })
                              .then(function() {
                                console.log("Players status update success within assassination.");
                              })
                              .catch(function(error) {
                                console.error("Error player status update to db within assassination.", error);
                              });

                          } // end for loop

                          // assign the target of the last player in the queue to my original target
                          // create the last link in the chain
                          db.collection("chain").doc(tempArray[i]).set({
                              target: myTargetsID
                            })
                            .then(function() {
                              console.log("Success last link within assassination");
                            })
                            .catch(function(error) {
                              console.error("Error last link within assassination", error);
                            });

                            // update last player status to Active
                            db.collection("players").doc(tempArray[i]).update({
                              status: PLAYER_STATUS_ACTIVE
                            })
                            .then(function() {
                              console.log("Players status update success within assassination.");
                            })
                            .catch(function(error) {
                              console.error("Error player status update to db within assassination.", error);
                            });

                            // delete the waiting queue - looks like this worked
                            db.collection("queue").doc("queue").update({
                              players: []
                            })
                            .then(function() {
                              console.log("Queue delete success within assassination.");
                            })
                            .catch(function(error) {
                              console.error("Error queue delete within assassination.", error);
                            });


                      } // end if there are players in the queue
                      else {  // queue is empty
                          console.log("Queue is empty");
                          // Assign the person that had me to my target (No players waiting)
                          myAssassinsLinkRef.update({
                                target: myTargetsID
                              })
                              .then(function() {
                                console.log("Players assign the person that had me to my target.");
                              })
                              .catch(function(error) {
                                console.error("Error assign my target to my targets target's id.", error);
                          });

                      }

                  } // end if queue doc exists
                  else {
                    console.log("Queue doc doesn't exist in take a break");
                  }
                });



                console.log("End of Take a Break function - Get here yooo hooo1 ????");
                lastEvent = EVENT_TYPE_TAKE_BREAK;
                renderGame(PLAYER_STATUS_BREAK);

          });

          message.innerHTML = MESSAGE_TEXT_TAKE_BREAK;

        } // end if active
        else {
          // can't buy back in
          console.log("Can't buy back in.");
        }
    } // end if player doc exists

  }); // end player ref get - need error checking

  // lastEvent = EVENT_TYPE_BUY_BACK_IN;
  // lastMessage = "Reactivate successful.  Awaiting assignment."
  // events.push([EVENT_TYPE_BUY_BACK_IN, players[currentPlayerIndex][IND_ID], new Date()]);
  // players[currentPlayerIndex][IND_OWED] = players[currentPlayerIndex][IND_OWED] - 1;
  // players[currentPlayerIndex][IND_STATUS] = PLAYER_STATUS_WAITING;

  // renderGame(); zzz maybe fix this?

});  // end take a break button listener

// ---------------------------------------------------------

returnFromBreakButton.addEventListener('click', function(e)
{
  // get player ref
  var playerRef = db.collection("players").doc(id);

  console.log("Return break button pressed");
  playerRef.get().then(function(doc)
  {
    if (doc.exists)
    {
        // only return from break if on break - What about waiting?
        if (doc.data().status == PLAYER_STATUS_BREAK)
        {
              status = PLAYER_STATUS_WAITING;

              // proceed with returning break
              // update player status to Waiting
              playerRef.update({
                status: PLAYER_STATUS_WAITING
              })
              .then(function() {
                console.log("Players status update success - return from break.");
              })
              .catch(function(error) {
                console.error("Error player status update to db - return from break", error);
              });

              // put myself in the queue
              var tempQueue = new Array;
              //var i;
              var queueRef = db.collection("queue").doc("queue");
              queueRef.get().then(function(doc)
              {
                if (doc.exists)
                {
                    tempQueue = doc.data().players; // save queue locally
                    // console.log("Queue from db is " + doc.data().players);
                    // add me onto local queue
                    tempQueue.push(id);
                    // console.log("Local Queue outside 2 is " + tempQueue);
                    // update db queue with local queue
                    queueRef.set({
                        players: tempQueue
                      })
                      .then(function() {
                        console.log("db setting waiting queue players array success");
                      })
                      .catch(function(error) {
                        console.error("db setting waiting queue players array failed", error);
                      });

                } else
                {
                  console.log("Error Doc doesnt exists");
                }
              }).catch(function(error) {
                  console.log("Error getting queue document:", error);
                  });

              message.innerHTML = MESSAGE_TEXT_RETURN_FROM_BREAK;
              renderGame(PLAYER_STATUS_WAITING);

        }  // end if status is break
        else {
          console.log("Not on break, can't come back from break.")
        }
    }  // end if player ref doc exists

  });

}); //  end returnFromBreakButton.addEventListener

// ---------------------------------------------------------

function renderGame(myStatus)
{
  console.log("Render Game called at the top status is " + myStatus);

  // zzz - update controls

  // fill in data on screen
  // document.getElementById("myId").innerHTML = id;
  // document.getElementById("myName").innerHTML = name;
  // document.getElementById("myStatus").innerHTML = decodePlayerStatus(doc.data().status);
  // document.getElementById("myTargetsName").innerHTML = target;

  // document.getElementById("myOwed").innerHTML = s;
  // document.getElementById("myTotal").innerHTML = ;

  switch (Number(myStatus)) {

    case PLAYER_STATUS_LOGGED_OFF:

      console.log("Render game called, player status is " + decodePlayerStatus(myStatus));
      updateLogInControls(ON);
      updateLogOffControls(OFF);
      updateActiveControls(OFF);
      break;

    case PLAYER_STATUS_WAITING:
        console.log("Render game called, player status is " + decodePlayerStatus(myStatus));
        updateLogInControls(OFF);
        updateLogOffControls(ON);
        document.getElementById("returnFromBreakButton").style.visibility = "hidden";
        document.getElementById("buyBackInButton").style.visibility = "hidden";
      break;

    case PLAYER_STATUS_ACTIVE:
        console.log("Render game called, player status is " + decodePlayerStatus(myStatus));
        updateLogInControls(OFF);
        updateLogOffControls(ON);
        updateActiveControls(ON);
      break;

    case PLAYER_STATUS_INACTIVE:
        console.log("Render game called, player status is " + decodePlayerStatus(myStatus));
        updateLogInControls(OFF);
        updateLogOffControls(ON);
        updateActiveControls(OFF);

        // if I'm owed, show buy back in button
        if (Number(document.getElementById("myOwed").innerHTML) > 0)
            document.getElementById("buyBackInButton").style.visibility = "visible";
      break;

    case PLAYER_STATUS_BREAK:
        console.log("Render game called, player status is " + decodePlayerStatus(myStatus));
        updateLogInControls(OFF);
        updateLogOffControls(ON);
        updateActiveControls(OFF);
        document.getElementById("returnFromBreakButton").style.visibility = "visible";
      break;

    default:
      console.log("Render game called, default status is " + decodePlayerStatus(myStatus));

  }

}

// ---------------------------------------
// renderGame functions

function updateLogInControls(direction)
{
  if (direction == ON)
  {
    document.getElementById("myIdInputLabel").style.visibility = "visible";
    document.getElementById("idInputBox").style.visibility = "visible";
    document.getElementById("logInButton").style.visibility = "visible";
    document.getElementById("returnFromBreakButton").style.visibility = "hidden";
    document.getElementById("buyBackInButton").style.visibility = "hidden";
  }
  else
  {
    document.getElementById("myIdInputLabel").style.visibility = "hidden";
    document.getElementById("idInputBox").style.visibility = "hidden";
    document.getElementById("logInButton").style.visibility = "hidden";
  }

}

// ---------------------------------------------------------------------

function updateLogOffControls(direction)
{
  if (direction == ON)
  {
    document.getElementById("logOffButton").style.visibility = "visible";
  }
  else
  {
    document.getElementById("logOffButton").style.visibility = "hidden";
  }

}

// -----------------------------------------------------------------

function updateActiveControls(direction)
{
  if (direction == ON)
  {
    document.getElementById("confirmAssassinationButton").style.visibility = "visible";
    document.getElementById("myNameOfTargetsTargetLabel").style.visibility = "visible";
    document.getElementById("targetsTargetNameInputBox").style.visibility = "visible";
    document.getElementById("takeABreakButton").style.visibility = "visible";

    document.getElementById("returnFromBreakButton").style.visibility = "hidden";
    document.getElementById("buyBackInButton").style.visibility = "hidden";

    document.getElementById("playerPictureInputLabel").style.visibility = "visible";
    document.getElementById("playerPictureInput").style.visibility = "visible";
    document.getElementById("uploadPictureButton").style.visibility = "visible";
    document.getElementById("viewMyPictureButton").style.visibility = "visible";
    document.getElementById("myTargetsPictureLabel").style.visibility = "visible";
    document.getElementById("myPictureLabel").style.visibility = "visible";

  }
  else
  {
    document.getElementById("confirmAssassinationButton").style.visibility = "hidden";
    document.getElementById("myNameOfTargetsTargetLabel").style.visibility = "hidden";
    document.getElementById("targetsTargetNameInputBox").style.visibility = "hidden";
    document.getElementById("takeABreakButton").style.visibility = "hidden";
    document.getElementById("returnFromBreakButton").style.visibility = "hidden";
    document.getElementById("buyBackInButton").style.visibility = "hidden";

    // rely on render game?
    document.getElementById("myTargetsName").innerHTML = "";

    document.getElementById("playerPictureInputLabel").style.visibility = "hidden";
    document.getElementById("playerPictureInput").style.visibility = "hidden";
    document.getElementById("uploadPictureButton").style.visibility = "hidden";
    document.getElementById("viewMyPictureButton").style.visibility = "hidden";
    document.getElementById("myTargetsPictureLabel").style.visibility = "hidden";
    document.getElementById("myPictureLabel").style.visibility = "hidden";

  }

}

// ---------------------------------------------------------------

// start function decodePlayerStatus

function decodePlayerStatus(statusPassedIn)
{
  console.log("decode called - status passed in = " + statusPassedIn);

  switch (Number(statusPassedIn)) {

    case PLAYER_STATUS_LOGGED_OFF:
      return PLAYER_STATUS_LOGGED_OFF_TEXT;
      break;

    case PLAYER_STATUS_WAITING:
      return PLAYER_STATUS_WAITING_TEXT;
      break;

    case PLAYER_STATUS_ACTIVE:
      return PLAYER_STATUS_ACTIVE_TEXT;
      break;

    case PLAYER_STATUS_INACTIVE:
      return PLAYER_STATUS_INACTIVE_TEXT;
      break;

    case PLAYER_STATUS_BREAK:
      return PLAYER_STATUS_BREAK_TEXT;
            break;

    default:
      console.log("decode called - default unknown returned.  Status passed in was " + statusPassedIn);
      return PLAYER_STATUS_UNKNOWN_TEXT + statusPassedIn ;

  }

}


// ---------------------------------------------------------------

// start function decodeGameStatus

function decodeGameStatus(statusPassedIn)
{
  switch (statusPassedIn) {
    case GAME_STATUS_NOT_STARTED:
      return GAME_STATUS_NOT_STARTED_TEXT;
      break;

    case GAME_STATUS_ACTIVE:
      return GAME_STATUS_ACTIVE_TEXT;
      break;

    case GAME_STATUS_COMPLETED:
      return GAME_STATUS_COMPLETED_TEXT;
      break;

    default:
      return GAME_STATUS_UNKNOWN_TEXT;

  }

}
