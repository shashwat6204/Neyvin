"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, LogOut, Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  created_at: string;
  is_active: boolean;
}

export default function AdminJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClientComponentClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    description: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter and search jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error(data.error || "Failed to create job");
      }

      setJobs([data, ...jobs]);
      toast.success("Job posting created successfully");

      // Reset form and hide it
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        experience: "",
        description: "",
      });
      setShowCreateForm(false);
      setCurrentPage(1);
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast.error(error.message || "Failed to create job posting");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to delete job");
      }

      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job posting deleted successfully");

      // Adjust current page if deleting causes fewer pages
      const newTotalPages = Math.ceil((jobs.length - 1) / pageSize);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      toast.error("Failed to delete job posting");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Job Postings</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Search and Create Controls */}
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-white dark:bg-black text-gray-900 dark:text-white border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>

        {/* Create Job Form Modal */}
        {showCreateForm && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setShowCreateForm(false)} />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl rounded-xl bg-[#FFFFFF] dark:bg-zinc-900 p-6 shadow-2xl ring-1 ring-black/5">
                  <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl" />
                  <div className="relative">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-400 dark:border-gray-800 pb-4">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Create New Job Posting
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCreateForm(false)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      >
                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </Button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {[
                        { label: "Job Title", name: "title" },
                        { label: "Department", name: "department" },
                        { label: "Location", name: "location" },
                        {
                          label: "Type",
                          name: "type",
                          placeholder: "e.g., Full-time, Part-time, Contract",
                        },
                        {
                          label: "Experience Required",
                          name: "experience",
                          placeholder: "e.g., 2+ years, Entry level",
                        },
                      ].map(({ label, name, placeholder }) => (
                        <div key={name} className="relative">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            {label}
                          </label>
                          <Input
                            value={formData[name as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({ ...formData, [name]: e.target.value })
                            }
                            placeholder={placeholder}
                            required
                            className="w-full bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      ))}

                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Job Description
                        </label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          placeholder="Enter detailed job description, requirements, and responsibilities"
                          required
                          rows={6}
                          className="w-full bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="relative flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateForm(false)}
                          className="px-6 bg-white dark:bg-zinc-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={submitting}
                          className="px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                          {submitting ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Creating...
                            </div>
                          ) : (
                            "Create Job"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Job Listings */}
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Existing Job Postings
          </h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              {jobs.length === 0 ? "No job postings yet" : "No matching job postings found"}
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {job.department} • {job.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {job.type} • {job.experience}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-gray-200 dark:border-gray-800"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-900 dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-gray-200 dark:border-gray-800"
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
