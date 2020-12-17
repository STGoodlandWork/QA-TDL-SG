let x = prompt ("Enter Sold/Available/pending");
console.log(x);
//const x = sold;
getOne(x); 

function getOne(id){

    fetch('https://petstore.swagger.io/v2/pet/findByStatus?status='+id)
      .then(
        function(response) {
            //if the status code is not 200
          if (response.status !== 200) {
              //print to console plus status code
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
              alert("pet not found");
            return;
          }
          //examine text in respone 
          response.json().then(function(data) {
              console.log(data);
          for (let i=0; i<data.length; i++){
              console.log("id", data[i].id);
              console.log("title", data[i].name);
              console.log("photo url", data[i].photoUrls);
              console.log("Status", data[i].status);

    
              let para = document.createElement("P");
              para.className ="data alert alert-danger col-md-8",
              para.innerText = `ID : \n${data[i].id}` + ` \nNAME : \n${data[i].name}` + ` \nPHOTOURL : \n${data[i].photoUrls}` + ` \nSTATUS : \n${data[i].status}`
              
              let myDiv = document.getElementById("myDiv");
              myDiv.appendChild(para);
            };
     
        
        
          // Examine the text in the response
    /*       response.json().then(function(data) {
            console.log(data); */
          });
        }
        )
      //only gonna execute if there is a fetch error
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }

    //}