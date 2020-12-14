let x = prompt ("value between 1-100");
console.log(x);
//const x = 9;
getOne(x); 

function getOne(id){

    fetch('https://petstore.swagger.io/v2/pet/'+id)
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
          //for (let i=0; i<data.length; i++){
              console.log("id", data.id);
              console.log("title", data.name);
              console.log("photo url", data.photoUrls);
              console.log("Status", data.status);

    
              let para = document.createElement("P");
              para.className ="data alert alert-danger col-md-8",
              para.innerText = `ID : \n${data.id}` + ` \nNAME : \n${data.name}` + ` \nPHOTOURL : \n${data.photoUrls}` + ` \nSTATUS : \n${data.status}`
              
              let myDiv = document.getElementById("myDiv");
              myDiv.appendChild(para);
            //};
     
        
        
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