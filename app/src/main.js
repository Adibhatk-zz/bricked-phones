var test = new XMLHttpRequest();
var query;
var text;
var token = Cookies.get('token');
var id = Cookies.get('id');
var username = Cookies.get('name');
var role;


if(token == "" || token == null){
		alert("Please login first.");
		window.location = '/';
	}


$(document).ready(function(){
	$("#user").append(Cookies.get('name'));
});

function clearCookies(){
		Cookies.remove('id');
		Cookies.remove('name');
		Cookies.remove('token');
		Cookies.remove('phone_id');
		Cookies.remove('image');
		Cookies.remove('phone');
}
		
		function logout() {
			var token = Cookies.get('token');
			test.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
					alert("Logged out.");
					clearCookies();
					window.location = "/";
				}
			};
			test.open("POST","http://auth.adibhatk.hasura.me/user/logout",true);
			test.setRequestHeader("Authorization", "Bearer " + token);
			test.send();
		}
	
		function home(){
			var req1 = new XMLHttpRequest();
			var req2 = new XMLHttpRequest();
			req1.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					text = JSON.parse(this.responseText);
					for(var i = 0;i < text.length; i++){
						if(text[i].percent == null){ text[i].percent = '--'; }
						$('#new-phones').append('<a id="' + text[i].phone_id + '" onclick="selectPhone(this.id)"><div class="img-container"><img src="' + text[i].image + '" class="image"><div class="overlay"><div class="text">'+ text[i].name +'<br><br><span class="glyphicon glyphicon-thumbs-up"></span>'+ text[i].percent + '%</div></div></div></a>');
					}
				}
			};
			query = { 
						"type":"select",
						"args":{
							"table":"phone_info",
							"columns":["phone_id","image","percent","name","released"],
							"order_by":["-released"],
							"limit":10
						}
					};
			req1.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			req1.setRequestHeader("Content-type", "application/json");
			req1.setRequestHeader("Authorization", "Bearer " + token);
			req1.send(JSON.stringify(query));
			
			req2.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					text = JSON.parse(this.responseText);
					for(var i = 0;i < text.length; i++){
						if(text[i].percent == null){ text[i].percent = '--'; }
						$('#top-phones').append('<a id="' + text[i].phone_id + '" onclick="selectPhone(this.id)"><div class="img-container"><img src="' + text[i].image + '" class="image"><div class="overlay"><div class="text">'+ text[i].name +'<br><br><span class="glyphicon glyphicon-thumbs-up"></span>'+ text[i].percent + '%</div></div></div></a>');
					}
				}
			};
			query = { 
						"type":"select",
						"args":{
							"table":"phone_info",
							"columns":["phone_id","image","percent","name","released"],
							"order_by":{
										 "column":"percent",
										 "order": "desc"
									   },
							"limit":10
						}
					};
			req2.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			req2.setRequestHeader("Content-type", "application/json");
			req2.setRequestHeader("Authorization", "Bearer " + token);
			req2.send(JSON.stringify(query));
		}
		
	function showResult(str) {
	  var req = new XMLHttpRequest();
	  
	  if (str.length==0) { 
		document.getElementById("livesearch").innerHTML="";
		document.getElementById("livesearch").style.border="0px";
		return;
	  }
	 
	  req.onreadystatechange=function() {
		if (this.readyState==4 && this.status==200) {
		  document.getElementById("livesearch").innerHTML=this.responseText;
		  document.getElementById("livesearch").style.border="1px solid #A5ACB2";
		}
	  };
	  query = { 
					"type":"select",
					"args":{
							"table":"phone",
							"columns":["name"],
							"where":{
										"name" : { "$eq" : str }
									}
						   }
			 }		
	  req.open("POST","data.adibhatk.hasura.me/v1/query",true);
	  req.setRequestHeader("Content-type", "application/json");
	  req.setRequestHeader("Authorization", "Bearer " + token);
	  req.send(JSON.stringify(query));
	}
	
		function selectPhone(id){
			Cookies.set('phone_id',id);
			window.location = '/phone_review';
		}
		
		//to display phone info and reviews
		function showPhone(id){	
			test.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					text = JSON.parse(this.responseText);
					Cookies.set('image',text[0].image);
					Cookies.set('phone',text[0].name);
					$('#header').append(text[0].name);
					$('img').attr('src',text[0].image);	
					
					text[0].percent == null? $('#percent').append("--%") : $('#percent').append(text[0].percent + "%")
					text[0].critic_rate == null? $('#avg').append("--") : $('#avg').append(text[0].critic_rate)
					text[0].total == null? $('#count').append("--") : $('#count').append(text[0].total)
					text[0].works == null? $('#work').append("--") : $('#work').append(text[0].works)
					text[0].bricked == null? $('#brick').append("--") : $('#brick').append(text[0].bricked)
					text[0].user_rate == null? $('#usr').append("--") : $('#usr').append(text[0].user_rate)
					text[0].verdict == null? $('#verdict').append("No verdict yet.") : $('#verdict').append(text[0].verdict)
					var specs = `<tr>
								<th>Released In</th>
								<td>${text[0].released}</td>
							</tr>
							<tr>
								<th>Display</th>
								<td>${text[0].display}</td>
							</tr>
							<tr>
								<th>Processor</th>
								<td>${text[0].processor}</td>
							</tr>
							<tr>
								<th>RAM</th>
								<td>${text[0].ram} GB</td>
							</tr>
							<tr>
								<th>Internal storage</th>
								<td>${text[0].internal} GB</td>
							</tr>
							<tr>
								<th>Expandable storage</th>
								<td id="ext"></td>
							</tr>
							<tr>
								<th>Camera</th>
								<td>${text[0].rear_cam}MP Rear, ${text[0].front_cam}MP Front</td>
							</tr>
							<tr>
								<th>OS</th>
								<td>${text[0].os}</td>
							</tr>
							<tr>
								<th>Connectivity</th>
								<td>${text[0].connectivity}</td>
							</tr>
							<tr>
								<th>3G/4G LTE</th>
								<td>${text[0].hspa}/${text[0].lte}</td>
							</tr>
							<tr>
								<th>Battery</th>
								<td>${text[0].battery}</td>
							</tr>
							<tr>
								<th>Other features</th>
								<td>${text[0].other}</td>
							</tr>
							<script> text[0].external == 0? $('#ext').append("No") : $('#ext').append(text[0].external + " GB");</script>`;
					$('table').append(specs);
					showReview(id);
				}
			};
			query = { 
						"type":"select",
						"args":{
							"table":"phone_info",
							"columns":["*"],
							"where":{
										"phone_id" : { "$eq" : id }
									}
						}
					};
			test.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			test.setRequestHeader("Content-type", "application/json");
			test.setRequestHeader("Authorization", "Bearer " + token);
			test.send(JSON.stringify(query));
		}
		
		function showReview(id){
			var temp;
			var req1 = new XMLHttpRequest();
			var req2 = new XMLHttpRequest();
			
			req1.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					text = JSON.parse(this.responseText);
					if(text != []){
						text = JSON.parse(this.responseText);
						for(var i=0;i<text.length;i++){
							temp = `<div class="well well-sm">
										<div class="chip">
											<div class="circle"></div>
											${text[i].username}
										</div>
										<h4><b>${text[i].title}</b></h4>
										<p>${text[i].review}</p>
										<h5><b>Rating : ${text[i].rating} / 10</h5>
									</div>`;
							$('#critic_rev').append(temp);
						}
					}
				}
			};
			query = { 
						"type":"select",
						"args":{
							"table":"phone_reviews",
							"columns":["*"],
							"where":{
										"phone_id" : { "$eq" : id },
										"role" : { "$eq" : "critic" }
									}
						}
					};
			req1.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			req1.setRequestHeader("Content-type", "application/json");
			req1.setRequestHeader("Authorization", "Bearer " + token);
			req1.send(JSON.stringify(query));
			
			req2.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					text = JSON.parse(this.responseText);
					if(text != []){
						for(var i=0;i<text.length;i++){
							temp = `<div class="well well-sm">
										<div class="chip">
											<div class="circle"></div>
											${text[i].username}
										</div>
										<h4><b>${text[i].title}</b></h4>
										<p>${text[i].review}</p>
										<h5><b>Rating : ${text[i].rating} / 10</h5>
									</div>`;
							$('#user_rev').append(temp);
						}
					}
				}
			};
			query = { 
						"type":"select",
						"args":{
							"table":"phone_reviews",
							"columns":["*"],
							"where":{
										"phone_id" : { "$eq" : id },
										"role" : { "$eq" : "user" }
									}
						}
					};
			req2.open("POST","http://data.adibhatk.hasura.me/v1/query",true);
			req2.setRequestHeader("Content-type", "application/json");
			req2.setRequestHeader("Authorization", "Bearer " + token);
			req2.send(JSON.stringify(query));
		}
		
		function writeReview(){
			var img = Cookies.get('image');
			var name = Cookies.get('phone');
			$('#phone').attr('src',img);
			$('#name').append(name);
		}
		
		function submitReview(){
		if (document.getElementById('title').value == '') { alert('Please give a title.'); return }
		if (document.getElementById('review').value == '') { alert('Write a review!'); return }
		if (document.getElementById('rating').value == 0) { alert('Give a rating!'); return }
        if (confirm("Do you want to submit your review?")){
            test.onreadystatechange=function(){
                if(test.readyState===XMLHttpRequest.DONE){

                             if(test.status===200) 
                              { 
                                if(JSON.parse(this.responseText).affected_rows == 1)
                                { 
	                                alert("Your review was successful!");
	                                window.location="/phone_review";
	                            }
	                           
                              }
                              else 
                              { 
                                console.log(this.responseText);
                                alert("You have already given review for this phone!");
                              }
                         }               

                    };    
            var title= document.getElementById("title").value;
            var review= document.getElementById("review").value;
            var r = document.getElementById("rating");
			var rating = r.options[r.selectedIndex].value;
            test.open('POST', "http://data.adibhatk.hasura.me/v1/query", true);
            test.setRequestHeader('Authorization','Bearer ' + token);    
            test.setRequestHeader('Content-type','application/json');
			query = {
						type:"insert",
						args:{
								table:"phone_review",
								objects:[
											{
												"user_id":Cookies.get('id'),			
												"title":title,
												"review":review,
												"rating":rating,
												"phone_id":Cookies.get('phone_id')	
											}
										]
							}
					}
            test.send(JSON.stringify(query));
			}
		}
       
