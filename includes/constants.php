<?php

   try
    {
     $handler= new PDO('mysql:host=localhost;dbname=oneir','oneir123','123oneircloud');
     $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
      die();
    }

?>
