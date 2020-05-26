(function () {
    let printable;
    let themes = [
        "default-theme",
        "theme-modern",
        "theme-lavender",
        "theme-deco",
    ];
    let toBePrinted;
    let numOfSections = 0;
    let defaultCv;
    //Retrieve CV and theme saved to local storage
    let savedCv = localStorage.getItem("CV");
    let usedTheme = localStorage.getItem("theme");

    $(document).ready(function () {
        $("#save-alert").hide();
        $("#new-section-buttons").hide();
        $("#close-section").hide();
        printable = $("#printable");
        toBePrinted = printable[0];

        //Fetch default CV data and display as formatted HTML
        fetch("assets/data/defaultcv.json")
            .then((res) => res.json())
            .then((data) => {
                defaultCv = data;
                // If no saved CV has been saved, set content to default CV
                if (!savedCv) {
                    setContent(data);
                }
                // Set content to saved CV and theme
                else {
                    try {
                        setContent(JSON.parse(savedCv));
                        changeTheme(JSON.parse(usedTheme));
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
    });

    //Display CV on page
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

            //Formatting data to html for info section
            if (type === "info") {
                convertedData = infoToHtml(table1, table2, name);
                sectionsArray.push(convertedData);
            }
            //Formatting data to html for listing section
            else if (type === "listing") {
                convertedData = listingToHtml(itemList, title);
                sectionsArray.push(convertedData);
            }
            //Formatting data to html for single block section
            else if (type === "single-block") {
                convertedData = singleBlockToHtml(itemList, title);
                sectionsArray.push(convertedData);
            }
            //Formatting data to html for three column section
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

    //GENERATE HTML FOR ENTIRE SECTIONS

    //Arguments are objects from JSON data, whether default CV or CV saved in local storage
    //Default arguments are used when a new section is created

    //Generate HTML for info sections, returns a string of HTML
    function infoToHtml(
        table1 = {
            class: "info-table1",
            label: ["Label"],
            content: ["Information"],
        },
        table2 = {
            class: "info-table2",
            label: ["Label"],
            content: ["Information"],
        },
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
            //Table has only 1 row, open and close div tag
            if (table.label.length === 1) {
                dataTable += `<div class="col-md-6 extendable info-table ${table.class} sortable-list">${newRow}</div>`;
            }
            //First row of the table, open div tag, no closing div tag
            else if (j === 0) {
                dataTable += `<div class="col-md-6 extendable info-table ${table.class} sortable-list">${newRow}`;
            }
            //Last row of the table, no open div tag, close div tag
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
        list = ["Description"],
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

    /* Generate HTML for elements within sections
Default parameters are used when a new element is created*/

    //Create HTML for item in Info section
    function createInfoItem(label = "Label", content = "Information") {
        return `<div class="row deletable sortable">
        <div class="col-md-4 text-left info-label" contenteditable="true">${label}</div>
        <div contenteditable="true" class="col-md-8 info-content">${content}</div>
    </div>`;
    }

    //Create HTML for item in Listing section
    function createListingItem(
        date = "Date",
        location = "Location",
        position = "Position",
        description = "Description"
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
    function createSingleBlockItem(textContent = "Description") {
        return `<div class="row deletable sortable"><div class="col"><div contenteditable="true" class="single-block-content">${textContent}</div></div></div>
</div>`;
    }

    //Create HTML for item in Three Column section
    function createThreeColumnItem(item = "New Item") {
        return `<div class="col-12 col-md-4 sortable deletable"><ul><li contenteditable="true" class="three-col-item">${item}</li></ul></div>`;
    }

    /* Adding a new section to CV */

    //Toggle buttons to add new section
    function toggleSectionBtns() {
        $("#close-section").toggle();
        $("#add-section-btn").toggle();
        $("#new-section-buttons").toggle("blind", "swing", 300);
    }

    //When Button to add section is clicked, section type selection appears
    $("#add-section-btn").click(toggleSectionBtns);

    //Closing section type selection
    $("#close-section").click(function () {
        $("#new-section-buttons").toggle("blind", "swing", 300, function () {
            $("#close-section").toggle();
            $("#add-section-btn").toggle();
        });
    });

    //Adds a new section to the cv and ensures it is sortable and has buttons to add a new element
    function addSection(type) {
        $("#printable").append(type);
        toggleSectionBtns();
        createNewElementButton();
        makeSortable();
    }

    //New sections added on click
    $("#newsingleblock-btn").click(function () {
        addSection(singleBlockToHtml());
    });
    $("#newlisting-btn").click(function () {
        addSection(listingToHtml());
    });
    $("#new3col-btn").click(function () {
        addSection(threeColToHtml());
    });
    $("#newinfo-btn").click(function () {
        addSection(infoToHtml());
    });

    /* Creates objects for each type of section from HTML */

    //Fetches information in info HTML section and generates an Object
    function infoToObject(id) {
        let infoObj = {};
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

    //Fetches information in 3 Column HTML section and generates an object
    function threeColToObject(id) {
        let threeColObj = {};
        threeColObj.type = "three-column";
        threeColObj.title = $("#" + id + " .three-col-title").html();
        threeColObj.list = [];
        $("#" + id + " .three-col-item").each(function () {
            threeColObj.list.push($(this).html());
        });
        return threeColObj;
    }

    //Fetches information in Listing HTML section and generates an object
    function listingToObject(id) {
        listingObj = {};
        listingObj.type = "listing";
        listingObj.title = $("#" + id + " .listing-title").html();
        listingObj.list = [];
        $("#" + id + " .listing-row").each(function () {
            let listingRow = {};
            listingRow.date = $(this).find(".listing-date").html();
            listingRow.location = $(this).find(".listing-location").html();
            listingRow.position = $(this).find(".listing-position").html();
            listingRow.description = $(this)
                .find(".listing-description")
                .html();

            listingObj.list.push(listingRow);
        });
        return listingObj;
    }

    //Fetches information in Single Block HTML section and generates an object
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

    /* Generating buttons to add and delete elements pn CV */

    //Display "delete" button on mouse enter
    $(document).on("mouseenter", ".deletable", function () {
        //Delete button is only created if one doesn't already exist
        if (!$(this).find("deletebtn").length) {
            $(this).append(
                `<button class="deletebtn" aria-label="delete-element"><i class='fas fa-times-circle'></i></button>`
            );
            $(this).addClass("deletable-hover");
        }
    });
    //Remove button and deletable class on mouse leave
    $(document).on("mouseleave", ".deletable", function () {
        $(this).find(".deletebtn").remove();
        $(this).removeClass("deletable-hover");
    });

    //Remove element or section on click of delete button
    $(document).on("click", ".deletebtn", function () {
        $(this).closest(".deletable").remove();
    });

    //Button to add a new element is generated in every section
    function createNewElementButton() {
        $(".extendable").each(function () {
            if (!$(this).find(".add-element").length) {
                if ($(this).parents().hasClass("three-column")) {
                    //Three column section "add element" button behaves slightly differently due to bootstrap column
                    $(this).append(
                        `<button class="add-element btn-block d-flex justify-content-center align-items-center col-md-4" aria-label="add-element"><i class="fas fa-plus-circle"></i></button>`
                    );
                } else {
                    $(this).append(
                        `<button class="add-element btn-block text-center row"  aria-label="add-element"><i class="fas fa-plus-circle"></i></button>`
                    );
                }
            }
        });
    }

    //Add new element
    $(document).on("click", ".add-element", addItem);

    function addItem() {
        var newItem = "";
        if ($(this).parent().hasClass("listing")) {
            newItem = createListingItem();
        } else if ($(this).parent().hasClass("single-block")) {
            newItem = createSingleBlockItem();
        } else if ($(this).parent().hasClass("three-column-list")) {
            newItem = createThreeColumnItem();
        } else if ($(this).parent().hasClass("info-table")) {
            newItem = createInfoItem();
        }
        //The new element is added before the button
        $(this).before(newItem);
    }

    /* Make sections and elements sortable with JQuery UI */

    //Add button to sort elements on mouse event
    $(document).on("mouseenter", ".sortable", function () {
        //Add sortable handle only if is not already appended to the element
        if (!$(this).find("sortable-btn").length) {
            $(this).append(
                `<button class="sortable-btn"><i class="fas fa-bars"></i></button>`
            );
        }
    });

    //Remove sortable handle on mouse leave
    $(document).on("mouseleave", ".sortable", function () {
        $(this).find(".sortable-btn").remove();
    });

    //JQuery UI sortable function with options
    function makeSortable() {
        $(".sortable-list").sortable({
            items: ">.sortable",
            handle: ">.sortable-btn",
            cancel: "",
            placeholder: "sort-placeholder",
            cursor: "grabbing",
            helper: "clone",
            opacity: 0.8,
            revert: 100,
            scrollSensitivity: 60,
            scrollSpeed: 10,
            tolerance: "touch",
            html2canvas: { windowWidth: 600 },
        });
    }

    /* Convert to PDF */

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

    /* Changing Themes */

    //Update active theme in navigation
    function changeActiveNav(nav) {
        $(".nav-link .sr-only").remove();
        $(".active").removeClass("active");
        nav.addClass("active");
        nav.append(`<span class="sr-only">(current)</span>`);
    }

    //Update CV themes and changes color of header
    function changeTheme(theme) {
        let themeClasses = themes.join(" ");
        $("#printable").removeClass(themeClasses).addClass(theme);
        $(".custom-header").removeClass(themeClasses).addClass(theme);
        usedTheme = theme;
        if (theme === "default-theme") {
            changeActiveNav($("#default-theme-link"));
        } else if (theme === "theme-modern") {
            changeActiveNav($("#theme-modern-link"));
        } else if (theme === "theme-lavender") {
            changeActiveNav($("#theme-lavender-link"));
        } else if (theme === "theme-deco") {
            changeActiveNav($("#theme-deco-link"));
        }
    }

    //Nav links listeners
    $("#default-theme-link").click(function () {
        changeTheme("default-theme");
    });
    $("#theme-modern-link").click(function () {
        changeTheme("theme-modern");
    });
    $("#theme-lavender-link").click(function () {
        changeTheme("theme-lavender");
    });
    $("#theme-deco-link").click(function () {
        changeTheme("theme-deco");
    });
})();
