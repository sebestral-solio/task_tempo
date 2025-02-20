import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import ServiceCardGrid from "./dashboard/ServiceCardGrid";
import { type StatusType } from "./dashboard/ServiceCard";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [services, setServices] = useState([
    {
      id: 1,
      service_type: "Home Care",
      full_name: "John Smith",
      contact: "+1 (555) 123-4567",
      sub_service: "Regular Care",
      preferred_date_time: "2024-03-20T10:00:00",
      address: "123 Main St, San Francisco, CA",
      payment_amount: 150.0,
      service_provider: "Care Agency Inc",
      location: "San Francisco, CA",
      emergency_contact: "+1 (555) 999-8888",
      special_requests: "None",
      additional_details: "Regular weekly service",
      backend: true,
      created_at: "2024-03-19T15:30:00",
      status: "pending" as StatusType,
      duplicate_flag: "none",
    },
    {
      id: 2,
      service_type: "Physical Therapy",
      full_name: "Sarah Johnson",
      contact: "+1 (555) 234-5678",
      sub_service: "Rehabilitation",
      preferred_date_time: "2024-03-21T14:00:00",
      address: "456 Oak St, Los Angeles, CA",
      payment_amount: 200.0,
      service_provider: "PhysioHealth Inc",
      location: "Los Angeles, CA",
      emergency_contact: "+1 (555) 888-7777",
      special_requests: "Evening sessions preferred",
      additional_details: "Post-surgery rehabilitation",
      backend: true,
      created_at: "2024-03-19T16:30:00",
      status: "in_progress" as StatusType,
      duplicate_flag: "none",
    },
    {
      id: 3,
      service_type: "Nursing Care",
      full_name: "Michael Brown",
      contact: "+1 (555) 345-6789",
      sub_service: "Intensive Care",
      preferred_date_time: "2024-03-19T09:00:00",
      address: "789 Pine St, New York, NY",
      payment_amount: 300.0,
      service_provider: "Elite Nursing Ltd",
      location: "New York, NY",
      emergency_contact: "+1 (555) 777-6666",
      special_requests: "24/7 care needed",
      additional_details: "Post-operative care",
      backend: true,
      created_at: "2024-03-18T10:30:00",
      status: "completed" as StatusType,
      duplicate_flag: "none",
    },
  ]);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleStatusChange = (id: number, newStatus: StatusType) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, status: newStatus } : service,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onSearch={handleSearch}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      <main className="container mx-auto px-4 py-8">
        <ServiceCardGrid
          services={services}
          searchQuery={searchQuery}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
};

export default Home;
