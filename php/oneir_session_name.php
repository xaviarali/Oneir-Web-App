<?php
     // include the following PHP file
     require("../includes/config.php");
    
	 // create an empty object
      $x=[];
      
	  // check the session object that the user has logged on or not
      if(!isset($_SESSION["id"]) || empty($_SESSION["id"]))
      {
          $x=['id' => 0];          
      }  
      else
      {  
          $x=['id' => $_SESSION["id"]]; 
      }
	  // respond with JSON data
     print(json_encode($x, JSON_PRETTY_PRINT));
?>



