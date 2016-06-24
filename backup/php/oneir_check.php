<?php

     // include the following PHP file
     require("../includes/config.php");
     // create an empty object and intialize it to zero
      $id = 0;
     // check whether is logged in or not  
     if(empty($_SESSION["id"]) || !isset($_SESSION["id"]))
     {
         $id = 0;
     }
     else      
	 {
         $id = 1;
     }
     // create an Associative Array and set a key/value
     $x = [ "id" => $id ];
	 // respond with JSON data
     header('Content-Type: application/json');
     print(json_encode($x, JSON_PRETTY_PRINT));
  ?>
