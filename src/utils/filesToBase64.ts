export const filesToBase64 = (files: File[]) => {
  const promises = files
    .filter(f => f instanceof File)
    .map(f => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    }));
  return Promise.all(promises);
};