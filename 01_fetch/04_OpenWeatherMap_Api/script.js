const openWhetherApi = "https://apis.scrimba.com/openweathermap/data/2.5/weather";

async function getWeather(lat, lon) {
    try{
        const response = await fetch(`${openWhetherApi}?lat=${lat}&lon=${lon}&units=metric`);

        const data = await response.json();
        if(!response.ok){
            throw Error(`Error retriving whether data : ${response.status} \n${data.message}`);
        }

        return data;
    }
    catch (error){
        console.log(`Error : ${error.message}`);
        return null;
    }
}

async function main(){
	const lat = 10.99, lon = 44.34;
	const data = await getWeather(lat, lon);
	console.log(data)
}

main()