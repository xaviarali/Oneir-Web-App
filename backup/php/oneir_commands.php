<?php

   // include the following PHP file
     require("../includes/config.php");
   // check whether user has logged in or not & user has sent data via http-get request if not return
      if(!isset($_SESSION['id']) || empty($_SESSION['id']) || !isset($_GET['q']) || empty($_GET['q']))
      return;
    // insert into the database command with user's session id and if user has already command in DB then overwrite it
     $cmd  = $handler->prepare("INSERT INTO oneirCloud(id,command) VALUES(?,?) ON DUPLICATE KEY UPDATE command=?");
	 // execute the previous SQL statement
      $cmd->execute(array(($_SESSION['id']),$_GET['q'],$_GET['q']));
  ?>
