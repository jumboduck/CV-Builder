var savedCv = localStorage.getItem("CV");
var printable = $("#printable");

//Define content to be displayed
function setContent(cvContent) {
    var loadedCv = convertSavedData(cvContent);
    printable.html(loadedCv);
    console.log("content updated");
}

//Traversing JSON data, returns CV data as string of formatted HTML
function convertSavedData(savedCV) {
    var sectionsArray = [];

    for (i in savedCV) {
        var type = savedCV[i].type;
        var title = savedCV[i].title;
        var name = savedCV[i].name;
        var table1 = savedCV[i].table1;
        var table2 = savedCV[i].table2;
        var itemList = [];
        for (j in savedCV[i].list) {
            itemList[j] = savedCV[i].list[j];
        }

        //Formatting if section is the main info content
        if (type === "info") {
            convertedData = infoToHtml(table1, table2, name);
            sectionsArray.push(convertedData);
        }

        //Formatting data to html if section is a list with dates, such as experience
        else if (type === "listing") {
            convertedData = listingToHtml(itemList, title);
            sectionsArray.push(convertedData);
        }
        //Formatting data to html if section is a single block of content
        else if (type === "single-block") {
            convertedData = singleBlockToHtml(itemList, title);
            sectionsArray.push(convertedData);
        }

        //Formatting if section is a list of items, such as skills/interests
        else if (type === "three-column") {
            convertedData = threeColToHtml(itemList, title);
            sectionsArray.push(convertedData);
        }
        //Other cases
        else {
            sectionsArray.push("");
            console.log("Unkown type");
        }
    }
    return sectionsArray.join("");
}

//Saving CV information to an array of Objects
function saveCvToArray() {
    var savedArray = [];
    var sections = $("#printable section");
    for (i in sections) {
        var sectionId = sections.eq(i).attr("id");
        //Converts Info sections into an object
        if (sections.eq(i).hasClass("info")) {
            savedArray.push(infoToObject(sectionId));
        }
        //Converts three-column sections into object
        else if (sections.eq(i).hasClass("three-column")) {
            savedArray.push(threeColToObject(sectionId));
        }
        // Converts listing sections into an object
        else if (sections.eq(i).hasClass("listing")) {
            savedArray.push(listingToObject(sectionId));
        }
        //Converts single block sections into an object
        else if (sections.eq(i).hasClass("single-block")) {
            savedArray.push(singleBlockToObject(sectionId));
        }
    }
    return savedArray;
}

//Save to PDF with html2pdf when download pdf button is clicked
var toBePrinted = $("#printable");
var printOptions = {
    filename: "cv.pdf",
    pagebreak: { mode: "avoid-all" },
};

function toPDF() {
    html2pdf(toBePrinted, printOptions);
}

$("#download-btn").click(toPDF);

//EVENT LISTENERS

//Save to local storage when save button is clicked
$("#save-btn").click(function () {
    var currentCv = saveCvToArray();
    localStorage.setItem("CV", JSON.stringify(currentCv));
});

// Load default or saved content when page loads
$(document).ready(function () {
    if (!savedCv) {
        setContent(defaultCv);
    } else {
        setContent(JSON.parse(savedCv));
    }
});

//Set default content when reset button is clicked and delete local storage
$("#reset-btn").click(function () {
    setContent(defaultCv);
    localStorage.clear();
});
