$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
});

$("#newlisting-btn").click(function () {
    $("#printable").append(listingToHtml());
});

$("#new3col-btn").click(function () {
    $("#printable").append(threeColToHtml());
});

$("#newinfo-btn").click(function () {
    $("#printable").append(infoToHtml());
});

function addNewSection() {}
