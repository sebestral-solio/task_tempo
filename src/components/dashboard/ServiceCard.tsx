import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Phone, Calendar, MapPin } from "lucide-react";
import StatusUpdateDialog from "./StatusUpdateDialog";

export type StatusType = "pending" | "in_progress" | "completed" | "cancelled";

interface ServiceCardProps {
  id?: number;
  service_type?: string;
  full_name?: string;
  contact?: string;
  sub_service?: string;
  preferred_date_time?: string;
  address?: string;
  payment_amount?: number;
  service_provider?: string;
  location?: string;
  emergency_contact?: string;
  special_requests?: string;
  additional_details?: string;
  backend?: boolean;
  created_at?: string;
  status?: StatusType;
  onStatusChange?: (newStatus: StatusType) => void;
  duplicate_flag?: string;
}

const getServiceTypeColor = (serviceType: string) => {
  switch (serviceType.toLowerCase()) {
    case "home care":
      return "bg-blue-500 text-white";
    case "physical therapy":
      return "bg-emerald-500 text-white";
    case "nursing":
      return "bg-purple-500 text-white";
    case "mental health":
      return "bg-rose-500 text-white";
    default:
      return "bg-slate-500 text-white";
  }
};

const getSubServiceColor = (subService: string) => {
  return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
};

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const ServiceCard = ({
  id = 1,
  service_type = "Home Care",
  full_name = "John Smith",
  contact = "+1 (555) 123-4567",
  sub_service = "Regular Care",
  preferred_date_time = "2024-03-20T10:00:00",
  address = "123 Main St",
  payment_amount = 150.0,
  service_provider = "Care Agency Inc",
  location = "San Francisco, CA",
  emergency_contact = "+1 (555) 999-8888",
  special_requests = "None",
  additional_details = "Regular weekly service",
  backend = true,
  created_at = "2024-03-19T15:30:00",
  status = "pending" as StatusType,
  onStatusChange = () => {},
  duplicate_flag = "none",
}: ServiceCardProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4 p-6">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${full_name}`}
            alt={full_name}
          />
          <AvatarFallback>
            {full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {full_name || "Not specified"}
          </h3>
        </div>
        <div className="ml-auto">
          <StatusUpdateDialog status={status} onStatusChange={onStatusChange} />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${getServiceTypeColor(service_type)}`}
              >
                {service_type}
              </span>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${getSubServiceColor(sub_service)}`}
              >
                {sub_service}
              </span>
            </div>
            <TooltipProvider>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <Phone className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Contact</TooltipContent>
                </Tooltip>
                <span className="text-sm">{contact || "Not specified"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <MapPin className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Address</TooltipContent>
                </Tooltip>
                <span className="text-sm">{address || "Not specified"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Request Time</TooltipContent>
                </Tooltip>
                <span className="text-sm">
                  {created_at
                    ? new Date(created_at).toLocaleString()
                    : "Not specified"}
                </span>
              </div>

              {emergency_contact && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Tooltip>
                    <TooltipTrigger>
                      <Phone className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>Emergency Contact</TooltipContent>
                  </Tooltip>
                  <span className="text-sm">{emergency_contact}</span>
                </div>
              )}
            </TooltipProvider>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="font-semibold">Preferred Date:</span>{" "}
              {preferred_date_time
                ? new Date(preferred_date_time).toLocaleDateString()
                : "Not specified"}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Preferred Time:</span>{" "}
              {preferred_date_time
                ? new Date(preferred_date_time).toLocaleTimeString()
                : "Not specified"}
            </div>
            {payment_amount && (
              <div className="text-sm">
                <span className="font-semibold">Payment:</span> $
                {payment_amount}
              </div>
            )}
            {service_provider && (
              <div className="text-sm">
                <span className="font-semibold">Provider:</span>{" "}
                {service_provider}
              </div>
            )}
            {special_requests && (
              <div className="text-sm">
                <span className="font-semibold">Special Requests:</span>{" "}
                {special_requests}
              </div>
            )}
            {additional_details && (
              <div className="text-sm">
                <span className="font-semibold">Additional Details:</span>{" "}
                {additional_details}
              </div>
            )}
            <div className="text-sm">
              <span className="font-semibold">ID:</span> {id}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
