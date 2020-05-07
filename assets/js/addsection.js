$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
});

function addNewSection() {
    var newSection = "<h1>hello</h1>";
    $("#printable").append(newSection);
}
