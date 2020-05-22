# Cv Builder

## Description

## Deployment and live Demo

The CV builder can be used locally by cloning or downloading the repository from [github](https://github.com/jumboduck/CV-Builder).

The live demo of the cv builder is accessible [here](https://jumboduck.github.io/CV-Builder/index.html).

## UX

### User Stories

-   I want to build a CV in a simple way
-   I want to be able to save my cv to a pdf
-   I want to be able to organize the information on my CV
-   I want to be able to save a CV in progress and return to it later
-   I want to be able to reset the content of the CV
-   I want to be able to add and delete sections of my CV
-   I want to choose the look and feel of my CV

These goals are accomplished in the following way:

-   Pre-existing sections to organize information on the CV
-   Intuitive controls to add, delete or sort information
-   Ability to save work in progress to browser's local storage
-   The CV can be downloaded to a PDF file
-   The CV can be reset
-   The CV's appearance can be customized with themes

### Wireframes

The wireframes were created with balsamiq and can be found [here](wireframes/CV-Builder-Wireframe.pdf)

### Design

Special care was put into making this cv builder an easy tool to use with intuitive controls and appropriate user feedback. This includes the following:

-   Editable text will blink when hovered
-   Editable text background and outline will change when being edited
-   Clear and colored buttons displayed to add a new element or section, and to delete an element or section
-   Sections and element border change on hover to indicate section or element being accessed
-   Validation message when content has been saved
-   Confirmation popup when content is to be reset
-   Clear handle icon on objects that can be sorted
-   Cursor changes when sortable handle is hovered or grabbed
-   Clear placeholders when sortable element is moved to indicate the new placement to the user

## Features

This CV builder gives users the tools necessary to create a simple CV and to download it as a PDF document. The goal is to allow the user as much flexbility as possible in how the content is displayed and organized.

### CV Sections

The information in the user's CV can be displayed in four types of sections.

-   **Info Section** would include the name and two tables of items for various contact information
    ![alt text](assets/img/new-section-info.png "Info Section")
-   **Listing Section** would be used for listings such as education or work experience
    ![alt text](assets/img/new-section-listing.png "Listing section")
-   **Block Section** would be used to display simple paragraphs of information
    ![alt text](assets/img/new-section-block.png "block Section")
-   **Three Column** would be used to list elements in three columns
    ![alt text](assets/img/new-section-3-col.png "Three Column Section")

Sections can be added or removed, and re-organized with a drag and drop. This also applies to individual items within these sections.

### Themes

Additionally, the cv can be customized using 4 different themes that change the fonts and colors on the final product:

-   Default
-   Modern
-   Lavender
-   Deco

### Save Function

Any changes made to the cv or its theme can be saved to be updated at a later time. Its content can also be reset if a user wishes to restart from scratch.
When saved, the content of the page generates a JSON object which is saved to local storage. The theme chosen by the user is also saved to local storage.
Upon reload of the page, the saved data and theme are automatically displayed on the page. If no information is found in local storage, a default CV will be displayed.

### Download PDF

The CV builder uses html2pdf.js to convert the content of the CV into a PDF document, that can be downloaded to the user's device.

### Mobile

This application is primarily meant to be used on computer sized screens but it has been optimized to to work on mobile devices as well.
It was built responsively with the bootstrap framework, and uses JQuery UI Touch Punch to ensure all functionalities work on touch enabled devices.

## Technologies

-   HTML
-   CSS
-   Bootstrap
-   Javascript
-   [JQuery](https://jquery.com/)
-   [JQuery UI](https://jqueryui.com/): for effects on the page and the sortable function
-   JQuery UI Touch Punch: to make JQuery UI sortable function touch device friendly
-   [html2pdf.js](https://github.com/eKoopmans/html2pdf.js): relies on HTML2canvas and jsPDF to convert the CV to a PDF file
-   [anchorme.js](https://alexcorvi.github.io/anchorme.js/): dynamically finds urls and email addresses on the CV and converts them to anchor tags

## Tools Used

-   VSCode: IDE used to create and ede code
-   Adobe Photoshop: Image editor used for section vignettes and favicon
-   Balsamiq: Used to create wireframes
-   [Font Awesome](https://fontawesome.com/): used for all icons throughout the site
-   [Google Fonts](https://fonts.google.com/): The following fonts were imported from Google fonts for the various themes: Montserrat, Open Sans, Raleway, Roboto, Lato, Jost
-   [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb): Chrome extension used to test site at different screen sizes
-   [Pingdom](https://tools.pingdom.com/): used to test site performance
-   [W3C HTML Validator](https://validator.w3.org/): used to validate HTML code
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/): used to validate CSS

## Testing

### Manual Testing

### User Testing

### Jasmine Testing

### Known Bugs

-   When generated from a mobile device, the PDF has a different aspect than when generated from larger screen sized because of how html2pdf.js converts a page to a PDF file. By sending options to html2pdf.js, it is possible for the CV to be laid out as if on a larger screen size, however the page breaks on the PDF seem to be determined by the device's window height, resulting in uneven and unpredictable page breaks. For this reason, the choice was made to have the PDF appear differently when generated from mobile devices, for now.

## Code Notes

## Acknowledgments

Thanks for help on readme

Felipe for ideas and inspiration for the project

CI Slack community for support
