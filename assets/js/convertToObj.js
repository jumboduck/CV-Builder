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
