

/***
*
* When DOM is Ready then execute the following functions
*
***/

$(function(){
	// add Header html to the DOM i.e 'Oneir'
    displayHead();
	// activate the onclick event handler whenever user clicks on the login button
    session_login();
  
    // check whether the user has previously logged in, it makes an http get request to the server which checks for the session cookie
	// http get request to the server and it responds with "json"
    $.get("/php/oneir_check.php",function(data){ 
	    // if the server responds with 0 then user has not logged on.
		if(data.id==0)
		{
			// an input form for login is added to the DOM 
		      start();
		}
		else
		{
			// as user has already logged in that case , they are provided with Oneir's Telnet98 Session Menu
              login(); 
			// an user may logout from the session, this function adds a logout button to the DOM and activates onclick event handler
              logout();
			// this function activates the event handlers for menu options
              events();
			// adds user's current session id to the DOM
              display_session_name();       
		}
	},"json");
    
       
    }); 
    // end of DOM ready function


	
/***
*
* Activates the event handling for the menu options:
*  - onclick handler for: Login , Customer , Product , Inventory Management
* If event is triggered, http get request is made to the server which store the respective command to MariaDb
***/
function events()
{
	// when "Login" button is clicked
    $(document).on('click',"#login",function(e){
		         // prevent from redirecting
                 e.preventDefault();
				 // http get request to send 'login' command code
                 $.get("/php/oneir_commands.php",{q:1},function(d){});  
                 menu(); $('#menu').show();
                 $('#login').hide();
                 });
    // when "Login" button is clicked
    $(document).on('click',"#customer",function(e){
		         // prevent from redirecting
                 e.preventDefault();  
				 // http get request to send 'Customer' command code
                 $.get("/php/oneir_commands.php",{q:2},function(d){});
                 });
     // when "Login" button is clicked 
    $(document).on('click',"#product",function(e){
                 // prevent from redirecting
				 e.preventDefault();  
				 // http get request to send 'Product' command code
                 $.get("/php/oneir_commands.php",{q:3},function(d){});
                 });
     // when "Login" button is clicked
    $(document).on('click',"#imm",function(e){
                 // prevent from redirecting
				 e.preventDefault();  
				 // http get request to send 'Inventory Management' command code
                 $.get("/php/oneir_commands.php",{q:4},function(d){});
                 });
}// end of events function




/***
* 
* Add html form for session login, to the DOM
*
***/
function start()
{
	 // set html for id : 'start' in the DOM
     $("#start").html("<div class=\"input-group\"><span class=\"input-group-addon\" id=\"basic-addon1\">Email</span><input id=\"sess_login\"type=\"text\" class=\"form-control\" placeholder=\"Session Id\" aria-describedby=\"basic-addon1\"></div><div id=\"sess_button_div\"><button id=\'sess_submit\' type=\"button\" class=\"btn btn-default\">Start Session</button></div>");
}// end of start function




/***
*
* Add html to the DOM.It displays the company logo. i.e "Oneir"
* 
***/
function displayHead()
{
	 // set html for id : 'head' in the DOM
     $("#head").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\" class=\"active\"><a href=\"#\">Oneir Solutions</a></li>");
}// end of displayHead function




/***
*
* If a user has logged on, Oneir Menu is displayed
*
***/
function login()
{
	// set html for id : 'login' in the DOM
     $("#login").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\"><a id=\"login_page\" href=\"\">Login</a></li></ul>");
 
}// end of login function


/***
*
*  If a user has logged on, Oneir Menu is displayed 
*
***/
function menu()
{
     // set html for id : 'menu' in the DOM
     $("#menu").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\"><a href=\"/oneir/Product.etx\" download id=\"product\">Products</a></li><li role=\"presentation\"><a download id=\"customer\" href=\"/oneir/Customer.etx\">Customers</a></li><li role=\"presentation\"><a download id=\"imm\" href=\"/oneir/Cxustomer.etx\">Inventory Management Menu</a></li></ul>");
} // end of menu function


/***
*  Activates an event handler for session submission
*  If the event is triggered, a http get request is made to the server, which starts a "Session"
*    -and sets it to user provided id.
*    -and DOM is updated.
***/
function session_login()
{
	 // when "Login" button is clicked
      $(document).on('click',"#sess_submit",function(e){
		  // http get request to the server and it responds with "json"
           $.get("/php/oneir_session_login.php",{id:$("#sess_login").val()},function(data){
                if(data.id != 0){
                  login();
                  $("#login").show();
                  logout();
                  $('#start').hide();  
                  $('#logout_sess').show();
                  display_session_name();
                 }
           });
      });
} // end of session_login


/***
* Activates an event handler for session logout
*  If the event is triggered, a http get request is made to the server, which destroys the "Session"
*    and DOM is updated.
***/
function logout()
{       
    
    $('#logout_sess').html("<button type=\"button\" id=\'logout_sess_button\' class=\"btn btn-primary btn-lg btn-block\">Logout</button>");
	
	// when "Login" button is clicked
     $(document).on('click',"#logout_sess_button",function(e){
		 
		 // http get request to the server
         $.get("/php/oneir_logout.php");
		 
         $('#login').hide();
         $('#menu').hide();
         start();
         $('#start').show();
         $('#logout_sess').hide();
     });
} // end of logout

/***
*  Makes a http get request to the cloud and retrieves user's session id iff the has logged on.
***/
function display_session_name()
{
	// http get request to the server and it responds with "json"
   $.get("/php/oneir_session_name.php",function(data){
          if(data.id != 0){
			  // set html for id : 'logout_sess_button' in the DOM
          $('#logout_sess_button').html("<h5>Logout from Session Id:"+data.id+"</h5>");
          }
            },"json");
}// end of display_session_name

//
// END of oneir.js
//