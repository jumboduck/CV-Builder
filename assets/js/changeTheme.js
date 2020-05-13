var themes = ["default-theme", "theme1", "theme2", "theme3"];

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
    if (theme === "default-theme") {
        changeActiveNav($("#default-theme-link"));
    } else if (theme === "theme1") {
        changeActiveNav($("#theme1-link"));
    } else if (theme === "theme2") {
        changeActiveNav($("#theme2-link"));
    } else if (theme === "theme3") {
        changeActiveNav($("#theme3-link"));
    }
}

$("#default-theme-link").click(function () {
    changeTheme("default-theme");
});

$("#theme1-link").click(function () {
    changeTheme("theme1");
});

$("#theme2-link").click(function () {
    changeTheme("theme2");
});

$("#theme3-link").click(function () {
    changeTheme("theme3");
});
