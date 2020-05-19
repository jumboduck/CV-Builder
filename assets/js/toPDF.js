var toBePrinted = document.getElementById("printable");

//HTML2PDF settings
var printOptions = {
    filename: "cv.pdf",
    html2canvas: { windowWidth: 1500 },
    pagebreak: { mode: "avoid-all" },
    image: { type: "jpeg", quality: 0.98 },
    enableLinks: true,
};

//Transform urls in text to <a> tags
function makeAnchors(id) {
    var content = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = anchorme({
        input: content,
    });
}

//Print CV to a pdf file
function toPDF() {
    toggleUnprinted();
    makeAnchors("printable");
    html2pdf().set(printOptions).from(toBePrinted).save().then(toggleUnprinted);
}

$("#download-btn").click(toPDF);
