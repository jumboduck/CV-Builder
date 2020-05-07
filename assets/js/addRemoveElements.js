//Event listeners that need to be called when DOM has loaded
function callListeners() {
    //create a delete button on lines that can be removed
    $(".deletable").hover(
        function () {
            $(this).append(
                `<div class='deletebtn'><i class='fas fa-times-circle'></i></div>`
            );
            $(this).addClass("deletable-hover");
        },
        function () {
            $(this).find(".deletebtn").remove();
            $(this).removeClass("deletable-hover");
        }
    );

    // remove line
    $(document).on("click", ".deletebtn", function () {
        $(this).closest(".deletable").remove();
    });

    // add button to add item
    $(".extendable")
        .mouseover(function () {
            //make sure not add button already exists
            if (!$(this).find(".add-element").length) {
                $(this).append(
                    `<div class="add-element text-center"><i class="fas fa-plus-circle"></i></div>`
                );
            }
        })
        .mouseleave(function () {
            $(this).find(".add-element").remove();
        });

    //add new element
    //$(document).on("click", ".add-element", addItem);
}

/*function addItem() {
    if($(this).class)
}*/
