//Save to PDF with html2pdf when download pdf button is clicked

var toBePrinted = document.getElementById("printable");
var printOptions = {
    filename: "cv.pdf",
    html2canvas: { windowWidth: 1500 },
    pagebreak: { mode: "avoid-all" },
    image: { type: "jpeg", quality: 0.98 },
    enableLinks: true,
};

function makeAnchors(id) {
    var content = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = anchorme({
        input: content,
    });
}

function toPDF() {
    toggleUnprinted();
    makeAnchors("printable");
    html2pdf().set(printOptions).from(toBePrinted).save().then(toggleUnprinted);
}
