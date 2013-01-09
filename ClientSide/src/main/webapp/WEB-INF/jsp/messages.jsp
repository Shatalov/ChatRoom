<html>
<head>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/chat.js"></script>
    <script src="js/model.js"></script>
    <script src="js/service.js"></script>
    <script src="js/view.js"></script>

</head>

<body>
<div align='center'>
    <h1>Chat</h1>

    <script language="javascript">
        var UserID = "<%= request.getAttribute("userID") %>";
    </script>

    <div id="mainDivId">
        <br><br><br>
    </div>

    <br>
    Select recipient
    <br>
    <input type="radio" name="IdRadioGroup" value="Default" id="IdDefault" checked/>To everybody
    <input type='radio' name='IdRadioGroup' value="Users" id="IdUsers"/> To receiver


    <select id="user_select" name="user_select">
    </select>

    <br>
    <br>
    <br>
    Enter you message
    <input type="text" size=60 id="messageText"/>
    <br>
    <button id="postMessageBtn">Post</button>
    <br>
</div>
</body>
</html>
