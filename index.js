// next task - update mytargets picture for changes in status, working in login only now

'use strict';

const FIRESTORE_DB_1 = 1;
const FIRESTORE_DB_2 = 2;
var firebaseDB = FIRESTORE_DB_1;

const ENTER_KEY = 13; // intercept enter key for default processing
const PLAYER_ID_LENGTH = 8;   // length of player id
const OWED_STARTER = 0;
const SCROLLING_MESSAGE_LENGTH = 3;

const SYSTEM_ID = "SYSTEM";

const ERROR_GAME_DATA_REF_DOESNT_EXIST = "Game Data doc doesn't exist";
const ERROR_GAME_DATA_REF_GET_FAILED = "Game Data Get Failed.";

// game status constants
const GAME_STATUS_NOT_STARTED = 0;
const GAME_STATUS_ACTIVE = 1;
const GAME_STATUS_PAUSED = 2;
const GAME_STATUS_COMPLETED = 3;

const GAME_STATUS_NOT_STARTED_TEXT = "Not Started";
const GAME_STATUS_ACTIVE_TEXT = "Active";
const GAME_STATUS_PAUSED_TEXT = "Paused";
const GAME_STATUS_COMPLETED_TEXT = "Completed";
const GAME_STATUS_UNKNOWN_TEXT = "Unknown Status";

// Player status constants
const PLAYER_STATUS_LOGGED_OFF = 0;
const PLAYER_STATUS_LOGGED_OFF_TEXT = "Logged Off";
const PLAYER_STATUS_REGISTER_IN_PROGRESS = 1;
const PLAYER_STATUS_REGISTER_IN_PROGRESS_TEXT = "";
const PLAYER_STATUS_REGISTERED = 2;
const PLAYER_STATUS_REGISTERED_TEXT = "Registered";
const PLAYER_STATUS_WAITING = 3;
const PLAYER_STATUS_WAITING_TEXT = "Waiting";
const PLAYER_STATUS_SCHEDULED = 4;
const PLAYER_STATUS_SCHEDULED_TEXT = "Scheduled";
const PLAYER_STATUS_ACTIVE = 5;
const PLAYER_STATUS_ACTIVE_TEXT = "Active";
const PLAYER_STATUS_INACTIVE = 6;
const PLAYER_STATUS_INACTIVE_TEXT = "Inactive";
const PLAYER_STATUS_BREAK = 7;
const PLAYER_STATUS_BREAK_TEXT = "On Break";
const PLAYER_STATUS_GAME_OVER = 8;
const PLAYER_STATUS_GAME_OVER_TEXT = "Game Completed";
const PLAYER_STATUS_UNKNOWN_TEXT = "Unknown Status";

const REGISTERED_ASAP = 0;      // enter game as soon as possible
const REGISTERED_SCHEDULED = 1; // wait to enter game until scheduled start

// Screen labels
const MY_TARGETS_PICTURE_LABEL = "My Target's Picture:";
const MY_PICTURE_LABEL = "My Picture:"

// Events
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
const EVENT_TYPE_WAITING = 20;
const EVENT_TYPE_VOLUNTEERED = 21;

// General constants
const OFF = 0;
const ON = 1;
const MIN_LENGTH_BREAK_DEFAULT = 2; // number of minutes minimum break length
const PIC_MISSING_TARGET = 1;
const PIC_MISSING_MINE = 2;

// Message Text Constants - Find similar and clean up.
const MESSAGE_TEXT_WELCOME = "Welcome to Assassin.  Click Login or Register.";
const MESSAGE_TEXT_LOGIN = "Successul log in.";
const MESSAGE_TEXT_LOGIN_FAILED = "Player login failed. id = ";
const MESSAGE_TEXT_LOGOFF = "Successful log off.";
const MESSAGE_TEXT_PLAYER_LOGGED_OFF = "Player currently logged off";
const MESSAGE_TEXT_CONFIRM_BOUNTY = "Bounty Confirmed!";
const MESSAGE_TEXT_BOUNTY_FAILED = "Confirm Bounty Failed. Bad name entered was ";
const MESSAGE_TEXT_BUY_BACK_IN = "Successful re-buy.";
const MESSAGE_TEXT_PING_TARGET = "Are you still at PorcFest?";  // not implemented yet
const MESSAGE_TEXT_ANSWER_PING = "Yes, I'm still at PorcFest.";  // not implemented yet
const MESSAGE_TEXT_TAKE_BREAK = "Successful Break.";
const MESSAGE_TEXT_ASSASSINATED = "You have been assassinated!";
const MESSAGE_TEXT_ACTIVATED = "You are activated!";
const MESSAGE_TEXT_WAITING = "You are waiting to enter game.";
const MESSAGE_TEXT_NEW_TARGET= "You are active, check for a new target.";
const MESSAGE_TEXT_BOUNTY_OWED_CHANGE = "Change in Bounties Owed.";
const MESSAGE_TEXT_INVALID_SCREEN_DATA = "Invalid screen data.";
const MESSAGE_TEXT_PAUSED_GAME = "Game paused. Only 1 active player.";
const MESSAGE_TEXT_REGISTER_PLAYER = "Register Player success. id = ";
const MESSAGE_TEXT_REGISTERED = "Registered status.  Upload a picture, Admin will review and activate you.";
const MESSAGE_TEXT_PLAYER_NOT_FOUND = "Player not found.";
const MESSAGE_TEXT_GAME_COMPLETED = "The game is over.";
const MESSAGE_TEXT_CANT_REGISTER_GAME_OVER = "You can't register, the game is over.";
const MESSAGE_TEXT_PLAYER_ALREADY_EXISTS = "You generated a random number for a player that already exists.  Click Register again.";
const MESSAGE_TEXT_VOLUNTEERED = "Successful volunteer.  You are inactive, but can buy back in.";
const MESSAGE_TEXT_SCHEDULED = "You are scheduled to enter the game.";
const MESSAGE_TEXT_FATAL_ERROR = "Fatal Error - Connection to DB.  Contact Admin.";
const MESSAGE_TEXT_UPLOAD_PIC_FAILED = "Upload picture failed.";
const MESSAGE_TEXT_UPLOAD_PIC_SUCCESS = "Upload picture success."
const MESSAGE_TEXT_FILE_NOT_FOUND = "File not found."
const MESSAGE_TEXT_PICTURE_NOT_FOUND = "My Picture file not found.";
const MESSAGE_TEXT_TARGET_PICTURE_NOT_FOUND = "Target Picture Not Found.";
const MESSAGE_TEXT_VOLUNTEER_NEEDED = "Click the volunteer button to exit the game with a refund of 1 bounty.";
const MESSAGE_TEXT_CANT_VOLUNTEER = "Only active players can volunteer to move to inactive status.";
const MESSAGE_TEXT_TOO_EARLY_TO_RETURN_FROM_BREAK = "Too early to return from break.";
const MESSAGE_TEXT_CANT_TAKE_BREAK = "You can only take a break when active.";
const MESSAGE_TEXT_LOGIN_CANT_RETURN_FROM_BREAK = "You are not on break.  Can't return.";
const MESSAGE_TEXT_VOLUNTEER_FILLED = "Volunteer request filled.";
const MESSAGE_TEXT_ENTER_YOUR_NAME_TO_REGISTER = "Enter your name, choose ASAP or Scheduled start, and click Register.  The next scheduled start is ";

// ----- Initialize Firebase -----------------------------------------------------
// Get the config info from the database settings area on your firestore database

var config;

if (firebaseDB == FIRESTORE_DB_1)
{
  config =
  {
      apiKey: "AIzaSyBB4kKWj-T1TH59Lyk_gaic5f1ElgLwJLE",
      authDomain: "assassinfirestoretest1.firebaseapp.com",
      databaseURL: "https://assassinfirestoretest1.firebaseio.com",
      projectId: "assassinfirestoretest1",
      storageBucket: "assassinfirestoretest1.appspot.com",
      messagingSenderId: "54139984085"
  };
}
else
{
  config =
  {
      apiKey: "AIzaSyDV4SiK3fKshX681ZABQ1xEFHX9URz71I0",
      authDomain: "assassintestdb2.firebaseapp.com",
      databaseURL: "https://assassintestdb2.firebaseio.com",
      projectId: "assassintestdb2",
      storageBucket: "assassintestdb2.appspot.com",
      messagingSenderId: "356236457364"
  };
}

// init firebase
firebase.initializeApp(config);

// create shorthand reference to the database
var db = firebase.firestore();

const settings = {timestampsInSnapshots: true};
db.settings(settings);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var storageRef = storage.ref();

// -----  end init firebase ---------------------------------------

// Turn off controls - Trying to get rid of flicker - Error Check
document.getElementById("buyBackInButton").style.visibility = "hidden";

// Global vars to hold player data
var id;
var name;
var status = PLAYER_STATUS_LOGGED_OFF;  // player status
var gameStatus = GAME_STATUS_NOT_STARTED;  // default
var loggedIn = false;
var iVolunteered = false;
var registrationInProgress = false; // Registration is 2 part process
// var target;  -  looks like I don't need this

var owed;
var nameOfTargetsTarget;
var myLinkRef; // reference to my link in the chain
var myPicFileName;

// data from Game Data on db
var minBreakLength = MIN_LENGTH_BREAK_DEFAULT;
var volunteerNeeded = false;
var nextScheduledStart = "";
var myRegistrationType; // either asap or Scheduled

// unsubscribe global vars
var playerUnsubscribe;  // var to store player subscription, needed for later unSubscribe
var linkUnsubscribe;    // var to store link subscription
var gameDataUnsubscribe;  // var to store game data subscription

// var lastEvent;  // for event tracking, not using now

// create an array of messages for display to message board, grab reference to screen message board
var messages = new Array;
var screenMessage = document.getElementById("messageBoard");

var errors = db.collection("errors");

// ------------------------------------------------------------------
// Start of actual code ---------------------------------------------

