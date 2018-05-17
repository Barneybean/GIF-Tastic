$(document).ready(function () {

    var topics = ["cat","dog","bowing","happy","cheer","rooster","fish","cute","thumbup","ironman","welcome","cold","hot","trending"];
    var userInput;
    var dataName;
    var isBtnClicked;
    var gifLimit;
//*************print out main page *********/
    function homePage() {
        gifLimit = 10;
        getGif('trending');
        isBtnClicked=false;
    }
    
    homePage();

//************* display topic buttons ******/
    
    for ( var i=0; i<topics.length; i++) {
        var showBtn = $("<button>");
        showBtn.html(topics[i]);
        showBtn.attr("class","clickMe");
        showBtn.attr("data-name", topics[i]);
        $("#showBtn").prepend(showBtn);
}    
//*********switch between still image and animate image *****/
    $(document).on("click", ".gifImage", function() {
        var state = $(this).attr("data-state");
        console.log(this);
        
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

//*************Create new button when submit button is clicked ***********/
    $("#submitBtn").on("click", function () {
        event.preventDefault();
        userInput = $("#input").val();

    //*****Method 1 to add button*****/
        var gifBtn = $("<button>");
        gifBtn.html(userInput);
        gifBtn.attr("class", "clickMe");
        gifBtn.attr("data-name",userInput);
        $("#showBtn").prepend(gifBtn);
        userInput = $("#input").val("");
        // //*****Method 2 */
        // topics.push(userInput);
        // console.log(topics);
    });

//*************grab API when topic button is clicked **************/
    $(document).on("click", ".clickMe",function (event) {
        event.preventDefault();
        gifLimit=10;
        dataName = $(this).attr("data-name");
        console.log(gifLimit);
        //pass this button to click function in getGif
        getGif(dataName);
        console.log(gifLimit);
        isBtnClicked=true;
        
    })

// *************Allow user request 10 more gif*******/
    $(document).on("click", "#moreGif", function() {
        gifLimit += 10;
        // console.log(gifLimit);
        if(isBtnClicked) {
            getGif(dataName);
        }
        else {
            getGif("trending");
        }
    });
    
    
//********AJAX and print out searched gifs *************/
    function getGif(element) {
        $("#showGif").empty();
        console.log(gifLimit);
        var giphyUrl = "https://api.giphy.com/v1/gifs/search?q="+element+"&api_key=o2KZbrj7FUzmnGfL1Yx5daKlI0quThpg&limit="+gifLimit
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
                $("#showGif").prepend(combineDiv);
                //add rating and title
                var ratingDiv = $("<div class='ratingDiv'>");
                // var titleDiv = $("<div class='ratingDiv' id='title'>");
                // ratingDiv.append("Title: "+response[a].title+"<br>"); 
                ratingDiv.append("Rating: "+response[a].rating); 
                combineDiv.prepend(ratingDiv);
            }
           

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

    // When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
document.getElementById("topBtn").addEventListener("click",function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
    

})

