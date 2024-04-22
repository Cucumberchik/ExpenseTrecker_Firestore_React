
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from ".";

export const postExpenseData = async(expenseData, uid, succesfulPosting, setLoading, errorPosting) =>{
    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, uid), expenseData);
        succesfulPosting()
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

export const updateDocument = async(uid, id, newData, succesfulPosting, errorPosting, setLoading) => {
  const docRef = doc(db, uid, id);

  try {
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error("Ошибка при обновлений данных", error);
    throw error; 
  }
}

async function deleteDocument(uid, id) {
  const docRef = doc(db, uid, id);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw error; // Обработайте ошибку здесь или передайте дальше
  }
}