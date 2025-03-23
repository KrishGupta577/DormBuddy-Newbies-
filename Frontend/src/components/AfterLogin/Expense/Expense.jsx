import React, { useState, useEffect } from 'react';
import './Expense.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    paidBy: '',
    date: new Date().toISOString().substr(0, 10),
    splitType: 'equal'
  });
  const [newRoommate, setNewRoommate] = useState('');
  const [totalOwed, setTotalOwed] = useState({});

  useEffect(() => {
    calculateBalances();
  }, [expenses, roommates]);

  const calculateBalances = () => {
    const balances = {};
    
    // Initialize balances for each roommate
    roommates.forEach(roommate => {
      balances[roommate] = 0;
    });

    // Calculate what each person owes or is owed
    expenses.forEach(expense => {
      const { amount, paidBy, splitType } = expense;
      const numRoommates = roommates.length;
      
      if (splitType === 'equal' && numRoommates > 0) {
        const amountPerPerson = parseFloat(amount) / numRoommates;
        
        roommates.forEach(roommate => {
          if (roommate === paidBy) {
            balances[roommate] += parseFloat(amount) - amountPerPerson;
          } else {
            balances[roommate] -= amountPerPerson;
          }
        });
      }
    });

    setTotalOwed(balances);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount || !newExpense.paidBy) return;
    
    setExpenses([...expenses, newExpense]);
    setNewExpense({
      title: '',
      amount: '',
      paidBy: '',
      date: new Date().toISOString().substr(0, 10),
      splitType: 'equal'
    });
  };

  const handleAddRoommate = (e) => {
    e.preventDefault();
    if (!newRoommate || roommates.includes(newRoommate)) return;
    
    setRoommates([...roommates, newRoommate]);
    setNewRoommate('');
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="expense-container">
      <h1 className="expense-title">Dorm Room Expense Tracker</h1>
      
      <div className="expense-section">
        <h2 className="expense-section-title">Add Roommate</h2>
        <form onSubmit={handleAddRoommate} className="expense-form">
          <input
            type="text"
            placeholder="Roommate name"
            value={newRoommate}
            onChange={(e) => setNewRoommate(e.target.value)}
            className="expense-input"
          />
          <button type="submit" className="expense-button">Add Roommate</button>
        </form>
        
        <div className="expense-roommates-list">
          <h3 className="expense-subtitle">Roommates:</h3>
          {roommates.length > 0 ? (
            <ul className="expense-list">
              {roommates.map((roommate, index) => (
                <li key={index} className="expense-list-item">{roommate}</li>
              ))}
            </ul>
          ) : (
            <p className="expense-message">No roommates added yet.</p>
          )}
        </div>
      </div>

      <div className="expense-section">
        <h2 className="expense-section-title">Add Expense</h2>
        <form onSubmit={handleAddExpense} className="expense-form">
          <input
            type="text"
            placeholder="Expense title"
            value={newExpense.title}
            onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
            className="expense-input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            className="expense-input"
          />
          <select
            value={newExpense.paidBy}
            onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
            className="expense-select"
          >
            <option value="">Who paid?</option>
            {roommates.map((roommate, index) => (
              <option key={index} value={roommate}>{roommate}</option>
            ))}
          </select>
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            className="expense-input"
          />
          <button type="submit" className="expense-button">Add Expense</button>
        </form>
      </div>

      <div className="expense-section">
        <h2 className="expense-section-title">Expenses List</h2>
        {expenses.length > 0 ? (
          <div className="expense-table-container">
            <table className="expense-table">
              <thead>
                <tr>
                  <th className="expense-table-header">Title</th>
                  <th className="expense-table-header">Amount</th>
                  <th className="expense-table-header">Paid By</th>
                  <th className="expense-table-header">Date</th>
                  <th className="expense-table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index} className="expense-table-row">
                    <td className="expense-table-cell">{expense.title}</td>
                    <td className="expense-table-cell">${parseFloat(expense.amount).toFixed(2)}</td>
                    <td className="expense-table-cell">{expense.paidBy}</td>
                    <td className="expense-table-cell">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="expense-table-cell">
                      <button 
                        onClick={() => handleDeleteExpense(index)}
                        className="expense-delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="expense-message">No expenses added yet.</p>
        )}
      </div>

      <div className="expense-section">
        <h2 className="expense-section-title">Settlement Summary</h2>
        {roommates.length > 0 ? (
          <div className="expense-balance-container">
            {Object.entries(totalOwed).map(([roommate, balance], index) => (
              <div key={index} className={`expense-balance ${balance >= 0 ? 'expense-positive' : 'expense-negative'}`}>
                <span className="expense-roommate-name">{roommate}:</span> 
                {balance > 0 ? (
                  <span className="expense-amount">is owed ${Math.abs(balance).toFixed(2)}</span>
                ) : balance < 0 ? (
                  <span className="expense-amount">owes ${Math.abs(balance).toFixed(2)}</span>
                ) : (
                  <span className="expense-amount">is settled up</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="expense-message">Add roommates to see balances.</p>
        )}
      </div>
    </div>
  );
};

export default Expense;   