/**
Challenge: 

- Start building out the BoredBot Skeleton however you'd like. 
    That will include:
    - A title for the app ("BoredBot" might be a good start 😉)
    - A placeholder element that will be populated with the random 
      idea we get from the API
    - A button to click for triggering the GET request to the Bored API. 
      (Don't worry about implementing the button quite yet)
*/

//"https://apis.scrimba.com/bored/api/activity"

const appContainer = document.querySelector(".app");
const generateBtn = document.getElementById("generate-task-btn");
const titleElement = document.getElementById("title");
const ideaElement = document.getElementById("idea");
const ideaContainer = document.querySelector(".idea-container");

generateBtn.addEventListener("click", async (event) => {
    let activityObject = null
    try{
        activityObject = await getActivity();
        titleElement.textContent = activityObject.type;
        ideaElement.textContent = activityObject.activity;

        const detailHtml = [];
        for (const [key, value] of Object.entries(activityObject)){
            if (["key", "link", "price"].includes(key)){ continue; }
            detailHtml.push(`<span>${key} : ${value}</span>`);
        }

        ideaContainer.innerHTML = detailHtml.join("");
        appContainer.classList.add("fun");
    }
    catch(error){
        console.log(error.message);
       titleElement.textContent = "ERROR!";
        ideaElement.textContent = "We are out of ideas!"
        ideaContainer.innerHTML = "Something happened while fetching activities from BoredAPI";

        appContainer.classList.remove("fun");
        appContainer.classList.add("error")
    }
})

async function getActivity() {
    const boredApi = "https://apis.scrimba.com/bored/api/activity";
    const response = await fetch(boredApi);
    const data = await response.json()
    if(data.error){ 
        throw Error(`Error fetching tasks: 404`);
    };

    return data;
}