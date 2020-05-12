//Count Number of Sections on Page to create section id
var numOfSections = 0;

//GENERATE HTML FOR ENTIRE SECTIONS
//Generate HTML for info sections
function infoToHtml(
    table1 = { class: "info-table1", label: ["Label"], content: ["Content"] },
    table2 = { class: "info-table2", label: ["Label"], content: ["Content"] },
    name = "Name"
) {
    var dataTable1 = convertTableToHtml(table1);
    var dataTable2 = convertTableToHtml(table2);
    numOfSections++;
    return `<section class="section info deletable sortable" id="section${numOfSections}">
            <h2 contenteditable="true" class="text-center info-name">${name}</h2><div class="row">${
        dataTable1 + dataTable2
    }</div></section>`;
}

//Generate HTML for tables in info sections
function convertTableToHtml(info) {
    let dataTable = "";
    for (let j = 0; j < info.label.length; j++) {
        let newRow = createInfoItem(info.label[j], info.content[j]);
        if (info.label.length === 1) {
            //Table has only 1 row => open and close div tag
            dataTable += `<div class="col-md-6 extendable info-table ${info.class} sortable-list">${newRow}</div>`;
        } else if (j === 0) {
            //First row of the table => open div tag
            dataTable += `<div class="col-md-6 extendable info-table ${info.class} sortable-list">${newRow}`;
        } else if (j === info.label.length - 1) {
            //Last row of the table => close div tag
            dataTable += `${newRow}</div>`;
        } else {
            //Every other row
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
    return `<section class="section single-block deletable extendable sortable-list sortable" id="section${numOfSections}">
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
    return `<section class="section listing deletable extendable sortable-list sortable" id="section${numOfSections}">
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
    return `<section class="section three-column deletable sortable" id="section${numOfSections}">
        <h3 contenteditable="true" class="section-heading three-col-title">${title}</h3>
        <div class="row three-column-list d-flex align-content-start flex-wrap extendable pl-2 pr-2 sortable-list">${htmlList}</div></section>`;
}

//GENERATE HTML FOR ELEMENTS WITHIN SECTIONS
//Create HTML for item in Listing section
function createListingItem(
    date = "Date",
    location = "Location",
    position = "Position",
    description = "Descriptive Paragraph"
) {
    return `<div class="row listing-row deletable sortable">
    <div class="col-md-2">
        <h5 contenteditable="true" class="listing-date">${date}</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true" class="listing-location">${location}</h5>
    </div>
    <div class="col-md-8">
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
    return `<div class="col-12 col-md-4 sortable deletable three-col-item"><ul><li contenteditable="true" class="three-col-item">${item}</li></ul></div>`;
}

//Create HTML for item in Info section
function createInfoItem(label = "Label", content = "Information") {
    return `<div class="row deletable sortable">
        <div class="col-md-4 text-md-right info-label" contenteditable="true">${label}</div>
        <div contenteditable="true" class="col-md-8 info-content">${content}</div>
    </div>`;
}
