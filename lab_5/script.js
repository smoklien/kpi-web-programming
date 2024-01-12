// Task #1

// Function to swap the content of top and botton blocks
const onClickSwapContent = () => {
    const topElement = document.getElementById('top');
    const bottomElement = document.getElementById('bottom');

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
    console.log("Page loaded, event listener executed.");

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

