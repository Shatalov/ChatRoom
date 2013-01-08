console.log("Blyaaaaaa");

$(document).ready(function () {
//$(function () {

    console.log("Setting up the client-side services...");

    setInterval(onTimeOutFunction, 1000);

    function onTimeOutFunction() {
        $.getJSON(
            "/data/messages/" + UserIDT,
            function (data) {
                if (data == null) {
                } else {
                    console.log("Message processed successfully");
                    console.log("Object received: " + JSON.stringify(data));

                    var textOut = data.userNickPostedMessage + " : ";

                    if (data.toAllResp == false) {
                        textOut += data.toUserNick + " : ";
                    }
                    textOut += data.textResp;

                    var theDiv = document.getElementById("mainDivId");
                    var newNode = document.createElement('div');
                    newNode.innerHTML = textOut;
                    theDiv.appendChild( newNode )

                }
            });
    }

    var NameSpaceName = function () {

        $("#postMessageBtn").click(function () {
            var messageText = $("#messageText").val();
            var allVal = 'toAll';
            var usVal = "userId";

            if ($("#IdDefault").is(":checked")) {
                console.log("Sending to all");
                var message = {text:messageText, toAll:true, toUserId:0, userIdM:UserIDT};
            } else {

                var toUserId = $("#user_select option:selected").val();
                var message = {text:messageText, toAll:false, toUserId:toUserId, userIdM:UserIDT};
            }

            var messageString = JSON.stringify(message);

            $.ajax({
                    type:"POST",
                    url:"/data/messages/",
                    contentType:"application/json; charset=utf-8",
                    data:messageString,
                    success:function () {
                        console.log("Message has been successfully posted");
                    }

                }
            );
        });
    }();



    $("#IdUsers").change(function getUsers() {
        if ($("#IdUsers").is(":checked")) {
//
            $.getJSON(
                "/data/messages/users/" + UserIDT,
                function (usersData) {
                    if (usersData == null) {
                    } else {
                        console.log("Users received: " + JSON.stringify(usersData));
                        console.log("One User: " + usersData[0].idUser + " " + usersData[0].nickName);

                        var select = $('#user_select');
                        if (select.prop) {
                            var options = select.prop('options');
                        }
                        else {
                            var options = select.attr('options');
                        }
                        $.each(usersData, function (i) {
                            options[i] = new Option(usersData[i].nickName, usersData[i].idUser);
                        });

                    }
                });
        }
    });


});
