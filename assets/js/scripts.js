var savedCv = localStorage.getItem("CV");
var printable = document.getElementById("printable");

//Define content to be displayed
function setContent(cvContent) {
    printable.innerHTML = cvContent;
    console.log("content updated");
}

// Load default or saved content when page loads
window.addEventListener("load", function () {
    if (!savedCv) {
        setContent(defaultCv);
    } else {
        setContent(savedCv);
    }
});

//Set default content when reset button is clicked and delete local storage
document.getElementById("reset-btn").addEventListener("click", function () {
    setContent(defaultCv);
    localStorage.clear();
});

//Save to local storage when save button is clicked
document.getElementById("save-btn").addEventListener("click", function () {
    let currentCv = document.getElementById("printable").innerHTML;
    localStorage.setItem("CV", currentCv);
});

//Save to PDF with html2pdf when download pdf button is clicked
var toBePrinted = document.getElementById("printable");
var printOptions = {
    filename: "cv.pdf",
    pagebreak: { mode: "avoid-all" },
};
function toPDF() {
    html2pdf(toBePrinted, printOptions);
}
document.getElementById("download-btn").addEventListener("click", toPDF);

//Testing loading content to page from JSON

document.getElementById("test-btn").addEventListener("click", function () {
    convertSavedData(skills);
});

//Traversing JSON data, returns an array of HTML sections
function convertSavedData(savedCV) {
    var sectionsArray = [];

    for (i in savedCV) {
        var convertedList = "";
        var type = savedCV[i].type;
        var title = savedCV[i].title;
        var itemList = [];
        for (j in savedCV[i].list) {
            itemList[j] = savedCV[i].list[j];
        }
        //debugger;
        //Formatting if section is a list with dates, such as experience
        if (type === "listing") {
            var convertedData = `<section class="${type}">
                <h3 contenteditable="true" class="section-heading">${title}</h3>${convertedList}</section>`;

            sectionsArray.push(convertedData);
        }

        //Formatting if section is a list of items, such as skills/interests
        if (type === "3-column") {
            for (j in itemList) {
                //first row of items
                if (j % 3 === 0) {
                    convertedList += `<div class="row">
                                    <div class="col">
                                    <p contenteditable="true">${itemList[j]}</p>
                                    </div>`;
                    //last row of items
                } else if (j % 3 === 2) {
                    convertedList += `<div class="col">
                    <p contenteditable="true">${itemList[j]}</p>
                </div></div>`;
                    //all other rows of items
                } else {
                    convertedList += `
                <div class="col">
                    <p contenteditable="true">${itemList[j]}</p>
                </div>`;
                }
            }
            var convertedData = `<section class="${type}">
                <h3 contenteditable="true" class="section-heading">${title}</h3>
                ${convertedList}</section>`;
            sectionsArray.push(convertedData);
        }
    }

    printable.innerHTML = sectionsArray.join(" ");
}

//Content of page in JSON Format
var skills = [
    {
        type: "listing",
        title: "Professional Experience",
        list: [
            {
                date: "2019-2020",
                location: "Bigstore Management",
                position: "Director of Sales",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae aspernatur repellat quis hic sunt harum deleniti perferendis necessitatibus reprehenderit minima vero unde assumenda id adipisci consequuntur consectetur, sint dignissimos omnis voluptates ratione eaque eos? Iste repellendus facere, eveniet tempora unde laboriosam adipisci, illo obcaecati blanditiis quibusdam assumenda, beatae soluta temporibus?",
            },
            {
                date: "2017-2019",
                location: "Elephant Inc.",
                position: "Communication Strategist",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae aspernatur repellat quis hic sunt harum deleniti perferendis necessitatibus reprehenderit minima vero unde assumenda id adipisci consequuntur consectetur, sint dignissimos omnis voluptates ratione eaque eos? Iste repellendus facere, eveniet tempora unde laboriosam adipisci, illo obcaecati blanditiis quibusdam assumenda, beatae soluta temporibus?",
            },
            {
                date: "2015-2017",
                location: "Elephant Inc.",
                position: "Sales Assistant",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae aspernatur repellat quis hic sunt harum deleniti perferendis necessitatibus reprehenderit minima vero unde assumenda id adipisci consequuntur consectetur, sint dignissimos omnis voluptates ratione eaque eos? Iste repellendus facere, eveniet tempora unde laboriosam adipisci, illo obcaecati blanditiis quibusdam assumenda, beatae soluta temporibus?",
            },
        ],
    },
    {
        type: "3-column",
        title: "Skills",
        list: [
            "-Salesforce",
            "-Teamwork",
            "-Fashion Sense",
            "-Martial Arts",
            "-Advanced Gymnastics",
            "-Fishing",
        ],
    },
    {
        type: "3-column",
        title: "Interests",
        list: ["-Books", "-Video Games", "-Baking", "-Fruit Juice", "-Flexing"],
    },
];

