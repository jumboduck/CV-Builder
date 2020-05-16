//Add button to sort elements on mouse event
$(document).on("mouseenter", ".sortable", function () {
    //Add sortable handle only if is not already appended to the element
    if (!$(this).find("sortable-btn").length) {
        $(this).append(
            `<span class="sortable-btn"><i class="fas fa-bars"></i></span>`
        );
    }
});

//Remove sortable handle on mouse leave
$(document).on("mouseleave", ".sortable", function () {
    $(this).find(".sortable-btn").remove();
});

//Sortable function with options
function makeSortable() {
    $(".sortable-list").sortable({
        items: ">.sortable",
        handle: ">.sortable-btn",
        placeholder: "sort-placeholder",
        cursor: "grabbing",
        helper: "clone",
        opacity: 0.8,
        revert: 100,
        scrollSensitivity: 60,
        scrollSpeed: 10,
        tolerance: "touch",
        html2canvas: { windowWidth: 600 },
    });
}
