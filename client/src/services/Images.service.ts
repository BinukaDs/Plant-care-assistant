import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import storage from "../../firebase";

export default async function uploadImage(
  userId: string,
  Image: Blob | ArrayBuffer | null
) {
  if (!Image) {
    throw new Error("No image provided");
  }
  // console.log("id: ", userId);
  const date = new Date();
  const file_name = `${date}`;
  const storageRef = ref(storage, `images/${userId}/${file_name}`);
  const uploadTask = uploadBytesResumable(storageRef, Image);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {
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
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve({ imageUrl: downloadURL, fileName: file_name });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
}

export async function updateImage(
  userId: string,
  Image: Blob | ArrayBuffer,
  ImageName: string
) {
  if (!Image) {
    return console.error("No Image Provided")
  }
  const storageRef = ref(storage, `images/${userId}/${ImageName}`);
  const uploadTask = uploadBytesResumable(storageRef, Image);

  return new Promise<void>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {
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
        getDownloadURL(uploadTask.snapshot.ref)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
}

export async function deleteImage(
  userId: string,
  ImageName: string
) {
  const storageRef = ref(storage, `images/${userId}/${ImageName}`);
  return deleteObject(storageRef)
    .then(() => {
      return console.log("Image deleted");
    })
    .catch((error) => {
      return console.error(error);
    });
}

