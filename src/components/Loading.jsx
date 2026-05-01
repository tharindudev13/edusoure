const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 font-medium animate-pulse"> &nbsp;&nbsp;Loading...</p>
        </div>
    )
}

export default Loading