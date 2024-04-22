import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ExpenseCard = ({setUpdateExpense, data, openUpdate, handleOpenDeleteDialog}) =>{
    const updateDataExpense = () => {
        openUpdate();
        setUpdateExpense({state: "update", data})
    }
    return <Card sx={{ minWidth: 275 }}>
    <CardContent sx={{display: "flex"}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               Location: {data.location}
            </Typography>
            <Typography variant="h5" component="div">
                ${data.amount}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              address:  {data.address}
            </Typography>
            <Typography variant="body2">
              items:  {data.items}
            </Typography>
        </CardContent>
    </CardContent>
    <CardActions>
      <Button size="small" 
      variant="outlined"
      startIcon={<EditIcon/>}
      onClick={updateDataExpense}
      >Edit</Button>
      <Button
       size="small"
       variant="outlined" 
       color="error"
       startIcon={<DeleteIcon/>}
       onClick={()=> handleOpenDeleteDialog(data.id)}
       >Delete</Button>
    </CardActions>
  </Card>
}