// Handle Game Data
// get game status and update field,  create a reference to the document
var gameDataRef = db.collection("gameData").doc("gameData");

gameDataRef.get().then(function(doc)
{
  if (doc.exists)
  {
      gameStatus = doc.data().status;
      volunteerNeeded = doc.data().volunteerNeeded;

      // update needed here or nearby - need to create a listener on game status
      document.getElementById("gameStatus").innerHTML = decodeGameStatus(gameStatus);
      console.log("Game status is " + decodeGameStatus(gameStatus));

      // if min break length doesn't exist in db, default to value set here in code
      if (doc.data().minBreakLength == 0)
        minBreakLength = MIN_LENGTH_BREAK_DEFAULT;
      else
        minBreakLength = doc.data().minBreakLength;

      console.log("Min break length is " + minBreakLength);

      // store next scheduled start in global var
      nextScheduledStart = doc.data().nextScheduledStart;

      postMessage(MESSAGE_TEXT_WELCOME)
      renderGame(status);

  }  // end if gameData doc exists
  else
  {
    postMessage(MESSAGE_TEXT_FATAL_ERROR);
    postError(SYSTEM_ID,ERROR_GAME_DATA_REF_DOESNT_EXIST);
  }
}).catch(function(error) {
  postMessage(MESSAGE_TEXT_FATAL_ERROR);
  postError(SYSTEM_ID,ERROR_GAME_DATA_REF_GET_FAILED);
  console.log("Error getting gameRefData.get() document:", error);
  });

// --------------------------------------------------------------------------
// subscribe to change in game status **************  Subscribe *************

gameDataUnsubscribe = gameDataRef.onSnapshot(function(doc)
{
    console.log("Within Outer Game - Subscriber on game status change called. Current status is " + decodeGameStatus(gameStatus) + " New status is " + decodeGameStatus(doc.data().status));

    if (doc.exists)
    {
        // turn on or off volunteer button - Player needs to be active.
        if ((doc.data().volunteerNeeded == true) && (status == PLAYER_STATUS_ACTIVE))
        {
          document.getElementById("volunteerButton").style.visibility = "visible";
          postMessage(MESSAGE_TEXT_VOLUNTEER_NEEDED);
          volunteerNeeded = true;
        }
        else
        {
          if ((doc.data().volunteerNeeded == false) && (volunteerNeeded == true))
          {
              postMessage(MESSAGE_TEXT_VOLUNTEER_FILLED);
              volunteerNeeded = false;
          }

          document.getElementById("volunteerButton").style.visibility = "hidden";
        }

        // update global vars
        nextScheduledStart = doc.data().nextScheduledStart;

        // only process change if status changes, check for other data changes above
        if (gameStatus != doc.data().status)
        {
            gameStatus = doc.data().status;

            // update game status on screen
            document.getElementById("gameStatus").innerHTML = decodeGameStatus(gameStatus);

            switch (gameStatus)
            {
              case GAME_STATUS_COMPLETED:

                  console.log("Game status changed to completed. Subscriber called. Status is " + decodeGameStatus(gameStatus));
                  status = PLAYER_STATUS_GAME_OVER;  // player status

                  // change player status on the db only if logged in.

                  if (loggedIn == true)
                  {
                      console.log("Player is logged in.  Updating status on db to player status game over. id is " + id);
                      // set my player status to waiting
                      db.collection("players").doc(id).update({
                        status: PLAYER_STATUS_GAME_OVER
                      })
                      .then(function() {
                        console.log("Player status set to Game Over.");
                      })
                      .catch(function(error) {
                        console.error("Error Player status set to Game Over.", error);
                      });
                  }

                  renderGame(PLAYER_STATUS_GAME_OVER);
                  break;

              case GAME_STATUS_PAUSED:

                  postMessage(MESSAGE_TEXT_PAUSED_GAME);
                  console.log("Game status changed to paused. Subscriber called. Status is " + decodeGameStatus(gameStatus));

                  // move myself to queue if I'm active, otherwise ignore, could be on break
                  if (status == PLAYER_STATUS_ACTIVE)
                  {
                      console.log("Paused player status is " + status);
                      // move to waiting
                      status = PLAYER_STATUS_WAITING;

                      // set my player status to waiting
                      db.collection("players").doc(id).update({
                        status: PLAYER_STATUS_WAITING
                      })
                      .then(function() {
                        console.log("Player status set to waiting after game pause.");
                      })
                      .catch(function(error) {
                        console.error("Error Player status set to waiting after game pause.", error);
                      });

                      // set waiting queue to just me
                      var tempList = new Array;
                      tempList.push(id);

                      db.collection("queues").doc("waiting").set({
                          players: tempList
                        })
                        .then(function() {
                          console.log("db setting waiting queue after pause success");
                        })
                        .catch(function(error) {
                          console.error("db setting waiting queue after pause failed", error);
                        });

                      renderGame(PLAYER_STATUS_WAITING);

                  } // end if player is active

                  break;

              case GAME_STATUS_NOT_STARTED:
                  // logoffUser();
                  break;

              default:

            }
        }

    } // end if doc exists
    else
    {
      postMessage(MESSAGE_TEXT_FATAL_ERROR);
      postError(SYSTEM_ID,ERROR_GAME_DATA_REF_DOESNT_EXIST);
      console.log("Game data doc was deleted in subscribe.");
    }
});

// --------- end subscribe to change in game status ***********  Subscribe *************

// ----------------------------------------------------------------

function getScreenData()
{

  var tempId = document.getElementById("idInputBox").value;

  // strip off extra space if necessary
  if (String(tempId)[PLAYER_ID_LENGTH] == " ")
  {
    // splice off starting at the 8th position
    console.log("8th space found, slice off extra characters, use first 8 only.");
    id = String(tempId).slice(0,PLAYER_ID_LENGTH);
  }
  else
  {
    console.log("Setting id = " + tempId);
    id = tempId;
  }

  nameOfTargetsTarget = document.getElementById("targetsTargetNameInputBox").value;
  name = document.getElementById("nameInputBox").value;
}

// --------------------------------------------------------------
// Register with game

registerButton.addEventListener('click', function (e)
{
      // check if game is available to register
      // get game status and update field,  create a reference to the document
      var gameDataRef = db.collection("gameData").doc("gameData");
      gameDataRef.get().then(function(doc)
      {
          if (doc.exists)
          {
              if (doc.data().status == GAME_STATUS_COMPLETED)
              {
                // Can't register, game already over
                console.log("Can't register, game already over.");
                postMessage(MESSAGE_TEXT_CANT_REGISTER_GAME_OVER);
              }
              else  // move forward with registration
              {
                  // Check if phase 1 or 2 - First click hides login controls and shows name field only
                  if (registrationInProgress == false) // first click
                  {
                    registrationInProgress = true;
                    status = PLAYER_STATUS_REGISTER_IN_PROGRESS;
                    renderGame(status);
                    return;
                  }
                  else // phase 2, complete registration
                  {
                      getScreenData();

                      if (name == "")
                      {
                        console.log("Blank name entered in name input box.");
                        postMessage(MESSAGE_TEXT_INVALID_SCREEN_DATA + "  Name is invalid.");
                        return;
                      }

                      // continue if name entered
                      registrationInProgress = false;
                      var tempId = "";
                      var i;

                      // loop through, creating 1 random digit at a time
                      for (i=0; i<PLAYER_ID_LENGTH; i++)
                      {
                        tempId += String(Math.floor(Math.random() * 10));
                      }

                      tempId = String(tempId);
                      console.log("Temp id created is " + tempId + " length is " + tempId.length);

                      // check if this id is already in use - if yes, reject registration request
                      var playerRef = db.collection("players").doc(tempId);

                      playerRef.get().then(function(doc)
                      {
                          console.log("Player ref on temp id executed");

                          if (doc.exists)
                          {
                              // player already exists, don't allow
                              console.log("Error - Player already exists.");
                              postMessage(MESSAGE_TEXT_PLAYER_ALREADY_EXISTS);
                              postError(tempId, MESSAGE_TEXT_PLAYER_ALREADY_EXISTS);
                              return;
                          }

                          console.log("Player doesn't exist.  About to add player to db.  Name is " + name);

                          // Check if game is not started, if yes, then put in Register ASAP, else read choice from radio button
                          if (gameStatus == GAME_STATUS_NOT_STARTED)
                          {
                              console.log("Game status is 'not started'");
                              myRegistrationType = REGISTERED_ASAP;
                          }
                          else
                          {
                              console.log("Game status is not - 'not started'");
                              // get the choice from the screen
                              var myForm = document.getElementById("registrationTypes");

                              if (myForm.registration[0].checked == true)
                              {
                                  myRegistrationType = REGISTERED_ASAP;
                              }
                              else
                              {
                                  myRegistrationType = REGISTERED_SCHEDULED;
                              }

                          } // end else

                          // add player to the players db --------------------
                          db.collection("players").doc(tempId).set({
                            status: PLAYER_STATUS_REGISTERED,
                            owed: OWED_STARTER,
                            total: 0,
                            registrationType: myRegistrationType,
                            scheduledTime: nextScheduledStart,  // this will be ignored if registered ASAP
                            name: name
                          })
                          .then(function() {
                            console.log("Register player success. ID = " + tempId + " Name is " + name);
                            id = tempId;
                            status = PLAYER_STATUS_REGISTERED;
                            renderGame(PLAYER_STATUS_REGISTERED);
                          })
                          .catch(function(error) {
                            console.error("Register player failed.", error);
                          });

                              // reset input boxes
                          resetInputBoxes();

                      }); // player ref get, check if player exists




                  }

              }   // end else - continue with registration

          } // end if doc exists - needs error checking

        }).catch(function(error) {
          console.log("Error getting gameRefData.get() document:", error);
          });

});

// --------------------------------------------------------------
// Log into the game
// Allow player to log in even when game is over - check stats

