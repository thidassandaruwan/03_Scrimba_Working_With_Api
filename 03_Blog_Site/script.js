const POSTS_API = "https://apis.scrimba.com/jsonplaceholder/posts";

const postsContainer = document.getElementById("article-container");
const newPostFormBtn = document.getElementById("new-post-form-btn");
const newPostBtnTxt = document.getElementById("new-post-btn-txt");
const newPostContainer = document.getElementById("form-container"); 
const newPostForm = document.getElementById("new-post-form");
const newPostStatus = document.getElementById("form-status");
const creatPostBtn = document.getElementById("submit-btn");

let posts = await getPosts(5);
renderPosts();

newPostFormBtn.addEventListener("click", toggleNewPostForm);
newPostForm.addEventListener("submit", (event) => {handleFormSubmission(event)});

function toggleNewPostForm(){
    // reset the form status
    newPostStatus.textContent = ``
    newPostStatus.className = "";

    if (newPostContainer.classList.contains("hidden")){
        newPostContainer.classList.remove("hidden"); 
        newPostBtnTxt.textContent = "Hide Form";
        return;
    }
    newPostContainer.classList.add("hidden");
    newPostBtnTxt.textContent = "New Post";
}

async function handleFormSubmission(event) {
    event.preventDefault();
    // disblae the button for multi click accidents
    creatPostBtn.textContent = "Submiting..."
    creatPostBtn.disabled = true;

    //log the data
    const formData = new FormData(newPostForm);
    const postObj = Object.fromEntries(formData);

    const articleTitle = postObj.title.trim();
    const articleContent = postObj.body.trim();

    if (!articleTitle || !articleContent){
        alert("Article must contain both a title and a body");
        return;
    }
    
    const response = await creatPost(postObj);

    // display the submission status for user
    if(!response){
        newPostStatus.textContent = `An Error occured`
        newPostStatus.classList.add("error");
        return;
    }
    newPostStatus.textContent = `Post Created Successfully!`
    newPostStatus.classList.add("success");
    
    // add the new post to post list
    posts.unshift(postObj);
    console.log(postObj);
    
    // rerender the articles/forms
    renderPosts();

    // reset the form and create post button
    newPostForm.reset();
    creatPostBtn.textContent = "Create Post"
    creatPostBtn.disabled = false;
}

async function creatPost(post) {
    try{
        const response = await fetch(POSTS_API, {
            method  : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body    : JSON.stringify(post),
        })

        if (!response.ok){
            throw Error(`ERROR Submiting Post: ${response.status}`);
        }

        return response.json();
    }
    catch(error){
        console.error(`ERROR : ${error.message}`);
        return null;
    }
}

async function getPosts(limit) {
    try{
        const response = await fetch(POSTS_API);

        if(!response.ok){
            throw Error(`ERROR : ${response.status}`);
        }

        const data = await response.json();
        
        return (data.slice(0, limit))
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}

async function renderPosts() {
    const postsHTML = posts.map((post) => {
        return `
            <article class="article">
                <h1 class="article-title">${post.title}</h1>
                <p class="article-body">${post.body}</p>
            </article> 
        `
    });

    postsContainer.innerHTML = postsHTML.join("");
}

