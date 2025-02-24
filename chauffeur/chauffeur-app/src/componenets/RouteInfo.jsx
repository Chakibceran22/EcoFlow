import { MapPin } from "lucide-react"
const RouteInfo = ({driverData}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-[#4CAF50]" />
            <span className="text-sm font-semibold">Current Route</span>
          </div>
          <p className="text-gray-600">{driverData.route}</p>
        </div>
    )
}

export default RouteInfo;