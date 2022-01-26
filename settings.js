var notificationOn;
$(document).ready(function () {
    if (localStorage.getItem("color") == "dark") {
        $("*").addClass("dark");
    }
    if (localStorage.getItem("notification") == "1") {
        notificationOn = 1;
    } else {
        notificationOn = 0;
    }
    sessionStorage.setItem("notificationOn", "0");
    notification("Notification: Active!");
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
    if (Notification.permission === "granted" && notificationOn == 1) {
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
function toggleNotification() {
    if (localStorage.getItem("notification") == "1") {
        localStorage.setItem("notification", "0");
        notificationOn = 0;
    } else {
        localStorage.setItem("notification", "1");
        notificationOn = 1;
    }
    console.log(notificationOn);
}