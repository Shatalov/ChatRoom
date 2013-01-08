package com.teamdev.students.chat.model;


public class User {

    private long numberOfShownMessages;
    private Color userColor;
    private long idUser;
    private String nickName;


    public User(long userId, String nickName, long numberOfShownMessages, Color userColor) {
        this.idUser = userId;
        this.nickName = nickName;
        this.numberOfShownMessages = numberOfShownMessages;
        this.userColor = userColor;
    }

      public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long userId) {
        this.idUser = userId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }


    public long getNumberOfShownMessages() {
        return numberOfShownMessages;
    }

    public Color getUserColor() {
        return userColor;
    }

    public void setUserColor(Color userColor) {
        this.userColor = userColor;
    }

    public void setNumberOfShownMessages(long numberOfShownMessages) {
        this.numberOfShownMessages = numberOfShownMessages;

    }

    public void addNumberOfShownMessages() {
        numberOfShownMessages++;

    }
}
