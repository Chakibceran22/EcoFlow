import { Phone, Mail, Calendar } from "lucide-react"


const ContactInfo = ({driverData}) => {
    return(
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
    )
}
export default ContactInfo;