logInButton.addEventListener('click', function (e)
{
    getScreenData();

    // clear out old messages
    messages = new Array;

    // get game status here and display on screen
    var gameDataRef = db.collection("gameData").doc("gameData");

    gameDataRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          gameStatus = doc.data().status;
          volunteerNeeded = doc.data().volunteerNeeded;

          // update needed here or nearby - need to create a listener on game status
          document.getElementById("gameStatus").innerHTML = decodeGameStatus(gameStatus);
          console.log("Game status is " + decodeGameStatus(gameStatus));

          // check if volunteer volunteer
          if (doc.data().volunteerNeeded == true)
          {
            document.getElementById("volunteerButton").style.visibility = "visible";
            postMessage(MESSAGE_TEXT_VOLUNTEER_NEEDED);
          }
          else
          {
            document.getElementById("volunteerButton").style.visibility = "hidden";
          }

      }
    });

    // --------------------------------------------------------------------------
    // subscribe to change in game status **************  Subscribe *************
    //
    // gameDataUnsubscribe = gameDataRef.onSnapshot(function(doc)
    // {
    //     console.log("Within Login - Subscriber on game status change called. Current status is " + decodeGameStatus(gameStatus) + " New status is " + decodeGameStatus(doc.data().status));
    //
    //     if (doc.exists)
    //     {
    //         // turn on or off volunteer button - Player needs to be logged in.
    //         if ((doc.data().volunteerNeeded == true) && (loggedIn == true))
    //         {
    //           document.getElementById("volunteerButton").style.visibility = "visible";
    //           postMessage(MESSAGE_TEXT_VOLUNTEER_NEEDED);
    //           volunteerNeeded = true;
    //         }
    //         else
    //         {
    //           if (volunteerNeeded == true)
    //           {
    //               postMessage(MESSAGE_TEXT_VOLUNTEER_FILLED);
    //               volunteerNeeded = false;
    //           }
    //
    //           document.getElementById("volunteerButton").style.visibility = "hidden";
    //         }
    //
    //         // update global vars
    //         nextScheduledStart = doc.data().nextScheduledStart;
    //
    //         // only process change if status changes, check for other data changes above
    //         if (gameStatus != doc.data().status)
    //         {
    //             gameStatus = doc.data().status;
    //
    //             // update game status on screen
    //             document.getElementById("gameStatus").innerHTML = decodeGameStatus(gameStatus);
    //
    //             switch (gameStatus)
    //             {
    //               case GAME_STATUS_COMPLETED:
    //
    //                   console.log("Game status changed to completed. Subscriber called. Status is " + decodeGameStatus(gameStatus));
    //                   status = PLAYER_STATUS_GAME_OVER;  // player status
    //
    //                   // change player status on the db only if logged in.
    //
    //                   if (loggedIn == true)
    //                   {
    //                       console.log("Player is logged in.  Updating status on db to player status game over. id is " + id);
    //                       // set my player status to waiting
    //                       db.collection("players").doc(id).update({
    //                         status: PLAYER_STATUS_GAME_OVER
    //                       })
    //                       .then(function() {
    //                         console.log("Player status set to Game Over.");
    //                       })
    //                       .catch(function(error) {
    //                         console.error("Error Player status set to Game Over.", error);
    //                       });
    //                   }
    //
    //                   renderGame(PLAYER_STATUS_GAME_OVER);
    //                   break;
    //
    //               case GAME_STATUS_PAUSED:
    //
    //                   postMessage(MESSAGE_TEXT_PAUSED_GAME);
    //                   console.log("Game status changed to paused. Subscriber called. Status is " + decodeGameStatus(gameStatus));
    //
    //                   // move myself to queue if I'm active, otherwise ignore, could be on break
    //                   if (status == PLAYER_STATUS_ACTIVE)
    //                   {
    //                       console.log("Paused player status is " + status);
    //                       // move to waiting
    //                       status = PLAYER_STATUS_WAITING;
    //
    //                       // set my player status to waiting
    //                       db.collection("players").doc(id).update({
    //                         status: PLAYER_STATUS_WAITING
    //                       })
    //                       .then(function() {
    //                         console.log("Player status set to waiting after game pause.");
    //                       })
    //                       .catch(function(error) {
    //                         console.error("Error Player status set to waiting after game pause.", error);
    //                       });
    //
    //                       // set waiting queue to just me
    //                       var tempList = new Array;
    //                       tempList.push(id);
    //
    //                       db.collection("queues").doc("waiting").set({
    //                           players: tempList
    //                         })
    //                         .then(function() {
    //                           console.log("db setting waiting queue after pause success");
    //                         })
    //                         .catch(function(error) {
    //                           console.error("db setting waiting queue after pause failed", error);
    //                         });
    //
    //                       renderGame(PLAYER_STATUS_WAITING);
    //
    //                   } // end if player is active
    //
    //                   break;
    //
    //               case GAME_STATUS_NOT_STARTED:
    //                   // logoffUser();
    //                   break;
    //
    //               default:
    //
    //             }
    //         }
    //
    //     } // end if doc exists
    //     else
    //     {
    //       postMessage(MESSAGE_TEXT_FATAL_ERROR);
    //       postError(SYSTEM_ID,ERROR_GAME_DATA_REF_DOESNT_EXIST);
    //       console.log("Game data doc was deleted in subscribe.");
    //     }
    // });
    //
    // // create a reference to the document
    var playerRef = db.collection("players").doc(id);

    playerRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          console.log("Successful log in");

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
          owed = doc.data().owed;
          loggedIn = true;

          // ****************** Subscribe *****************************************************************************
          // create listener on my player record, change in status is important **************  Subscribe *************
          playerUnsubscribe = playerRef.onSnapshot(function(doc)
          {
                // removed Workaround code with unsubscribe working - Only handle a call if player name is mine, not an old log in
                //if ((doc.exists) && (doc.data().name == name))
                if (doc.exists)
                {
                    console.log("Listener snapshot called player doc exists name is: " + doc.data().name + " - My name is " + name + "- current status is " + decodePlayerStatus(status) + " - incoming status is " + decodePlayerStatus(doc.data().status));

                    // update screen
                    document.getElementById("myOwed").innerHTML = doc.data().owed;
                    document.getElementById("myTotal").innerHTML = doc.data().total;

                    // update global var in case admin uploaded pic
                    if (myPicFileName != doc.data().pictureName)
                    {
                      console.log("My picture file name changed.");
                      myPicFileName = doc.data().pictureName;
                    }

                    if (status == PLAYER_STATUS_GAME_OVER)
                    {
                      // set player status on screen to Game Over
                      document.getElementById("myStatus").innerHTML = decodePlayerStatus(status);
                    }
                    else  // show the status coming in from subscribe
                    {
                      document.getElementById("myStatus").innerHTML = decodePlayerStatus(doc.data().status);
                    }

                    // update owed if nec
                    if (owed != doc.data().owed)
                    {
                      postMessage(MESSAGE_TEXT_BOUNTY_OWED_CHANGE);
                      owed = doc.data().owed;
                    }

                    // Either I was assassinated or I volunteered to go to inactive
                    if ((status == PLAYER_STATUS_ACTIVE) && (doc.data().status == PLAYER_STATUS_INACTIVE))
                    {
                        // assassinated
                        if (iVolunteered == false)
                        {
                          console.log(MESSAGE_TEXT_ASSASSINATED);
                          postMessage(MESSAGE_TEXT_ASSASSINATED);
                          //lastEvent = EVENT_TYPE_ASSASSINATED;
                        }
                        else  // I did volunteer
                        {
                          console.log(MESSAGE_TEXT_VOLUNTEERED);
                          postMessage(MESSAGE_TEXT_VOLUNTEERED);
                          //lastEvent = EVENT_TYPE_VOLUNTEERED;
                          iVolunteered = false;   // flip back to false
                        }

                        status = PLAYER_STATUS_INACTIVE;
                        renderGame(PLAYER_STATUS_INACTIVE);

                        return;
                    }

                    // I was moved from queue into the game - Error Check - PLAYER_STATUS_REGISTERED doesn't make sense here.
                    if (((status == PLAYER_STATUS_WAITING) || (status == PLAYER_STATUS_REGISTERED)) && (doc.data().status == PLAYER_STATUS_ACTIVE))
                    {
                        console.log("Player change subscribe called - going from waiting or registered to active. global id is " + id);

                        postMessage(MESSAGE_TEXT_ACTIVATED);
                        //lastEvent = EVENT_TYPE_ACTIVATED;
                        status = PLAYER_STATUS_ACTIVE;

                        // get and update my target data
                        // temp helper vars to make code more readable
                        var myTargetsID;
                        var myTargetsName;

                        // create a reference to my link document in the chain first
                        var myLinkRef = db.collection("chain").doc(id);

                        myLinkRef.get().then(function(doc)
                        {
                          if (doc.exists)
                          {
                              console.log("Moved to active - Right after myLinkRef.get then doc.exists");

                              // ************************************************************************************
                              // subscribe on the new link that was created ****************************************
                              // 1 of 2 places in the code - Player updated to active in listener
                              linkUnsubscribe = myLinkRef.onSnapshot(function(doc)
                              {
                                    // console.log("My link listener called on the way in - within Log In.");
                                    if (doc.exists)  // Only process something if doc exists, otherwise, my link was deleted and I don't care, I'm also listening to my status
                                    {
                                        console.log("My link listener called - Doc exists - within waiting to queue change");

                                        var myTargetsID = doc.data().target;

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
                                                document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;

                                                var myTargetsPic = document.getElementById("targetPicture");
                                                myTargetsPic.src = url;
                                                document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;

                                              }).catch(function(error)
                                                {
                                                  decodeFileErrorCode(error, PIC_MISSING_TARGET);
                                                } // end catch error

                                              );

                                            } // end if my targets player ref doc exists
                                            else {
                                              // my target's player record doesn't exist
                                            }
                                          }); // end .get on target's player record
                                          //  need error catching here
                                    }   // end if doc exists
                                    else {
                                      // my link doesn't exist
                                    }
                              }); // end myLinkRef - subscribe

                              // end link subscribe ***********************************************************************

                              console.log("Player change subscribe called - My Link exists - going from waiting to active.");

                              myTargetsID = doc.data().target;

                              // create a reference to my target's player record to get name and pic name
                              var myTargetsPlayerRef = db.collection("players").doc(myTargetsID);

                              myTargetsPlayerRef.get().then(function(doc)
                              {
                                if (doc.exists)
                                {
                                    console.log("Player change subscribe called - Within my targets player Ref - going from waiting to active - Doc exists for my target - Name is " + doc.data().name);
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
                                      document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;

                                    }).catch(function(error)
                                    {
                                        decodeFileErrorCode(error,PIC_MISSING_TARGET);
                                        document.getElementById("targetPicture").src = "";
                                    }); // end catch error

                                } // end if doc exists
                                else {
                                  postMessage(MESSAGE_TEXT_FATAL_ERROR);
                                  console.log("Error getting my targets player document within player subscribe data change:", error);
                                  // my target's player record doesn't exist
                                }
                              }); // end .get on target's player record
                              //  need error catching here

                          } // end if doc exists on search for my link record
                          else
                          {
                              postMessage(MESSAGE_TEXT_FATAL_ERROR);
                              console.log("My link doc doesn't exist within player data subscribe:", error);
                              // my link record doesn't exist
                          } // end else my link doc doesn't exist

                        }); // end .get on my link
                        //  error checking here

                        /// update status on screen here?
                        renderGame(PLAYER_STATUS_ACTIVE);
                        return;
                    } // end if - moved from queue into game

                    // Only update for Registered the first time, ignore afterwards
                    if ((doc.data().status == PLAYER_STATUS_REGISTERED) && (status != PLAYER_STATUS_REGISTERED))
                    {
                        console.log("Player is registered - Subscriber called.");
                        //postMessage(MESSAGE_TEXT_REGISTERED);
                        // lastEvent = EVENT_TYPE_WAITING;
                        status = PLAYER_STATUS_REGISTERED;
                        renderGame(PLAYER_STATUS_REGISTERED);
                        return;
                    }

                    // waiting to waiting - ignore
                    if ( (status == PLAYER_STATUS_WAITING) && doc.data().status == PLAYER_STATUS_WAITING)
                    {
                        // ignore, no status change zzz - this is one of those where maybe I can filter on the change type
                        console.log("Maybe this gets called on the initial creation of the listener?");
                        return;
                    }

                    // Just waiting
                    if (doc.data().status == PLAYER_STATUS_WAITING)
                    {
                        console.log(MESSAGE_TEXT_WAITING);
                        //lastEvent = EVENT_TYPE_WAITING;
                        status = PLAYER_STATUS_WAITING
                        renderGame(PLAYER_STATUS_WAITING);
                        return;
                    }

                    // Only show scheduled message if changed
                    if ((doc.data().status == PLAYER_STATUS_SCHEDULED) && (status != PLAYER_STATUS_SCHEDULED))
                    {
                        // lastEvent = EVENT_TYPE_SCHEDULED;
                        status = PLAYER_STATUS_SCHEDULED;
                        renderGame(PLAYER_STATUS_SCHEDULED);
                        return;
                    }

                }  // end doc exists - player subscribe
                else
                {
                  console.log("Player subscribe called but no doc - Must have been deleted.");

                  if (!doc.exists)
                    logoffUser();

                }

          });  // ******** end subscribe on my player record  *********************************************************

          // Display success in message area
          postMessage(MESSAGE_TEXT_LOGIN);

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
                          console.log("Doc exists for my target - within myLinkRef.get on chain - Name is " + doc.data().name);
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
                            document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;
                          }).catch(function(error)
                            {
                              console.log("My targets picture doesn't exist");
                              decodeFileErrorCode(error,PIC_MISSING_TARGET);
                              document.getElementById("targetPicture").src = "";
                            });  // end catch error

                      } // if doc.exists
                      else
                      {
                        // my target's player record doesn't exist
                      }
                    }); // end .get on target's player record
                    //  need error catching here

                    // ************************* Subscribe ************************************
                    // create Listener to my link reference ******** Subscribe ************************************
                    // 2 of 2 places in code for this subscribe.  This one is Log In and Active.
                    linkUnsubscribe = myLinkRef.onSnapshot(function(doc)
                    {
                        if (doc.exists)
                        {
                            console.log("My link listener called - Doc exists - My id is " + id + " Subscriber id is " + doc.id);

                            // check here if I am now in a paused game scenario
                            if (id == doc.data().target)
                            {
                                // go into paused mode
                                console.log("Game Paused - Only 1 player active. My Link Subscriber called and my target is me.");
                                postMessage(GAME_STATUS_PAUSED_TEXT);

                                // Set game status to "Paused"  ---------------------------------
                                db.collection("gameData").doc("gameData").update({
                                  status: GAME_STATUS_PAUSED
                                })
                                .then(function() {
                                  console.log("Set game status to Paused");
                                })
                                .catch(function(error) {
                                  console.error("Set game status to Paused failed", error);
                                });

                            }
                            else // continue, not in paused mode
                            {
                                myTargetsID = doc.data().target;

                                // get my target's name and update screen
                                var myTargetsPlayerRef = db.collection("players").doc(myTargetsID);
                                // line above blows up when link is deleted and there is no data.

                                myTargetsPlayerRef.get().then(function(doc)
                                {
                                    if (doc.exists)
                                    {
                                        console.log("Doc exists for my target - My targetsPlayerREf.get - Name is " + doc.data().name);

                                        // target = doc.data().name;  // not sure if I need this
                                        document.getElementById("myTargetsName").innerHTML = doc.data().name;

                                        // update my targets picture - I need targetID and the filename from the player record
                                        var myTargetsPictureRef = storageRef.child(String(doc.id) + "/" + doc.data().pictureName);

                                        myTargetsPictureRef.getDownloadURL().then(function(url)
                                        {
                                          console.log("getDownloadURL worked - targets picture");

                                          var myTargetsPic = document.getElementById("targetPicture");
                                          myTargetsPic.src = url;
                                          document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;
                                        }).catch(function(error)
                                          {
                                            console.log("My targets pic doesn't exist - Subscriber");
                                            decodeFileErrorCode(error,PIC_MISSING_TARGET);
                                            document.getElementById("targetPicture").src = "";
                                          });  // end catch error

                                    } // end if my targets player ref doc exists
                                    else
                                    {
                                        // my target's player record doesn't exist
                                    }

                                }); // end .get on target's player record
                                  //  need error catching here

                            }   // end else, not a pause scenario

                        }   // end if doc.exists - myLink subscriber
                        else {
                          // my link record doesn't exist - must have been deleted
                          console.log("My link doesn't exist - Likely deleted");
                        }

                    }); // end myLinkRef onSnapshot

                } // end if doc exists on search for my link record
                else {
                  // my link record doesn't exist although I am active - error scenario
                }

              }); // end .get on my link
              //  error checking here

          }   // end if my status was active
          else {
            console.log("Status is not active. It is " + decodePlayerStatus(doc.data().status));
          }

          renderGame(status);

      }   // end if doc exists
      else
      {
        postMessage(MESSAGE_TEXT_LOGIN_FAILED + id);
        postError(id, MESSAGE_TEXT_LOGIN_FAILED + id);
      }

    }).catch(function(error) {
      console.log("Error getting adminsRef.get() document:", error);
      });

}); // end login button listener

