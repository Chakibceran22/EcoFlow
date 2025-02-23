const RouteStats = ({ distance, duration }) => (
    <div className="absolute top-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg z-[1000]">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-lg font-semibold">{distance} km</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-lg font-semibold">{duration} min</p>
        </div>
      </div>
    </div>
  );
  
  export default RouteStats;