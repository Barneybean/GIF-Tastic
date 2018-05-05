$(document).ready(function () {


    var userInput;

//************* display predefined buttons */
    var predefinedBtn = ["cat","dog","pig","happy","cheer","rooster","fish","mcDanolds","thumbup","ironman","awkward","cold","hot","trending"];
    for ( var i=0; i<predefinedBtn.length; i++) {
        var showBtn = $("<button>");
        showBtn.html(predefinedBtn[i]);
        showBtn.attr("class","clickMe");
        showBtn.attr("data-name", predefinedBtn[i]);
        $("#showBtn").prepend(showBtn);
    }

//*************Create new button when submit button is clicked ***********/
    $("#submitBtn").on("click", function () {
        event.preventDefault();
        userInput = $("#input").val();

        //*****Method 1 to add button*****

        // var gifBtn = $("<button>");
        // gifBtn.html(userInput);
        // gifBtn.attr("class", "clickMe");
        // gifBtn.attr("data-name",userInput);
        // $("#showBtn").prepend(gifBtn);

        //*****Method 2 */
        predefinedBtn.push(userInput);
    });

//*************grab API when topic button is clicked **************/
    $(document).on("click", ".clickMe",function (event) {
        event.preventDefault();
        $("#showGif").empty();
        var dataName = $(this).attr("data-name");
        var giphyUrl = "http://api.giphy.com/v1/gifs/search?q="+dataName+"&api_key=o2KZbrj7FUzmnGfL1Yx5daKlI0quThpg&limit=20"
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
                var gifStill = response[a].images.fixed_height_still.url;
                var gifAnimate = response[a].images.fixed_height.url;
                var gifDiv=$("<img>");
                gifDiv.attr("src", gifStill);
                gifDiv.attr("data-still", gifStill);
                gifDiv.attr("data-animate", gifAnimate);
                gifDiv.attr("class", "gifImage");
                gifDiv.attr("data-state", "still");
                $("#showGif").append(gifDiv);
            }

            $(".gifImage").on("click", function() {
                var state = $(this).attr("data-state");
                if (state == "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
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
    })


    

})