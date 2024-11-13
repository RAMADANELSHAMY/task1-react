import React, { useState, useRef } from "react";

export default function Ewallet() {
  const amountInput = useRef();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")||[])
  );
  // localStorage.setItem("transactions",JSON.stringify(transactions))
  const deposite = () => {
    let val = +amountInput.current.value;
    let newObj = {
      beforeBalance: balance,
      type: "deposite",
      amount: val,
      afterBalance: balance + val,
    };
    transactions.push(newObj);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    setBalance(balance + val);
  };
  const Withdraw = () => {
    let val = +amountInput.current.value;
    if (balance >= val) {
      let newObj = {
        beforeBalance: balance,
        type: "withdraw",
        amount: val,
        afterBalance: balance - val,
      };
      transactions.push(newObj);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      setBalance(balance - val);
    } else {
      alert("Unsuffeicent Fund");
    }
  };
  return (
    <div className="d-flex flex-wrap gap-5 align-items-center  bg-primary bg-opacity-50 justify-content-center">
      <h1>Ewallet</h1>
      <div className="form-outline" data-mdb-input-init>
        <input
          ref={amountInput}
          type="text"
          className="form-control"
          placeholder="Enter Amount"
        />
      </div>
      <h3>Balance الرصيد:{balance}</h3>
      <button className="btn btn-success" onClick={deposite}>
        Deposite ايداع
      </button>
      <button className="btn btn-danger" onClick={Withdraw}>
        {" "}
        Withdraw سحب
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>-</th>
            <th>beforeBalance</th>
            <th>type</th>
            <th>amount</th>
            <th>afterBalance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((el, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <th>{el.beforeBalance}</th>
              <th>{el.type}</th>
              <th>{el.amount}</th>
              <th>{el.afterBalance}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
