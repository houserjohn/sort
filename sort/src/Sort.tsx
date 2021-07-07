import React from 'react';
import Bar from './Components/Bar';

let bars: number[] = [3, 4, 5];

const Sort = () => {
    return (
        <div>
            <p>hello</p>
            {
                bars.map( (height: number, index: number) => {
                    return (<Bar key={index}/>)            
                })
            }

        </div>
    );
}

export default Sort;