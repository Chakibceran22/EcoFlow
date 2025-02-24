import React from 'react';
import { ArrowLeft, Star, Clock, MapPin, Bus, Phone, Mail, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-[#EAFAEB]"
          >
            <ArrowLeft className="h-5 w-5 text-[#4CAF50]" />
          </button>
          <h1 className="text-lg font-semibold">Driver Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 mt-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#EAFAEB] rounded-full flex items-center justify-center">
              <span className="text-2xl text-[#4CAF50] font-semibold">
                {driverData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{driverData.name}</h2>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-[#4CAF50] text-[#4CAF50]" />
                <span>{driverData.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-[#4CAF50]" />
              <span className="text-sm text-gray-600">Experience</span>
            </div>
            <p className="font-semibold">{driverData.experience}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bus className="h-5 w-5 text-[#4CAF50]" />
              <span className="text-sm text-gray-600">License</span>
            </div>
            <p className="font-semibold">{driverData.license}</p>
          </div>
        </div>

        {/* Route Info */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-[#4CAF50]" />
            <span className="text-sm font-semibold">Current Route</span>
          </div>
          <p className="text-gray-600">{driverData.route}</p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#4CAF50]" />
              <span className="text-gray-600">{driverData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#4CAF50]" />
              <span className="text-gray-600">{driverData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#4CAF50]" />
              <span className="text-gray-600">Started {driverData.startDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;