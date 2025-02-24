import { Route } from "lucide-react";


const RouteStats = ({ routeStats }) => {
  if (!routeStats) return null; 

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-2 z-[1001] w-64">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-[#4CAF50]">Route Details</span>
          <Route className="h-4 w-4 text-[#4CAF50]" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#EAFAEB] p-2 rounded-lg">
            <div className="text-xs text-[#4CAF50] font-medium">Total Distance</div>
            <div className="text-sm font-semibold text-gray-700">{routeStats.distance} km</div>
          </div>
          <div className="bg-[#EAFAEB] p-2 rounded-lg">
            <div className="text-xs text-[#4CAF50] font-medium">Estimated Time</div>
            <div className="text-sm font-semibold text-gray-700">{routeStats.duration} min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteStats;
