import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import storage from '../../firebase'

export default async function uploadImage(userId, Image) {
    if (!Image) {
        throw new Error('No image provided');
      }
      console.log("id: ",userId)
      const date = new Date();
      const file_name = `${date}`;
      const storageRef = ref(storage, `images/${userId}/${file_name}`);
      const uploadTask = uploadBytesResumable(storageRef, Image);
    
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Optional: Handle progress updates
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
            reject(error);
          }, 
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve({imageUrl: downloadURL, fileName: file_name});
            }).catch((error) => {
              reject(error);
            });
          }
        );
      });
}
  
  


 