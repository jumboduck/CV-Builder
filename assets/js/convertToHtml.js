//Listing Type Objects get converted to HTML
function listingToHtml(i, list, title) {
    let htmlList = "";
    for (j in list) {
        htmlList += createListingItem(
            list[j].date,
            list[j].location,
            list[j].position,
            list[j].description
        );
    }
    return `<section class="section listing deletable" id="section${i}">
    <h3 contenteditable="true" class="listing-title section-heading">${title}</h3>${htmlList}</section>`;
}

//Single-Block type items get converted to HTML
function singleBlockToHtml(i, list, title) {
    let htmlList = "";
    for (j in list) {
        htmlList += createSingleBlockItem(list[j]);
    }
    return `<section class="section single-block deletable" id="section${i}">
<h3 contenteditable="true" class="section-heading single-block-title">${title}</h3>${htmlList}</section>`;
}

//Three-Column type items get converted to HTML
function threeColToHtml(i, list, title) {
    let htmlList = "";
    let rows = [];

    //Ensure each row has 3 columns
    while (list.length % 3 != 0) {
        list.push("");
    }

    //Divide list in groups of 3
    while (list.length) {
        rows.push(list.splice(0, 3));
    }

    for (j in rows) {
        htmlList += createThreeColumnRow(rows[j][0], rows[j][1], rows[j][2]);
    }

    return `<section class="section 3-column deletable" id="section${i}">
        <h3 contenteditable="true" class="section-heading 3-col-title">${title}</h3>
        ${htmlList}</section>`;
}

//Info type items get converted to HTML
function infoToHtml(i, table1, table2, name) {
    var dataTable1 = convertTableToHtml(table1);
    var dataTable2 = convertTableToHtml(table2);

    return `<section class="section info deletable" id="section${i}">
            <h2 contenteditable="true" class="text-center info-name">${name}</h2><div class="row">${
        dataTable1 + dataTable2
    }</div></section>`;
}

//Table in Info section get converted to HTML
function convertTableToHtml(info) {
    let dataTable = "";
    for (let j = 0; j < info.label.length; j++) {
        let newRow = createInfoItem(info.label[j], info.content[j]);
        if (info.label.length === 1) {
            //Table has only 1 row => open and close div tag
            dataTable += `<div class="col-md-6 ${info.class}">${newRow}</div>`;
        } else if (j === 0) {
            //First row of the table => open div tag
            dataTable += `<div class="col-md-6 ${info.class}">${newRow}`;
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

//Create HTML for item in Listing section
function createListingItem(
    date = "Date",
    location = "Location",
    position = "Position",
    description = "Descriptive Paragraph"
) {
    return `<div class="row listing-row deletable">
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
    return `<div class="row deletable"><div class="col"><div contenteditable="true" class="single-block-content">${textContent}</div></div></div>
</div>`;
}

//Create HTML for item in Three Column section
function createThreeColumnRow(
    item1 = "-Item 1",
    item2 = "-Item 2",
    item3 = "-Item 3"
) {
    return `<div class="row deletable">
                <div class="col 3-col-item" contenteditable="true">${item1}</div>
                <div class="col 3-col-item" contenteditable="true">${item2}</div>
                <div class="col 3-col-item" contenteditable="true">${item3}</div>
            </div>`;
}

//Create HTML for item in Info section

function createInfoItem(label = "Label", content = "Information") {
    return `<div class="row deletable">
        <div class="col-4 text-right info-label" contenteditable="true">${label}</div>
        <div contenteditable="true" class="col-8 info-content">${content}</div>
    </div>`;
}