// ---------------------------------------------------------

logOffButton.addEventListener('click', function (e)
{
  logoffUser();
});  // end logOff button listener -----------------------------------

// ----------------------------------------------------------------------

function logoffUser()
{
    document.getElementById("myId").innerHTML = "";
    document.getElementById("myName").innerHTML = "";
    document.getElementById("myStatus").innerHTML = "";
    document.getElementById("gameStatus").innerHTML = "";
    document.getElementById("myTargetsName").innerHTML = "";

    document.getElementById("myOwed").innerHTML = "";
    document.getElementById("myTotal").innerHTML = "";
    document.getElementById("playerPictureInput").value = "";

    document.getElementById("nameInputBox").value = "";

    document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL;
    document.getElementById("myPictureLabel").innerHTML = MY_PICTURE_LABEL;

    console.log("Logoff called, my id is " + id);

    postMessage(MESSAGE_TEXT_LOGOFF);

    //  detach from listeners
    playerUnsubscribe();

    console.log("Game Data Unsubscribe called.");
    gameDataUnsubscribe();

    if (status == PLAYER_STATUS_ACTIVE)
    {
        // detach from chain listener
        linkUnsubscribe();
    }

    // reset global vars
    id = "";
    name = "";
    status = PLAYER_STATUS_LOGGED_OFF;  // player status
    owed = 0;
    nameOfTargetsTarget = "";
    myLinkRef = ""; // reference to my link in the chain
    myPicFileName = "";
    loggedIn = false;
    iVolunteered = false;
    registrationInProgress = false;

    renderGame(PLAYER_STATUS_LOGGED_OFF);

    console.log("Logoff Called and completed.");

}

// end function logoff User - reused by button and also scenario where admin blanks game while user logged in

// Start confirmAssassination function ----------------------
// moved code out of button listener to allow default action when enter pressed

confirmAssassinationButton.addEventListener('click', function (e)
{
    confirmAssassination();

});   // end confirmAssassination button

// ----------------------------------------------------------------------------------

