
$(document).ready(function () {

   


    var API = {
        getArticles: function () {
            return $.ajax({
                url: "api/articles",
                type: "GET"
            });
        },
        getComments: function () {
            return $.ajax({
                url: "api/comments",
                type: "GET"
            });
        },
        postComments: function (data) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/comments",
                data: JSON.stringify(data)
            });
        }

    };


    

    var displayArticles = function () {
        API.getArticles().then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#articles").append("<h3 class='title' data-id='" + data[i]._id + "'>" + data[i].summary + "</h3><p class='summary'>" + data[i].title + "</p> <a href='" + data[i].link + "'target='blank' >'" + data[i].title + "</a>");
            }
        });

    };


    var showComments = function () {
        API.getComments().then(function (data) {

            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#commentList").append("<li class='userName'>" + data[i].userName + "'</li>" + '\n' + "<li class='comment'>" + data[i].comment + "'</li>");
            }
        });

    };



    var saveComments = function (){
        event.preventDefault();
        var userComments = {
            userName: $("#userName").text(),
            comment: $("#textArea").text()

        }

        API.postComments(userComments).then(function (){
            

        });
        $("#userName").val();
        $("#textArea").val();
    }



    $("#commentSubmit").on("click", showComments);
    showComments();
    displayArticles();

});




