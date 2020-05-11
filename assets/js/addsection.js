$(document).ready(function () {
    $("#new-section-buttons").hide();
});

$("#addsection-btn").click(function () {
    $("#new-section-buttons").toggle("blind", "swing", 300);
});

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
