let themes = ["default-theme", "theme-modern", "theme-lavender", "theme-deco"];

//Update active theme in navigation
function changeActiveNav(nav) {
    $(".nav-link .sr-only").remove();
    $(".active").removeClass("active");
    nav.addClass("active");
    nav.append(`<span class="sr-only">(current)</span>`);
}

//Update CV themes and changes color of header
function changeTheme(theme) {
    let themeClasses = themes.join(" ");
    $("#printable").removeClass(themeClasses).addClass(theme);
    usedTheme = theme;
    if (theme === "default-theme") {
        changeActiveNav($("#default-theme-link"));
        $(".custom-header").css("background-color", "#606060");
    } else if (theme === "theme-modern") {
        changeActiveNav($("#theme-modern-link"));
        $(".custom-header").css("background-color", "#1e3f5a");
    } else if (theme === "theme-lavender") {
        changeActiveNav($("#theme-lavender-link"));
        $(".custom-header").css("background-color", "#595775");
    } else if (theme === "theme-deco") {
        changeActiveNav($("#theme-deco-link"));
        $(".custom-header").css("background-color", "#132226");
    }
}

//Nav links listeners
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
