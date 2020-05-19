//Hide buttons to add sections when page is loaded
$(document).ready(function () {
    $("#new-section-buttons").hide();
    $("#close-section").hide();
});

//Toggle buttons to add new section
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

//Adding new sections to the page, each function
$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
    toggleSectionBtns();
    createNewElementButton();
    makeSortable();
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
    toggleSectionBtns();
    createNewElementButton();
    makeSortable();
});

$("#new3col-btn").click(function () {
    $("#printable").append(threeColToHtml());
    toggleSectionBtns();
    createNewElementButton();
    makeSortable();
});

$("#newinfo-btn").click(function () {
    $("#printable").append(infoToHtml());
    toggleSectionBtns();
    createNewElementButton();
    makeSortable();
});
