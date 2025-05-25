import { FaPlayCircle } from "react-icons/fa"


export default function Loading(){
    return(
        <div className="flex flex-col gap-y-3 justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-300">
                <FaPlayCircle size={75} className="text-cyan-300"/>
            </div>
            <h1 className="text-white text-2xl font-bold mt-4">Yükleniyor...</h1>   
        </div>
    )
}