$(document).ready(function () {
    $("#new-section-buttons").hide();
    $("#close-section").hide();
});

function toggleSectionBtns() {
    $("#close-section").toggle();
    $("#add-section-btn").toggle();
    $("#new-section-buttons").toggle("blind", "swing", 300);
}

$("#add-section-btn").click(toggleSectionBtns);

$("#close-section").click(function () {
    $("#new-section-buttons").toggle("blind", "swing", 300, function () {
        $("#close-section").toggle();
        $("#add-section-btn").toggle();
    });
});

$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
    toggleSectionBtns();
    createNewElementButton();
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
    toggleSectionBtns();
    createNewElementButton();
});

$("#new3col-btn").click(function () {
    $("#printable").append(threeColToHtml());
    toggleSectionBtns();
    createNewElementButton();
});

$("#newinfo-btn").click(function () {
    $("#printable").append(infoToHtml());
    toggleSectionBtns();
    createNewElementButton();
});
