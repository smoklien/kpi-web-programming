// Task #1

// Function to swap the content of top and botton blocks
const onClickSwapContent = () => {
    const topElement = document.getElementById('block-4');
    const bottomElement = document.getElementById('block-5');

     // Log a message or the values before swapping
     console.log('Before Swap:', topElement.innerHTML, bottomElement.innerHTML);

     // Swap the HTML content
     [topElement.innerHTML, bottomElement.innerHTML] = [bottomElement.innerHTML, topElement.innerHTML];
 
     // Log a message or the values after swapping
     console.log('After Swap:', topElement.innerHTML, bottomElement.innerHTML);
 }
 
// Task #2

// Function to calculate the area of a triangle
const calculateTriangleArea = (base, height) => {
    return 0.5 * base * height;
}

// Function to display results
const onClickDisplayResults = () => {
    const baseValue = document.getElementById('base').value;
    const heightValue = document.getElementById('height').value;
    const resultDiv = document.getElementById('triangle-result');
    const resultParagraph = document.createElement('p');

    // Clear previous results
    resultDiv.innerHTML = '';

    if (!isNaN(baseValue) && !isNaN(heightValue) && parseFloat(baseValue) > 0 && parseFloat(heightValue) > 0) {
        const area = calculateTriangleArea(parseFloat(baseValue), parseFloat(heightValue));
        resultParagraph.textContent = `The area of the triangle is: ${area}`;
    }
    else {
        resultParagraph.textContent = 'Please, enter valid numbers ^~^ !!!';
    }

    resultDiv.appendChild(resultParagraph);
}

// Task #3

// Function to count the number of minimum values
const countMinNumbers = () => {
    const input = document.getElementById('number-input').value;
    const numbers = input.split(',').map(Number);

    if (numbers.length === 10 && numbers.every(Number.isFinite)) {
        const minNumber = Math.min(...numbers);
        const countMin = numbers.filter(num => num === minNumber).length;

        // Display result using a dialog window
        const resultMessage = `The minimum number is ${minNumber}, and it appears ${countMin} time(s).`;
        alert(resultMessage);

        // Save result to cookies
        const expiryDate = new Date('Fri, 31 Dec 2024 23:59:59 GMT');
        document.cookie = `minNumbers=${countMin}; expires=${expiryDate.toUTCString()}; path=/; SameSite=None; Secure`;

        console.log("Cookie set:", document.cookie);
    } 
    else {
        alert("Please enter 10 numbers separated by commas.");
    }
}

// Clear all inputs
function clearFormInputs() {
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        if (input.type !== 'button' && input.type !== 'submit' && input.type !== 'reset') {
            input.value = '';
        }
    });
}

// Display information from cookies on page load
window.addEventListener('load', () => {
    console.log("Page loaded, event listener #1 executed.");

    const cookies = document.cookie;

    if (cookies.includes('minNumbers')){
        const minNumbers = parseInt(cookies.split('; ').find(row => row.startsWith('minNumbers')).split('=')[1]);
        const confirmDelete = confirm(`Information from cookies: ${minNumbers}\n\nPress OK to delete the cookie data.`);
        
        if (confirmDelete) {
            const expiryDate = new Date('Fri, 31 Dec 2023 23:59:59 GMT');
            document.cookie = `minNumbers=; expires=${expiryDate.toUTCString()}; path=/; SameSite=None; Secure`;

            clearFormInputs();

            alert("Cookies have been deleted.");

            location.reload();
        }
    }
});

// Task #4

// Function to change background color on load event
window.addEventListener('load', () => {
    console.log("Page loaded, event listener #2 executed.");

    const mainBlock = document.querySelector('main');
    //const inputColor = document.querySelector('#input-color');
    const savedColor = localStorage.getItem('textColor');
    
    mainBlock.style.backgroundColor = savedColor || 'rgb(255, 247, 219)';
    //inputColor.value = savedColor
});

// Function to change background color and save it to localStorage
const changeBackgroundColor = () => {
    const mainBlock = document.querySelector('main');
    const newColor = prompt('Enter a new text color:');
    
    // Check if the user entered a valid color
    if (newColor !== null && newColor.trim() !== '') {
        mainBlock.style.backgroundColor = newColor;
        
        // Save the new color to localStorage
        localStorage.setItem('textColor', newColor);
    }
}

// Task #5

 // Function to create an unordered list
 const createUnorderedList = (blockId) => {
    const block = document.getElementById(blockId);
    const listItemsString = prompt(`Enter unordered list items (comma-separated) for ${blockId}:`);
    
    // Check if the user entered items
    if (listItemsString !== null && listItemsString.trim() !== '') {
        // Split the items and create an unordered list
        const listItems = listItemsString.split(',').map(item => item.trim());
        const ul = document.createElement('ul');
        
        // Add list items to the unordered list
        listItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });

        block.appendChild(ul);
    }
}

// Function to save the list to localStorage
const saveListToLocalStorage = () => {
    const listContents = {};

    // Iterate through each block and save its list items
    ['block-1', 'block-2', 'block-3', 'block-4', 'block-5', 'block-6'].forEach(blockId => {
        const block = document.getElementById(blockId);
        const ul = block.querySelector('ul');

        // If the block has an unordered list, save its items
        if (ul) {
            const listItems = Array.from(ul.getElementsByTagName('li')).map(li => li.textContent);
            listContents[blockId] = listItems;

            //Replace the content of the block with the unordered list
            block.innerHTML = '';
            block.appendChild(ul);
        }
    });

    // Save the list contents to localStorage
    localStorage.setItem('unorderedListContents', JSON.stringify(listContents));
    alert('List contents saved to LocalStorage.');
}

// Delete unordered list of contents when refreshing page
window.addEventListener('load', () => {
    localStorage.removeItem('unorderedListContents');
})