import { useState, useCallback } from "react";
import { ImageData } from "../types";

const MAX_FILES = 10;

export const useImageUpload = () => {
  const [files, setFiles] = useState<Omit<ImageData, "votesYes" | "votesNo">[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
      reader.readAsDataURL(file);
    });
  };

  const addFiles = useCallback(async (fileList: File[]) => {
    setError(null);
    try {
      const newImages = await Promise.all(
        fileList.map(async (file) => ({
          id: crypto.randomUUID(),
          name: file.name,
          url: await readFile(file),
        }))
      );

      setFiles((prev) => [...prev, ...newImages].slice(0, MAX_FILES));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process files");
    }
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  return {
    files,
    error,
    addFiles,
    removeFile,
    clearFiles,
  };
};
