//Save to PDF with html2pdf when download pdf button is clicked

var toBePrinted = document.getElementById("printable");
var printOptions = {
    filename: "cv.pdf",
    html2canvas: { windowWidth: 1500 },
    margin: 0,
    pagebreak: { mode: "avoid-all" },
    image: { type: "jpeg", quality: 0.98 },
};

function toPDF() {
    toggleUnprinted();
    html2pdf().set(printOptions).from(toBePrinted).save().then(toggleUnprinted);
}
