import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    address: string;
    contactNo: string;
    email?: string;
    gstNumber?: string;
    businessName?: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  address,
  contactNo,
  email,
  gstNumber,
  businessName,
  message,
}) => (
<div>
    <p>Name: {name}</p>
    <p>Address: {address}</p>
    <p>Contact Number: {contactNo}</p>
    {email && <p>Email: {email}</p>}
    {gstNumber && <p>GST Number: {gstNumber}</p>}
    {businessName && <p>Business Name: {businessName}</p>}
    <p>Message: {message}</p>
</div>
);