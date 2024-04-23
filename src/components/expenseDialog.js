import {
    Box,
    Button,
    Dialog,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import {  useAuth } from "../hooks/useAuth";
import { getExpenseData, postExpenseData,  updateExpenseData } from "../firebase/firestore";
import { toast } from "react-toastify";
import ButtonLoading from "./buttonLoading";
let ininitalData = {
  location: "",
  address: "",
  items:  "",
  amount: "",
  date:  dayjs().format('YYYY-MM-DD hh:mm:ss')
}
const ExpenseDialog = ({reload, form, onClose, state = "create", data, setData}) => {
    const [loading, setLoading] = useState(false)
    const succesfulPosting = () => toast(state == "create" ?"Successfully added" : "Successfully updated", {type: "success"});
    const errorPosting = (title) => toast(title, {type: "error"});

    let {authUser} = useAuth()
    const [expenseData, setExpenseData] = useState(ininitalData)
    const uid = authUser.uid;

    const changeExpenseData = (e) => {
        let {name, value} = e.target;
        setExpenseData({...expenseData, [name]: value});
    };
    useEffect(()=>{
      setExpenseData(state == "create" ? ininitalData : data)
    },[form])
    useEffect(()=>{
        setTimeout(()=>{onClose()},500)
    },[loading])
    const submitExpenseData = async() => {
      if(!expenseData.address
        || !expenseData.amount
        || !expenseData.items 
        || !expenseData.location) {
           errorPosting("Error added")
           return;

        }

        if(state === "update"){
            updateExpenseData(uid, expenseData.id, expenseData, succesfulPosting, errorPosting, setLoading);
          return;
        }
        // ELSE IF

        postExpenseData(expenseData, uid, succesfulPosting, setLoading, errorPosting);
        getExpenseData(uid, setData, setLoading)
        //

        setExpenseData({
            location: "",
            address: "",
            items:  "",
            amount: "", date:  dayjs().format('YYYY-MM-DD hh:mm:ss')});
        //
        reload()
        
    }


    return <Dialog open={form} onClose={onClose}>
    <Box
      minWidth="400px"
      p="1.5rem"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Typography variant="h6">Add Expense</Typography>
      <TextField
      value={expenseData.location}
      name='location'
       onChange={changeExpenseData}
       label="Location" variant="standard" />
      <TextField
      value={expenseData.address}
      name='address'
       onChange={changeExpenseData}
        label="Address" variant="standard" />
      <TextField
      value={expenseData.items}
      name = 'items'
       onChange={changeExpenseData}
        label="Items" variant="standard" />
      <TextField
      value={expenseData.amount}
      name = 'amount'
       onChange={changeExpenseData}
        label="Amount" variant="standard" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DatePicker
             onChange={(date) => {
                setExpenseData({...expenseData, date: dayjs(date).format('YYYY-MM-DD')});
              }}
             defaultValue={dayjs(expenseData.date)}
             label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider>
      <ButtonLoading children={state} status={loading} submitExpenseData={submitExpenseData} />   
    </Box>
  </Dialog>
};

export default ExpenseDialog;


