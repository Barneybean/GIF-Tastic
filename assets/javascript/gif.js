$(document).ready(function () {


    var userInput;
    var scope;
//*************print out main page *********/
    getGif('trending');
//************* display predefined buttons ******/
    var topics = ["cat","dog","pig","happy","cheer","rooster","fish","cute","thumbup","ironman","awkward","cold","hot","trending"];
    for ( var i=0; i<topics.length; i++) {
        var showBtn = $("<button>");
        showBtn.html(topics[i]);
        showBtn.attr("class","clickMe");
        showBtn.attr("data-name", topics[i]);
        $("#showBtn").prepend(showBtn);
    }

//*************Create new button when submit button is clicked ***********/
    $("#submitBtn").on("click", function () {
        event.preventDefault();
        userInput = $("#input").val();

    //*****Method 1 to add button*****/
        // var gifBtn = $("<button>");
        // gifBtn.html(userInput);
        // gifBtn.attr("class", "clickMe");
        // gifBtn.attr("data-name",userInput);
        // $("#showBtn").prepend(gifBtn);

        //*****Method 2 */
        topics.push(userInput);
    });

//*************grab API when topic button is clicked **************/
    $(document).on("click", ".clickMe",function (event) {
        event.preventDefault();
        var dataName = $(this).attr("data-name");
        getGif(dataName);
        //pass this button to click function in getGif();
        scope=this;
    })

//********AJAX and print out searched gifs *************/
    function getGif(element) {
        $("#showGif").empty();
       
        var giphyUrl = "http://api.giphy.com/v1/gifs/search?q="+element+"&api_key=o2KZbrj7FUzmnGfL1Yx5daKlI0quThpg&limit=20"
        $("#header").empty();

        $.ajax({
            url: giphyUrl,
            method: "GET"
        }).then(function(result) {
            console.log(result)
            
            // var pageNum;
            var response = result.data;
            // var imageAnimate;
            $("#header").text("Click Image for animation");

            for (var a=0; a<response.length; a++) {
                //add gif
                var gifStill = response[a].images.fixed_height_still.url;
                var gifAnimate = response[a].images.fixed_height.url;
                var combineDiv = $("<div>");
                var gifDiv=$("<img>");
                combineDiv.attr("class","combineDiv");
                gifDiv.attr("src", gifStill);
                gifDiv.attr("data-still", gifStill);
                gifDiv.attr("data-animate", gifAnimate);
                gifDiv.attr("class", "gifImage");
                gifDiv.attr("data-state", "still");
                combineDiv.append(gifDiv)
                $("#showGif").append(combineDiv);
                //add rating 
                var ratingDiv = $("<div class='ratingDiv'>");
                ratingDiv.html("Rating: "+response[a].rating); 
                combineDiv.prepend(ratingDiv);
            }

            $(".gifImage").on("click", function() {
                var state = $(scope).attr("data-state");
                if (state == "still") {
                    $(scope).attr("src", $(scope).attr("data-animate"));
                    $(scope).attr("data-state", "animate");
                }
                else {
                    $(scope).attr("src", $(scope).attr("data-still"));
                    $(scope).attr("data-state", "still");
                }
            });
        

            //try to create page
            // for (var j=0; j<5; j++) {
            //     var pageNumBtn = $("<button>");
            //     pageNumBtn.html(j+1);
            //     pageNumBtn.attr('class','pageBtn');
            //     pageNum =j+1;
            //     var gifPageDiv= $("<div>");
            //     gifPageDiv.attr("class", pageNum); //for page click
            //     $("#header").append(pageNum+" ");
            // }
            // //show 10 gif in each page
           
            // for (e=10*(pageNum-1); e<10*(pageNum-1); e++) {
            //     var gifDiv = $("<img>");
            //     gifDiv.attr("src", response[e].images.fixed_height.url);
            //     var pageClass="'"+"."+pageNum+"'";
            //     console.log(pageClass);
            //     var page= $(pageClass).append(gifDiv);
                
            // };
            // $("#showGif").append(page);
        });
    }; 


    

})