import React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface ImageDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
  maxFiles?: number;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFilesAccepted,
  maxFiles = 10,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: { "image/*": [] },
    maxFiles,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-md h-64 relative group transition-all duration-500 ease-out ${
        isDragActive ? "scale-[1.02]" : "scale-100"
      }`}
    >
      <div
        className={`absolute -inset-[2px] rounded-2xl bg-linear-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 transition-opacity duration-500 ${
          isDragActive ? "opacity-70 blur-sm" : ""
        }`}
      />

      <div
        className={`relative w-full h-full rounded-2xl border-[1.5px] border-dashed flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-xl cursor-pointer ${
          isDragActive
            ? "border-transparent bg-white/90 dark:bg-slate-900/90 shadow-2xl"
            : "border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/50 hover:bg-white/60 dark:hover:bg-slate-900/70 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-lg shadow-sm"
        }`}
      >
        <input {...getInputProps()} />

        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-md ${
            isDragActive
              ? "bg-linear-to-br from-violet-500 to-fuchsia-600 text-white scale-110 rotate-3"
              : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-300 group-hover:scale-105 group-hover:shadow-lg group-hover:text-violet-500"
          }`}
        >
          <UploadCloud className="w-8 h-8 stroke-[1.5]" />
        </div>

        <p className="text-slate-900 dark:text-slate-100 font-medium mb-2 text-lg">
          Drop photos or click to upload
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
          Up to {maxFiles} images • PNG, JPG
        </p>
      </div>
    </div>
  );
};
