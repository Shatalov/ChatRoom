var ChatService = function (userIdTf, interval) {
    this.userIdT = userIdTf;
    this.interval = interval;
    this.getMessages();
};

ChatService.prototype.getActualNicknames = function () {

    inst = this;

    $.getJSON(
        "/data/messages/users/" + inst.userIdT,
        function (usersData) {
            if (usersData == null) {
            } else {
                var usersStr = JSON.stringify(usersData);
                console.log("Users received: " + usersStr);

                $(document).trigger(Events.ALL_ACTUAL_NICKNAMES, usersStr);
            }
        });
};

// function for getting posted messages in chat
ChatService.prototype.getMessages = function () {
    inst = this;
    setInterval(onTimeOutFunction, this.interval);

    function onTimeOutFunction() {
        $.getJSON(
            "/data/messages/" + inst.userIdT,
            function (data) {
                if (data == null) {
                } else {
                    console.log("Message processed successfully");
                    console.log("Object received: " + JSON.stringify(data));

                    var textOut = data.userNickPostedMessage + " : ";

                    if (data.toAllResp == false) {
                        textOut += data.toUserNick + " : ";
                    }

                    var parsedText = replaceSymbolsInText(data.textResp);

                    textOut += parsedText;

                    $(document).trigger(Events.NEW_MESSAGE_IN_CHAT, textOut);
                }
            });
    }
}

var RegexpPatterns = {
    bold_text: /\*\s*([^\*|\s]+)\s*\*/g,
    underlined_text: /_\s*([^_|\s]+)\s*_/g,
    strikethrough_text: /-\s*([^-|\s]+)\s*-/g,
    link_text: /\[\s*([\S].+)\!(.+)\s*\]/g
};

function replaceSymbolsInText (mess) {
    return  mess.replace(RegexpPatterns.bold_text, "<b>$1</b>").
        replace(RegexpPatterns.underlined_text, "<u>$1</u>").
        replace(RegexpPatterns.strikethrough_text, "<s>$1</s>").
        replace(RegexpPatterns.link_text, '<a href="$2">$1</a>');
 };

ChatService.prototype.postMessageOnServer = function (message) {
    message.userIdM = this.userIdT;

    var messageString = JSON.stringify(message);
    console.log("Message " + messageString);

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
};
