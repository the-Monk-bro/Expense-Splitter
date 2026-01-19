# Expense Splitter

This is a web application designed to help groups keep track of shared expenses and calculate the most efficient way to settle debts.

## ✨ Features

- **Member Management**: Easily add members to your expense group.
- **Expense Tracking**:
    - Record expenses with details and amount.
    - Specify who paid and which members were involved in the expense.
- **Smart Splitting**: Automatically calculates the minimum number of transactions required to settle up ("Who owes Whom").
- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.
- **Modern UI**: Features a professional dark mode interface with glassmorphism elements and smooth transitions.

## 🛠️ Technologies Used

- **Frontend**: [React.js](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
- **Styling**: 
    - **CSS Modules**: For scoped, maintainable styles.
    - **CSS Variables**: For consistent theming (Dark Mode).
    - **Flexbox & Grid**: For responsive layouts.
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.

## 🚀 How to Run

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**:
    Navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 📝 Usage Guide

1.  **Add Members**: Use the "Add Member" button in the sidebar to create your group.
2.  **Add Expenses**:
    - Enter the expense detail (e.g., "Dinner").
    - Enter the amount.
    - Select who paid the bill.
    - Check the box for each member involved in this expense.
    - Click "Add Expense".
3.  **View Expenses**: Added expenses will appear as cards in the main content area.
4.  **Split Costs**: Click the "Split" button to see a breakdown of who owes whom to settle the total balance.
5.  **Clear Data**: Use the "Clear All" button to reset the application.

---
&copy; 2026 ExpenseSplitterMG
