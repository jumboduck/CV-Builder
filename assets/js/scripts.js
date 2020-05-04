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

//Saving CV information to an array of Objects
function saveCvToArray() {
    var savedArray = [];
    var sections = $("#printable section");
    for (i in sections) {
        //Converts Info sections into an object
        if (sections.eq(i).hasClass("info")) {
            savedArray.push(infoToObject(i));

            //Converts 3-column sections into object
        } else if (sections.eq(i).hasClass("3-column")) {
            savedArray.push(threeColToObject(i));

            // Converts listing sections into an object
        } else if (sections.eq(i).hasClass("listing")) {
            savedArray.push(listingToObject(i));

            //Converts single block sections into an object
        } else if (sections.eq(i).hasClass("single-block")) {
            savedArray.push(singleBlockToObject(i));
        }
    }
    return savedArray;
}

//Fetches information in info HTML section and makes it into an Object
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

//Fetches information in 3 Column HTML section and makes it into an object
function threeColToObject(i) {
    var threeColObj = {};
    threeColObj.type = "3-column";
    threeColObj.title = $("#section" + i + " .3-col-title").html();
    threeColObj.list = [];
    $("#section" + i + " .3-col-item").each(function () {
        threeColObj.list.push($(this).html());
    });
    return threeColObj;
}

//Fetches information in Listing HTML section and makes it into an object
function listingToObject(i) {
    listingObj = {};
    listingObj.type = "listing";
    listingObj.title = $("#section" + i + " .listing-title").html();
    listingObj.list = [];
    $("#section" + i + " .listing-row").each(function () {
        var listingRow = {};
        listingRow.date = $(this).find(".listing-date").html();
        listingRow.location = $(this).find(".listing-location").html();
        listingRow.position = $(this).find(".listing-position").html();
        listingRow.description = $(this).find(".listing-description").html();

        listingObj.list.push(listingRow);
    });
    return listingObj;
}

//Fetches information in Single Block HTML section and makes it into an object
function singleBlockToObject(i) {
    singleBlockObj = {};
    singleBlockObj.type = "single-block";
    singleBlockObj.title = $("#section" + i + " .single-block-title").html();
    singleBlockObj.list = [];
    $("#section" + i + " .single-block-content").each(function () {
        singleBlockObj.list.push($(this).html());
    });
    return singleBlockObj;
}

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
