
var topics = ["Bear", "Dog", "Deer", "Pig","Cat","Turtle","Bird","Mouse","Spider","Seal"];

$(document).ready(function() {
		buttonCreate();
	});


// adds animal button when submit is clicked
	$("#addAnimal").on("click", function(){
		event.preventDefault();
		$("#animalButtons").empty();
		var newAnimal = $("#animalInput").val().trim();		
		topics.push(newAnimal);
		buttonCreate();
	})

//creates the animal buttons
	function buttonCreate(){ 
		
		$("#animalButtons").empty();
		
		for (var i = 0; i < topics.length; i++){
	 
		    var b = $("<button>") 
		    b.addClass("btn btn-primary");
		    b.addClass("animal");  
		    b.attr("data-name", topics[i]);
		    b.text(topics[i]); 
		    b.click(giphy);
		    
		    $("#animalButtons").append(b); 
		}
	}
	

//plays or pauses the gif
	function playPause() {
		
		var play = ($(this).attr("is-active") === "true"),
			playURL = $(this).attr("anim-image"),
			pauseURL = $(this).attr("still-image");
		
		if (play) {
			
			$(this).attr("src", pauseURL);
			$(this).attr("is-active", false);

		} else {
			
			$(this).attr("is-active", true);
			$(this).attr("src", playURL);
		}
	}
	
//this gets the gifs from giphy
	function giphy() {
		var animalGif = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		// ajax call 
		$.ajax({url: queryURL, method: "GET"}).done(function(response) 		{
			
			$("#animals").empty();

			for (var i = 0; i < response.data.length; i++){
		   		var gif = $("<img>"),
		   			rating = $("<p>"),
		   			gifData = response.data[i];

		    	gif.addClass("giphy");  
		    	gif.attr("still-image", gifData.images.original_still.url);
		    	gif.attr("src", gifData.images.original_still.url);
		    	gif.attr("anim-image", gifData.images.original.url);
		    	gif.attr("is-active", false);
		    	gif.click(playPause);
		    	rating.text("Rating: " + gifData.rating);
		    	
		    	$("#animals").append(gif);
		    	$("#animals").append(rating); 			
		    }	
			});
	};
		