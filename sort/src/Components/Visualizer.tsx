import React from 'react'

import Bar from './Bar'

let bars: number[] = [3, 4, 5];

interface Visualizer_Props {

}

const Visualizer = (props: Visualizer_Props ) => {
    return (
        <div>
            {
                bars.map( (height: number, index: number) => 
                    (<Bar key={index}/>)            
                )
            }
        </div>
    );
}

export default Visualizer