var themes = ["default-theme", "theme-modern", "theme-lavender", "theme-deco"];

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
    } else if (theme === "theme-modern") {
        changeActiveNav($("#theme-modern-link"));
    } else if (theme === "theme-lavender") {
        changeActiveNav($("#theme-lavender-link"));
    } else if (theme === "theme-deco") {
        changeActiveNav($("#theme-deco-link"));
    }
}

$("#default-theme-link").click(function () {
    changeTheme("default-theme");
});

$("#theme-modern-link").click(function () {
    changeTheme("theme-modern");
});

$("#theme-lavender-link").click(function () {
    changeTheme("theme-lavender");
});

$("#theme-deco-link").click(function () {
    changeTheme("theme-deco");
});
