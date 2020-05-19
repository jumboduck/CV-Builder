let printable = $("#printable");

//Retrieve CV and theme saved to local storage
let savedCv = localStorage.getItem("CV");
let usedTheme = localStorage.getItem("theme");

//Fetch default CV data
let defaultCv;
fetch("assets/data/defaultcv.json")
    .then((res) => res.json())
    .then((data) => {
        defaultCv = data;
        // If no saved cv exist, set content to default
        if (!savedCv) {
            setContent(data);
        }
        // Set content to saved cv
        else {
            setContent(JSON.parse(savedCv));
            changeTheme(JSON.parse(usedTheme));
        }
    });

//Display cv on page
function setContent(cvContent) {
    let loadedCv = convertSavedData(cvContent);
    printable.html(loadedCv);
    //Once CV is displayed, create buttons to add new elements and sortable functionality
    createNewElementButton();
    makeSortable();
    console.log("content updated");
}

//Traversing JSON data, returns CV data as string of formatted HTML
function convertSavedData(jsonCv) {
    let sectionsArray = [];
    for (i in jsonCv) {
        let type = jsonCv[i].type;
        let title = jsonCv[i].title;
        let name = jsonCv[i].name;
        let table1 = jsonCv[i].table1;
        let table2 = jsonCv[i].table2;
        let itemList = [];
        for (j in jsonCv[i].list) {
            itemList[j] = jsonCv[i].list[j];
        }

        //Formatting data to html if section is the main info content
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
    let savedArray = [];
    let sections = $("#printable section");
    for (i in sections) {
        let sectionId = sections.eq(i).attr("id");
        //Converts Info sections JSON data
        if (sections.eq(i).hasClass("info")) {
            savedArray.push(infoToObject(sectionId));
        }
        //Converts three-column sections into JSON data
        else if (sections.eq(i).hasClass("three-column")) {
            savedArray.push(threeColToObject(sectionId));
        }
        // Converts listing sections into JSON data
        else if (sections.eq(i).hasClass("listing")) {
            savedArray.push(listingToObject(sectionId));
        }
        //Converts single block sections into JSON data
        else if (sections.eq(i).hasClass("single-block")) {
            savedArray.push(singleBlockToObject(sectionId));
        }
    }
    return savedArray;
}

//Toggles elements that should not be seen in the PDF
function toggleUnprinted() {
    $(".add-element").each(function () {
        if ($(this).hasClass("d-flex")) {
            $(this).removeClass("d-flex").addClass("invisibleFlex");
        } else if ($(this).hasClass("invisibleFlex")) {
            $(this).removeClass("invisibleFlex").addClass("d-flex");
        }
        $(this).toggle();
    });
}

$(document).ready(function () {
    $("#save-alert").hide();
    // Load default or saved content when page loads
});

//Save to local storage when save button is clicked
$("#save-btn").click(function () {
    let currentCv = saveCvToArray();
    localStorage.setItem("CV", JSON.stringify(currentCv));
    localStorage.setItem("theme", JSON.stringify(usedTheme));
    //Display confirmation alert when saved
    $("#save-alert").show("blind", 100);
    setTimeout(function () {
        $("#save-alert").hide("blind", 100);
    }, 8000);
});

$("#save-alert .close").click(function () {
    $("#save-alert").hide("blind", 100);
});

//Set default content when reset button is clicked and delete local storage
$("#reset-btn").click(function () {
    setContent(defaultCv);
    changeTheme("default-theme");
    localStorage.clear();
});
