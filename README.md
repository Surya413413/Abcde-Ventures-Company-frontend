ABCDE Ventures – Frontend (React)
### Overview

This is the frontend application for the ABCDE Ventures Shopping Cart System.
It provides a complete user flow for an e-commerce experience:

Login → View Products → Add to Cart → Checkout → Order Confirmation

The application is built using React and communicates with an external API for authentication, items, cart, and orders.

### Tech Stack

React 

React Router v6

Context API (Global Cart State)

JavaScript (ES6+)

CSS (Custom Styling + Gradients)

Lucide React (Icons)

react-icons

reactjs-popup

react-loader-spinner

js-cookie

### Project Structure
src/
├── components/
│   ├── Loginpage/
│   ├── Registerpage/
│   ├── Home/
│   ├── Products/
│   ├── ProductItemDetails/
│   ├── Cart/
│   ├── CartSummary/
│   ├── PaymentPage/
│   ├── Header/
│   ├── ProtectedRoute/
│   └── NotFound/
│
├── context/
│   └── CartContext.js
│
├── App.js
├── main.jsx
└── index.css

### Authentication Flow

Users log in using email/username and password


On successful login:

A token is stored in cookies

User is redirected to the Home page

On failure:

An alert or error message is shown

Single-Device Login Handling

If a user is already logged in on another device

Login is blocked

UI shows a message like:

You cannot login on another device

### Application Routing
Public Routes

/login

/register

/forgotpassword

Protected Routes

/home

/products

/products/:id

/cart

Protected routes are guarded using a ProtectedRoute component.
If no token is found, the user is redirected to the login page.

### Home Page

Welcome screen after login

Entry point to browse products

Includes navigation header

### Products Listing

Displays all available products

Each product card shows:

Image

Name

Brand

Price

Rating

Clicking a product:

Opens product details page

Allows adding product to cart

### Product Details Page

Shows complete product information

Quantity selector (+ / -)

Add to Cart button

Displays similar products section

#### Cart Functionality

Cart state is managed using React Context

Features:

Add items

Increase / decrease quantity

Remove item

Remove all items

Cart Summary

Displays:

Total items

Total price

Checkout button opens a payment modal

### Checkout & Payment

Checkout opens a modal using reactjs-popup

Payment methods displayed:

Card (disabled)

Net Banking (disabled)

UPI (disabled)

### Cash on Delivery (enabled)

Wallet (disabled)

Order Confirmation

On clicking Confirm Order:

Order is placed

Cart is cleared

Success message is shown:

Your order has been placed successfully

### Token Handling

Tokens are stored using js-cookie

Automatically attached to protected API requests

Token is removed on logout

### UI & Styling

Fully responsive design

Mobile-friendly layouts

Modern gradients and shadows

Clean, professional UI

Custom CSS only (no UI libraries)

### Running the Frontend Locally
Install Dependencies
npm install

Start Development Server
npm run dev

repository:  https://github.com/Surya413413/Abcde-Ventures-Company-frontend.git


Application runs at:

http://localhost:3001
