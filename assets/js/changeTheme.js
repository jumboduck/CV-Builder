function changeActiveNav(nav) {
    $(".nav-link .sr-only").remove();
    $(".active").removeClass("active");
    nav.addClass("active");
    $(".active").append(`<span class="sr-only">(current)</span>`);
}

$("#default-theme-link").click(function () {
    $("#printable").removeClass("theme1 theme2 theme3");
    changeActiveNav($(this));
});

$("#theme1-link").click(function () {
    $("#printable").removeClass("theme2 theme3").addClass("theme1");
    changeActiveNav($(this));
});

$("#theme2-link").click(function () {
    $("#printable").removeClass("theme1 theme3").addClass("theme2");
    changeActiveNav($(this));
});

$("#theme3-link").click(function () {
    $("#printable").removeClass("theme1 theme2").addClass("theme3");
    changeActiveNav($(this));
});
