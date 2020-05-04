var savedCv = localStorage.getItem("CV");
var printable = $("#printable");

//Define content to be displayed
function setContent(cvContent) {
    var loadedCv = convertSavedData(cvContent);
    printable.html(loadedCv);
    console.log("content updated");
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

//Traversing JSON data, returns CV data as string of formatted HTML
function convertSavedData(savedCV) {
    var sectionsArray = [];

    for (i in savedCV) {
        var type = savedCV[i].type;
        var title = savedCV[i].title;
        var itemList = [];
        var name = savedCV[i].name;
        var table1 = savedCV[i].table1;
        var table2 = savedCV[i].table2;
        for (j in savedCV[i].list) {
            itemList[j] = savedCV[i].list[j];
        }

        //Formatting if section is the main info content
        if (type === "info") {
            convertedData = infoToHtml(i, table1, table2, name);
            sectionsArray.push(convertedData);
        }

        //Formatting data to html if section is a list with dates, such as experience
        else if (type === "listing") {
            convertedData = listingToHtml(i, itemList, title);
            sectionsArray.push(convertedData);
        }
        //Formatting data to html if section is a single block of content
        else if (type === "single-block") {
            convertedData = singleBlockToHtml(i, itemList, title);
            sectionsArray.push(convertedData);
        }

        //Formatting if section is a list of items, such as skills/interests
        else if (type === "3-column") {
            convertedData = threeColToHtml(i, itemList, title);
            sectionsArray.push(convertedData);
        }
        //Other cases
        else {
            sections.Array.push("");
            console.log("Unkown type");
        }
    }

    return sectionsArray.join("<hr>");
}

//Saving Content on page to an array
function saveCvToArray() {
    var savedArray = [];
    var sections = $("#printable section");
    for (i in sections) {
        var sectionId = "section" + i;
        //Converts Info section into an object
        if (sections.eq(i).hasClass("info")) {
            savedArray.push(infoToObject(i));

            //Converts 3-column section into object
        } else if (sections.eq(i).hasClass("3-column")) {
            savedArray[i] = {};
            savedArray[i].type = "3-column";
            savedArray[i].title = $("#" + sectionId + " .3-col-title").html();
            savedArray[i].list = [];
            $("#" + sectionId + " .3-col-item").each(function () {
                savedArray[i].list.push($(this).html());
            });

            // Converts listing section into an object
        } else if (sections.eq(i).hasClass("listing")) {
            savedArray[i] = {};
            savedArray[i].type = "listing";
            savedArray[i].title = $("#" + sectionId + " .listing-title").html();
            savedArray[i].list = [];
            $("#" + sectionId + " .listing-row").each(function () {
                var listingRow = {};
                listingRow.date = $(this).find(".listing-date").html();
                listingRow.location = $(this).find(".listing-location").html();
                listingRow.position = $(this).find(".listing-position").html();
                listingRow.description = $(this)
                    .find(".listing-description")
                    .html();

                savedArray[i].list.push(listingRow);
            });
        } else if (sections.eq(i).hasClass("single-block")) {
            savedArray[i] = {};
            savedArray[i].type = "single-block";
            savedArray[i].title = $(
                "#" + sectionId + " .single-block-title"
            ).html();
            savedArray[i].list = [];
            $("#" + sectionId + " .single-block-content").each(function () {
                savedArray[i].list.push($(this).html());
            });
        }
    }
    return savedArray;
}

//Fetches information in info HTML section and makes it an object in array
function infoToObject(i) {
    var infoObj = {};
    infoObj.type = "info";
    infoObj.name = $("#section" + i + " .info-name").html();
    infoObj.table1 = {
        class: "info-table1",
        label: [],
        content: [],
    };
    infoObj.table2 = {
        class: "info-table2",
        label: [],
        content: [],
    };
    $("#section" + i + " .info-table1 th").each(function () {
        infoObj.table1.label.push($(this).html());
    });
    $("#section" + i + " .info-table1 td").each(function () {
        infoObj.table1.content.push($(this).html());
    });
    $("#section" + i + " .info-table2 th").each(function () {
        infoObj.table2.label.push($(this).html());
    });
    $("#section" + i + " .info-table2 td").each(function () {
        infoObj.table2.content.push($(this).html());
    });
    return infoObj;
}

//function

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
    console.log(savedCv);
    localStorage.clear();
});
