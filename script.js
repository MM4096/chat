const firebaseConfig = {
    apiKey: "AIzaSyC2d6rBIrFgh3arNiPSwffDe7626GCY2x0",
    authDomain: "realtime-chat-dd7f1.firebaseapp.com",
    databaseURL: "https://realtime-chat-dd7f1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-chat-dd7f1",
    storageBucket: "realtime-chat-dd7f1.appspot.com",
    messagingSenderId: "867698747892",
    appId: "1:867698747892:web:922cb4fc1c0d0cfdd5f1a1"
};

if (localStorage.getItem("chatUsername") === null || localStorage.getItem("chatUsername") === undefined) {
    var username = prompt("Enter a username");
    localStorage.setItem("chatUsername", username)
} else {
    var username = localStorage.getItem("chatUsername");
    alert("Your username is " + username);
}

//add comments infront of above statement to enable/disable access
if (username != "wu" && username != "bot") {
    window.alert("System Currently Shutdown. Please try again later. <br>Reason: Adding features");
    window.close();
}


firebase.initializeApp(firebaseConfig);
const db = firebase.database();
document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
    e.preventDefault();
    const timestamp = Date.now();
    let chatTxt = document.getElementById("chat-txt");
    const message = chatTxt.value;
    if (message != "" && message != " " && message != null) {
        if (message.includes("alias", 0)) {
            let command = message.split(" ");
            console.log(command);
            if (command.length != 3) {
                if (command.length == 1) {
                    $("ul li").last().after("<li class='list'>alias command list:<br>alias [username] [alias]<br>[username]: current username, [alias]: new name you want to give them(Private feedback)" + "</li>");
                } else {
                    window.alert("Error. See console for more info");
                    console.error("Error. Expected 2 arguments.");
                }
            } else {
                localStorage.setItem(command[1], command[2]);
                console.log(localStorage.getItem(command[1]));
                $("ul li").last().after("<li class='list'></li>");
                $("ul li").last().text("Auto-generated: alias set for user: " + command[1] + ", given value: " + command[2]) + ". (Private feedback)";
            }
            $("#chat-txt").val("");
        } else if (message.includes("settings", 0)) {
            let command = message.split(" ");
            if (command.length == 1) {
                $("ul li").last().after("<li class='list'>Settings command list:<br>settings colour [color]<br>[color]: [dark], [light]<br>settings notification: toggles notifications<br>(Private feedback)" + "</li>");
            }
            if (command[1] == "color" || command[1] == "colour") {
                 if (command.length == 2 && (command[1] == "color" || command[1] == "colour")) {
                    toggleMode();
                    $("ul li").last().after("<li class='list'>Color mode toggled! (Private feedback)" + "</li>");
                } else if (command.length == 3 && (command[1] == "color" || command[1] == "colour") && command[2] == "hecker") {
                    toggleMode("hacker");
                    $("ul li").last().after("<li class='list'>Hacker mode activated! (Private feedback)" + "</li>");
                } else {
                    window.alert("Error. See console for more info");
                    console.error("Error. Expected 1, 2 or 3 auguments")
                }
                $("#chat-txt").val("");
            }
            if (command[1] == "notification") {
                toggleNotification();
                $("ul li").last().after("<li class='list'>Notification status toggled! (Private feedback)" + "</li>");
                $("#chat-txt").val("");
            }
            command = [];
            
        } else {
            
            chatTxt.value = "";
            db.ref("messages/" + timestamp).set({
                usr: username,
                msg: message,
            });

            $("#chat-btn").prop('disabled', true);
            sessionStorage.setItem("notificationOn", "1");
            setTimeout(function () { $("#chat-btn").prop("disabled", false); }, 3000);
        }
        
    } else {
        window.alert("Error. See console for more info");
        console.error("Error. Expected string, got '' instead")
    }
    
    
}
const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    if (localStorage.getItem(messages.usr) == null) {
        $("ul li").last().after("<li></li>");
        $("ul li").last().text(messages.usr + " : " + messages.msg);
        if (messages.usr !== username && sessionStorage.getItem("notificationOn") == "1") {
            notification("New Message: " + messages.usr + " has said: " + messages.msg);
        }
    } else {
        let aliasName = localStorage.getItem(messages.usr);
        $("ul li").last().after("<li></li>");
        $("ul li").last().text(aliasName + " : " + messages.msg);
        if (messages.usr !== username && sessionStorage.getItem("notificationOn") == "1") {
            notification("New Message: " + aliasName + " has said: " + messages.msg);
        }
    }
    
});