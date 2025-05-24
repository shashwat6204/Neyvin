// components/SubmitCvForm.tsx
"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "uploading" | "success" | "error";

export default function SubmitCvForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setStatus("idle");
      setErrorMessage("");
    } else {
      setErrorMessage("Please upload a PDF file");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95; // Cap at 95% until actual completion
      }
      setUploadProgress(Math.min(95, Math.round(progress)));
    }, 300);
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setStatus("uploading");
    setUploadProgress(0);

    // Start progress simulation
    const progressInterval = simulateProgress();

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      // Clear interval and set final progress
      clearInterval(progressInterval);
      
      if (res.ok) {
        setUploadProgress(100);
        setTimeout(() => setStatus("success"), 300);
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMessage(data.error || "Upload failed");
      }
    } catch (error) {
      clearInterval(progressInterval);
      setStatus("error");
      setErrorMessage("Something went wrong");
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="relative max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Submit Your CV
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards joining our team. Upload your CV to apply for exciting opportunities at Neyvin Technologies.
          </p>
        </div>

        {/* Main Form Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload Area */}
            <div
              className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out group
                ${isDragging ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-muted-foreground/25 hover:border-primary/50'}
                ${status === "error" ? 'border-red-500/50 bg-red-500/5' : ''}
                ${status === "success" ? 'border-green-500/50 bg-green-500/5' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {/* Hidden File Input */}
              <input
                type="file"
                id="cv-upload"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Area Content */}
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center px-6 py-16 cursor-pointer group-hover:bg-primary/[0.02] transition-colors rounded-xl"
              >
                {!file ? (
                  <>
                    <div className="rounded-full bg-primary/10 p-4 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-xl font-medium mb-3 text-foreground">
                      Drag & drop your CV here
                    </p>
                    <p className="text-base text-muted-foreground mb-2">
                      or click to browse from your computer
                    </p>
                    <p className="text-sm text-muted-foreground/75">
                      Supports PDF files up to 10MB
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-6 w-full max-w-md">
                    <div className="rounded-xl bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </label>
            </div>

            {/* Enhanced Progress Bar */}
            {status === "uploading" && (
              <div className="relative pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-sm font-medium text-foreground">
                      Uploading your CV...
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {uploadProgress}%
                  </span>
                </div>
                
                <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                  {/* Background pulse animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 animate-pulse" />
                  
                  {/* Main progress bar */}
                  <div
                    className={cn(
                      "absolute h-full left-0 top-0",
                      "bg-gradient-to-r from-primary/80 via-primary to-primary/90",
                      "transition-all duration-300 ease-out",
                      "after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0",
                      "after:bg-[length:10px_10px]",
                      "after:animate-[progress-bar-stripes_1s_linear_infinite]",
                      "after:bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]"
                    )}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {/* Shine effect */}
                    <div className="absolute top-0 right-0 bottom-0 w-20 animate-[shine_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full" />
                  </div>
                </div>

                {/* Status text */}
                <p className="text-xs text-muted-foreground mt-2">
                  {uploadProgress < 100 
                    ? "Please wait while we process your file..."
                    : "Almost done..."}
                </p>
              </div>
            )}

            {/* Status Messages */}
            {errorMessage && (
              <div className="flex items-center gap-3 text-red-500 bg-red-500/5 px-4 py-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{errorMessage}</p>
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center gap-3 text-green-500 bg-green-500/5 px-4 py-3 rounded-lg">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">CV uploaded successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!file || status === "uploading" || status === "success"}
              className={cn(
                "w-full py-6 text-lg font-medium transition-all duration-300",
                status === "success" 
                  ? "bg-green-500 hover:bg-green-500 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              )}
            >
              {status === "uploading" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading your CV...
                </div>
              ) : status === "success" ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>CV Successfully Submitted</span>
                </div>
              ) : (
                "Submit CV"
              )}
            </Button>

            {/* Optional: Add a "Submit Another CV" button that appears after success */}
            {status === "success" && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setStatus("idle");
                    setUploadProgress(0);
                    setErrorMessage("");
                  }}
                  className="text-sm text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  Submit Another CV
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
