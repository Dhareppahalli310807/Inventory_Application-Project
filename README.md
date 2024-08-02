# Product CRUD Inventory Application

## Overview

The **Product CRUD Inventory Application** is a web-based application designed to manage an inventory of products. It allows users to Create, Read, Update, and Delete (CRUD) product information using a simple and intuitive interface.

## Features

- **Add Products**: Add new products to the inventory with details such as name, price, and quantity.
- **View Products**: Display a list of all products in the inventory.
- **Update Products**: Edit the details of existing products.
- **Delete Products**: Remove products from the inventory.
- **User Authentication**: Register, login, and logout functionalities.
- **Session Management**: Handle user sessions securely.
- **File Upload**: Upload images for products.
- **Validation**: Ensure data integrity with server-side validation.
- **Cookie Management**: Manage cookies to track user visits.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating Engine**: EJS (Embedded JavaScript)
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **Validation**: express-validator
- **Session Management**: express-session, cookie-parser
- **Middleware**: Custom middleware for authentication, file upload, validation, and visit tracking

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Dhareppahalli310807/Inventory_Application-Project.git
    cd Inventory_Application-Project
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up MongoDB**:
    - Ensure MongoDB is installed and running on your machine.
    - Create a `.env` file at the root of the project and add your MongoDB connection string:
      ```env
      MONGODB_URI=mongodb://localhost:27017/inventory
      ```

4. **Run the application**:
    ```sh
    npm start
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Register**: Navigate to `/register` to create a new user account.
- **Login**: Navigate to `/login` to log into your account.
- **Home Page**: View a list of all products in the inventory.
- **Add Product**: Navigate to `/add-product` to add a new product.
- **Edit Product**: Click on the edit button next to a product to update its details.
- **Delete Product**: Click on the delete button next to a product to remove it from the inventory.

## Project Structure

```sh
.
├── index.js                          # Entry point of the application
├── package.json                      # Project dependencies and scripts
├── src/                              # Source files
│   ├── controllers/                  # Route controllers
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middlewares/                  # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── file-upload.middleware.js
│   │   ├── lastVisit.middleware.js
│   │   └── validation.middleware.js
│   ├── models/                       # Mongoose models
│   │   └── product.js
│   ├── views/                        # EJS templates
│   │   ├── layout.ejs                # Layout template
│   │   ├── index.ejs                 # Home page template
│   │   ├── add-product.ejs           # Add product page template
│   │   ├── update-product.ejs        # Update product page template
│   │   ├── register.ejs              # Register page template
│   │   └── login.ejs                 # Login page template
│   └── public/                       # Static files (CSS, JS, images)
│       ├── css/
│       └── js/
└── .env                              # Environment variables
