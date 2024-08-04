import "./App.css";
import React, { useEffect, useState } from "react";
import Transaction from "./components/Transaction";
import NewTransactionForm from "./components/NewTransactionForm";
import SearchForm from "./components/SearchForm";

//store data fetched in a state
function App() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("https://bank-flatiron-data.onrender.com/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data)); // setter function renders
  }, []); //dependency array allows it to render once
  console.log(transactions);

  function handleUpdateOnSubmission(newtransaction) {
    console.log(newtransaction);
    setTransactions((transactions) => [...transactions, newtransaction]);
    const serverOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtransaction),
    };
    fetch("https://bank-flatiron-data.onrender.com/transactions", serverOptions)
      .then((r) => r.json())
      .then((newItem) => console.log(newItem))
      .catch((err) => console.log(err));
  }
  function handleSearching(search) {
    setTransactions((transactions) =>
      transactions.filter((transaction) =>
        transaction.description.includes(search)
      )
    );
  }

  return (
    <div className="App">
      <div className="header-text">
        <h2>Bank of Flatiron</h2>
      </div>
      <SearchForm onSearching={handleSearching} />
      <NewTransactionForm onSubmission={handleUpdateOnSubmission} />
      <Transaction transactions={transactions} />
    </div>
  );
}

export default App;