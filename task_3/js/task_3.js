const btn = document.querySelector('button');
const coordTextField = document.querySelector('#status');

const error = () => {
    coordTextField.textContent = 'Информация о местоположении недоступна';
}
const success = (position) => {
    const {coords} = position;
    coordTextField.innerText = `широта: ${coords.latitude} °, долгота: ${coords.longitude} °`;
}

btn.addEventListener('click', () => {
    document.querySelector('#width').innerText = `Ширина экрана: ${screen.width}`;
    document.querySelector('#height').innerText = `Высота экрана: ${screen.height}`;

    if (!navigator.geolocation) {
        coordTextField.innerText = 'Информация о местоположении недоступна';
    } else {
        coordTextField.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
})