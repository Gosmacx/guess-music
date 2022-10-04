import { Dispatch, SetStateAction } from "react"

type Alert = { 
    alert: boolean; 
    point: number;
    toggleAlert: Dispatch<SetStateAction<boolean>>;
    setPoint: Dispatch<SetStateAction<number>>;
}

export default function name({ point, alert, toggleAlert, setPoint }: Alert) {

    const resetPoint = () => {
        toggleAlert(!alert)
        setPoint(0)
    }

    if (!alert) return <></>
    return (
        <div className="w-full h-screen bg-black bg-opacity-70 flex items-center justify-center absolute" >
            <div className="w-96 h-44 bg-white rounded gap-3 flex items-center justify-center relative " >
                <span onClick={resetPoint} className="absolute top-1 right-2 cursor-pointer text-xl w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white " >X</span>
                {point ?
                    <div>
                        <span className="font-semibold text-4xl text-slate-900" > {point} </span>
                        <span className="font-semibold text-4xl" >Point 🎉</span>
                    </div> : 
                    <span className="font-semibold text-4xl" >You Lost 😔</span>
                }
            </div>
        </div>
    )
}