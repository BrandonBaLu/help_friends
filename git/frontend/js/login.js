function login(){


    var email       = document.getElementById("email").value;
    var password    = document.getElementById("password").value;

    var data = {
        email: email,
        password: password
    };



    console.log(data);

    var request = new XMLHttpRequest(); 
    request.open('POST', "http://0.0.0.0:8000/login/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Authorization","Basic " + btoa(email + ":" + password));
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        
        const response  = request.responseText;
        const json      = JSON.parse(response); 
        
        const status    = request.status;
        console.log(status);
        console.log(json);

        if (request.status === 401 || request.status === 403) {
            
            Swal.fire({
                title: json.message,
                text: "por favor, verifique sus credenciales",
                type: "error"
            }).then(function() {
                window.location = "../templates/login.html";
            });
        }

        else if (request.status == 200){

            console.log("Response: " + response);
            console.log("JSON: " + json);
            console.log("Status: " + status);

            Swal.fire({
                title: json.message,
                text: "Bienvenido",
                type: "success"
            }).then(function() {
                window.location = "../templates/form.html";
            });
            
        }
            
    }
    
    request.send(JSON.stringify(data));

};