function confirmAssassination()
{
    // temp helper vars to make code more readable
    var myTargetsID;
    var myTargetsTargetID;
    var myTargetsTargetsName;

    // only get data I need
    console.log("Confirm assassination called.");

    nameOfTargetsTarget = document.getElementById("targetsTargetNameInputBox").value;

    if (nameOfTargetsTarget == "")
    {
      console.log("Blank name entered in target's target box.");
      postMessage(MESSAGE_TEXT_INVALID_SCREEN_DATA + "  Target's target name invalid.");
      return;
    }

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
                // save my target's target id
                myTargetsTargetID = doc.data().target;

               // create a reference to the player db for my target's target
                var myTargetsTargetPlayerRef = db.collection("players").doc(myTargetsTargetID);

                myTargetsTargetPlayerRef.get().then(function(doc)
                {
                  if (doc.exists) // my target's target player doc exists
                  {
                      console.log("Checking names for assassination, " + nameOfTargetsTarget + " and " + doc.data().name);

                      // convert both names to lowercase
                      if (nameOfTargetsTarget.toLowerCase() == (doc.data().name).toLowerCase())
                      {
                        console.log("Names match - good assassination  --------------------------");
                        postMessage(MESSAGE_TEXT_CONFIRM_BOUNTY);

                        // create a reference to the player document to increment owed
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
                        var queueRef = db.collection("queues").doc("waiting");
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

                                    deleteQueue();

                              } // end if there are players in the queue
                              else
                              {  // queue is empty

                                  // check if I'm the only player remaining
                                  if (id == myTargetsTargetID)
                                  {
                                    console.log("Game Paused - Only 1 player active.");

                                    // clean up my targets data before handling pause scenario
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

                                    // Set game status to "Paused"  ---------------------------------
                                    db.collection("gameData").doc("gameData").update({
                                      status: GAME_STATUS_PAUSED
                                    })
                                    .then(function() {
                                      console.log("Set game status to Paused");
                                    })
                                    .catch(function(error) {
                                      console.error("Set game status to Paused failed", error);
                                    });

                                  } // end if I'm the only player remaining
                                  else
                                  {
                                      // Pickup of my targets target (No players waiting)
                                      myLinkRef.update({
                                            target: myTargetsTargetID
                                          })
                                          .then(function() {
                                            console.log("Players update assign my target to my targets target's id.");
                                          })
                                          .catch(function(error) {
                                            console.error("Error assign my target to my targets target's id.", error);
                                      });

                                  }  // end else check if I'm the only player

                              } // end else queue is empty

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
                          postMessage(MESSAGE_TEXT_BOUNTY_FAILED + nameOfTargetsTarget.toLowerCase());
                          postError(id,MESSAGE_TEXT_BOUNTY_FAILED + nameOfTargetsTarget.toLowerCase());
                      }

                  }   // end if doc exists - my targets player ref
                  else {
                    console.log("My targets player ref doc doesnt exist");
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

    document.getElementById("targetsTargetNameInputBox").value = "";

}

// -----------------------------------------------------------------------------------
// start buy back in button listener

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
          if ((doc.data().status == PLAYER_STATUS_INACTIVE) && (doc.data().owed >= 1))
          {
            // proceed with buy back in process - ok
            // update player status to Waiting, decrement owed in db
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
            var queueRef = db.collection("queues").doc("waiting");
            queueRef.get().then(function(doc)
            {
              if (doc.exists)
              {
                  tempQueue = doc.data().players; // save queue locally

                  // add new player to local queue
                  tempQueue.push(id);

                  // update db queue with local queue
                  db.collection("queues").doc("waiting").set({
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

            //lastEvent = EVENT_TYPE_BUY_BACK_IN;
            postMessage(MESSAGE_TEXT_BUY_BACK_IN);
            status = PLAYER_STATUS_WAITING;
            renderGame(PLAYER_STATUS_WAITING);

            // lastMessage = "Reactivate successful.  Waiting assignment."
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

  console.log("Take a break button pressed.  Player id is " + id);

  playerRef.get().then(function(doc)
  {
    if (doc.exists)
    {
        // only take a break if active
        if (doc.data().status == PLAYER_STATUS_ACTIVE)
        {
          status = PLAYER_STATUS_BREAK;

          var now = new Date(Date.now());
          var newTimeStamp = new firebase.firestore.Timestamp.fromDate(now);

          console.log("Take a break - firestore now date is " + newTimeStamp);

          // proceed with taking a break
          // update player status to on break
          playerRef.update({
            status: PLAYER_STATUS_BREAK,
            breakTimeStamp: newTimeStamp
            // breakTime: now()
          })
          .then(function() {
            console.log("Players status update success - break.");
          })
          .catch(function(error) {
            console.error("Error player status update to db - break", error);
          });

          updateChainToSkipMe();

          renderGame(PLAYER_STATUS_BREAK);

        } // end if active
        else {
          // Button should only be visible if active status
          console.log("Incorrect Status to Take Break.  Don't believe this is even reachable.");
          postMessage(MESSAGE_TEXT_CANT_TAKE_BREAK);
          postError(id,MESSAGE_TEXT_CANT_TAKE_BREAK);
        }
    } // end if player doc exists

  }); // end player ref get - need error checking

});  // end take a break button listener

// ---------------------------------------------------------
// begin return from break button

returnFromBreakButton.addEventListener('click', function(e)
{
  // get player ref
  var playerRef = db.collection("players").doc(id);

  console.log("Return break button pressed");
  playerRef.get().then(function(doc)
  {
    if (doc.exists)
    {
        // only return from break if on break
        if (doc.data().status == PLAYER_STATUS_BREAK)
        {
            // only allow if after the waiting period
            var breakTime = new Date((doc.data().breakTimeStamp).toDate());
            var now = new Date(Date.now());
            console.log("Now time is " + now + "  Firestore break time is " + breakTime);

            var minsDiff = ((now - breakTime)/1000)/60; // num mins
            console.log("Mins difference is " + minsDiff);

            if (minsDiff < minBreakLength)
            {
              console.log("Too early to return");
              postMessage(MESSAGE_TEXT_TOO_EARLY_TO_RETURN_FROM_BREAK);
              return;
            }

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
              var queueRef = db.collection("queues").doc("waiting");
              queueRef.get().then(function(doc)
              {
                if (doc.exists)
                {
                    tempQueue = doc.data().players; // save queue locally

                    // add me onto local queue
                    tempQueue.push(id);

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

                }   // end if doc.exists
                else
                {
                  console.log("Error queue Doc doesnt exists");
                }
              }).catch(function(error) {
                  console.log("Error getting queue document:", error);
                  });

              renderGame(PLAYER_STATUS_WAITING);

        }  // end if status is break
        else {
          console.log("Not on break, can't come back from break.");
          postMessage(MESSAGE_TEXT_LOGIN_CANT_RETURN_FROM_BREAK);
          postError(id,MESSAGE_TEXT_LOGIN_CANT_RETURN_FROM_BREAK);
        }
    }  // end if player ref doc exists

  }); // end playerRef.get

}); //  end returnFromBreakButton.addEventListener

// ------------------  Pic functions ------------------------

uploadPictureButton.addEventListener('click', function (e)
{
    var fileChosen = document.getElementById("playerPictureInput");
    var curFiles = fileChosen.files;

    if(curFiles.length === 1)   // only allow one picture
    {
        // get player reference to update picture field
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
                  console.log("Updated pic name in player db document.");
                  // postMessage(MESSAGE_TEXT_UPLOAD_PIC_SUCCESS);
                })
                .catch(function(error) {
                  console.error("Error player pic name update", error);
                  postMessage(MESSAGE_TEXT_UPLOAD_PIC_FAILED);
                  postError(id,MESSAGE_TEXT_UPLOAD_PIC_FAILED);
                  resetInputBoxes();
                });
          } // end if player doc exists - need error checking

        });

        var fullPath = String(id) + "/" + myPicFileName;

        // Create a reference
        var myFileRef = storageRef.child(fullPath);

        // Upload file
        var uploadTask = myFileRef.put(curFiles[0]);  // needs error checking

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion

        uploadTask.on('state_changed', function(snapshot)
        {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log('Upload is ' + progress + '% done');

              switch (snapshot.state)
              {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }

          },
          function(error)
          {
              // Handle unsuccessful uploads
              console.log("Unsuccessful file upload");
              postMessage(MESSAGE_TEXT_UPLOAD_PIC_FAILED);
              postError(MESSAGE_TEXT_UPLOAD_PIC_FAILED);
              resetInputBoxes();
          },
          function()
          {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL)
                {
                  console.log('Success - File available at', downloadURL);
                  postMessage(MESSAGE_TEXT_UPLOAD_PIC_SUCCESS);
                  resetInputBoxes();
                });
          });

    } // end if 1 file chosen
    else
    {
      console.log("You must choose 1 file");
      postMessage(MESSAGE_TEXT_MUST_CHOOSE_ONE_FILE);
      postError(id,MESSAGE_TEXT_MUST_CHOOSE_ONE_FILE);
      resetInputBoxes();
    }

});

// ------------------------------------------------------------------
// Start view my picture button listener

viewMyPictureButton.addEventListener('click', function (e)
{
      var myPictureRef = storageRef.child(String(id) + "/" + myPicFileName);

      myPictureRef.getDownloadURL().then(function(url)
      {
        console.log("getDownloadURL worked");

        var myPic = document.getElementById("myPicture");
        myPic.src = url;

        document.getElementById("myPictureLabel").innerHTML = MY_PICTURE_LABEL;

      }).catch(function(error)
        {
          decodeFileErrorCode(error,PIC_MISSING_MINE);
          document.getElementById("myPicture").src = "";
          postError(id, PIC_MISSING_MINE);
        });  // end catch

}); // end view my pic button

// ---------------------------------------------------------

// quitGameButton

