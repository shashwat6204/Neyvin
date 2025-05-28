"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronRight, Search, Filter, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
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
  created_at: string;
  is_active: boolean;
}

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const JOBS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch jobs
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment]);

  // Group jobs by department for better organization
  const departments = useMemo(() => {
    const deptSet = new Set(jobs.map(job => job.department));
    return ["All", ...Array.from(deptSet)].sort();
  }, [jobs]);

  const filteredJobsRaw = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment && job.is_active;
  });

  const totalPages = Math.ceil(filteredJobsRaw.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobsRaw.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_40%,rgba(68,51,238,0.1)_30%)] dark:bg-[linear-gradient(40deg,transparent_40%,rgba(255,255,255,0.02)_30%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-blue-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of our mission to build next-generation technology and create a better future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg 
                         bg-white dark:bg-black 
                         text-gray-900 dark:text-white
                         placeholder:text-gray-500 dark:placeholder:text-gray-600
                         focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/20 focus:border-primary dark:focus:border-primary
                         transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-[200px] shrink-0">
              <Filter className="text-gray-400 dark:text-gray-500 h-5 w-5" />
              <div className="relative w-full">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="appearance-none w-full border border-gray-200 dark:border-gray-800 rounded-lg 
                           px-4 py-2 pr-10 bg-white dark:bg-black 
                           text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/20 focus:border-primary dark:focus:border-primary
                           transition-colors cursor-pointer
                           [&_optgroup]:bg-white [&_optgroup]:dark:bg-black
                           [&_option]:py-1"
                  size={1}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgb(156 163 175) transparent'
                  }}
                >
                  <option value="All" className="py-1">All Departments</option>
                  <optgroup label="Departments" className="border-t border-gray-200 dark:border-gray-700">
                    {departments.filter(dept => dept !== "All").map((dept) => (
                      <option 
                        key={dept} 
                        value={dept} 
                        className="py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        {dept}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-8 grid gap-6 place-items-center">
          {paginatedJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-800
                        flex flex-col justify-between w-full max-w-4xl min-h-[260px]"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {job.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{job.department}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{job.experience}</span>
                  </div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {job.description}
                </p>
              </div>
              <div className="mt-6">
                <Link href={`/careers/${job.id}`}>
                  <Button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}

          {paginatedJobs.length === 0 && (
            <div className="text-center py-12 w-full max-w-2xl">
              <p className="text-gray-600 dark:text-gray-300">No positions found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800"
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black border-t border-gray-200 dark:border-gray-800 py-20 mt-24">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Don't see a role that fits?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We're always on the lookout for great talent. If you think you'd be a good fit, send us your CV and we'll reach out when there's a match.
          </p>
          <Link href="/submit-cv" className="inline-block mt-8">
            <Button className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition">
              Submit Your CV
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
