import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../componenets/ProfileHeader';
import ProfileInfo from '../componenets/ProfileInfo';
import StatsCard from '../componenets/StatsCard';
import RouteInfo from '../componenets/RouteInfo';
import ContactInfo from '../componenets/ContactInfo';

const DriverProfile = () => {
  const navigate = useNavigate();
  
  const driverData = {
    name: "Ahmed Benali",
    rating: 4.8,
    experience: "5 years",
    route: "Tafourah - Bab Ezzouar",
    phone: "+213 555 123 456",
    email: "ahmed.benali@transport.dz",
    license: "B-123456",
    startDate: "2019"
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-4">
      <ProfileHeader navigate={navigate} />

      {/* Profile Content */}
      <div className="px-4 mt-4">
        <ProfileInfo driverData={driverData} />

        <StatsCard driverData={driverData} />

        <RouteInfo driverData={driverData} />

        <ContactInfo driverData={driverData} />
      </div>
    </div>
  );
};

export default DriverProfile;