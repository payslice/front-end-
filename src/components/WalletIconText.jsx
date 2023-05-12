import { useHistory } from "react-router"


export const WalletIconText = ({title, children, onclick}) => {

        const history = useHistory()
    
        return (
            
            <div className="border-2 border-[#f2f2f2] py-7 px-7 rounded-xl ml-4 hover:cursor-pointer hover:border-[#1c6af4]/[0.4] min-w-[130px]  max-w-[150px]" onClick={onclick}>
                <div className="text-center flex justify-center pb-4">
                    {children}
                </div>
                <p className="font-medium text-[#111111]/[0.7] text-center">{title}</p>
            </div>
        )
    }