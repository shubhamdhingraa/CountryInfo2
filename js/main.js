$(document).ready(() => {
  //Getting values from form
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getCountries(searchText);
    e.preventDefault();
  });
});

//Get Request via Fetch API
function getCountries(searchText){
  axios.get('https://restcountries.eu/rest/v2/name/'+searchText)
    .then((response) => {
      console.log(response.status);
      
      // In case of 404 status, alert will be shown to user
      if(response.status==404)
        window.location='index.html';
      let countries = response.data;
      let output = '';
      
      // Storing details in session storage
      sessionStorage.setItem('data', JSON.stringify(countries));
      sessionStorage.setItem('lastSearch', JSON.stringify(searchText));
      $.each(countries, (index, country) => {
        output += `
          <div class="col-md-4">
          
            <div class="well text-center">
            
              <img src="${country.flag}" style="width:50%" height:"50%">
              <h6>${country.name}</h6>
              
              <a onclick="showDetails('${index}')" class="btn btn-primary" href="#">More details</a>
            </div>
          </div>
        `;
      });
      // Flags are output to the page
      $('#countries').html(output);
    })
    // Catching in case of error
    .catch((err) => {
      console.log(err);
    });
}


function showDetails(index){
  sessionStorage.setItem('index', JSON.stringify(index));
  window.location = 'details.html';
  return false;
}

// Getting details of the country which user clicks
function getDetails()
{
        // Getting data from session storage and output to the details page
        let country = JSON.parse(sessionStorage.getItem('data'));
        let index= sessionStorage.getItem('index');
        console.log(country)
        console.log(index)

        
        ind='';
        // String formatting
        for(var i =0;i<index.length;i++)
        {
            if(index[i]!='"')
                ind+=index[i]
        }
        
        console.log(country[ind].name);
        output='';
        output+=`
        <div class="row">
            <div class="column">
                
                <div class="card">
                <div class="container">
                    <img src="${country[ind].flag}" alt="Avatar" style="width:75%">
                    <h3><b>Country: ${country[ind].name}</b></h3> 
                    <h5>Capital: ${country[ind].capital}</h5>    
                </div>
                </div>
                
            </div>
            <div class="column">

                <div class="container">
                    <h4 align="center"><b>All details</b></h4> 
                    <p align="left">Native Name: ${country[ind].nativeName}</p>
                    <p align="left">Population: ${country[ind].population}</p>
                    <p align="left">Region: ${country[ind].region}</p>
                    <p align="left">Subregion: ${country[ind].subregion}</p>
                    <p align="left">Cioc: ${country[ind].cioc}</p>
                    <p align="left">Gini Index: ${country[ind].alpha2Code}</p>
                    <p align="left">Alpha2 Code: ${country[ind].alpha3Code}</p>
                    <p align="left">Area Code: ${country[ind].area}</p>
                    <p align="left">Numeric Code: ${country[ind].numericCode}</p>
                    <br>
                    <a href="javascript:history.back()" onclick=hideDetails()><i align="left">Please click here to go back.</i></a>
                </div>

            </div>
        </div>

        <br>`;
        $('#countries').html(output);
}

function hideDetails()
{
    return false;
}

function goBack(){

  let flag = JSON.parse(sessionStorage.getItem('goBack'));

  let data = JSON.parse(sessionStorage.getItem('data'));
  let countries=data;

  let output = '';
  // get data from session storage
  sessionStorage.setItem('data', JSON.stringify(countries));
  sessionStorage.setItem('lastSearch', JSON.stringify(searchText));
  $.each(countries, (index, country) => {
    output += `
      <div class="col-md-4">
      
        <div class="well text-center">
        
          <img src="${country.flag}" style="width:50%" height:"50%">
          <h6>${country.name}</h6>
          
          <a onclick="showDetails('${index}')" class="btn btn-primary" href="#">More details</a>
        </div>
      </div>
    `;
  });
  // Output existing details in index.html page
  $('#countries').html(output);
}


