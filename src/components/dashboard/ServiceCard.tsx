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
            {full_name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {service_type} - {sub_service}
          </p>
        </div>
        <div className="ml-auto">
          <StatusUpdateDialog status={status} onStatusChange={onStatusChange} />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <TooltipProvider>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <Phone className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Contact</TooltipContent>
                </Tooltip>
                <span className="text-sm">{contact}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <Phone className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Emergency Contact</TooltipContent>
                </Tooltip>
                <span className="text-sm">{emergency_contact}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <MapPin className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Address</TooltipContent>
                </Tooltip>
                <span className="text-sm">{address}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Preferred Date & Time</TooltipContent>
                </Tooltip>
                <span className="text-sm">
                  {new Date(preferred_date_time).toLocaleString()}
                </span>
              </div>
            </TooltipProvider>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="font-semibold">Payment:</span> ${payment_amount}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Provider:</span>{" "}
              {service_provider}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Special Requests:</span>{" "}
              {special_requests}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Additional Details:</span>{" "}
              {additional_details}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Created:</span>{" "}
              {new Date(created_at).toLocaleString()}
            </div>
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
