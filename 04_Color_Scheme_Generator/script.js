// API base url
const BASE_URL = "https://www.thecolorapi.com/scheme";

const themeBtn = document.getElementById("switch-theme-btn");
const colorControlsForm = document.getElementById("control-bar");
const submitBtn = document.getElementById("control-submit-btn");
const colorSamplesContainer = document.getElementById("color-samples");

themeBtn.addEventListener("click", switchTheme);

colorSamplesContainer.addEventListener("click", (event) => {
    copyTheHexValue(event);
});

colorControlsForm.addEventListener("submit", (event) => {
    handleFormSubmission(event)
})


function switchTheme(){
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // Update attribute on body
    document.body.setAttribute("data-theme", newTheme);
    
    // Update button text
    themeBtn.textContent = newTheme === "light" ? "Switch to Dark" : "Switch to Light";
}

function copyTheHexValue(event){
    const sample = event.target.closest(".sample-container");
    if (!sample){
        return;
    }

    const hexValue = sample.querySelector(".hex-value").textContent;
    
    navigator.clipboard.writeText(hexValue)
        .then( () => {
            alert("Copied");
        })
        .catch((error) => {
            console.log(`Error copying the hexvalue: ${error.message}`);
        })
    
}

async function handleFormSubmission(event){
    event.preventDefault();
    // disable the submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Generating...";


    // get hex controls
    const formData = new FormData(colorControlsForm);
    const colorControls = Object.fromEntries(formData);

    const color = colorControls.color.replace('#', '');
    const mode = colorControls.mode;
    const COUNT = 5;

    const colorData = await getColorScheme(color, mode, COUNT);
    // if error occurered and returned null, reset the submit button and exit the program
    if(!colorData){ 
        resetSubmitBtn();
        return; 
    }

    const hexValues = colorData.colors.map( color => color.hex.value );
    colorSamplesContainer.innerHTML =  getColorSamplesHTML(hexValues)
    
    // reset the submit button
    resetSubmitBtn();
}

async function getColorScheme(color, mode, count){
    // prepared api GET url
    const URL = `${BASE_URL}?hex=${color}&mode=${mode}&count=${count}`;

    try{
        const response = await fetch(URL);
        
        if(!response.ok){
            throw Error(`Error retriving color data : ${response.status}`);
        }
        
        return await response.json();
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        return null;
    }
}

function getColorSamplesHTML(hexValues){
    return hexValues.map((color) => {
        return `
            <div class="sample-container" style="--swatch-color: ${color};">
                <div class="color-sample"></div>
                <span class="hex-value">${color}</span>
            </div>
        `
    });
}

function resetSubmitBtn(){
    submitBtn.textContent = "Get Color Scheme";
    submitBtn.disabled = false;
}

// copright year
function updateCopyrightYear(){
    document.getElementById("copyright-year").textContent = new Date().getFullYear();
}


// load the initial colors by fake control form submission
colorControlsForm.requestSubmit();
// load the copyright year
updateCopyrightYear()