import { Loader2 } from "lucide-react";


const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="bg-white p-4 rounded-lg flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <span>Finding the best route...</span>
      </div>
    </div>
  );
  export default LoadingOverlay;