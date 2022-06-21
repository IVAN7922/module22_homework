
function pageLoaded() {
    const btnCoord = document.querySelector('.btn-coord');
    const btnSend = document.querySelector('.btn-send');
    const inputTextField = document.querySelector('input');
    const outputMesage = document.querySelector('.msg-block');

    const websocket = new WebSocket('wss://ws.ifelse.io');
    let i;

    websocket.onopen = () => {
        writeMessage("Соединение установлено", true);
        i = 0;
    }

    websocket.onclose = function () {
        writeMessage("Соединение закрыто", true);
    };

    websocket.onmessage = (event) => {
        if (i) writeMessage(event.data, true);
        i++;
    }

    websocket.onerror = () => {
        writeMessage("При передаче данных произошла ошибка", true);
    }

    btnSend.addEventListener('click', () => {
        if (!inputTextField.value) return;
        websocket.send(inputTextField.value);
        writeMessage(inputTextField.value, false);
        inputTextField.value = "";
    })

    function writeMessage(message, flag) {
        let messageText = `<div class="${flag ? "outputMessage" : "inputMessage"}"> ${message} </div>`;
        outputMesage.innerHTML += messageText;
        outputMesage.scrollTop = outputMesage.scrollHeight;
    }

    btnCoord.addEventListener('click', () => {
        const error = () => {
            writeMessage('Информация о местоположении недоступна', false);
        }
        const success = (position) => {
            const {coords} = position;
            const link = `<a href="https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=12/${coords.latitude}/${coords.longitude}" target="_blank">Вы находитесь здесь</a>`;
            writeMessage(link, false);
        }

        if (!navigator.geolocation) {
            writeMessage('Ваш браузер не поддерживает функцию определения местоположения', false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
}

document.addEventListener("DOMContentLoaded", pageLoaded);