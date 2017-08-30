var test = new XMLHttpRequest();
var text;
var pwd;
var cpwd;
var id = Cookies.get('id');
var username = Cookies.get('name');
var token = Cookies.get('token');
var role;

function signup() {
			username = document.getElementById("suname").value;
			pwd = document.getElementById("spwd").value;
			cpwd = document.getElementById("cpwd").value; 
			if (!pwd.match(cpwd) || cpwd == ""){
                    alert("Passwords don't match!");
                    return;
				}	
			else{
				test.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 409) {
						alert("Username already exists! Try different one.");
						return;	
					}
				if(this.readyState == 4 && this.status == 400){
						alert("Password too short! Minimum length: 8");
						return;
					}
				if(this.readyState == 4 && this.status == 200){
						text = JSON.parse(this.responseText); 
						alert("Welcome, " + username + "!");
						id = text.hasura_id;
						token = text.auth_token;
						role = text.hasura_roles[0];
						setCookies();
						register();
					}
				};
					test.open("POST","http://auth.adibhatk.hasura.me/signup", true);
					test.setRequestHeader("Content-type", "application/json");
					test.send(JSON.stringify({"username": username,"password": pwd}));
			}
				
		}
		
	
		function register(){
			query = {"type":"insert","args":{"table":"profile","objects":[{"user_id": id,"username":username,"role":role}]}};
			test.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					alert("Registered successfully.");
					window.location = "/home";
				}
			};
			test.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			test.setRequestHeader("Content-type", "application/json");
			test.setRequestHeader("Authorization", "Bearer " + token);
			test.send(JSON.stringify(query));
		}
		
		
			
		function login(){
				username = document.getElementById("luname").value;
				pwd = document.getElementById("lpwd").value;
				test.onreadystatechange = function(){
					if (this.readyState == 4 && this.status == 200) {
						alert("Welcome Back, " + username + "!");
						text = JSON.parse(this.responseText);
						token = text.auth_token;
						id = text.hasura_id;
						setCookies();
						window.location = "/home";
					}
					if (this.readyState == 4 && this.status == 403) {
						alert("Invalid credentials! Please try again.");
					}
				};
				
				test.open("POST","http://auth.adibhatk.hasura.me/login",true);
				test.setRequestHeader("Content-type","application/json");
				test.send(JSON.stringify({"username": username,"password": pwd}));
		} 
		
		function setCookies(){
			Cookies.set('name',username,{expires: 7});
			Cookies.set('id',id,{expires: 7});
			Cookies.set('token',token,{expires: 7});
		}
		