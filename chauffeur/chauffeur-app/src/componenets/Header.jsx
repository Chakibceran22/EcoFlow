import { Bus, Clock } from "lucide-react"

const Header = ({currentTime}) => {
    return (

        <div className="absolute top-0 left-0 right-0 bg-[#4CAF50] text-white p-4 z-[1002] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
                <Bus className="h-6 w-6" />
                <h1 className="text-lg font-semibold">Bus Route Navigator</h1>
            </div>
            <div className="flex items-center gap-2 text-sm bg-[#45A049] px-3 py-1.5 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
            </div>
        </div>
    )
}
export default Header;