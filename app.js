// Selectors
const form = document.querySelector('form');
const amountInput = document.querySelector('#autoSizingInput');
const categorySelect = document.querySelector('#autoSizingSelect');
const dateInput = document.querySelector('#dateInput');
const descInput = document.querySelector('#descInput');
const tbody = document.querySelector('.table-info tbody');

const formDataArray=[];

form.addEventListener('submit', (e) => 
{
    e.preventDefault();   // This line prevents the page from refreshing when the form is submitted

    const amount = amountInput.value;
    const category = categorySelect.options[categorySelect.selectedIndex].text;
    const date = dateInput.value;
    const description = descInput.value;

    


     // If any field is empty, show an alert and stop form submission
     if (!amount || !category || !date || !description) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    let formData={
        amount:amount,
        category: category,
        date: date,
        description: description,
    }

    formDataArray.push(formData)

localStorage.setItem(date,JSON.stringify(formDataArray))

    // Create new table row
    const row = document.createElement('tr');

    // Populate row with data
    row.innerHTML = `
        <td>${amount}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>${description}</td>
        <td>
            <button class="btn btn-info">Edit</button>
            <button class="btn btn-success">Delete</button>
        </td>
    `;

    // Append row to tbody
    tbody.append(row);

    // Clear the form
    form.reset();
});

// Event listener for delete button
tbody.addEventListener('click', (e) => {
    
//to allow your code to refer to the specific row that was clicked
    const row = e.target.parentElement.parentElement;

    if(e.target.className === 'btn btn-success') {
        // Delete button is clicked
        e.target.parentElement.parentElement.remove();
    } else if(e.target.className === 'btn btn-info') {
        // Edit button is clicked
        // Add code for editing row here 
        
        amountInput.value = row.children[0].textContent;
        categorySelect.value = row.children[1].textContent;
        dateInput.value = row.children[2].textContent;
        descInput.value = row.children[3].textContent;

        // Focus on the form when editing
        amountInput.focus();
        }
        e.target.parentElement.parentElement.remove();
});