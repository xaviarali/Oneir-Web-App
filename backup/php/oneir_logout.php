<?php
     
	 // include the following PHP file
        require("../includes/config.php");
        
        // empty the "Session" object		
        $_SESSION = [];
		
        // expire cookie
        if (!empty($_COOKIE[session_name()]))
        {
            setcookie(session_name(), "", time() - 42000);
        }

        // destroy session
        session_destroy();
  ?>