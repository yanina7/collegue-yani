'use strict';
$(document).ready(function() {
    var config = {
      apiKey: "AIzaSyC4YzfP_Naxc6U8hhhN9gy8kIFmo0ARNZc",
      authDomain: "first-project-66342.firebaseapp.com",
      databaseURL: "https://first-project-66342.firebaseio.com",
      projectId: "first-project-66342",
      storageBucket: "first-project-66342.appspot.com",
      messagingSenderId: "526633369509"
    };
    firebase.initializeApp(config);
    /*subiendo fotos*/ 
 var fichero;
 var storageRef = firebase.storage().ref(); //firebase
 var imagenesFBRef = firebase.database().ref().child("imagenesFB"); 
 var input = $('#image_uploads'); 
 
 input.on('change',false,function() {
     updateImageDisplay(); 
  });


  function updateImageDisplay() {

   var imagenSubir = input[0].files[0];
   var curFiles = input[0].files;
   var uploadTask =  storageRef.child('imagenes/' + imagenSubir.name).put(imagenSubir);//****firebase
       
      uploadTask.on('state_changed',
          function(snapshot){

          },
          function(error){
             alert("subio con url");
          },
          function(){
             var downloadURL = uploadTask.snapshot.downloadURL;
              createNodeDB(imagenSubir.name,downloadURL);         
              });

    /*base de datos de fotos*/
     function createNodeDB(nombreImagen,downloadURL){
      imagenesFBRef.push({
        nombre:nombreImagen,     
        url:downloadURL
      }); 
     }
  }

function showimagesFB(){
     imagenesFBRef.on('value',function(snapshot){
       var datos = snapshot.val();
       var areaphotos = $('#arephotosFB');//****
       var result="";
       for(var key in datos){
            result += '<div class="galeryfb col s6 m4 l4"><img class="imgfb" draggable="true" id="' + key +'" src="'+ datos[key].url + '"/></div>';
            areaphotos.html(result); 
            areaphotos.find('img').each(function (i, item) {
              $(item).on('dragstart',function(event){        
               event.originalEvent.dataTransfer.setData('text', event.target.id);
               });      
           }); 
          // funcion drag and drop     
            let collegeimg1 = $('.collge-one');
           $.each(collegeimg1 , function(i, item) {
                  $(item).on('dragstart',function(event){
                  event.originalEvent.dataTransfer.setData('text', event.target.id);
                });    
           });   

           areaphotos.find('div').each(function (i, itemdiv) {
              $(itemdiv).on('dragover',function(event){
                   event.preventDefault();
                  });
              $(itemdiv).on('drop',function(event){        
               event.preventDefault();
                   let data = event.originalEvent.dataTransfer.getData("text");
                   event.target.append(document.getElementById(data));
               });      
          });

   
         }

     });

        
     

  }
   
   
  showimagesFB();


});
