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
                      var names = request.responseText;
                      names=JSON.parse(names);
                       var list='';
                                   for(var i=0; i<names.length; i++) {
                                   list += '<li>' + names[i] + '</li>';
                                   }
                      var ul = document.getElementById('namelist');
                       ul.innerHTML=list;
                      }
           }
         };
         var nameInput = document.getElementById('name');
         var username = getElementById('username').value;
         var password = getElementById('password').value;
          request.open('POST', 'http://helloradhika.imad.hasura-app.io/submit-name?name='+name, true);
         request.send(JSON.stringify({username: username, password: password}));
        };