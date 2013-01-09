package com.teamdev.students.chat.service;

import com.teamdev.students.chat.ChatContext;
import com.teamdev.students.chat.controller.dto.MessagePostRequest;
import com.teamdev.students.chat.controller.dto.MessageResponse;
import com.teamdev.students.chat.model.Color;
import com.teamdev.students.chat.model.Message;
import com.teamdev.students.chat.model.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MessageService {

    private static final Logger LOGGER = Logger.getLogger(MessageService.class);

    @Autowired
    private UtilService util;

    /**
     * Finds the message by the ID provided
     *
     * @param chatContext, the repository of current messages and user
     * @param userId       ID of the user
     * @return the message that user haven't seen yet
     */
    public MessageResponse getMessagesForUser(ChatContext chatContext, long userId) {
        LOGGER.debug("Finding the user by ID = " + userId);

        MessageResponse messResp = null;

        User user = chatContext.getUserById(userId);
        if (user != null) {
            long numberOfShownMessages = 0L;
            numberOfShownMessages = user.getNumberOfShownMessages();
            long numberOfMessages = chatContext.getNumberOfMessages();


            if (numberOfShownMessages <= numberOfMessages) {
                Message mess = chatContext.getMessageById(numberOfShownMessages);
                user.addNumberOfShownMessages();
                if (mess != null) {

                    Color postedUserColor = util.findUserColorById(chatContext, mess.getUserId());
                    String colorText = "<span style=\"color:" + postedUserColor + "\"> " + mess.getText() + "</span>";

                    if (mess.isToAll()) {
                        messResp = new MessageResponse(colorText,
                                mess.isToAll(),
                                util.findUserNameById(chatContext, mess.getUserId()), "");
                    } else {
                        messResp = new MessageResponse(colorText,
                                mess.isToAll(),
                                util.findUserNameById(chatContext, mess.getUserId()),
                                util.findUserNameById(chatContext, mess.getToUserId()));
                    }
                }

                return messResp;
            }
        }
        return null;
    }


    public void post(ChatContext chatContext, MessagePostRequest newMessage) {

        long numberOfMessages = chatContext.getNumberOfMessages();


        Message mess = new Message(
                newMessage.getText(),
                newMessage.isToAll(),
                newMessage.getToUserId(),
                numberOfMessages + 1,
                new Date(),
                newMessage.getUserIdM());

        chatContext.addMessage(mess);

        LOGGER.debug("New message has been posted: " + newMessage);
    }
}
