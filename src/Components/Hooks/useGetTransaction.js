import { useEffect, useState } from "react";
import { db } from "../config";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
balance:0.0,
income:0.0,
expense:0.0,
  })

  const transactionCollectionRef = collection(db, "transaction");
  const { userId } = useGetUserInfo();

  const getTransactions = () => {
    const querryTransactions = query(
      transactionCollectionRef,
      where("userId", "==", userId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(querryTransactions, (snapshot) => {
      let docs = [];
      let totalIncome= 0;
      let totalExpense= 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        docs.push({ ...data, id });
        if(data.transactionType === "expense"){
            totalExpense +=Number(data.transactionAmount)
        }
        else{
            totalIncome +=Number (data.transactionAmount)
        }

      });

      setTransaction(docs);
      let balance=totalIncome - totalExpense;
      setTransactionTotal({
        balance,
        income:totalIncome,
        expense:totalExpense
    
      })
    });

    return unsubscribe; 
  };

  useEffect(() => {
    const unsubscribe = getTransactions();

    return () => {
      
      unsubscribe();
    };
  }, );

  return { transaction , transactionTotal};
};
