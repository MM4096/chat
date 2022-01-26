$(document).ready(function () {
    if (localStorage.getItem("color") == "dark") {
        $("*").addClass("dark");
        notification("hi");
    }
})

function toggleMode(mode) {
    if (mode == "hacker") {
        $("*").removeClass("light").addClass("dark").addClass("hacker");
    } else {
        if ($("*").hasClass("dark")) {
            $("*").removeClass("dark").addClass("light");
            localStorage.setItem("color", "light");
        } else {
            $("*").removeClass("light").addClass("dark");
            localStorage.setItem("color", "dark");
        }
    }
}
function notification(msg) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var notification = new Notification(msg);
    }   else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            console.log(permission);
            if (permission === "granted") {
                var notification = new Notification(msg);
            }
        });
    }

}
