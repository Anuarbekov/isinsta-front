import React from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { ImageData } from "../types";

interface ImagePreviewGridProps {
  files: Omit<ImageData, "votesYes" | "votesNo">[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onCreateSession: () => void;
  isUploading: boolean;
}

export const ImagePreviewGrid: React.FC<ImagePreviewGridProps> = ({
  files,
  onRemove,
  onClearAll,
  onCreateSession,
  isUploading,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="w-full mt-12 animate-slide-up">
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {files.length} Selected
        </span>
        <Button
          onClick={onClearAll}
          variant="ghost"
          className="text-xs px-0 py-0 text-red-400 hover:text-red-600 h-auto"
        >
          CLEAR ALL
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 -mx-2 snap-x">
        {files.map((file, i) => (
          <div
            key={file.id}
            className="relative flex-none w-32 aspect-square group snap-start"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={file.url}
              alt={file.name}
              className="relative w-full h-full object-cover rounded-xl shadow-sm border border-white/60 dark:border-slate-800 group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={() => onRemove(file.id)}
              className="items-center justify-center flex absolute top-0 right-0 w-7 h-7 p-0 opacity-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full shadow-lg text-slate-400 dark:text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-900/90 border border-slate-100 dark:border-slate-700 group-hover:opacity-100 scale-75 group-hover:scale-100 z-10"
              aria-label={`Remove ${file.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onCreateSession}
          isLoading={isUploading}
          disabled={files.length === 0}
          className="w-full md:w-auto min-w-[200px]"
        >
          Create voting link
        </Button>
      </div>
    </div>
  );
};
