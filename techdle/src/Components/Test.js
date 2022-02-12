import React, {useEffect, useState} from "react";

function Test(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        LogValue();
    }, [count])
    return (
        <div>
            <h1>Test</h1>
            <p style={{color: "white"}}>{count}</p>
            <button onClick={() => {
                setCount(count => count + 1);

            }}>Test Button</button>
        </div>
    )

    function LogValue() {
        console.log(count);
    }
}

export default Test;