quitGameButton.addEventListener('click', function (e)
{
    console.log("Quit game called");
    var myTargetsID;  // save this for later use if nec

    var playerRef = db.collection("players").doc(id);
    playerRef.get().then(function(doc)
    {
        if (doc.exists)
        {
            switch (doc.data().status)
            {
              case PLAYER_STATUS_GAME_OVER:

                postMessage(MESSAGE_TEXT_CANT_QUIT_GAME_OVER);
                return;
                break;

              case PLAYER_STATUS_ACTIVE:  // delete chain link, empty queue

                  console.log("In quit game, my status is " + doc.data().status);
                  updateChainToSkipMe();

                  deletePlayer();

                  // logoffUser();
                  renderGame(PLAYER_STATUS_LOGGED_OFF);

                break;

              case PLAYER_STATUS_WAITING:

                  // delete from queue
                  // First get queue, loop through, create new queue without player
                  var tempQueue = new Array;

                  // get the waiting queue and remove this player
                  var queueRef = db.collection("queues").doc("waiting");
                  queueRef.get().then(function(doc)
                  {
                    if (doc.exists)
                    {
                        var i;

                        console.log("Length of waiting queue going in is " + doc.data().players.length);
                        for (i=0;i<doc.data().players.length;i++)
                        {
                            console.log("Waiting queue id is " + doc.data().players[i] + " My id is " + id);
                            if (doc.data().players[i] != id)
                            {
                              console.log("Pushing id " + doc.data().players[i] + " onto temp q");
                              tempQueue.push(doc.data().players[i]);
                            }
                        }

                        if (doc.data().players.length == 1) // only me
                        {
                            console.log("Queue only me");
                            // update db queue with local queue
                            db.collection("queues").doc("waiting").update({
                                players: []
                            })
                            .then(function() {
                              console.log("db setting waiting queue players array success");
                            })
                            .catch(function(error) {
                              console.error("db setting waiting queue players array failed", error);
                            });

                        }
                        else
                        {
                            console.log("Queue not only me");
                            // update db queue with local queue
                            db.collection("queues").doc("waiting").set({
                                players: tempQueue
                            })
                            .then(function() {
                              console.log("db setting waiting queue players array success");
                            })
                            .catch(function(error) {
                              console.error("db setting waiting queue players array failed", error);
                            });

                        }

                        deletePlayer();

                        renderGame(PLAYER_STATUS_LOGGED_OFF);

                    }  // end if doc.exists
                    else
                    {
                      console.log("Error Queue Doc doesn't exist - Remove Player");
                    }
                  }).catch(function(error) {
                      console.log("Error getting queue document - Remove Player:", error);
                  });

                break;

              case PLAYER_STATUS_SCHEDULED:

                    // delete from scheduled queue
                    // First get queue, loop through, create new queue without player
                    var tempQueue = new Array;

                    // get the waiting queue and remove this player
                    var queueRef = db.collection("queues").doc("scheduled");
                    queueRef.get().then(function(doc)
                    {
                      if (doc.exists)
                      {
                          var i;

                          console.log("Length of scheduled queue going in is " + doc.data().players.length);
                          for (i=0;i<doc.data().players.length;i++)
                          {
                              console.log("Scheduled queue id is " + doc.data().players[i] + " My id is " + id);
                              if (doc.data().players[i] != id)
                              {
                                console.log("Pushing id " + doc.data().players[i] + " onto temp q");
                                tempQueue.push(doc.data().players[i]);
                              }
                          }

                          if (doc.data().players.length == 1) // only me
                          {
                              console.log("Queue only me");
                              // update db queue with local queue
                              db.collection("queues").doc("scheduled").update({
                                  players: []
                              })
                              .then(function() {
                                console.log("db setting scheduled queue players array success");
                              })
                              .catch(function(error) {
                                console.error("db setting scheduled queue players array failed", error);
                              });

                          }
                          else
                          {
                              console.log("Queue not only me");
                              // update db queue with local queue
                              db.collection("queues").doc("scheduled").set({
                                  players: tempQueue
                              })
                              .then(function() {
                                console.log("db setting scheduled queue players array success");
                              })
                              .catch(function(error) {
                                console.error("db setting scheduled queue players array failed", error);
                              });

                          }

                          deletePlayer();

                          renderGame(PLAYER_STATUS_LOGGED_OFF);

                      }  // end if doc.exists
                      else
                      {
                        console.log("Error Queue Doc doesn't exist - Remove Player");
                      }
                    }).catch(function(error) {
                        console.log("Error getting queue document - Remove Player:", error);
                    });

                  break;

              case PLAYER_STATUS_INACTIVE:
              case PLAYER_STATUS_BREAK:
              case PLAYER_STATUS_LOGGED_OFF:
              case PLAYER_STATUS_REGISTERED:

                  deletePlayer();
                  renderGame(PLAYER_STATUS_LOGGED_OFF);

                break;

              default:

            }

        }  // end if doc exists, original player ref
        else {
          console.log("Player doesn't exist on Quit Game call");
          postMessage(MESSAGE_TEXT_PLAYER_NOT_FOUND);
        }

    }); // end player ref.get

}); // end quit game button

// ---------------------------------------------------------
// Begin volunteer button

volunteerButton.addEventListener('click', function (e)
{
    iVolunteered = true;

    // error checking for near simultaneous volunteers - get var from db first and check?  Might help?
    var gameDataRef = db.collection("gameData").doc("gameData");
    gameDataRef.get().then(function(doc)
    {
      if (doc.exists)
      {
        if (doc.data().volunteerNeeded == false)
        {
          document.getElementById("volunteerButton").style.visibility = "hidden";
          return;
        }
        else
        {

          // flip db var to false
          db.collection("gameData").doc("gameData").update({
            volunteerNeeded: false
          })
          .then(function() {
            console.log("Updated game data volunteer needed to false.");
          })
          .catch(function(error) {
            console.error("Error - game data volunteer needed to false.", error);
          });

          volunteerNeeded = false;

          // need new version of this to bring in scheduled queue too
          processVolunteer();

          // get player ref
          var playerRef = db.collection("players").doc(id);

          playerRef.get().then(function(doc)
          {
            if (doc.exists)
            {
                // update player status to inactive
                playerRef.update({
                  status: PLAYER_STATUS_INACTIVE,
                  owed: doc.data().owed + 1,
                  total: doc.data().total + 1
                })
                .then(function() {
                  console.log("Players status update success - volunteer inactive.");
                })
                .catch(function(error) {
                  console.error("Error player status update to db - volunteer inactive", error);
                });

            }   // if doc exists

          });

        } // volunteer needed is still true, continue

      } // end if doc.exists
    });

});   // end volunteer button

// -------------------------------------------------------
// similar to updateChainToSkipMe, however, assume scheduled queue exists

function processVolunteer()
{
    var myTargetsID;

    console.log("In processVolunteer id is " + id);

    var linkRef = db.collection("chain").doc(id);
    linkRef.get().then(function(doc)
    {
      console.log("In processVolunteer link ref function called ");

      if (doc.exists) // Player is active, in the chain
      {
          console.log("In processVolunteer Doc exists.");

          myTargetsID = doc.data().target;
          console.log("In processVolunteer, my targets id is " + myTargetsID);

          // Determine which player has me as their target
          var myAssassinsId;

          // query db for the document where target = my id
          var linksRef = db.collection("chain");
          var query = linksRef.where("target", "==", id);

          // update chain - get the player that has me as their target
          query.get().then((snapshot) =>
          {
                // console.log("Snapshot size is " + snapshot.size); // + "  Snapshot target data is " + snapshot.docs);
                // console.log("Snapshot docs array 0 element id is " + snapshot.docs[0].id); // + "  Snapshot target data is " + snapshot.docs);
                // only 1 always
                myAssassinsId = snapshot.docs[0].id;

                console.log("In processVolunteer, my assassin's id is " + myAssassinsId);

                // check here for paused scenario -
                // if my target has me as their target, it must be paused
                if (myTargetsID == myAssassinsId)
                {
                  // go into paused mode
                  console.log("Game Paused - Only 1 player active. Found within processVolunteer function.");
                  postMessage(GAME_STATUS_PAUSED_TEXT);

                  // Set game status to "Paused"  ---------------------------------
                  db.collection("gameData").doc("gameData").update({
                    status: GAME_STATUS_PAUSED
                  })
                  .then(function() {
                    console.log("Set game status to Paused");
                  })
                  .catch(function(error) {
                    console.error("Set game status to Paused failed", error);
                  });

                  return;

                }

                // not a pause scenario, Continue
                // Get reference to the assassin that has me as their target
                var myAssassinsLinkRef = db.collection("chain").doc(myAssassinsId);

                // Grab scheduled queue first
                var tempArray = new Array;

                // Check the sched queue before rebuilding chain - get the waiting queue
                var schedQueueRef = db.collection("queues").doc("scheduled");
                schedQueueRef.get().then(function(doc)
                {
                  // console.log("Inside sched queue ref up front");
                  if (doc.exists) // waiting queue doc exists
                  {
                      console.log("Scheduled queue exists");
                      // console.log("Waiting queue Doc exists");
                      if (doc.data().players != 0)  // bring in waiting players if queue not empty
                      {
                          console.log("Scheduled queue exists, players array not zero");
                          tempArray = doc.data().players;   // create local array to shuffle players
                      }

                      // Check the waiting queue before rebuilding chain - get the waiting queue
                      var queueRef = db.collection("queues").doc("waiting");
                      queueRef.get().then(function(doc)
                      {
                        // console.log("Inside queue ref up front");
                        if (doc.exists) // waiting queue doc exists
                        {
                            console.log("Waiting queue exists in process volunteer");

                            // console.log("Waiting queue Doc exists");
                            if (doc.data().players != 0)  // bring in waiting players if queue not empty
                            {

                                console.log("Waiting queue exists in process volunteer, players array not blank.");
                                var i;
                                for (i=0; i<doc.data().players.length; i++ )
                                  tempArray.push(doc.data().players[i]);

                            } // if waiting queue players array has players
                        } // if doc exists for waiting queue

                        for (i=0;i<tempArray.length*50;i++)
                        {
                          var index1 = Math.floor((Math.random() * doc.data().players.length));
                          var index2 = Math.floor((Math.random() * doc.data().players.length));
                          var tempPlayer = tempArray[index1];
                          tempArray[index1] = tempArray[index2];
                          tempArray[index2] = tempPlayer;
                        }

                        console.log("About to assign my assassin in process volunteer.");
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

                            deleteQueue();
                            deleteSchedQueue();

                            // delete my link - Maybe move this down
                            linkRef.delete().then(function() {
                                console.log("my link take a break Document successfully deleted!");
                            }).catch(function(error) {

                                console.error("my link take a break Error removing document: ", error);
                            });

                      }); // end queueRef.get()
                  } // end if sched queue doc exists

                });

          }); // end query.get for who has me as their target

      }   // end if doc exists
      else {
        console.log("In processVolunteer - My link in chain doesn't exist - updateChainToSkipMe.");
        postMessage(MESSAGE_TEXT_CANT_VOLUNTEER);

      }
    });   // link ref.get()

} // end function updateChainToSkipMe


