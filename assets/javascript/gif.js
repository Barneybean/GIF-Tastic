$(document).ready(function () {


    var userInput;

//************* display predefined buttons */
    var predefinedBtn = ["cat","dog","pig","happy","cheer","rooster","fish","mcDanolds","thumbup","ironman","awkward","cold","hot","trending"];
    for ( var i=0; i<predefinedBtn.length; i++) {
        var showBtn = $("<button>");
        showBtn.html(predefinedBtn[i]);
        showBtn.attr("class","clickMe");
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
        var dataName = $(this).attr("data-name");
        var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + dataName + "&api_key=o2KZbrj7FUzmnGfL1Yx5daKlI0quThpg&limit=20"
        $("#header").empty();

        $.ajax({
            url: giphyUrl,
            method: "GET"
        }).then(function(result) {
            console.log(result)
            
            // var pageNum;
            var response = result.data;
            // var imageAnimate;
            console.log(response.length);
            
            

















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