function Card({children, fontColor="text-primary-content", borderColor="border-success", dividerColor="bg-primary-content", bgColor="bg-primary", titleText = "Card", status = 50, quantity = 30}) {
    return (
        <div className= {`w-52 h-48 rounded-xl py-4 flex flex-col ${bgColor} ${fontColor} border-b-4 ${borderColor} transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 hover:cursor-pointer duration-300 `} >
            <div className="flex justify-center gap-1">
                {children}
                <span className="text-lg font-bold">{titleText}</span>
            </div>

            <div className= {`divider ${dividerColor} h-1 mx-4`} ></div>

            <div className="flex justify-center items-center gap-8">
                <span className="text-5xl font-bold "> {quantity} </span>
                <div className="radial-progress font-bold" style={{"--value": status }} role="progressbar"> {status} </div>
            </div>
        </div>
    );
}

export default Card;