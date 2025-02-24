import { ArrowLeft } from 'lucide-react';

const ProfileHeader = ({navigate}) => {
    return (

        <div className="bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg hover:bg-[#EAFAEB]"
                >
                    <ArrowLeft className="h-5 w-5 text-[#4CAF50]" />
                </button>
                <h1 className="text-lg font-semibold">Driver Profile</h1>
            </div>
        </div>
    )
}
export default ProfileHeader;