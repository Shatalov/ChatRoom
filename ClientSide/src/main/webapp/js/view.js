var ChatView = function (mainDivChatId, radioBtnIdToAll, radioBtnIdToUser, selectIdUsers, messageTextId, postMessageBtnId) {
    this.mainDivChatId = mainDivChatId;
    this.radioBtnIdToAll = radioBtnIdToAll;
    this.radioBtnIdToUser = radioBtnIdToUser;
    this.selectIdUsers = selectIdUsers;
    this.messageTextId = messageTextId;
    this.postMessageBtnId = postMessageBtnId;
    instance = this;

    $("#" + this.radioBtnIdToUser).change(function getUsers() {
        if ($("#" + instance.radioBtnIdToUser).is(":checked")) {

            console.log("User clicked radio button");

            $(document).trigger(Events.REFRESH_USER_NICKNAMES);
        }
    });

    $("#" + this.postMessageBtnId).click(function () {

        console.log("Posting button clicked ");
        instance.postingMessage();
    });

};
ChatView.prototype.renderNewMessageInChat = function (textOut) {

    var theDiv = $("#" + this.mainDivChatId);
    var newNode = document.createElement('div');
    newNode.innerHTML = textOut;
    theDiv.append(newNode);

};

ChatView.prototype.renderAllNicknames = function (usersDatat) {
    var usersData = JSON.parse(usersDatat);

    var select = $("#" + this.selectIdUsers);
    if (select.prop) {
        var options = select.prop('options');
    }
    else {
        var options = select.attr('options');
    }
    $.each(usersData, function (i) {
        options[i] = new Option(usersData[i].nickName, usersData[i].idUser);
    });
};

ChatView.prototype.postingMessage = function () {
    var messageText = $("#" + this.messageTextId).val();
    var message;

    if ($("#" + this.radioBtnIdToAll).is(":checked")) {
        console.log("Sending to all");
        message = new Message(messageText, true, 0, 0);
    }
    else {
        var toUserId = $("#" + this.selectIdUsers + " option:selected").val();
        message = new Message(messageText, false, toUserId, 0);
    }
    $(document).trigger(Events.POST_MESSAGE, message);
};