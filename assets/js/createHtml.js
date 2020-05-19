//Count Number of Sections on Page to create section id
let numOfSections = 0;

//GENERATE HTML FOR ENTIRE SECTIONS

//Arguments are objects from JSON data, whether default CV or CV saved in local storage
//Default arguments are used when a new section is created

//Generate HTML for info sections
function infoToHtml(
    table1 = { class: "info-table1", label: ["Label"], content: ["Content"] },
    table2 = { class: "info-table2", label: ["Label"], content: ["Content"] },
    name = "Name"
) {
    let dataTable1 = convertTableToHtml(table1);
    let dataTable2 = convertTableToHtml(table2);
    numOfSections++;
    return `<section class="section info deletable sortable break-after" id="section${numOfSections}">
            <h2 contenteditable="true" class="text-center info-name">${name}</h2><div class="row">${
        dataTable1 + dataTable2
    }</div></section>`;
}

//Generate HTML for tables in info sections, returns a string of HTML
function convertTableToHtml(table) {
    let dataTable = "";
    for (let j = 0; j < table.label.length; j++) {
        let newRow = createInfoItem(table.label[j], table.content[j]);
        //Table has only 1 row => open and close div tag
        if (table.label.length === 1) {
            dataTable += `<div class="col-md-6 extendable info-table ${table.class} sortable-list">${newRow}</div>`;
        }
        //First row of the table => open div tag
        else if (j === 0) {
            dataTable += `<div class="col-md-6 extendable info-table ${table.class} sortable-list">${newRow}`;
        }
        //Last row of the table => close div tag
        else if (j === table.label.length - 1) {
            dataTable += `${newRow}</div>`;
        }
        //Every other row
        else {
            dataTable += newRow;
        }
    }
    return dataTable;
}

//Generate HTML for single block sections
function singleBlockToHtml(
    list = ["Descriptive Text"],
    title = "New Single Block"
) {
    let htmlList = "";
    for (j in list) {
        htmlList += createSingleBlockItem(list[j]);
    }
    numOfSections++;
    return `<section class="break-after section single-block deletable extendable sortable-list sortable" id="section${numOfSections}">
<h3 contenteditable="true" class="section-heading single-block-title">${title}</h3>${htmlList}</section>`;
}

//Generate HTML for listing sections
function listingToHtml(
    list = [
        {
            date: "Date",
            location: "Location",
            position: "Position",
            description: "Description",
        },
    ],
    title = "New Listing"
) {
    let htmlList = "";
    for (j in list) {
        htmlList += createListingItem(
            list[j].date,
            list[j].location,
            list[j].position,
            list[j].description
        );
    }
    numOfSections++;
    return `<section class="section break-after listing deletable extendable sortable-list sortable" id="section${numOfSections}">
    <h3 contenteditable="true" class="listing-title section-heading">${title}</h3>${htmlList}</section>`;
}

//Generate HTML for three column sections
function threeColToHtml(
    list = ["New Item", "New Item", "New Item"],
    title = "New Three Column Section"
) {
    let htmlList = "";

    for (j in list) {
        htmlList += createThreeColumnItem(list[j]);
    }
    numOfSections++;
    return `<section break-after class="section three-column deletable sortable" id="section${numOfSections}">
        <h3 contenteditable="true" class="section-heading three-col-title">${title}</h3>
        <div class="row three-column-list d-flex align-content-start flex-wrap extendable pl-2 pr-2 sortable-list">${htmlList}</div></section>`;
}

//GENERATE HTML FOR ELEMENTS WITHIN SECTIONS
//Default parameters are used when a new element is created
//Create HTML for item in Listing section
function createListingItem(
    date = "Date",
    location = "Location",
    position = "Position",
    description = "Descriptive Paragraph"
) {
    return `<div class="row listing-row deletable sortable">
    <div class="col-md-2 listing-date-col">
        <h5 contenteditable="true" class="listing-date">${date}</h5>
    </div>
    <div class="col-md-2 listing-location-col">
        <h5 contenteditable="true" class="listing-location">${location}</h5>
    </div>
    <div class="col-md-8 listing-content-col">
        <h5 contenteditable="true" class="listing-position">
        ${position}
        </h5>
        <div contenteditable="true" class="listing-description">
        ${description}
        </div>
    </div>
</div>`;
}

//Create HTML for item in Single Block section
function createSingleBlockItem(textContent = "Descriptive Paragraph") {
    return `<div class="row deletable sortable"><div class="col"><div contenteditable="true" class="single-block-content">${textContent}</div></div></div>
</div>`;
}

//Create HTML for item in Three Column section
function createThreeColumnItem(item = "New Item") {
    return `<div class="col-12 col-md-4 sortable deletable"><ul><li contenteditable="true" class="three-col-item">${item}</li></ul></div>`;
}

//Create HTML for item in Info section
function createInfoItem(label = "Label", content = "Information") {
    return `<div class="row deletable sortable">
        <div class="col-md-4 text-left info-label" contenteditable="true">${label}</div>
        <div contenteditable="true" class="col-md-8 info-content">${content}</div>
    </div>`;
}
