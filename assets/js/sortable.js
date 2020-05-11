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
        items: ">div.sortable",
        handle: ".sortable-btn",
    });
}
