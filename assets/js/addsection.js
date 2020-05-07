$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
});

$("#new3col-btn").click(function () {
    $("#printable").append(threeColToHtml());
});

function addNewSection() {
    var newSection = "<h1>hello</h1>";
    $("#printable").append(newSection);
}
