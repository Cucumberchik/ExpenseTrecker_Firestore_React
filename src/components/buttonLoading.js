


import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'
import React from 'react'

export default function ButtonLoading({children, status, submitExpenseData}) {
  if(status){
    return <LoadingButton 
    loading
      variant="outlined"
  onClick={submitExpenseData}>{children}</LoadingButton>
  }
  return <Button variant="contained" onClick={submitExpenseData} >{children}</Button>
}
