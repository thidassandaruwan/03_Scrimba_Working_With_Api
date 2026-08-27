const todoApi = "https://apis.scrimba.com/jsonplaceholder/todos";

async function getTasks(limit){
    try{
        if (limit <= 0){
            throw Error(`Error: request data limit must be greater than 0`);
        }

        const response = await fetch(todoApi);

        if (!response.ok){
            throw Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        
        if(data.length > limit){ return data; }

        return data.slice(0, limit);    
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        return null;
    }
}

async function createTask(title) {
    try{
        if(!title){
            throw Error(`Invalid Data Error: The task need a title`);
        }

        const response = await fetch(todoApi, {
            method  : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body    : JSON.stringify({
                title,
                completed : false,
            }),
        })

        if(!response.ok){
            throw Error(`Error creating new task : ${response.status}`)
        }

        return response.json();
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        return null;
    }
}



const title = 'Finish Scrimba Full Stack Path';
console.log(await createTask(title));

// console.log(await getTasks(1));