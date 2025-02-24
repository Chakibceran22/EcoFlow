const Error = ({error}) => {
    {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg z-[1001] min-w-[300px] shadow-md">
          {error}
        </div>
      )}
}
export default Error;