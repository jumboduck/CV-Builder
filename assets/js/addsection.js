$(document).ready(function () {
    $("#new-section-buttons").hide();
    $("#close-section").hide();
});

$("#add-section-btn").click(function () {
    $("#close-section").toggle();
    $("#add-section-btn").toggle();
    $("#new-section-buttons").toggle("blind", "swing", 300);
});

$("#close-section").click(function () {
    $("#new-section-buttons").toggle("blind", "swing", 300, function () {
        $("#close-section").toggle();
        $("#add-section-btn").toggle();
    });
});

$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
    createNewElementButton();
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
    createNewElementButton();
});

$("#new3col-btn").click(function () {
    $("#printable").append(threeColToHtml());
    createNewElementButton();
});

$("#newinfo-btn").click(function () {
    $("#printable").append(infoToHtml());
    createNewElementButton();
});
