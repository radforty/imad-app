console.log('Loaded!');

//Change the text of the maon text div
var element=document.getElementById('main-text');
element.innerHTML="New Value";

//move the image
var img = document.getElementById('img');
img.onclick=function()
{
    img.style.marginleft='100px';
};