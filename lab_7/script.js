const modalWindow = document.getElementById("work");
const closeButton = document.getElementById("close-button");
const infoText = document.getElementById("info");
const recordsTable = document.getElementById("records");
const balls = document.querySelectorAll('.ball');

function getRandomSpeed(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getRandomCoordinate(canvas, radius = 10) {
    let x = Math.floor(Math.random() * (canvas.clientWidth - 2 * radius));
    let y = Math.floor(Math.random() * (canvas.clientHeight - 2 * radius));
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
let collisionDetected = false;

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
    collisionDetected = false;
    reloadButton.disabled = true;
    reloadButton.style.display = 'none';
    startStopButton.disabled = false;
    balls.forEach(ball => {
        ball.style.display = 'block';
    });

    makeRecord("Started");
    animateBalls();

}

function stop() {
    isStop = true;
}

function reload() {
    // ball.style.display = 'block';
    reloadButton.disabled = true;
    reloadButton.style.display = 'none';
    startStopButton.disabled = false;
    startStopButton.style = 'inline';
    isStop = true;
    makeRecord("Reloaded");
    setTimeout(() => start(), 100);
}

function ballsCollide(ball1, ball2) {
    const dx = ball1.offsetLeft + ball1.offsetWidth / 2 - (ball2.offsetLeft + ball2.offsetWidth / 2);
    const dy = ball1.offsetTop + ball1.offsetHeight / 2 - (ball2.offsetTop + ball2.offsetHeight / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const combinedRadii = ball1.offsetWidth / 2 + ball2.offsetWidth / 2;
  
    return distance < combinedRadii;
  }
  
function move(x, y, radius, speedX, speedY, ball) {
    const tempFn = () => move(x, y, radius, speedX, speedY, ball);
    let ballColor = (ball === redBall) ? 'red' : 'green';
    
    if (isStop || collisionDetected) {
        cancelAnimationFrame(tempFn);
        return;
    }

    // makeRecord(`Moved ${x}, ${y}`);

    x += speedX;
    y += speedY;


    if (x < 0) {
        speedX = -speedX;
        makeRecord(`${ballColor} ball hit left wall`);
    }
    else if (x + 2 * radius > canvas.clientWidth) {
        speedX = -speedX;
        makeRecord(`${ballColor} ball hit right wall`);
    }

    if (y < 0) {
        speedY = -speedY;
        makeRecord(`${ballColor} ball hit upper wall`);
    }
    else if (y + 2 * radius > canvas.clientHeight) {
        speedY = -speedY;
        makeRecord(`${ballColor} ball hit lower wall`);
    }

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    if (ballsCollide(redBall, greenBall) && !collisionDetected){
        collisionDetected = true;
        reloadButton.disabled = false;
        reloadButton.style.display = 'inline';
        startStopButton.disabled = true;
        startStopButton.style.display = 'none';
        makeRecord("Balls collided");

        return;
        // stop();
    }


    animationId = requestAnimationFrame(tempFn);
}

function animateBalls() {
    reloadButton.disabled = true;
    reloadButton.style.display = 'none';
    startStopButton.disabled = false;

    animateRedBall();
    animateGreenBall();
}

function animateRedBall(radius = 10) {
    let x = 0;
    let y = getRandomCoordinate(canvas).y;
    let speedX = getRandomSpeed(5);
    let speedY = getRandomSpeed(5);

    move(x, y, radius, speedX, speedY, redBall);
}

function animateGreenBall(radius = 10) {
    let x = getRandomCoordinate(canvas).x;
    let y = 0;
    let speedX = getRandomSpeed(5);
    let speedY = getRandomSpeed(5);

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
    xhr.open('GET', 'fetch_data.php', true);
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