import { MapPin, Navigation, RotateCcw } from "lucide-react"


const ControlPanel = ({startSelecting, start, isSelecting, selectingPoint,end, resetPoints }) => {
    return (
        <>
            {/* Control Panel */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md p-4" style={{ zIndex: 1000 }}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3">
                        <button
                            onClick={() => startSelecting('start')}
                            disabled={isSelecting}
                            className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm rounded-lg transition-all ${isSelecting && selectingPoint === 'start'
                                    ? 'bg-[#4CAF50] text-white'
                                    : 'bg-white border border-[#4CAF50] text-[#4CAF50] hover:bg-[#EAFAEB]'
                                }`}
                        >
                            <MapPin size={20} />
                            {start ? 'Change Start' : 'Select Start'}
                        </button>

                        <button
                            onClick={() => startSelecting('end')}
                            disabled={isSelecting || !start}
                            className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm rounded-lg transition-all ${isSelecting && selectingPoint === 'end'
                                    ? 'bg-[#4CAF50] text-white'
                                    : start
                                        ? 'bg-white border border-[#4CAF50] text-[#4CAF50] hover:bg-[#EAFAEB]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Navigation size={20} />
                            {end ? 'Change End' : 'Select End'}
                        </button>

                        <button
                            onClick={resetPoints}
                            className="flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-200"
                        >
                            <RotateCcw size={20} />
                            Reset
                        </button>
                    </div>

                    {isSelecting && (
                        <div className="p-3 bg-[#EAFAEB] text-[#4CAF50] text-sm rounded-lg flex items-center gap-2">
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