// ---------------------------------------------------------
// Intercept Enter Key - Confirm assassination if text entered

document.onkeydown = checkKey;

function checkKey(evt)
{
  // this line of code was needed due to old browsers, possibly firefox, Nathan had an issue
  evt = evt || window.event;

  switch (evt.keyCode)
  {
      case ENTER_KEY:

          // check if Target's target name field is filled
          if (document.getElementById("targetsTargetNameInputBox").value != "")
          {
            confirmAssassination();
          }
          break;

      default:

  } // end switch

} // end function checkKey interceptor

// ---------------------------------------------------------
// start function delete waiting queue

function deleteQueue()
{
  db.collection("queues").doc("waiting").update({
    players: []
  })
  .then(function() {
    console.log("Queue delete success within assassination.");
  })
  .catch(function(error) {
    console.error("Error queue delete within assassination.", error);
  });

}

// ---------------------------------------------------------

function deleteSchedQueue()
{
  db.collection("queues").doc("scheduled").update({
    players: []
  })
  .then(function() {
    console.log("Queue sched delete success within assassination.");
  })
  .catch(function(error) {
    console.error("Error sched queue delete within assassination.", error);
  });

}

// ---------------------------------------------------------

function resetInputBoxes()
{
  console.log("Reset input boxes called");
  document.getElementById("idInputBox").value = "";
  document.getElementById("targetsTargetNameInputBox").value = "";
  document.getElementById("playerPictureInput").value = "";
}

// ----------------------------------------

function enablePictures()
{

  document.getElementById("playerPictureInputLabel").style.visibility = "visible";
  document.getElementById("playerPictureInput").style.visibility = "visible";
  document.getElementById("uploadPictureButton").style.visibility = "visible";
  document.getElementById("viewMyPictureButton").style.visibility = "visible";
  document.getElementById("myPictureLabel").style.visibility = "visible";
  document.getElementById("myPicture").style.visibility = "visible";

}   /// end enablePictures

// --------------------------------------------
// Repeatable helper functions
// updateChainToSkipMe - called when player goes on break or quits game

function updateChainToSkipMe()
{
    var myTargetsID;

    console.log("In updateChainToSkipMe id is " + id);

    var linkRef = db.collection("chain").doc(id);
    linkRef.get().then(function(doc)
    {
      console.log("In updateChainToSkipMe link ref function called ");

      if (doc.exists) // Player is active, in the chain
      {
          console.log("In updateChainToSkipMe Doc exists.");

          myTargetsID = doc.data().target;
          console.log("In updateChainToSkipMe, my targets id is " + myTargetsID);

          // Determine which player has me as their target
          var myAssassinsId;

          // query db for the document where target = my id
          var linksRef = db.collection("chain");
          var query = linksRef.where("target", "==", id);

          // update chain
          query.get().then((snapshot) =>
          {
                // console.log("Snapshot size is " + snapshot.size); // + "  Snapshot target data is " + snapshot.docs);
                // console.log("Snapshot docs array 0 element id is " + snapshot.docs[0].id); // + "  Snapshot target data is " + snapshot.docs);
                // only 1 always
                myAssassinsId = snapshot.docs[0].id;

                console.log("In updateChainToSkipMe, my assassin's id is " + myAssassinsId);

                // check here for paused scenario -
                // if my target has me as their target, it must be paused
                if (myTargetsID == myAssassinsId)
                {
                  // go into paused mode
                  console.log("Game Paused - Only 1 player active. Found within updateChainToSkipMe function.");
                  postMessage(GAME_STATUS_PAUSED_TEXT);

                  // Set game status to "Paused"  ---------------------------------
                  db.collection("gameData").doc("gameData").update({
                    status: GAME_STATUS_PAUSED
                  })
                  .then(function() {
                    console.log("Set game status to Paused");
                  })
                  .catch(function(error) {
                    console.error("Set game status to Paused failed", error);
                  });

                  return;

                }

                // not a pause scenario, Continue
                // Get reference to the assassin that has me as their target
                var myAssassinsLinkRef = db.collection("chain").doc(myAssassinsId);

                // Check the waiting queue before rebuilding chain - get the waiting queue
                var queueRef = db.collection("queues").doc("waiting");
                queueRef.get().then(function(doc)
                {
                  // console.log("Inside queue ref up front");
                  if (doc.exists) // waiting queue doc exists
                  {
                      // console.log("Waiting queue Doc exists");
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
                            console.log("Iteration " + i + " within create links loop within updateChainToSkipMe")
                            // create a link in the chain
                            db.collection("chain").doc(tempArray[i]).set({
                                target: tempArray[i+1]
                              })
                              .then(function() {
                                console.log("Success writing to chain within updateChainToSkipMe");
                              })
                              .catch(function(error) {
                                console.error("Error writing to chain  within updateChainToSkipMe", error);
                              });

                              // update player status to Active
                              db.collection("players").doc(tempArray[i]).update({
                                status: PLAYER_STATUS_ACTIVE
                              })
                              .then(function() {
                                console.log("Players status update success within updateChainToSkipMe.");
                              })
                              .catch(function(error) {
                                console.error("Error player status update to db within updateChainToSkipMe.", error);
                              });

                          } // end for loop

                          // assign the target of the last player in the queue to my original target
                          // create the last link in the chain
                          db.collection("chain").doc(tempArray[i]).set({
                              target: myTargetsID
                            })
                            .then(function() {
                              console.log("Success last link within updateChainToSkipMe");
                            })
                            .catch(function(error) {
                              console.error("Error last link within updateChainToSkipMe", error);
                            });

                            // update last player status to Active
                            db.collection("players").doc(tempArray[i]).update({
                              status: PLAYER_STATUS_ACTIVE
                            })
                            .then(function() {
                              console.log("Players status update success within updateChainToSkipMe.");
                            })
                            .catch(function(error) {
                              console.error("Error player status update to db within updateChainToSkipMe.", error);
                            });

                            deleteQueue();

                            // delete my link - Maybe move this down
                            linkRef.delete().then(function() {
                                console.log("my link take a break Document successfully deleted!");
                            }).catch(function(error) {

                                console.error("my link take a break Error removing document: ", error);
                            });

                      } // end if there are players in the queue
                      else
                      {  // queue is empty
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

                          // delete my link
                          linkRef.delete().then(function() {
                              console.log("my link take a break Document successfully deleted!");
                          }).catch(function(error) {

                              console.error("my link take a break Error removing document: ", error);
                          });

                      }   // end else - queue was empty

                  } // end if queue doc exists
                  else {
                    console.log("Queue doc doesn't exist in take a break");
                  }

                });

          }); // need error checking

      }   // end if doc exists
      else {
        console.log("In updateChainToSkipMe - My link in chain doesn't exist - updateChainToSkipMe.");
      }
    });   // link ref.get()

} // end function updateChainToSkipMe

// ---------------------------------------

function deletePlayer()
{
  // delete player last ------------------------------------
  db.collection("players").doc(id).delete().then(function()
  {
    console.log("Player " + id + " successfully deleted!");
  }).catch(function(error)
  {
        console.error("Error removing player " + id + " Error: ", error);
  });

}

// ---------------------------------------

function postError(inId, inMessage)
{
    console.log("Error - Id = " + inId + "  Message = " + inMessage);

    // write error to db with meaningful text
    errors.add({
      id: inId,
      messageText: inMessage,
      timeStamp: new firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
    })
    .then(function(docRef) {
        console.log("Error Document written with player ID: ", inId);
    })
    .catch(function(error) {
        console.error("Error adding Error document: ", error);
    });

}

// ---------------------------------------

function postMessage(inMessage)
{
    console.log("Post Message called, inMessage is " + inMessage + "  Total current messages is " + messages.length);

    var i;
    screenMessage.innerHTML = "";

    if (messages.length == 0)
    {
        messages.push(inMessage);
    }
    else
    {
        // determine whether to push new message on or just shift
        if (messages.length < SCROLLING_MESSAGE_LENGTH)
        {
            messages.push(messages[messages.length-1]);

            for (i=0; i<messages.length-2; i++)
            {
                messages[messages.length-2-i] = messages[messages.length-3-i];
            }
        }
        else
        {
            // shift all messages down 1, # of iterations is one less than the length
            for (i=0; i<messages.length-1; i++)
            {
              messages[messages.length-1-i] = messages[messages.length-2-i];
            }

        }

        messages[0] = inMessage;

    }

    var tempMessage = "";

    for (i=0; i<messages.length; i++)
    {
        tempMessage += messages[i] + "<br>";
    }

    screenMessage.innerHTML = tempMessage;

} // end function postMessage


// ---------------------------------------
// updateLogInControls function

