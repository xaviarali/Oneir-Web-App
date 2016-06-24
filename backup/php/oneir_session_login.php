<?php
     // include the following PHP file
     require("../includes/config.php");
    
	 // create an object and intialize it to 0.
      $id = 0;
	  
	 // check that user has sent data with http-get request
      if( !isset( $_GET["id"] ) || empty( $_GET["id"]) )
      {
          $id=0;
      }  
      else
      {  
         // user has sent data , set id object to 1 
          $id = 1;
		 // save data to session object
          $_SESSION["id"] = $_GET["id"];      
      }
   
    // respond with JSON data
      $x = ["id"=>$id];
     header('Content-Type: application/json');
     print(json_encode($x, JSON_PRETTY_PRINT));

?>



