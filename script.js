document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.getElementById("dashboard");
    const customer = document.getElementById("customer");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const customerBtn = document.getElementById("customer-btn");
    const customerForm = document.getElementById("customer-form");
    const customerTableBody = document.getElementById("customer-table-body");

    let customers = [];

    // Navigation toggle
    dashboardBtn.addEventListener("click", () => {
        dashboard.classList.remove("hidden");
        customer.classList.add("hidden");
    });

    customerBtn.addEventListener("click", () => {
        dashboard.classList.add("hidden");
        customer.classList.remove("hidden");
    });

    customerForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Fixed typo here
    
        // Get form values
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
    
        // Create customer object
        const customer = { firstname, lastname, email, phone };
        customers.push(customer); // Add the new customer to the array
        updateCustomerTable(); // Refresh the table with updated data
        customerForm.reset(); // Clear the form
    });
    
    // Update the customer table dynamically
    function updateCustomerTable() {
        customerTableBody.innerHTML = ""; // Clear existing rows
        customers.forEach((customer, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.firstname}</td>
                <td>${customer.lastname}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer(${index})">Edit</button>
                    <button onclick="deleteCustomer(${index})">Delete</button>
                </td>
            `;
            customerTableBody.appendChild(row);
        });
    }
    
    // Edit customer functionality
    window.editCustomer = (index) => {
        const customer = customers[index];
        document.getElementById("firstname").value = customer.firstname;
        document.getElementById("lastname").value = customer.lastname;
        document.getElementById("email").value = customer.email;
        document.getElementById("phone").value = customer.phone;
    
        customers.splice(index, 1); // Remove the selected customer
        updateCustomerTable(); // Refresh the table
    };
    
    // Delete customer functionality
    window.deleteCustomer = (index) => {
        customers.splice(index, 1); // Remove the selected customer
        updateCustomerTable(); // Refresh the table
    };
});