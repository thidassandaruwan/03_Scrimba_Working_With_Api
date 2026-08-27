const themeBtn = document.getElementById("switch-theme-btn");
const colorControlsForm = document.getElementById("control-bar");
const submitBtn = document.getElementById("control-submit-btn");

themeBtn.addEventListener("click", switchTheme);
colorControlsForm.addEventListener("submit", (event) => {
    handleFormSubmission(event)
})

// TODO : get color container elements

// TODO : copright year

function switchTheme(){
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // Update attribute on body
    document.body.setAttribute("data-theme", newTheme);
    
    // Update button text
    themeBtn.textContent = newTheme === "light" ? "Switch to Dark" : "Switch to Light";
}

function handleFormSubmission(event){
    event.preventDefault();
    // disable the submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Generating...";


    // get hex controls
    const formData = new FormData(colorControlsForm);
    const colorControls = Object.fromEntries(formData);

    console.log(colorControls.color, colorControls.mode)

    // reset the submit button
    submitBtn.textContent = "Get Color Scheme";
    submitBtn.disabled = false;

}

function getColorScheme(color, mode, count){

}

// function updateUI(){

// }