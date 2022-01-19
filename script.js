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
//if (username != "wu" && username != "bot") {
//    window.alert("System Currently Shutdown. Please try again later");
//    window.location.href = "https://www.google.com/";
//}


firebase.initializeApp(firebaseConfig);
const db = firebase.database();
document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
    e.preventDefault();
    const timestamp = Date.now();
    let chatTxt = document.getElementById("chat-txt");
    const message = chatTxt.value;
    if (message != "" && message != " " && message != null) {
        if (message.includes("alias")) {
            let command = message.split(" ");
            console.log(command);
            if (command.length != 3) {
                window.alert("Error. See console for more info");
                console.error("Error. Expected 2 arguments.")
            } else {
                localStorage.setItem(command[1], command[2]);
                console.log(localStorage.getItem(command[1]));
            }
            $("#chat-txt").val("")
        } else {
            
            chatTxt.value = "";
            db.ref("messages/" + timestamp).set({
                usr: username,
                msg: message,
            });
            $("#chat-btn").prop('disabled', true);
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
        const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
        document.getElementById("messages").innerHTML += msg;
    } else {
        let aliasName = localStorage.getItem(messages.usr);
        const msg = "<li>" + aliasName + " : " + messages.msg + "</li>";
        document.getElementById("messages").innerHTML += msg;
    }
    
});