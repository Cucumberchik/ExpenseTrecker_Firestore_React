import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

export const useAuth = () => useContext(AuthContext)
export const collectionExpenseRef = (collectionName) => collection(db, collectionName)