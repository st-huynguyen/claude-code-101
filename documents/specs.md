# eSIM Order Management Application

## Overview

Web application for purchasing and managing eSIM orders.

## Public Pages

### 1. Homepage (`/`)

Landing page introducing the eSIM service.

### 2. Checkout Page (`/checkout`)

- Select eSIM product
- Enter customer details (email, name)
- Stripe payment integration
- On success: sends email with magic link to manage eSIM

### 3. Order Confirmation Page (`/checkout/success`)

Thank you page after successful purchase.

- Order summary
- Instructions to check email for eSIM details

### 4. Manage Page (`/manage/[token]`)

View purchased eSIM details via magic link from email.

- eSIM QR code / activation details
- Order information
- Product details

## Admin Pages

### 5. Admin Login Page (`/admin/login`)

Authentication for admin users.

### 6. Admin Orders Page (`/admin/orders`)

- List all orders
- View order details
- Filter/search orders

### 7. Admin Products Page (`/admin/products`)

- List eSIM products
- Create/edit/delete products
- Set pricing

## Integrations

- **Stripe**: Payment processing
- **Email**: Send purchase confirmation with magic link
