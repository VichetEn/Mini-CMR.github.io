document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.getElementById("dashboard");
    const customer = document.getElementById("customer");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const customerBtn = document.getElementById("customer-btn");
    const customerForm = document.getElementById("customer-form");
    const customerTableBody = document.getElementById("customer-table-body");
    const filterInputCustomer = document.getElementById("filterInputCustomer");
    const filterDropdownCustomer = document.getElementById("filterDropdownCustomer");
    const toggleBtn = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    // Toggle sidebar
    toggleBtn.addEventListener("click", () => {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    });

    // Load customers from local storage
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Navigation toggle
    dashboardBtn.addEventListener("click", () => {
        dashboard.classList.remove("hidden");
        customer.classList.add("hidden");
    });

    customerBtn.addEventListener("click", () => {
        dashboard.classList.add("hidden");
        customer.classList.remove("hidden");
    });

    // Add customer form submission
    customerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (!firstname || !lastname || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        const customer = { firstname, lastname, email, phone };
        customers.push(customer);
        updateCustomerTable();
        customerForm.reset();

        localStorage.setItem("customers", JSON.stringify(customers));
    });

    // Update the customer table
    function updateCustomerTable() {
        customerTableBody.innerHTML = "";
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

        customers.splice(index, 1);
        updateCustomerTable();
        localStorage.setItem("customers", JSON.stringify(customers));
    };

    // Delete customer functionality
    window.deleteCustomer = (index) => {
        customers.splice(index, 1);
        updateCustomerTable();
        localStorage.setItem("customers", JSON.stringify(customers));
    };

    // Initial load of customers
    updateCustomerTable();

    // Filter functionality for Customer
    if (filterInputCustomer) {
        filterInputCustomer.addEventListener("input", filterTable);
    }

    if (filterDropdownCustomer) {
        filterDropdownCustomer.addEventListener("change", applyFilter);
    }

    // Function to filter the table based on search input
    function filterTable() {
        const filter = filterInputCustomer.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#customer-table-body tr");

        rows.forEach((row) => {
            const name = row.querySelector("td:nth-child(1)").textContent.trim().toLowerCase();
            row.style.display = name.includes(filter) ? "" : "none";
        });
    }

    // Function to sort the table based on dropdown selection
    function applyFilter() {
        const option = filterDropdownCustomer.value;
        const rows = Array.from(document.querySelectorAll("#customer-table-body tr"));

        rows.sort((a, b) => {
            const cellA = a.querySelector("td:nth-child(1)").textContent.trim().toLowerCase();
            const cellB = b.querySelector("td:nth-child(1)").textContent.trim().toLowerCase();
            return option === "asc" ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });

        const tbody = document.querySelector("#customer-table-body");
        tbody.innerHTML = "";
        rows.forEach((row) => tbody.appendChild(row));
    }

    // Graph initialization
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales Data',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
