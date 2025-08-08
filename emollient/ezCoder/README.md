# EZ Coder
### Author: Megan Kwok

This project was written as a way for non-developers to easily change coded parts of the My Emollient shopify website: myemollient.com. 

So far, the "Save Default" doesn't overwrite the code -- will have to use Node.js

### Start Page: ezCoder.html ==================================

### Collection Editor page: collectionCoder.html =========================
## Default Mode:
    - shows grid of default layout of products based off defaultProducts[]
    - links on images are deactivated
    - links on words were kept activated
    - click on images to show product block information (name, link, front image, hover image)
    - get Shopify code button: generates and copies code to clipboard in liquid (shopify) format
    - the copied text does not include the header because the header isn't a coded part of the website
        - links on images are activated in the generated code
    - get HTML code button: generates and copies code to clipboard in HTML format
        - the copied text does not include the header because the header isn't a coded part of the website
        - links on images are activated in the generated code
    - edit mode button: goes into edit mode
    - home button: goes back to ezCoder.html
## Edit mode:
    - shows grid of temporary layout of products based off temporaryProducts[]
    - links on images are deactivated
    - links on words were kept actiavted
    - click on images to show and edit product block information (name, link, front image, hover image)
    - Save as Default button: saves changed product layout as BOTH temporary layout and default layout
    - Save as Temporary button: saves changed product layout as ONLY temporary layout
    - Revert All button: reverts changed & temporary layout back to default layout
    - get Shopify code button: generates and copies code to clipboard in liquid (shopify) format
        - links on images are activated in the generated code
    - get HTML code button: generates and copies code to clipboard in HTML format
        - links on images are activated in the generated code
    - See Default button: goes into Default mode (non-editing)

### Ingredients Editor page: ingredientsCoder.html =======================
## Default Mode:

## Edit Mode:


### Quiz Editor page: quizCoder.html ==============================
## Default Mode:

## Edit Mode:



### For Developers - code explanation:
## Collection Coder
