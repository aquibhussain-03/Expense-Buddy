# Expense Tracker - MERN Stack

A full-stack expense tracking application built with MongoDB, Express.js, React.js, and Node.js. Features secure JWT authentication, real-time data visualization with Chart.js, and Excel export functionality.

## Features

- 🔐 **Secure Authentication**: JWT-based login and registration
- 📊 **Interactive Dashboard**: Real-time stats with balance, income, and expense tracking
- 📈 **Data Visualization**: Bar, Pie, and Line charts using Chart.js
- 💰 **Transaction Management**: Add, edit, and delete income/expense transactions
- 🏷️ **Category Organization**: Organize transactions by categories
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- 📥 **Excel Export**: Download transaction data in spreadsheet format
- 🎨 **Modern UI**: Clean interface with hover effects and smooth animations

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator

### Frontend
- React 19 with Vite
- React Query (TanStack Query) for state management
- React Hook Form for form handling
- React Router for navigation
- Tailwind CSS for styling
- Chart.js & React-Chartjs-2 for data visualization
- React Hot Toast for notifications
- Axios for API calls

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend/expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats` - Get transaction statistics

## Project Structure

```
EXPENSETRACKER/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/expense-tracker/
    ├── src/
    │   ├── components/
    │   │   ├── charts/
    │   │   ├── forms/
    │   │   ├── layout/
    │   │   └── ui/
    │   ├── hooks/
    │   ├── pages/
    │   │   ├── Auth/
    │   │   └── Dashboard/
    │   ├── services/
    │   ├── utils/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View your financial overview with charts and statistics
3. **Add Transactions**: Use the Income/Expense pages to add new transactions
4. **Manage Data**: Edit or delete transactions with hover-based controls
5. **Export Data**: Download your transaction history as Excel file
6. **Categories**: Organize transactions by predefined categories

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.