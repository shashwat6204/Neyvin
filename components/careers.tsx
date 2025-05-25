"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronRight, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Interface for job type (matches Supabase table fields)
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  created_at: string;  // Note underscore naming to match DB field
  is_active: boolean;
}

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs from API once component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Collect unique departments for filter dropdown
  const departments = ["All", ...Array.from(new Set(jobs.map(job => job.department)))];

  // Filter jobs by search term and selected department, only active jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment && job.is_active;
  });

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Main UI render
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-black backdrop-blur-3xl">
          <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_40%,rgba(68,51,238,0.1)_30%)] dark:bg-[linear-gradient(40deg,transparent_40%,rgba(255,255,255,0.03)_30%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-blue-600 dark:from-white dark:via-gray-300 dark:to-gray-500">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Be part of our mission to build next-generation technology and create a better future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg 
                       bg-white dark:bg-black 
                       text-gray-900 dark:text-gray-100
                       placeholder:text-gray-500 dark:placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/10 focus:border-primary
                       transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-400 dark:text-gray-500 h-5 w-5" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full md:w-auto border border-gray-200 dark:border-gray-800 rounded-lg 
                       px-4 py-2 bg-white dark:bg-black 
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/10 focus:border-primary
                       transition-colors cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-white dark:bg-black">
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-black rounded-xl p-6 
                       shadow-lg hover:shadow-xl 
                       transition-shadow border border-gray-100 dark:border-gray-800"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {job.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link href={`/careers/${job.id}`}>
                    <Button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No positions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Don’t see a role that fits? Send us your CV!
        </h2>
        <Link href="/submit-your-cv" className="mt-6 inline-block">
          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-lg font-medium">
            Submit Your CV
          </Button>
        </Link>
      </div>
    </div>
  );
}
