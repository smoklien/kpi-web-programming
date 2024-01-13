function isValidInput(numCollapsibles, order) {
    if (isNaN(numCollapsibles) || numCollapsibles <= 0) {
        alert('Please enter a valid positive number for the number of collapsibles.');
        return false;
    }

    if (!order.match(/^\d+(,\s*\d+)*$/)) {
        alert('Please enter a valid comma-separated list of numbers for the order.');
        return false;
    }

    if (order.split(',').length !== numCollapsibles) {
        alert('Order does not match the number of collapsibles.');
        return false;
    }

    return true;
}

function createButton(i) {
    const collapsible = document.createElement('button');
    collapsible.className = 'collapsible';
    collapsible.textContent = `Collapsible ${i}`;
    return collapsible;
}

function createContent(event, collapsibleIndex) {
    const target = event.target;

    if (event.key === 'Enter') {
        const contentId = `content-${collapsibleIndex}`;
        const content = document.getElementById(contentId);

        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = target.value;

        content.appendChild(newParagraph);
        target.value = '';

        const contentData = {
            collapsibleIndex: collapsibleIndex,
            textContent: newParagraph.innerHTML
        };

        saveDataOnServer(contentData);
    }
}

function createCollapsibles(orderArray) {
    const block3 = document.getElementById('block-3');
    block3.innerHTML = '';

    for (const i of orderArray) {
        const collapsible = createButton(i);
        const content = document.createElement('p');
        content.className = 'content';
        content.id = `content-${i}`;
        content.innerHTML = `<input type="text" class="content-input" placeholder="Content for Collapsible ${i}">`;

        const input = content.querySelector('.content-input');
        input.addEventListener('keyup', (event) => createContent(event, i));

        block3.appendChild(collapsible);
        block3.appendChild(content);
    }

    // Event delegation for collapsible buttons
    block3.addEventListener('click', function (event) {
        if (event.target.classList.contains('collapsible')) {
            event.target.classList.toggle('active');
            const content = event.target.nextElementSibling;
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        }
    });
}

function createCollapsiblesHandler() {
    const numCollapsiblesInput = document.getElementById('numCollapsibles');
    const orderInput = document.getElementById('collapsibleOrder');

    const numCollapsibles = parseInt(numCollapsiblesInput.value);
    const order = orderInput.value;

    if (isValidInput(numCollapsibles, order)) {
        const orderArray = order.split(',').map(item => parseInt(item.trim()));
        
        createCollapsibles(orderArray);

        const data = {
            numCollapsibles: numCollapsibles,
            orderArray: orderArray
        };

        saveDataOnServer(data);
    } else {
        numCollapsiblesInput.value = '';
        orderInput.value = '';
    }
}

function saveDataOnServer(data) {
    const xhr = new XMLHttpRequest();
    const url = 'save_data.php';

    // Set up the request
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Data saved successfully:', xhr.responseText);
        } 
        else if (xhr.readyState === 4) {
            console.error('Failed to save data. Status:', xhr.status);
        }
    };

    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}

function clearDataFile() {
    const xhr = new XMLHttpRequest();
    const url = 'clear_data.php';

    console.log('clearDataFile function called');

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                console.log('Data file cleared successfully.');
            } 
            else {
                console.error('Failed to clear data file.');
            }
        } 
        else if (xhr.readyState === 4) {
            console.error('Failed to clear data file. Status:', xhr.status);
        }
    };

    xhr.send();
}

// const interval = setInterval(async () => {
//     // Get the data from the server
//     const data = await getCollapsiblesData();
    
//     // Update the collapsibles
//     createCollapsibles(data.order);
// }, 3000);    