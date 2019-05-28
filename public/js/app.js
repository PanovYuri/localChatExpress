let messages = Array() //Список сообщений
let name = "" //Пользователь

//Обновление списка сообщений
function updateMessage(list) {
    messages = list
    let list_msg = "";
    messages.forEach(s => list_msg +=
        `<li><span ${s.name === name ? 'class="green"': ''}>${s.name}:</span> <i>${s.msg}</i></li>`)
    $("#msges").html(list_msg)
}

//Авторизация по нажатию Enter
$("#name").keydown((e) => {
    if (e.keyCode === 13) {
        sendName()
    }
})

//Авторизация
function sendName() {
    name = $("#name").val();
    $.ajax({
        url: "/auth",
        type: "GET",
        dataType: 'json',
        data: {
            names: name
        },
        success: (data) => {
            let msg_content = `
                <h1>CHAT FOR ME!!</h1>
                <label>
                    Message: <br>
                    <input type="text" id="msg">
                </label> <br>
                <button id="sender">send</button>
                <ul id="msges">
                </ul>
            `;

            //Установка контента: ввод сообщений        
            $("#content").html(msg_content);
            $("#sender").click(sendMsg);
            $("#msg").focus();
            updateMessage(data);

            //Отправка сообщений по нажатию Enter
            $("#msg").keydown((e) => {
                if (e.keyCode === 13) {
                    sendMsg()
                }
            })

            //Запрос на обновление каждые 2 секунды
            setTimeout(setMsgTimeOut, 2000);
        }
    })
}

//Обновление сообщений каждые 2 секунды
function setMsgTimeOut() {
    $.ajax({
        url: '/update',
        dataType: 'json',
        success: (data) => {
            updateMessage(data);
        }
    });
    setTimeout(setMsgTimeOut, 3000);
}

$("#auth").click(sendName)

//Отправка сообщений
function sendMsg() {
    let msgFormat = {
        'name': name,
        'msg': $("#msg").val()
    }

    //Обновить список сообщений после отправки
    $.ajax({
        url: "/rand",
        type: "GET",
        dataType: 'json',
        data: msgFormat,
        success: (data) => {
            updateMessage(data);
            $("#msg").val("")
            $("#msg").focus()
        },
        error: () => {
            console.log("Error");
        }
    })
}