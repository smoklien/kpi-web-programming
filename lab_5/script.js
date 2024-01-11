// Task 1
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

 // Task 2
 // Function to calculate the area of a triangle
const calculateTriangleArea = (base, height) => {
    return 0.5 * base * height;
}

// Function to display results
const onClickDisplayResults = () => {
    const baseValue = document.getElementById('inputTriangleBase').value;
    const heightValue = document.getElementById('inputTriangleHeight').value;
    const resultDiv = document.querySelector('.resultTriangleText');
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