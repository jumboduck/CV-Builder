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

//Adds a new section to the cv and ensures it is sortable and has buttons to add a new element
function addSection(type) {
    $("#printable").append(type);
    toggleSectionBtns();
    createNewElementButton();
    makeSortable();
}

//New sections added on click
$("#newsingleblock-btn").click(function () {
    addSection(singleBlockToHtml());
});
$("#newlisting-btn").click(function () {
    addSection(listingToHtml());
});
$("#new3col-btn").click(function () {
    addSection(threeColToHtml());
});
$("#newinfo-btn").click(function () {
    addSection(infoToHtml());
});
