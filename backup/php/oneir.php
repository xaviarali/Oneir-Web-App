<?php

  // include the following PHP file
     require("../includes/config.php");
     
  // check whether user has sent data with http-get request
    if(!isset($_GET['q']) || empty($_GET['q'])) return;
	
  // use Php PDO class to make query to the MariaDB
  // query command for current logged in user
    $cmd = $handler->prepare("SELECT command FROM oneirCloud WHERE id=?");

  // if enable to query or query fails return
     if(!($cmd->execute(array($_GET['q']))))
     {
         return;
     }
  // fetch all data into Associative Array form
      $c = $cmd->fetchAll(PDO::FETCH_ASSOC);
  // delete commands from the DB for current user
      $del = $handler->prepare("DELETE FROM oneirCloud WHERE id=?");
  // execute query
      $del->execute(array($_GET['q']));
   // repsond with JSON data
      print(json_encode($c, JSON_PRETTY_PRINT));
?>
