"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  Loader2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

export default function JobDetails({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          throw new Error("Job not found");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setApplying(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("jobTitle", job.title);
      formDataToSend.append("jobId", job.id.toString());
      formDataToSend.append("currentCTC", formData.currentCTC);
      formDataToSend.append("expectedCTC", formData.expectedCTC);
      formDataToSend.append("noticePeriod", formData.noticePeriod);
      if (resume) {
        formDataToSend.append("resume", resume);
      }

      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast({
        description: "Your application has been submitted successfully.",
      });
      setShowForm(false);
      setFormData({
        name: "",
        currentCTC: "",
        expectedCTC: "",
        noticePeriod: "",
      });
      setResume(null);
    } catch (error) {
      toast({
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setApplying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          description: "Resume file size must be less than 5MB",
        });
        return;
      }
      setResume(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <Button onClick={() => router.push("/careers")}>Back to Careers</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Jobs
          </Link>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{job.experience}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="whitespace-pre-wrap text-gray-600">
                {job.description}
              </div>
            </div>

            <div className="mt-12">
              {!showForm ? (
                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={() => setShowForm(true)}
                >
                  Apply Now
                </Button>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Current CTC"
                    value={formData.currentCTC}
                    onChange={(e) =>
                      setFormData({ ...formData, currentCTC: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Expected CTC"
                    value={formData.expectedCTC}
                    onChange={(e) =>
                      setFormData({ ...formData, expectedCTC: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Notice Period"
                    value={formData.noticePeriod}
                    onChange={(e) =>
                      setFormData({ ...formData, noticePeriod: e.target.value })
                    }
                    required
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {resume ? resume.name : "Upload Resume (PDF, DOC, DOCX)"}
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={applying}
                      className="flex-1"
                    >
                      {applying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setResume(null);
                      }}
                      disabled={applying}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