function updateLogInControls(direction)
{
  if (direction == ON)
  {
    document.getElementById("myIdInputLabel").style.visibility = "visible";
    document.getElementById("idInputBox").style.visibility = "visible";
    document.getElementById("registerButton").style.visibility = "visible";
    document.getElementById("logInButton").style.visibility = "visible";

    document.getElementById("registerASAP").style.visibility = "hidden";
    document.getElementById("registerSchedule").style.visibility = "hidden";
    document.getElementById("registrationLabelASAP").style.visibility = "hidden";
    document.getElementById("registrationLabelScheduled").style.visibility = "hidden";

    document.getElementById("myRegisterNameLabel").style.visibility = "hidden";
    document.getElementById("nameInputBox").style.visibility = "hidden";
    document.getElementById("returnFromBreakButton").style.visibility = "hidden";
    document.getElementById("buyBackInButton").style.visibility = "hidden";

    document.getElementById("logOffButton").style.visibility = "hidden";
    document.getElementById("quitGameButton").style.visibility = "hidden";
  }
  else
  {
    document.getElementById("myIdInputLabel").style.visibility = "hidden";
    document.getElementById("idInputBox").style.visibility = "hidden";
    document.getElementById("myRegisterNameLabel").style.visibility = "hidden";
    document.getElementById("nameInputBox").style.visibility = "hidden";

    document.getElementById("logInButton").style.visibility = "hidden";
    document.getElementById("registerButton").style.visibility = "hidden";

    document.getElementById("registerASAP").style.visibility = "hidden";
    document.getElementById("registerSchedule").style.visibility = "hidden";
    document.getElementById("registrationLabelASAP").style.visibility = "hidden";
    document.getElementById("registrationLabelScheduled").style.visibility = "hidden";

    document.getElementById("logOffButton").style.visibility = "visible";
    document.getElementById("quitGameButton").style.visibility = "visible";

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

    enablePictures();

    document.getElementById("myTargetsPictureLabel").style.visibility = "visible";
    document.getElementById("targetPicture").style.visibility = "visible";

    document.getElementById("myTotal").style.visibility = "visible";
    document.getElementById("myOwed").style.visibility = "visible";

  }
  else
  {
    document.getElementById("confirmAssassinationButton").style.visibility = "hidden";
    document.getElementById("myNameOfTargetsTargetLabel").style.visibility = "hidden";
    document.getElementById("targetsTargetNameInputBox").style.visibility = "hidden";
    document.getElementById("takeABreakButton").style.visibility = "hidden";
    document.getElementById("returnFromBreakButton").style.visibility = "hidden";
    document.getElementById("buyBackInButton").style.visibility = "hidden";
    document.getElementById("volunteerButton").style.visibility = "hidden";

    document.getElementById("myTargetsName").innerHTML = "";

    document.getElementById("playerPictureInputLabel").style.visibility = "hidden";
    document.getElementById("playerPictureInput").style.visibility = "hidden";
    document.getElementById("uploadPictureButton").style.visibility = "hidden";
    document.getElementById("viewMyPictureButton").style.visibility = "hidden";
    document.getElementById("myTargetsPictureLabel").style.visibility = "hidden";

    document.getElementById("targetPicture").style.visibility = "hidden";
    document.getElementById("targetPicture").src = "";

    document.getElementById("myPictureLabel").style.visibility = "hidden";
    document.getElementById("myPicture").style.visibility = "hidden";
    document.getElementById("myPicture").src = "";

  }

}

// ---------------------------------------------------------------
// start function decodePlayerStatus

function decodePlayerStatus(statusPassedIn)
{
  // console.log("decode called - status passed in = " + statusPassedIn);

  switch (Number(statusPassedIn)) {

    case PLAYER_STATUS_LOGGED_OFF:
      return PLAYER_STATUS_LOGGED_OFF_TEXT;
      break;

    case PLAYER_STATUS_REGISTER_IN_PROGRESS:
      return PLAYER_STATUS_REGISTER_IN_PROGRESS_TEXT;
      break;

    case PLAYER_STATUS_WAITING:
      return PLAYER_STATUS_WAITING_TEXT;
      break;

    case PLAYER_STATUS_SCHEDULED:
        return PLAYER_STATUS_SCHEDULED_TEXT;
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

    case PLAYER_STATUS_REGISTERED:
      return PLAYER_STATUS_REGISTERED_TEXT;
            break;

    case PLAYER_STATUS_GAME_OVER:
      return PLAYER_STATUS_GAME_OVER_TEXT;
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
  switch (statusPassedIn)
  {
    case GAME_STATUS_NOT_STARTED:
      return GAME_STATUS_NOT_STARTED_TEXT;
      break;

    case GAME_STATUS_ACTIVE:
      return GAME_STATUS_ACTIVE_TEXT;
      break;

    case GAME_STATUS_COMPLETED:
      return GAME_STATUS_COMPLETED_TEXT;
      break;

    case GAME_STATUS_PAUSED:
      return GAME_STATUS_PAUSED_TEXT;
      break;

    case GAME_STATUS_COMPLETED:
      return GAME_STATUS_COMPLETED_TEXT;
      break;

    default:
      return GAME_STATUS_UNKNOWN_TEXT;

  } // end switch

} // end function

// ---------------------------------------------------------------
// decode file errors

function decodeFileErrorCode(error, picMissing)
{
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  console.log("Decode File Error Code called.");
  switch (error.code)
  {
    case 'storage/object-not-found':        // File doesn't exist

      console.log("File not found.");
      postMessage(MESSAGE_TEXT_FILE_NOT_FOUND);
      if (picMissing == PIC_MISSING_TARGET)
        document.getElementById("myTargetsPictureLabel").innerHTML = MY_TARGETS_PICTURE_LABEL + " File Not Found.";
      else
        document.getElementById("myPictureLabel").innerHTML = MY_PICTURE_LABEL + " File not found.";
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log("No permissions.");
      break;

    case 'storage/canceled':
      console.log("Storage cancelled.");
      // User canceled the upload
      break;

    case 'storage/unknown':
      console.log("Unknown error");
      // Unknown error occurred, inspect the server response
      break;

  }

}  // decodeFileErrorCode

// ---------------------------------------------------------
// Render the ui based on the players status

function renderGame(myStatus)
{
  console.log("Render Game called at the top status is " + decodePlayerStatus(myStatus));

  switch (Number(myStatus))
  {
    case PLAYER_STATUS_LOGGED_OFF:

        document.getElementById("volunteerButton").style.visibility = "hidden";
        resetInputBoxes();
        updateLogInControls(ON);
        updateActiveControls(OFF);
        postMessage(MESSAGE_TEXT_PLAYER_LOGGED_OFF);
        //postMessage(MESSAGE_TEXT_WELCOME);
        break;

    case PLAYER_STATUS_REGISTER_IN_PROGRESS:

        document.getElementById("volunteerButton").style.visibility = "hidden";
        resetInputBoxes();
        updateLogInControls(OFF);
        updateActiveControls(OFF);
        document.getElementById("myRegisterNameLabel").style.visibility = "visible";
        document.getElementById("nameInputBox").style.visibility = "visible";
        document.getElementById("registerButton").style.visibility = "visible";
        document.getElementById("quitGameButton").style.visibility = "hidden";
        document.getElementById("logOffButton").style.visibility = "hidden";
        document.getElementById("registerASAP").style.visibility = "visible";
        document.getElementById("registerSchedule").style.visibility = "visible";
        document.getElementById("registrationLabelASAP").style.visibility = "visible";
        document.getElementById("registrationLabelScheduled").style.visibility = "visible";

        var nextStartDateFormat = new Date(nextScheduledStart.toDate());
        postMessage(MESSAGE_TEXT_ENTER_YOUR_NAME_TO_REGISTER + nextStartDateFormat);
        break;

    case PLAYER_STATUS_WAITING:

        postMessage(MESSAGE_TEXT_WAITING);

        // Changed code, can no longer take a break if waiting, doesn't make sense in real life
        //document.getElementById("takeABreakButton").style.visibility = "visible";
        //document.getElementById("returnFromBreakButton").style.visibility = "hidden";

        document.getElementById("buyBackInButton").style.visibility = "hidden";
        updateLogInControls(OFF);
        updateActiveControls(OFF);
        enablePictures();
        break;

    case PLAYER_STATUS_SCHEDULED:

        postMessage(MESSAGE_TEXT_SCHEDULED);
        // document.getElementById("takeABreakButton").style.visibility = "visible";
        // document.getElementById("returnFromBreakButton").style.visibility = "hidden";
        document.getElementById("buyBackInButton").style.visibility = "hidden";
        updateLogInControls(OFF);
        updateActiveControls(OFF);
        enablePictures();
        break;

    case PLAYER_STATUS_ACTIVE:

        updateLogInControls(OFF);
        updateActiveControls(ON);
        enablePictures();
        break;

    case PLAYER_STATUS_INACTIVE:

        updateLogInControls(OFF);
        updateActiveControls(OFF);
        enablePictures();

        console.log("I am inactive, my owed is " + owed);
        // if I'm owed, show buy back in button
        if (owed > 0)
        {
            document.getElementById("buyBackInButton").style.visibility = "visible";

            // not sure I need these 2 below
            document.getElementById("myTotal").style.visibility = "visible";
            document.getElementById("myOwed").style.visibility = "visible";
        }
        break;

      case PLAYER_STATUS_BREAK:

        postMessage(MESSAGE_TEXT_TAKE_BREAK);
        updateLogInControls(OFF);
        updateActiveControls(OFF);
        enablePictures();
        document.getElementById("returnFromBreakButton").style.visibility = "visible";
        break;

    case PLAYER_STATUS_REGISTERED:

        updateActiveControls(OFF);

        // if player has already logged in, turn off log in controls and enable pictures
        if (loggedIn == true)
        {
          updateLogInControls(OFF);
          enablePictures();
          document.getElementById("quitGameButton").style.visibility = "visible";
        }
        else // Player is not logged in.  Turn on log in controls
        {
            postMessage(MESSAGE_TEXT_REGISTER_PLAYER + id + ". Log in to upload a picture.");
            document.getElementById("idInputBox").value = id;
            updateLogInControls(ON);
        }

        break;

    case PLAYER_STATUS_GAME_OVER:

        updateLogInControls(OFF);
        postMessage(MESSAGE_TEXT_GAME_COMPLETED);
        document.getElementById("myStatus").innerHTML = ""; // decodePlayerStatus(myStatus);
        document.getElementById("quitGameButton").style.visibility = "hidden";
        updateActiveControls(OFF);
        break;

    default:
      console.log("Render game called, default status is " + decodePlayerStatus(myStatus));

  }  // end switch on my status

}
