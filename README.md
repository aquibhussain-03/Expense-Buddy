# 💰 Expense Tracker - MERN Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</div>

<p align="center">
  A modern, full-stack expense tracking application with real-time analytics, secure authentication, and beautiful data visualizations.
</p>

## ✨ Features

### 🔐 Authentication & Security
- JWT-based secure login and registration
- Protected routes with token validation
- Profile picture upload with server-side storage

### 📊 Dashboard & Analytics
- Real-time financial overview with balance tracking
- Interactive pie/donut charts with toggle functionality
- Monthly income vs expense bar charts
- Transaction count and statistics

### 💸 Transaction Management
- Add, edit, and delete income/expense transactions
- Category-based organization
- Date-based filtering and sorting
- Hover-based edit controls

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Gradient backgrounds and smooth animations
- Dark sidebar with modern navigation
- Loading states and error handling

### 📥 Data Export
- Excel export functionality
- Formatted transaction reports
- Download transaction history

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs hashing
- **Validation**: Express Validator
- **File Upload**: Multer middleware
- **Security**: CORS, Protected routes

</td>
<td valign="top" width="50%">

### Frontend
- **Framework**: React 19 with Vite
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Charts**: Chart.js & React-Chartjs-2
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16.0.0
MongoDB (local or Atlas)
Git
```

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development" > .env

# Start backend server
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend/expense-tracker
npm install
npm run dev
```

### 4️⃣ Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/profile` | Get user profile | ✅ |
| `POST` | `/api/profile/upload` | Upload profile picture | ✅ |
| `GET` | `/api/transactions` | Get all user transactions | ✅ |
| `POST` | `/api/transactions` | Create new transaction | ✅ |
| `PUT` | `/api/transactions/:id` | Update transaction | ✅ |
| `DELETE` | `/api/transactions/:id` | Delete transaction | ✅ |
| `GET` | `/api/transactions/stats` | Get transaction statistics | ✅ |

## 📁 Project Structure

```
📦 EXPENSETRACKER/
├── 🗄️ backend/
│   ├── 📂 config/
│   │   └── 🔧 database.js
│   ├── 📂 controllers/
│   │   ├── 🔐 authController.js
│   │   ├── 💰 transactionController.js
│   │   └── 👤 profileController.js
│   ├── 📂 middleware/
│   │   ├── 🛡️ auth.js
│   │   └── 📤 upload.js
│   ├── 📂 models/
│   │   ├── 👥 User.js
│   │   └── 💸 Transaction.js
│   ├── 📂 routes/
│   │   ├── 🔐 authRoutes.js
│   │   ├── 💰 transactionRoutes.js
│   │   └── 👤 profileRoutes.js
│   ├── 📂 uploads/
│   ├── ⚙️ .env
│   └── 🚀 server.js
└── 🎨 frontend/expense-tracker/
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── 🔐 auth/
    │   │   ├── 📊 charts/
    │   │   ├── 📝 forms/
    │   │   ├── 🎨 layout/
    │   │   └── 🧩 ui/
    │   ├── 📂 hooks/
    │   ├── 📂 pages/
    │   │   ├── 🔐 Auth/
    │   │   └── 📊 Dashboard/
    │   ├── 📂 services/
    │   ├── 📂 utils/
    │   └── ⚛️ App.jsx
    └── ⚡ vite.config.js
```

## 🎯 Usage Guide

### 🔐 Getting Started
1. **Sign Up**: Create your account with email and password
2. **Login**: Access your personal dashboard
3. **Profile**: Upload your profile picture

### 💰 Managing Finances
1. **Dashboard**: View real-time financial overview
2. **Add Income**: Record your earnings by category
3. **Track Expenses**: Monitor your spending patterns
4. **Edit/Delete**: Manage transactions with hover controls
5. **Export**: Download Excel reports of your data

### 📊 Analytics
- View balance, income, and expense summaries
- Analyze spending patterns with interactive charts
- Track monthly trends with bar charts
- Monitor transaction counts and categories

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by <strong>AQUIB HUSSAIN</strong></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>