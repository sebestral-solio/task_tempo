export const serviceConfig = {
  services: [
    {
      name: "Health Care Assistance",
      sub_services: [
        {
          name: "Annual Medical Checkup",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
        {
          name: "Providing Second Opinions",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
        {
          name: "24 Hours Bedside Care",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
      ],
    },
    {
      name: "Daily Care Assistance",
      sub_services: [
        {
          name: "Home Maintenance Care",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
        {
          name: "Cook Services Assistance",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
        {
          name: "Home Cleaning",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Address",
          ],
        },
      ],
    },
    {
      name: "Payment Care",
      sub_services: [
        {
          name: "Utility Bills",
          fields: [
            "Full Name",
            "Contact Number",
            "Payment Amount",
            "Preferred Date & Time",
            "Service Provider Details",
          ],
        },
        {
          name: "Online Cash Management",
          fields: [
            "Full Name",
            "Contact Number",
            "Payment Amount",
            "Preferred Date & Time",
            "Service Provider Details",
          ],
        },
        {
          name: "Medical Emergency Fund Management",
          fields: [
            "Full Name",
            "Contact Number",
            "Payment Amount",
            "Preferred Date & Time",
            "Service Provider Details",
          ],
        },
      ],
    },
    {
      name: "Emergency Care Assistance",
      sub_services: [
        {
          name: "Ambulance Assistance",
          fields: [
            "Full Name",
            "Contact Number",
            "Location",
            "Preferred Date & Time",
            "Emergency Contact",
          ],
        },
        {
          name: "Medical Emergency Assistance With A Care Plan",
          fields: [
            "Full Name",
            "Contact Number",
            "Location",
            "Preferred Date & Time",
            "Emergency Contact",
          ],
        },
        {
          name: "Accompanied Care Manager",
          fields: [
            "Full Name",
            "Contact Number",
            "Location",
            "Preferred Date & Time",
            "Emergency Contact",
          ],
        },
      ],
    },
    {
      name: "Leisure Care",
      sub_services: [
        {
          name: "Organizing Family Events",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Special Requests",
          ],
        },
        {
          name: "Assisted Day Outings",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Special Requests",
          ],
        },
        {
          name: "Arranging Surprise Events",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Special Requests",
          ],
        },
      ],
    },
    {
      name: "Other Care",
      sub_services: [
        {
          name: "Personal Time With Care Managers",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Additional Requirements",
          ],
        },
        {
          name: "Property Management Assistance",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Additional Requirements",
          ],
        },
        {
          name: "Health & Travel Insurance Services",
          fields: [
            "Full Name",
            "Contact Number",
            "Preferred Date & Time",
            "Additional Requirements",
          ],
        },
      ],
    },
  ],
};

export type ServiceType = (typeof serviceConfig.services)[number]["name"];
export type SubService =
  (typeof serviceConfig.services)[number]["sub_services"][number]["name"];

export const getSubServices = (serviceType: ServiceType) => {
  return (
    serviceConfig.services.find((s) => s.name === serviceType)?.sub_services ||
    []
  );
};

export const getRequiredFields = (
  serviceType: ServiceType,
  subService: SubService,
) => {
  const service = serviceConfig.services.find((s) => s.name === serviceType);
  const sub = service?.sub_services.find((s) => s.name === subService);
  return sub?.fields || [];
};
