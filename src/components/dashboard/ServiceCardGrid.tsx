import React from "react";
import ServiceCard from "./ServiceCard";
import { type StatusType } from "./ServiceCard";

interface Service {
  id: number;
  service_type: string;
  full_name: string;
  contact: string;
  sub_service: string;
  preferred_date_time: string;
  address: string;
  payment_amount: number;
  service_provider: string;
  location: string;
  emergency_contact: string;
  special_requests: string;
  additional_details: string;
  backend: boolean;
  created_at: string;
  status: StatusType;
  duplicate_flag: string;
}

interface ServiceCardGridProps {
  services?: Service[];
  searchQuery?: string;
  onStatusChange?: (id: number, newStatus: StatusType) => void;
}

const ServiceCardGrid = ({
  services = [
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
      status: "pending",
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
      status: "in_progress",
      duplicate_flag: "none",
    },
  ],
  searchQuery = "",
  onStatusChange = () => {},
}: ServiceCardGridProps) => {
  const filteredServices = services.filter((service) =>
    Object.values(service).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchQuery.toLowerCase())
        : typeof value === "number"
          ? value.toString().includes(searchQuery)
          : false,
    ),
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onStatusChange={(newStatus) =>
                onStatusChange(service.id, newStatus)
              }
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            No services found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCardGrid;
