// $(document).ready(function() {
// This function runs when the document is ready

  // Function to populate movie list on page load
  function populateMovieList() {
    // Make a GET request to fetch movie data from JSON file
    $.get("db.json", function(data) {
      // Clear the existing movie list
      $("#films").empty();

      // Iterate through each movie in the data
      data.films.forEach(function(movie) {
        // Create a list item for the movie
        var listItem = $("<li>").addClass("film item").attr("data-id", movie.id).text(movie.title);

        // Append the list item to the movie list
        $("#films").append(listItem);
      });
    });
  }

  // Populate movie list on page load
  populateMovieList();

  // Function to handle buying tickets
  $(document).on("click", "#buy-ticket", function() {
    // Get the selected movie's ID
    var movieId = $(".film.item.selected").data("id");
    if (!movieId) {
      alert("Please select a movie.");
      return;
    }

    // Fetch the selected movie's ticket count
    $.get("/tickets", function(tickets) {
      // Find the ticket object for the selected movie
      var ticket = tickets.find(t => t.film_id === movieId);
      if (!ticket) {
        alert("Ticket information not found for this movie.");
        return;
      }

      // Check if tickets are available
      if (ticket.number_of_tickets === 0) {
        alert("Sorry, this movie is sold out.");
        return;
      }

      // Update tickets count in the database
      $.ajax({
        url: "/tickets/" + ticket.id,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({ number_of_tickets: ticket.number_of_tickets - 1 }),
        success: function(updatedTicket) {
          // Update the ticket count in the UI
          $("#ticket-counter").text(updatedTicket.number_of_tickets);
          // Update the ticket count in the database
          ticket.number_of_tickets--;

          // Check if all tickets are sold out
          if (updatedTicket.number_of_tickets === 0) {
            alert("Movie sold out.");
            // Optionally, you can update the UI to reflect the sold-out status
            $("#buy-ticket").text("Sold Out").prop("disabled", true);
          }
        },
        error: function(err) {
          console.error("Error buying ticket:", err);
          alert("An error occurred while buying the ticket.");
        }
      });
    });
  });

  // Functionality to delete a movie
  $(document).on("click", ".film.item", function() {
    var movieId = $(this).data("id");
    var listItem = $(this);
    // Send DELETE request to /films/:id
    $.ajax({
      url: "/films/" + movieId,
      type: "DELETE",
      success: function() {
        // Remove the movie from the list on the frontend
        listItem.remove();
      },
      error: function(err) {
        console.error("Error deleting movie:", err);
        alert("An error occurred while deleting the movie.");
      }
    });
  });
  $(document).on("click", ".film.item", function() {
    var movieId = $(this).data("id");
    var listItem = $(this);
    // Send DELETE request to /films/:id
    $.ajax({
      url: "/films/" ,
      type: "PATCH",
      contentType: 'application/json',
      data: JSON.stringify({key:'value'}), // JSON data to be sent to the body
      success: function(response) {
        console.log('Movie Deleted Succesfully',response);
        // Edit the movie from the list on the frontend
        
      },
      error: function(xhr ,status,error) {
        console.error("Error updating movie:", err);
        alert("An error occurred while updating the movie.");
      }
    });
  });
// });

