const modalWindow = document.getElementById("work");
const closeButton = document.getElementById("close-button");
const infoText = document.getElementById("info");
const recordsTable = document.getElementById("records");
const balls = document.querySelectorAll('.ball');

function getRandomSpeed(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getRandomCoordinate(canvas) {
    let x = Math.floor(Math.random() * canvas.clientWidth);
    let y = Math.floor(Math.random() * canvas.clientHeight);
    return {
        x,
        y
    };
}

function displayModalWindow() {
    modalWindow.style.display = "block";
}

closeButton.onclick = function () {
    fetchData();
    modalWindow.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalWindow) {
        fetchData();
        modalWindow.style.display = "none";
    }
}

let canvas = document.getElementById('anim');
let redBall = document.getElementById('red');
let greenBall = document.getElementById('green');
let startStopButton = document.getElementById('start-stop-button');
let reloadButton = document.getElementById('reload');
let animationId;
let isStop = false;
let recordNumber = 0;

startStopButton.addEventListener('click', () => {
    if (startStopButton.classList.contains('active')) {
        startStopButton.classList.toggle('active');
        stop();
        startStopButton.innerText = 'Start';
        makeRecord("Stopped");
        return;
    }
    startStopButton.classList.toggle('active');
    start();
    startStopButton.innerText = 'Stop'
});

function start() {
    isStop = false;
    reloadButton.disabled = true;
    startStopButton.disabled = false;
    balls.forEach(ball => {
        ball.style.display = "block";
    });

    makeRecord("Started");
    animateRedBall();
    animateGreenBall();
    reloadButton.disabled = true;
}

function stop() {
    isStop = true;
}

function reload() {
    ball.style.display = 'block';
    reloadButton.disabled = true;
    startStopButton.disabled = false;
    isStop = true;
    makeRecord("Reloaded");
    setTimeout(() => start(), 100);
}

function move(x, y, radius, speedX, speedY, ball) {
    const tempFn = () => move(x, y, radius, speedX, speedY, ball);
    if (isStop) {
        cancelAnimationFrame(tempFn);
        return;
    }

    makeRecord(`Moved ${x}, ${y}`);

    x += speedX;
    y += speedY;

    // if (redBall.x === greenBall.x && redBall.y === greenBall.y) {
    //     reloadButton.disabled = false;
    //     startStopButton.disabled = true;
    //     makeRecord("Balls collapsed");

    //     return;
    //     // stop();
    // }

    // if (x + radius > canvas.clientWidth) {
    //     reloadButton.disabled = false;
    //     startStopButton.disabled = true;

    //     ball.style.left = x + 'px';
    //     ball.style.top = y + 'px';

    //     ball.style.display = 'none';

    //     makeRecord("Balls collapsed");

    //     return;
    // }

    if (x < 0) {
        speedX = -speedX;
        makeRecord("Hit left wall");
    }
    else if (x + radius > canvas.clientWidth) {
        speedX = -speedX;
        makeRecord("Hit right wall");
    }

    if (y < 0) {
        speedY = -speedY;
        makeRecord("Hit lower wall");
    }
    else if (y + radius > canvas.clientHeight) {
        speedY = -speedY;
        makeRecord("Hit upper wall");
    }

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    animationId = requestAnimationFrame(tempFn);
}

function animateRedBall() {
    let x = 0;
    let y = getRandomCoordinate(canvas).y;
    let radius = 10;
    let speedX = getRandomSpeed(5);
    let speedY = getRandomSpeed(5);
    reloadButton.disabled = true;
    startStopButton.disabled = false;

    move(x, y, radius, speedX, speedY, redBall);
}

function animateGreenBall() {
    let x = getRandomCoordinate(canvas).x;
    let y = 0;
    let radius = 10;
    let speedX = getRandomSpeed(5);
    let speedY = getRandomSpeed(5);
    reloadButton.disabled = true;
    startStopButton.disabled = false;

    move(x, y, radius, speedX, speedY, greenBall);
}

function addRowToTable(data) {
    const tbody = recordsTable.getElementsByTagName("tbody")[0];
    const newRow = tbody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = data.id;
    cell2.innerHTML = data.timestamp;
    cell3.innerHTML = data.server_timestamp;
    cell4.innerHTML = data.content;
}

function deleteAllRows() {
    const tbody = recordsTable.getElementsByTagName("tbody")[0];

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
}

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            deleteAllRows();
            const jsonData = JSON.parse(xhr.responseText);
            if (jsonData) {
                jsonData.forEach(function (section) {
                    addRowToTable(section);
                });
            }
        }
    };
    xhr.open('GET', 'get_data.php', true);
    xhr.send();
}

function clearData() {
    const xhr = new XMLHttpRequest();
    const url = 'clear_data.php';

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                console.log('Data file cleared successfully.');
                localStorage.clear();
                deleteAllRows();
            } 
            else {
                alert(response.message);
                console.error('Failed to clear data file.');
            }
        } 
        else if (xhr.readyState === 4) {
            console.error('Failed to clear data file. Status:', xhr.status);
        }
    };

    xhr.send();
}

const getCurrentTimestamp = () => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function saveData(data, url = 'save_record.php') {
    const xhr = new XMLHttpRequest();

    // Set up the request with defaults
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Data saved successfully:', xhr.responseText);
            } else {
              console.error('Failed to save data. Status:', xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

const makeRecord = (text) => {
    timestamp = getCurrentTimestamp();
    infoText.innerText = timestamp + ' ' + text;

    const existingRecords = JSON.parse(localStorage.getItem('records')) || [];
    const record = {
        id: recordNumber,
        content: text,
        timestamp: timestamp
    };

    existingRecords.push(record);
    const updatedRecordsString = JSON.stringify(existingRecords);
    localStorage.setItem('records', updatedRecordsString);

    saveData(record);

    recordNumber += 1;
};

fetchData();