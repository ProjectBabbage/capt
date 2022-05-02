import { Box } from "../types/box";

export default function Notes({box}: {box: Box}){

    return(
        <div className="fc">
            <h1>{box.text}</h1>
            <div>
                {box.notes ?? ''}
            </div>
        </div>
    )
}