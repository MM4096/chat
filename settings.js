$(document).ready(function () {
    if (localStorage.getItem("color") == "dark") {
        $("*").addClass("dark");
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