const POST_API = "https://jsonplaceholder.typicode.com/posts"

async function getPostComments(postId) {
    try{
        const response = await fetch(`${POST_API}/${postId}/comments`);

        if (!response.ok){
            throw Error(`Error getting post comments : ${response.status}`);
        }

        const comments = await response.json();
        if(comments.length <= 0){
            throw Error(`Error 404: Post Id ${postId} is not valid `);
        }

        return comments;
    }
    catch (error){
        console.log(`Error : ${error.message}`);
        return null;
    }
}

const comments = await getPostComments(2);
if (comments){
    console.log(comments)
}