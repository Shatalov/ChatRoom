package com.teamdev.students.chat.service;

import com.teamdev.students.chat.ChatContext;
import com.teamdev.students.chat.model.Color;
import com.teamdev.students.chat.model.User;
import org.springframework.stereotype.Service;

@Service
public class UtilService {

    public String findUserNameById(ChatContext chatContext, long userId) {
        User user = chatContext.getUserById(userId);
        if (user != null) {
            return user.getNickName();
        }
        return null;
    }

    public Color findUserColorById(ChatContext chatContext, long userId) {
        User user = chatContext.getUserById(userId);
        if (user != null) {
            return user.getUserColor();
        }
        return null;
    }
}
