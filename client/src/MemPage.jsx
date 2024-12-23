import React, { useEffect, useState } from 'react'

const MemPage = ({ section }) => {
    const [memData, setMemData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [usedMemory, setUsedMemory] = useState(0);

    useEffect(() => {
        if (section == 'memory') {
            fetch('/api/mem').then(
                response => response.json()
            ).then(
                data => {
                    setMemData(data);
                    setUsedMemory(100 * data.free / data.total)
                    setLoading(false);
                }
            )

            // const ws = new WebSocket('/ws/mem');
            // ws.onopen = () => {
            //     console.log('WebSocket connection opened');
            // };
            // ws.onmessage = (event) => {
            //     const data = JSON.parse(event.data);
            //     setMemData(data);
            // };
            // ws.onclose = () => {
            //     console.log('WebSocket connection closed');
            //     // setWebSocketData([{}])
            // };
            // // ws.onerror = (error) => {
            // //   console.error('WebSocket error:', error);
            // // };
            // return () => {
            //     ws.close();
            // };
        }
    }, [])

    return (
        <div>
            {(loading) ? (<h1>Loading...</h1>) : (
                <>
                    <h1>{'Memory Usage:'}</h1>
                    <h1>{usedMemory + '%'}</h1>
                    <progress value={usedMemory} max = {100} />
                </>
            )}
        </div>
    )
}

export default MemPage