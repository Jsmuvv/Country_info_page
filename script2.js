pageLoader();


// Function to set all of the events
function pageLoader(){
    console.log("setting up our page...")

    // Grab the Find Brews from and a submit event, connect it to the search bar 
    let findCountriesForm = document.getElementById('country-form');
    findCountriesForm.addEventListener('submit',e => findCountries(e))
}



function findCountries(e){
    e.preventDefault(); //
    // Get the value from the city input
    // let cityName = e.target.city.value
    let cityName = document.getElementById('country-input').value
    console.log(`lookinng for for info of ${cityName}...`)

    // Create the url for getting brewery data from the city
    const url = `https://restcountries.com/v3.1/name/` + cityName 
    console.log(url);

    // Make the HTTP request to the API with the city name and log the data
    fetch(url)
        .then(res => res.json() )
        .then( data => displayCountries(data) )
        .catch(err => console.error(err) )
}


function displayCountries(data){
    let table = document.getElementById('country-info');

    table.innerHTML = '';

    const thead = document.createElement('thead');
    table.append(thead)
    const tr = document.createElement('tr')
    thead.append(tr)
    const tableHeadings = ['Countries Name',"Flag","Currency", "Capital", "Languages"]
    tableHeadings.forEach(heading => {
        let th = document.createElement('th');
        th.scope = 'col'
        th.innerHTML = heading
        tr.append(th)
    })

    let tbody = document.createElement('tbody')
    table.append(tbody)

    for (let countries of data){
        console.log(countries)
        let tr = document.createElement('tr')
        tbody.append(tr)

        newDataCell(tr,countries.name.common)
        newDataCell(tr,countries.flag)
        newDataCell(tr,Object.values(countries.currencies)[0].name)
        newDataCell(tr, countries.capital)
        newDataCell(tr,Object.values(countries.languages))
    }
}

function newDataCell(tr,value){
    let td = document.createElement('td')
    td.innerHTML = value ?? '-';
    tr.append(td)
}