var themes = ["theme1", "theme2", "theme3"];

function changeActiveNav(nav) {
    $(".nav-link .sr-only").remove();
    $(".active").removeClass("active");
    nav.addClass("active");
    nav.append(`<span class="sr-only">(current)</span>`);
}

function changeTheme(theme) {
    var themeClasses = themes.join(" ");
    $("#printable").removeClass(themeClasses).addClass(theme);
    usedTheme = theme;
}

$("#default-theme-link").click(function () {
    changeTheme("");
    changeActiveNav($(this));
});

$("#theme1-link").click(function () {
    changeTheme("theme1");
    changeActiveNav($(this));
});

$("#theme2-link").click(function () {
    changeTheme("theme2");
    changeActiveNav($(this));
});

$("#theme3-link").click(function () {
    changeTheme("theme3");
    changeActiveNav($(this));
});
