$(document).on("mouseenter", ".deletable", function () {
    if (!$(this).find("deletebtn").length) {
        $(this).append(
            `<span class="deletebtn"><i class='fas fa-times-circle'></i></span>`
        );
        $(this).addClass("deletable-hover");
    }
});

$(document).on("mouseleave", ".deletable", function () {
    $(this).find(".deletebtn").remove();
    $(this).removeClass("deletable-hover");
});

// remove line
$(document).on("click", ".deletebtn", function () {
    $(this).closest(".deletable").remove();
});

//Add element button appears and disappears on mouse events
$(document).on("mouseover", ".extendable", function () {
    if (!$(this).find(".add-element").length) {
        $(this).append(
            `<div class="add-element text-center"><i class="fas fa-plus-circle"></i></div>`
        );
    }
});
$(document).on("mouseleave", ".extendable", function () {
    $(this).find(".add-element").remove();
});

//add new element
$(document).on("click", ".add-element", addItem);

function addItem() {
    var newItem = "";
    if ($(this).parent().hasClass("listing")) {
        newItem = createListingItem();
    }
    if ($(this).parent().hasClass("single-block")) {
        newItem = createSingleBlockItem();
    }
    if ($(this).parent().hasClass("3-column")) {
        newItem = createThreeColumnRow();
    }

    if ($(this).parent().hasClass("info-table")) {
        newItem = createInfoItem();
    }
    $(this).before(newItem);
}
