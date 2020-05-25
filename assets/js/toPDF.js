let toBePrinted = document.getElementById("printable");

//HTML2PDF settings
let printOptions = {
    filename: "cv.pdf",
    pagebreak: { mode: "avoid-all" },
    image: { type: "jpeg", quality: 0.98 },
    enableLinks: true,
};

//Transform urls in text to <a> tags with anchorme.js
function makeAnchors(id) {
    let content = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = anchorme({
        input: content,
    });
}

//Print CV to a pdf file with html2pdf.js
function toPDF() {
    toggleUnprinted();
    makeAnchors("printable");
    html2pdf()
        .set(printOptions)
        .from(toBePrinted)
        .save()
        .then(toggleUnprinted)
        .then(makeSortable);
}

$("#download-btn").click(toPDF);
