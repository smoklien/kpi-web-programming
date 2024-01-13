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

function createCollapsibleContent(i) {
    return `<input type="text" class="content-input" placeholder="Content for Collapsible ${i}">`;
}

function createCollapsibleButton(i) {
    const collapsible = document.createElement('button');
    collapsible.className = 'collapsible';
    collapsible.textContent = `Collapsible ${i}`;
    return collapsible;
}

function handleContentInputKeyPress(event, collapsibleIndex) {
    const target = event.target;

    if (event.key === 'Enter') {
        const contentId = `content-${collapsibleIndex}`;
        const content = document.getElementById(contentId);

        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = target.value;

        content.appendChild(newParagraph);
        target.value = '';
    }
}

function createCollapsibles(orderArray) {
    const block3 = document.getElementById('block-3');
    block3.innerHTML = '';

    for (const i of orderArray) {
        const collapsible = createCollapsibleButton(i);
        const content = document.createElement('p');
        content.className = 'content';
        content.id = `content-${i}`;
        content.innerHTML = createCollapsibleContent(i);

        const input = content.querySelector('.content-input');
        input.addEventListener('keyup', (event) => handleContentInputKeyPress(event, i));

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

        // const data = {
        //     numCollapsibles: numCollapsibles,
        //     order: orderArray
        // };

        createCollapsibles(orderArray);

        // saveDataOnServer(data);
    } else {
        numCollapsiblesInput.value = ''; // Clear the input field
        orderInput.value = ''; // Clear the order field
    }
}

function saveDataOnServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert('Data saved successfully!');
                } else {
                    alert('Error saving data: ' + response.message);
                }
            } else {
                alert('Error saving data. Please try again later.');
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

// const interval = setInterval(async () => {
//     // Get the data from the server
//     const data = await getCollapsiblesData();
    
//     // Update the collapsibles
//     createCollapsibles(data.order);
// }, 3000);    