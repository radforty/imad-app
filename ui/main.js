//submit Username/Password to LOGIN

var submit = document.getElementById('submit_btn');
submit.onclick=function(){
    
         //make a request to the server and send the name
    
         //capture the list of names and render it as a list
         //create a request object
         var request = new XMLHttpRequest();
    
    
        //capture the response and store it in a variable
         request.onreadystatechange=function(){
                 if (request.readyState === XMLHttpRequest.DONE){
                             //take some action
                         if(request.status === 200){
                           alert('Logged in Successfully');
                         }
                         else
                           if (request.status === 403)
                            {
                              alert('username/password is invalid');
                            }
                              else if (request.status === 500)
                             {
                               alert('username/password is invalid');
                             }
                   }
         };
         var nameInput = document.getElementById('name');
         var username = document.getElementById('username').value;
         var password = document.getElementById('password').value;
         console.log(username);
          console.log(password);
          request.open('POST', 'http://helloradhika.imad.hasura-app.io/login', true);
         request.send(JSON.stringify({username: username, password: password}));
        };