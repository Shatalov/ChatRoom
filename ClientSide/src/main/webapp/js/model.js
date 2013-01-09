var Events = {
    NEW_MESSAGE_IN_CHAT:'new-message-in-chat',
    POST_MESSAGE:'post-message',
    REFRESH_USER_NICKNAMES:'refresh-user-nicknames',
    ALL_ACTUAL_NICKNAMES:'all-actual-nicknames'
};

var Message = function (messageText, toAll, toUserId, userIdM) {
    this.text = messageText;
    this.toAll = toAll;
    this.toUserId = toUserId;
    this.userIdM = userIdM;
}
