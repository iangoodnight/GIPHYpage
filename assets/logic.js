    	// A $( document ).ready() block.
		$( document ).ready(function() {
    	console.log( "ready!" );

		// Initial array of topics
        var topics = ["Cats", "Dogs", "Babies"];

        // Function for displaying topic data
        function renderButtons() {

        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("topic btn btn-default");
          // Adding a data-attribute with a value of the movie at index i
          a.attr({
          	"data-name": topics[i],
          	"id": "thisTopic"
          });
          // Providing the button's text with a value of the movie at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#buttons").append(a);
        }
      }

            // This function handles events where one button is clicked
        $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
        console.log(topics);
        });

        // Event listener for all button elements     
        $("#buttons").on("click", function() { 
        	$("#gifs").empty();      
	        // In this case, the "this" keyword refers to the button that was clicked       
	        var searchTopic = $(this).attr("data-name");   
	        
	        console.log(searchTopic);    
	        // Constructing a URL to search Giphy for the topic     
	        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=ARKvtupwMeE1HaidGeY5hZv55QlYF5PF&limit=10";       
	        // Performing our AJAX GET request       
        	$.ajax({           
        	url: queryURL,           
        	method: "GET"         
        	})         
        	// After the data comes back from the API         
        	.done(function(response) {           
	        	// Storing an array of results in the results variable           
	        	var results = response.data;           
	        	// Looping over every result item           
	        	for (var i = 0; i < results.length; i++) {                           
	        	// Creating a div with the class "item"               
	        	var gifDiv = $("<div class='gif'>");               
	        	// Storing the result item's rating               
	        	var rating = results[i].rating;               
	        	// Creating a paragraph tag with the result item's rating               
	        	var p = $("<p>").text("Rating: " + rating);               
	        	// Creating an image tag               
	        	var gifImage = $("<img>");               
	        	// Giving the image tag an src attribute of a proprty pulled off the               
	        	// result item               
	        	gifImage.attr({
	        		"src": results[i].images.fixed_height_still.url, 
	        		"data-still": results[i].images.fixed_height_still.url,
	        		"data-animate": results[i].images.fixed_height.url,
	        		"data-state": "still",
	        		"class": "gif"
	        		});               
	        	// Appending the paragraph and personImage we created to the "gifDiv" div we created               
	        	gifDiv.append(p);               
	        	gifDiv.append(gifImage);               
	        	// Prepending the gifDiv to the "#gifs" div in the HTML               
	        	$("#gifs").prepend(gifDiv); 

	        	console.log(results);           
	        	           
        	}         
    	});     
        });

        $(".gif").on("click", function() {       
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element       
        var state = $(this).attr("data-state");       
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.       
        // Then, set the image's data-state to animate       
        // Else set src to the data-still value       
        if (state === "still") {         
        	$(this).attr("src", $(this).attr("data-animate"));         
        	$(this).attr("data-state", "animate");       
        } else {         
        	$(this).attr("src", $(this).attr("data-still"));         
        	$(this).attr("data-state", "still");       
        }     
    	});
        // Calling the renderButtons function at least once to display the initial list of topics
        renderButtons();

        });


