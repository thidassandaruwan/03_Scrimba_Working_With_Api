// API base url
const BASE_URL = "https://www.thecolorapi.com/scheme";

const themeBtn = document.getElementById("switch-theme-btn");
const colorControlsForm = document.getElementById("control-bar");
const submitBtn = document.getElementById("control-submit-btn");

themeBtn.addEventListener("click", switchTheme);
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
    const hexValues = colorData.colors.map( color => color.hex.value );

    updateUI(hexValues)
    

    // reset the submit button
    submitBtn.textContent = "Get Color Scheme";
    submitBtn.disabled = false;

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

function updateUI(hexValues){

}

// TODO : copright year