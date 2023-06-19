import { ServerApartmentImages } from "../types/apartment";

export function convertFileToBase64(file: File) : Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error: any) => {
      reject(error);
    };
  });
}

export const convertFilePondImagesToBase64 = (images: any[]): string[] => {
  return images.map(image => `data:image/jpeg;base64,${image.getFileEncodeBase64String()}`);
}

// export const convertBase64ToFile = (images: ServerApartmentImages[]): File[] => {
//   if(!((images.length > 0 && images[0].base64) || images.length === 0)) return [];

//   return images.map(image => base64ToFile(`data:image/jpeg;base64,${image.base64}`, image.name));
// }

function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mat = arr[0].match(/:(.*?);/);
  const mimeType = mat && mat[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mimeType || "" });
}

export const getImageAsFile = async (imageUrl: string): Promise<File> => {
    const response = await fetch(imageUrl);
    console.log(response);
    const blob = await response.blob();
    const filename = getImageFilenameFromUrl(imageUrl);
    return new File([blob], filename);
};

const getImageFilenameFromUrl = (imageUrl: string): string => {
  // Extract the filename from the URL
  const urlParts = imageUrl.split('/');
  return urlParts[urlParts.length - 1];
};
