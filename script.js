const firebaseConfig = {
    apiKey: "AIzaSyC2d6rBIrFgh3arNiPSwffDe7626GCY2x0",
    authDomain: "realtime-chat-dd7f1.firebaseapp.com",
    databaseURL: "https://realtime-chat-dd7f1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-chat-dd7f1",
    storageBucket: "realtime-chat-dd7f1.appspot.com",
    messagingSenderId: "867698747892",
    appId: "1:867698747892:web:922cb4fc1c0d0cfdd5f1a1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const username = prompt("What's your name?");
document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const chatTxt = document.getElementById("chat-txt");
    const message = chatTxt.value;
    chatTxt.value = "";
    db.ref("messages/" + timestamp).set({
        usr: username,
        msg: message,
    });
}
const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
    document.getElementById("messages").innerHTML += msg;
});