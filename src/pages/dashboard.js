import {
  Box,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Header from "../components/header";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ExpenseDialog from "../components/expenseDialog";
import { ToastContainer } from "react-toastify";
import { ExpenseCard } from "../components/expenseCard";
import { getExpenseData } from "../firebase/firestore";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [reloadData, setReloadData] = useState(false)
  const [expenseData, setExpenseData] = useState([]);
  const [status, setStatus] = useState(true);
  
  const [updateExpense, setUpdateExpense] = useState({state: "create", data: {}})

  const {authUser} = useAuth()
  const [form, setForm] = useState(false);
  useEffect(()=>{
    getExpenseData(authUser.uid, setExpenseData, setStatus)
    setTimeout(()=>{setReloadData(false)})
},[reloadData])
  return (
    <>
      <Header />
      <ToastContainer />
      <Container>
        <Box display={"flex"} alignItems={"center"} pt={2} gap={1}>
          <Typography variant="h6">Expenses</Typography>
          <IconButton onClick={() => setForm(true)}>
            <Add />
          </IconButton>
        </Box>
        <Box sx={{display: 'flex', flexDirection: "column", gap: 1}}>
        {expenseData.map(el=>(
          <ExpenseCard setUpdateExpense={setUpdateExpense} data={el} openUpdate={()=>setForm(true)}/>

        ))}
        </Box>
        <ExpenseDialog 
        reload={()=>setReloadData(true)} 
        state = {updateExpense.state}
        data = {updateExpense.data}
        form={form} onClose={() => {
          setUpdateExpense({state: "create", data: {}})
          setForm(false)}}/>
      </Container>
    </>
  );
};

export default Dashboard;
