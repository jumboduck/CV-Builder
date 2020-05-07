//Fetches information in info HTML section and makes it into an Object
function infoToObject(id) {
    var infoObj = {};
    infoObj.type = "info";
    infoObj.name = $("#" + id + " .info-name").html();
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
    $("#" + id + " .info-table1 .info-label").each(function () {
        infoObj.table1.label.push($(this).html());
    });
    $("#" + id + " .info-table1 .info-content").each(function () {
        infoObj.table1.content.push($(this).html());
    });
    $("#" + id + " .info-table2 .info-label").each(function () {
        infoObj.table2.label.push($(this).html());
    });
    $("#" + id + " .info-table2 .info-content").each(function () {
        infoObj.table2.content.push($(this).html());
    });
    return infoObj;
}

//Fetches information in 3 Column HTML section and makes it into an object
function threeColToObject(id) {
    var threeColObj = {};
    threeColObj.type = "3-column";
    threeColObj.title = $("#section" + numOfSections + " .3-col-title").html();
    threeColObj.list = [];
    $("#" + id + " .3-col-item").each(function () {
        threeColObj.list.push($(this).html());
    });
    return threeColObj;
}

//Fetches information in Listing HTML section and makes it into an object
function listingToObject(id) {
    listingObj = {};
    listingObj.type = "listing";
    listingObj.title = $("#" + id + " .listing-title").html();
    listingObj.list = [];
    $("#" + id + " .listing-row").each(function () {
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
function singleBlockToObject(id) {
    singleBlockObj = {};
    singleBlockObj.type = "single-block";
    singleBlockObj.title = $("#" + id + " .single-block-title").html();
    singleBlockObj.list = [];
    $("#" + id + " .single-block-content").each(function () {
        singleBlockObj.list.push($(this).html());
    });
    return singleBlockObj;
}
