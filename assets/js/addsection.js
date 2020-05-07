$("#newsingleblock-btn").click(function () {
    $("#printable").append(singleBlockToHtml());
});

function addNewSection() {
    var newSection = "<h1>hello</h1>";
    $("#printable").append(newSection);
}
