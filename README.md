# 🍽️ DelishDish – Food Delivery App

DelishDish is a full-featured MERN-based food delivery platform offering a seamless experience for users to browse food items, manage their cart, place orders, and pay securely. Admins have access to a powerful dashboard to manage food items, user information, and track sales with ease.

## 🌐 Live Demo

[🚀 Visit DelishDish](https://delish-dish.onrender.com)

## 📁 GitHub Repository

[📦 Source Code](https://github.com/rjrahulraj/Delish-Dish)

---

## ✨ Features

### 👥 User Features
- 🍔 Browse food items with images, descriptions, and prices.
- 🛒 Add/remove items from the cart and view totals in real-time.
- 📦 Place orders with delivery details and receive confirmation.
- 💳 Integrated Stripe for secure and reliable payment.

### 🛠️ Admin Features
- 📋 Add, update, or delete food items via the admin dashboard.
- 📊 Track sales analytics, manage orders, and view user details.
- 🔐 Role-based access for secure administration.

### 🧩 Additional Highlights
- 💬 Responsive design for mobile and desktop users.
- ⚡ Fast performance and real-time cart updates.
- 🔐 Secure authentication using JWT tokens.

---

## 🛠️ Tech Stack

| Layer       | Technologies Used                         |
|-------------|--------------------------------------------|
| Frontend    | React.js, Tailwind CSS                    |
| Backend     | Node.js, Express.js                       |
| Database    | MongoDB                                   |
| Authentication | JWT (JSON Web Tokens)                 |
| Payment     | Stripe Integration                        |
| Deployment  | Render                                     |

---

## 📸 Screenshots

> *(Add screenshots for better visibility)*

```markdown
![Homepage](screenshots/homepage.png)
![Cart Page](screenshots/cart.png)
![Admin Dashboard](screenshots/admin.png)

---

# 1. Clone the repository
git clone https://github.com/rjrahulraj/Delish-Dish.git
cd Delish-Dish

# 2. Install dependencies
npm install

# 3. Set up environment variables
Create a `.env` file in the root directory with the following:
- MONGO_URI=
- JWT_SECRET=
- STRIPE_SECRET_KEY=
- PORT= (optional)

# 4. Run the server
npm start
