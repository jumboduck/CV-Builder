//Add button to sort elements on mouse event
$(document).on("mouseenter", ".sortable", function () {
    if (!$(this).find("sortable-btn").length) {
        $(this).append(
            `<span class="sortable-btn"><i class="fas fa-bars"></i></span>`
        );
    }
});

$(document).on("mouseleave", ".sortable", function () {
    $(this).find(".sortable-btn").remove();
});

function makeSortable() {
    $(".sortable-list").sortable({
        items: ">.sortable",
        handle: ">.sortable-btn",
        placeholder: "sort-placeholder",
        cursor: "grabbing",
    });
}
