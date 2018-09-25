var animals = [
    "dog",
    "cat",
    "lion",
    "tiger",
    "eagle",
    "elephant",
];


$(document).on("click", ".favAnimal-btn", function () {
    var shevin = $(this).attr("data-type")
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${shevin}&api_key=mNdjZUj6iyeXq2lO1Rgy7OGqScHi7hNL`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log('Response from giphy====>', response);
        var { data } = response
        console.log('data', data);

        for (var j = 0; j < data.length; j++) {

            var favAnimalDiv = $("<div>").addClass("d-inline-block");

            var r = $("<p>").text("Rating: " + data[j].rating);
            console.log(data[j].rating);

            var favAnimalImage = $("<img>");
                favAnimalImage.addClass("gif-image");
 
            favAnimalImage.attr("src", data[j].images.fixed_height_still.url);
            favAnimalImage.attr("data-still", data[j].images.fixed_height_still.url);
            favAnimalImage.attr("data-animate", data[j].images.fixed_height.url);
            favAnimalImage.attr("data-state", "still");

            favAnimalDiv.append(r);
            favAnimalDiv.append(favAnimalImage);

            $("#view-gif").prepend(favAnimalDiv);
        }
        $(".gif-image").on("click", function(){
        var state = $(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        });
    });

});



function populateButtons() {
    $("#view-button").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("favAnimal-btn");
        a.attr("data-type", animals[i])
        a.text(animals[i]);
        $("#view-button").append(a);
    }
};


$("#submit-button").on("click", function (event) {

    var usersAnimals = $("#series-input").val().trim();

    animals.push(usersAnimals);

    populateButtons();
});



populateButtons();





