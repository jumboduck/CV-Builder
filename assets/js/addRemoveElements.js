//Display "delete" button on mouse enter
$(document).on("mouseenter", ".deletable", function () {
    //Delete button is only created if one doesn't already exist
    if (!$(this).find("deletebtn").length) {
        $(this).append(
            `<span class="deletebtn" aria-label="delete-element"><i class='fas fa-times-circle'></i></span>`
        );
        $(this).addClass("deletable-hover");
    }
});
//Remove button and on mouse leave
$(document).on("mouseleave", ".deletable", function () {
    $(this).find(".deletebtn").remove();
    $(this).removeClass("deletable-hover");
});

//Remove element or section
$(document).on("click", ".deletebtn", function () {
    $(this).closest(".deletable").remove();
});

//Button to add new is generated in every section
function createNewElementButton() {
    $(".extendable").each(function () {
        if (!$(this).find(".add-element").length) {
            if ($(this).parents().hasClass("three-column")) {
                //Three column section "add element" button behaves slightly differently due to bootstrap column
                $(this).append(
                    `<div class="add-element d-flex justify-content-center align-items-center col-md-4" aria-label="add-element"><i class="fas fa-plus-circle"></i></div>`
                );
            } else {
                $(this).append(
                    `<div class="add-element text-center"  aria-label="add-element"><i class="fas fa-plus-circle"></i></div>`
                );
            }
        }
    });
}

//Add new element
$(document).on("click", ".add-element", addItem);

function addItem() {
    var newItem = "";
    if ($(this).parent().hasClass("listing")) {
        newItem = createListingItem();
    } else if ($(this).parent().hasClass("single-block")) {
        newItem = createSingleBlockItem();
    } else if ($(this).parent().hasClass("three-column-list")) {
        newItem = createThreeColumnItem();
    } else if ($(this).parent().hasClass("info-table")) {
        newItem = createInfoItem();
    }
    $(this).before(newItem);
}
