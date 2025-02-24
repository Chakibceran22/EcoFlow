import { MapPin, Navigation, RotateCcw, User, Map } from "lucide-react"
import {useNavigate} from 'react-router-dom'

const ControlPanel = ({startSelecting, start, isSelecting, selectingPoint,end, resetPoints }) => {
    const navigate = useNavigate()
    return (
        <>
            {/* Control Panel */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md p-4" style={{ zIndex: 1000 }}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3">
                        <button
                            onClick={() => navigate('/')}
                            disabled={isSelecting}
                            className={`flex-1 flex items-center justify-center gap-2 p-2 text-[10px] rounded-lg transition-all ${isSelecting && selectingPoint === 'start'
                                    ? 'bg-[#4CAF50] text-white'
                                    : 'bg-white border border-[#4CAF50] text-[#4CAF50] hover:bg-[#EAFAEB]'
                                }`}
                        >
                            <Map size={20} />
                            Routes
                        </button>

                        <button
                            onClick={() => navigate('/profile')}
                            disabled={isSelecting || !start}
                            className={`flex-1 flex items-center justify-center gap-2 p-2 text-[10px] rounded-lg transition-all ${isSelecting && selectingPoint === 'end'
                                    ? 'bg-[#4CAF50] text-white'
                                    : start
                                        ? 'bg-white border border-[#4CAF50] text-[#4CAF50] hover:bg-[#EAFAEB]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <User size={20} />
                            Profile
                        </button>

                        
                    </div>

                    {isSelecting && (
                        <div className="p-2 bg-[#EAFAEB] text-[#4CAF50] text-[10px] rounded-lg flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Click on the map to select {selectingPoint} point
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default ControlPanel