import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/layouts/Layout";
import { ImageDropzone } from "@/components/ImageDropzone";
import { ImagePreviewGrid } from "@/components/ImagePreviewGrid";
import { useImageUpload } from "@/hooks/useImageUpload";
import { storageService } from "@/services/storageService";

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { files, error, addFiles, removeFile, clearFiles } = useImageUpload();
  const [isUploading, setIsUploading] = useState(false);

  const handleCreateSession = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const session = await storageService.createSession(files);
      navigate(`/results/${session.id}`);
    } catch (err) {
      console.error("Failed to create session:", err);
      alert("Something went wrong creating the session. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-2xl px-6 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="mb-4">
          <h1 className="text-5xl font-bold tracking-tighter bg-linear-to-r from-purple-400 to-blue-400 dark:from-violet-300 dark:to-sky-300 bg-clip-text text-transparent">
            IsInsta?
          </h1>
        </div>

        <p className="text-lg text-slate-500 dark:text-slate-300 font-light mb-12 max-w-md">
          Let your friends decide your next post in Instagram. <br />
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-medium">
            Crowdsource your vibe.
          </span>
        </p>

        <ImageDropzone onFilesAccepted={addFiles} maxFiles={10} />

        {error && (
          <p className="mt-4 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}

        <ImagePreviewGrid
          files={files}
          onRemove={removeFile}
          onClearAll={clearFiles}
          onCreateSession={handleCreateSession}
          isUploading={isUploading}
        />
      </div>
    </Layout>
  );
};
