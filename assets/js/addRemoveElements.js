//Display and hide delete button on hover
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

//Remove line
$(document).on("click", ".deletebtn", function () {
    $(this).closest(".deletable").remove();
});

//Add element button appears and disappears on mouse events
function createNewElementButton() {
    $(".extendable").each(function () {
        if (!$(this).find(".add-element").length) {
            if ($(this).parents().hasClass("three-column")) {
                $(this).append(
                    `<div data-html2canvas-ignore class="add-element d-flex justify-content-center align-items-center col-md-4"><i class="fas fa-plus-circle"></i></div>`
                );
            } else {
                $(this).append(
                    `<div class="add-element data-html2canvas-ignore text-center"><i class="fas fa-plus-circle"></i></div>`
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
