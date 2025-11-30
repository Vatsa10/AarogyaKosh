export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 string
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function generateFileUrl(file: File): string {
  // For now, create a local URL. In production, this would upload to cloud storage
  return URL.createObjectURL(file);
}

export function saveFileToLocalStorage(file: File, fileName: string): string {
  // For demo purposes, save file URL to localStorage
  // In production, this would upload to cloud storage and save the URL
  const fileUrl = generateFileUrl(file);
  localStorage.setItem(`file_${fileName}`, fileUrl);
  return fileUrl;
}

export function getFileFromLocalStorage(fileName: string): string | null {
  return localStorage.getItem(`file_${fileName}`);
}
