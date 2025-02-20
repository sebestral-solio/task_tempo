import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DashboardHeader from "./dashboard/DashboardHeader";
import ServiceCardGrid from "./dashboard/ServiceCardGrid";
import AddServiceDialog from "./dashboard/AddServiceDialog";
import { type StatusType } from "./dashboard/ServiceCard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("care_services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: StatusType) => {
    try {
      const { error } = await supabase
        .from("care_services")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setServices(
        services.map((service) =>
          service.id === id ? { ...service, status: newStatus } : service,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddService = async (data: any) => {
    try {
      const newService = {
        ...data,
        payment_amount: parseFloat(data.payment_amount),
        backend: true,
        status: "pending" as StatusType,
        duplicate_flag: "none",
      };

      const { data: insertedService, error } = await supabase
        .from("care_services")
        .insert([newService])
        .select()
        .single();

      if (error) throw error;

      setServices([insertedService, ...services]);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onSearch={handleSearch}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
          </div>
        ) : (
          <>
            <ServiceCardGrid
              services={services}
              searchQuery={searchQuery}
              onStatusChange={handleStatusChange}
            />
            <AddServiceDialog onSubmit={handleAddService} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
