var TimeOut = {INTERVAL_FOR_REQUEST:1000}

$(document).ready(function () {
    console.log("Setting up the client-side ...");

    var service = new ChatService(UserID, TimeOut.INTERVAL_FOR_REQUEST);

    var view = new ChatView("mainDivId", "IdDefault",
        "IdUsers", "user_select", "messageText", "postMessageBtn");

    $(document).bind(Events.ALL_ACTUAL_NICKNAMES, function (ev, data) {
        view.renderAllNicknames(data);
    });
    $(document).bind(Events.NEW_MESSAGE_IN_CHAT, function (ev, data) {
        view.renderNewMessageInChat(data);
    });
    $(document).bind(Events.REFRESH_USER_NICKNAMES, function (ev) {
        service.getActualNicknames();
    });
    $(document).bind(Events.POST_MESSAGE, function (ev, data) {
        service.postMessageOnServer(data);
    });

});


