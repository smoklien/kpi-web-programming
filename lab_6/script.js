function createCollapsibles() {
    const numCollapsibles = document.getElementById('numCollapsibles').value;
    const block3 = document.getElementById('block-3');

    // Clear existing content
    block3.innerHTML = '';

    for (let i = 1; i <= numCollapsibles; i++) {
        const collapsible = document.createElement('button');
        collapsible.className = 'collapsible';
        collapsible.textContent = `Collapsible ${i}`;
        //collapsible.innerHTML += '<input type="text" placeholder="Enter content">';

        collapsible.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });

        const content = document.createElement('p');
        content.className = 'content';
        content.innerHTML = `<input type="text" class="content-input" placeholder="Content for Collapsible ${i}">`;
        //content.textContent = `Content for Collapsible ${i}`;

        block3.appendChild(collapsible);
        block3.appendChild(content);
    }
}