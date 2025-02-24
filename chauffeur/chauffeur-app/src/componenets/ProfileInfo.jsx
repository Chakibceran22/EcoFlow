import { Star } from "lucide-react";

const ProfileInfo = ({driverData}) => {
    return (
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
    )
}

export default ProfileInfo;