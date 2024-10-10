import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
// import { PlantDataTypes } from "@/types/Plant";
export default async function uploadImage(
  userId: string,
  Image: Blob | ArrayBuffer | null
) {
  if (!Image) {
    throw new Error("No image provided");
  }
  console.log("id: ", userId);
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

export async function FetchWallpaper() {
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const APIURL = `https://api.unsplash.com/search/photos?query=ForestWallpapers&page=1&client_id=${UNSPLASH_API_KEY}`;
  // console.log(import.meta.env.VITE_UNSPLASH_ACCESS_KEY)

  try {
    const { data } = await axios.get(APIURL);
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.log("error fetching wallpaper:", error);
    return "Error fetching wallpaper";
  }
}