//default content that is first loaded, and loaded when reset
var defaultCv = `<section>
<h2 contenteditable="true" class="text-center">John Doe</h2>
<div class="row">
    <div class="col-md-3 text-right">
        <strong>
            <p contenteditable="true">Address:</p>
        </strong>
    </div>
    <div class="col-md-3">
        <p contenteditable="true">
            123 State St.
            <br />
            Oslo, Norway
        </p>
    </div>
    <div class="col-md-3 text-right">
        <strong>
            <p contenteditable="true">Website:</p>
        </strong>
    </div>
    <div class="col-md-3">
        <p contenteditable="true">
            https://www.johndoe.doe
        </p>
    </div>
</div>
<div class="row">
    <div class="col-md-3 text-right">
        <strong>
            <p contenteditable="true">Phone:</p>
        </strong>
    </div>
    <div class="col-md-3">
        <p contenteditable="true">555-123-4567</p>
    </div>

    <div class="col-md-3 text-right">
        <strong>
            <p contenteditable="true">Twitter:</p>
        </strong>
    </div>
    <div class="col-md-3">
        <p contenteditable="true">
            @johndoe
        </p>
    </div>
</div>
<div class="row">
    <div class="col-md-3 text-right">
        <strong>
            <p contenteditable="true">Email:</p>
        </strong>
    </div>
    <div class="col-md-3">
        <p contenteditable="true">johndoe@email.io</p>
    </div>
    <div class="col"></div>
</div>
</section>



<!-- DEFAULT SECTION 1: EXPERIENCE -->
<section>
<h3 contenteditable="true" class="section-heading">
    Professional Experience
</h3>
<div class="row">
    <div class="col-md-2">
        <h5 contenteditable="true">2019 - 2020</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true">Bigstore Management</h5>
    </div>
    <div class="col-md-8">
        <h5 contenteditable="true">
            Director of sales
        </h5>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Recusandae aspernatur repellat
            quis hic sunt harum deleniti perferendis
            necessitatibus reprehenderit minima vero unde
            assumenda id adipisci consequuntur consectetur,
            sint dignissimos omnis voluptates ratione eaque
            eos? Iste repellendus facere, eveniet tempora
            unde laboriosam adipisci, illo obcaecati
            blanditiis quibusdam assumenda, beatae soluta
            temporibus?
        </p>
    </div>
</div>
<div class="row">
    <div class="col-md-2">
        <h5 contenteditable="true">2017 - 2019</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true">Elephant Inc.</h5>
    </div>
    <div class="col-md-8">
        <h5 contenteditable="true">
            Communication Strategist
        </h5>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Recusandae aspernatur repellat
            quis hic sunt harum deleniti perferendis
            necessitatibus reprehenderit minima vero unde
            assumenda id adipisci consequuntur consectetur,
            sint dignissimos omnis voluptates ratione eaque
            eos?
        </p>
    </div>
</div>
<div class="row">
    <div class="col-md-2">
        <h5 contenteditable="true">2015 - 2017</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true">Elephant Inc.</h5>
    </div>
    <div class="col-md-8">
        <h5 contenteditable="true">
            Sales Assistant
        </h5>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Recusandae aspernatur repellat
            quis hic sunt harum deleniti perferendis
            necessitatibus reprehenderit minima vero unde
            assumenda id adipisci consequuntur consectetur,
            sint dignissimos omnis voluptates ratione eaque
            eos? Iste repellendus facere, eveniet tempora
            unde laboriosam adipisci, illo obcaecati
            blanditiis quibusdam assumenda, beatae soluta
            temporibus?
        </p>
    </div>
</div>

<hr />
</section>





<!-- DEFAULT SECTION 2: EDUCATION -->
<section>
<h3 contenteditable="true" class="section-heading">
    Education
</h3>
<div class="row">
    <div class="col-md-2">
        <h5 contenteditable="true">2011 - 2015</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true">University of Oslo</h5>
    </div>
    <div class="col-md-8">
        <h5 contenteditable="true">
            Masters in Business
        </h5>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Recusandae aspernatur repellat
            quis hic sunt harum deleniti perferendis
            necessitatibus
        </p>
    </div>
</div>
<div class="row">
    <div class="col-md-2">
        <h5 contenteditable="true">2010 - 2011</h5>
    </div>
    <div class="col-md-2">
        <h5 contenteditable="true">University of Bergen</h5>
    </div>
    <div class="col-md-8">
        <h5 contenteditable="true">
            Bachelor in Communications
        </h5>
        <p contenteditable="true">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Recusandae aspernatur repellat
            quis hic sunt harum deleniti perferendis
            necessitatibus
        </p>
    </div>
</div>
<hr />
</section>




<!-- DEFAULT SECTION 3: SKILLS -->
<section>
<h3 contenteditable="true" class="section-heading">
    Skills
</h3>
<div class="row">
    <div class="col">
        <p contenteditable="true">-Salesforce</p>
    </div>
    <div class="col">
        <p contenteditable="true">-Teamwork</p>
    </div>
    <div class="col">
        <p contenteditable="true">-Fashion Sense</p>
    </div>
</div>

<div class="row">
    <div class="col">
        <p contenteditable="true">-Martial Arts</p>
    </div>
    <div class="col">
        <p contenteditable="true">-Advanced Gymnastics</p>
    </div>
    <div class="col">
        <p contenteditable="true">-Fishing</p>
    </div>
</div>
</section>`;
