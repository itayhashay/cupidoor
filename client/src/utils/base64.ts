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