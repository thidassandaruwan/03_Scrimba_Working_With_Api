const imageContainer = document.querySelector(".image-container");

async function loadImage(){
    const url = "https://dog.ceo/api/breeds/image/random"

    const imageElement = document.createElement("img");
    const imageUrl = await getImage(url);
    if (imageUrl){
        console.log(imageUrl);
        
        imageElement.src =  imageUrl;
        imageContainer.appendChild(imageElement);
    }
}

async function getImage(url) {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        
        return result.message;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

loadImage();