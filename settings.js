$(document).ready(function () {
    if (localStorage.getItem("color") == "dark") {
        $("*").addClass("dark");
    }
})

function toggleMode() {
    if ($("*").hasClass("dark")) {
        $("*").removeClass("dark").addClass("light");
        localStorage.setItem("color", "light");
    } else {
        $("*").removeClass("light").addClass("dark");
        localStorage.setItem("color", "dark");
    }
}