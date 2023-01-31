import { storage } from "../firebase-config";
import {
   collection,
   getDocs,
   getDoc,
   doc
} from "firebase/firestore";

const profileCollectionRef = collection(storage, "Profiles")

class ProfileDataService {

   getAllProfiles = () => {
      return getDocs(profileCollectionRef);
   }

   getProfiles = (id) => {
      const profileDoc = doc(storage, "Profiles", id);
      return getDoc(profileDoc);
   }

}

export default new ProfileDataService();
