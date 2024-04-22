
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from ".";

export const postExpenseData = async(expenseData, uid,  setLoading, errorPosting) =>{
    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, uid), expenseData);
      } catch (e) {
        errorPosting(e.message)
      } finally {
        setLoading(false);
      }
}
export const getExpenseData = async(uid, setExpenseData, setStatus) =>{
  setStatus(true);
  try{
    let data = await getDocs(collection(db, uid));
    let newData = []
    data.forEach((doc)=>{
      let data = {...doc.data(), id: doc.id}
      newData.push(data);
    })
    setExpenseData(newData)
  }catch (e){

  }finally{
    setStatus(false)
  }
}

export const updateExpenseData = async(uid, id, newData, succesfulPosting, errorPosting, setLoading) => {
  const docRef = doc(db, uid, id);
  setLoading(true)
  try {
    await updateDoc(docRef, newData);
    succesfulPosting()
  } catch (e) {
    errorPosting(e.message)
  }finally{
    setLoading(false)
  }
}

export const deleteExpenseData = async(uid, id, setLoading) => {
  setLoading(true)
  try {
    await deleteDoc(doc(db, uid, id));
    setLoading(false)
  } catch (error) {
  }
}