$(document).ready(function () {
    let active_user = localStorage.getItem("active_user");
    $("#name").text(active_user);
});