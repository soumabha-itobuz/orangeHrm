import { unlink } from 'fs/promises';
export const deleteAuthFile = async (filePath: string) => {
    try {
      await unlink(filePath);
      console.log(`File ${filePath} deleted successfully`);
      return true;
    } catch (err) {
      console.error(`Error deleting file ${filePath}: ${err}`);
      return false;
    }
  };