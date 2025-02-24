import { Clock, Bus } from "lucide-react"

const StatsCard = ({driverData}) => {
    return (
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
    )
}
export default StatsCard;