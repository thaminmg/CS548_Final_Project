# Simple CRM

This project is designed to provide a basic Customer Relationship Management (CRM) solution with both frontend and backend components. The frontend is developed using React, while the backend leverages Node.js along with MongoDB as the database.

## Features

### Backend

The backend of the Simple CRM project consists of two services:

1. **Customer Service**: Handles CRUD operations related to customers, providing simple query features such as filtering by gender, name, and state.

2. **Invoice Service**: Manages CRUD operations for invoices, with query features based on payment status (fully paid or receivable).

### Frontend

The frontend comprises five pages:

1. **Dashboard Page**: Presents key insights with two bar charts displaying the top 5 customers based on the amount spent and the top 5 debtors based on receivable amounts.

2. **Customer Page**: Displays a table with simple query features allowing users to filter customers based on gender, name, and state.

3. **Customer Form Page**: Enables the addition and modification of customer information through a user-friendly form.

4. **Invoice Page**: Features a table with simple query options for invoices, categorizing them based on payment status.

5. **Invoice Form Page**: Allows users to create and edit invoices via a straightforward form.

## Getting Started

To get started with the Simple CRM project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

    ```bash
    git clone https://github.com/thaminmg/CS548_Final_Project.git
    ```

2. **Database Connection**: Connect to the MongoDB database from Web page or using VS Code extension.
   
3. **Backend Setup**: Navigate to the `backend` directory and run with the following command.
   ```bash
    npm start
    ```

4. **Frontend Setup**: Move to the `frontend` directory and run with the following command.
   ```bash
    npm start
    ```


## Contributors

- [Thiha Min Maung, 19882]



