import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  serviceConfig,
  getSubServices,
  getRequiredFields,
  type ServiceType,
  type SubService,
} from "@/lib/service-config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";

interface AddServiceFormData {
  service_type: ServiceType;
  full_name: string;
  contact: string;
  sub_service: SubService;
  preferred_date_time: string;
  address?: string;
  payment_amount?: string;
  service_provider?: string;
  location?: string;
  emergency_contact?: string;
  special_requests?: string;
  additional_details?: string;
}

interface AddServiceDialogProps {
  onSubmit: (data: AddServiceFormData) => void;
}

const AddServiceDialog = ({ onSubmit }: AddServiceDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<AddServiceFormData>();
  const [subServices, setSubServices] = React.useState<
    (typeof serviceConfig.services)[number]["sub_services"]
  >([]);
  const [requiredFields, setRequiredFields] = React.useState<string[]>([]);

  const watchServiceType = form.watch("service_type");
  const watchSubService = form.watch("sub_service");

  useEffect(() => {
    if (watchServiceType) {
      const subs = getSubServices(watchServiceType);
      setSubServices(subs);
      form.setValue("sub_service", undefined);
    }
  }, [watchServiceType, form]);

  useEffect(() => {
    if (watchServiceType && watchSubService) {
      const fields = getRequiredFields(watchServiceType, watchSubService);
      setRequiredFields(fields);
    }
  }, [watchServiceType, watchSubService]);

  const handleSubmit = (data: AddServiceFormData) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6">
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceConfig.services.map((service) => (
                          <SelectItem key={service.name} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sub_service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Service</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!watchServiceType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub service" />
                      </SelectTrigger>
                      <SelectContent>
                        {subServices.map((sub) => (
                          <SelectItem key={sub.name} value={sub.name}>
                            {sub.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {requiredFields.includes("Contact Number") && (
                <FormField
                  control={form.control}
                  name="contact"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {requiredFields.includes("Emergency Contact") && (
                <FormField
                  control={form.control}
                  name="emergency_contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 999-8888" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="preferred_date_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {requiredFields.includes("Payment Amount") && (
                <FormField
                  control={form.control}
                  name="payment_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="150.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {requiredFields.includes("Service Provider Details") && (
                <FormField
                  control={form.control}
                  name="service_provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Care Agency Inc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {requiredFields.includes("Address") && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, San Francisco, CA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {requiredFields.includes("Location") && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {requiredFields.includes("Special Requests") && (
              <FormField
                control={form.control}
                name="special_requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any special requests"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {requiredFields.includes("Additional Requirements") && (
              <FormField
                control={form.control}
                name="additional_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter additional details"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              Add Service
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
