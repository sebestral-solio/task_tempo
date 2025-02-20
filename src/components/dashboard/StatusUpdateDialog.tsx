import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { type StatusType } from "./ServiceCard";

interface StatusUpdateDialogProps {
  status: StatusType;
  onStatusChange: (newStatus: StatusType) => void;
}

const statusOptions: { value: StatusType; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

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

const StatusUpdateDialog = ({
  status,
  onStatusChange,
}: StatusUpdateDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<StatusType>(status);

  const handleStatusChange = (newStatus: StatusType) => {
    setSelectedStatus(newStatus);
  };

  const handleSubmit = () => {
    onStatusChange(selectedStatus);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-[130px] ${getStatusColor(status)}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Select
              value={selectedStatus}
              onValueChange={(value: StatusType) => handleStatusChange(value)}
            >
              <SelectTrigger className={getStatusColor(selectedStatus)}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit}>Update Status</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;
