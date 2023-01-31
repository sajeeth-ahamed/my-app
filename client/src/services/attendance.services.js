import { db } from "../firebase-config";
import {
   collection,
   getDocs,
   getDoc,
   doc
} from "firebase/firestore";

// let attDate = new Date()
// let d = attDate.getDate();
// let m = attDate.getMonth() + 1;
// let y = attDate.getFullYear();
// let fullDate = `${y}-${m}-${d}`;

const attenCollectionRef = collection(db, "attendance")

class AttenDataService {

   getAllAttendance = () => {
      return getDocs(attenCollectionRef);
   }

   getAttendance = (id) => {
      const attenDoc = doc(db, "attendance", id);
      return getDoc(attenDoc);
   }

}

export default new AttenDataService();
