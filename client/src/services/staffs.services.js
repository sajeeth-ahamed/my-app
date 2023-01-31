import { db } from "../firebase-config";
import {
   collection,
   getDocs,
   getDoc,
   addDoc,
   updateDoc,
   deleteDoc,
   doc
} from "firebase/firestore";

const staffCollectionRef = collection(db, "staffs")

class StaffDataService {
   addStaffs = (newStaff) => {
      return addDoc(staffCollectionRef, newStaff);
   }

   updateStaff = (id, updatedstaff) => {
      const staffDoc = doc(db, "staffs", id);
      return updateDoc(staffDoc, updatedstaff);
   }

   deleteStaff = (id) => {
      const staffDoc = doc(db, "staffs", id);
      return deleteDoc(staffDoc);
   }

   getAllStaffs = () => {
      return getDocs(staffCollectionRef);
   }

   getStaff = (id) => {
      const staffDoc = doc(db, "staffs", id);
      return getDoc(staffDoc);
   }

}

export default new StaffDataService();
