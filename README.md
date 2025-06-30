# 🛍️ Trendz

Trendz is a full-stack dress-selling application that offers a seamless and modern online shopping experience for fashionable clothing. With Trendz, users can explore the latest dress collections, add items to their cart, and securely complete purchases — all in one place.



## ✨ Features

- 💃 **Browse Trendy Collections** — Explore a wide range of dresses curated for style lovers.
- 🛒 **Cart & Checkout** — Add products to the cart and complete purchases securely and easily.
- ❤️ **Wishlist** — Save your favorite dresses for future purchases.
- 🔒 **User Authentication** — Sign up and sign in securely with JWT authentication.
- ⚡ **Fast & Responsive** — Smooth, optimized user experience across devices.



## ⚙️ Tech Stack

- **Frontend**: React, React Query, React Context for global state
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **CI/CD & Deployment**: Docker (frontend & backend Dockerfiles), Jenkins, Docker Hub



## 🚀 Steps to Run the Application

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mohamedshafid/trendz.git
cd trendz
```
### 2️⃣ Start the Backend
```bash
cd backend
node index.js
```
### 3️⃣ Start the Frontend
```bash
cd frontend
npm run dev
```
### 4️⃣ Open in Browser
```bash
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
```
# 🐳 Docker (Optional)
```bash
docker pull mohamedhafid825/trendz-frontend
docker pull mohamedhafid825/trendz-backend

## Ater docker run Command
docker run -d -p 80:80 trendz-frontend
docker run -d -p 3000:3000 trendz-backend
```
