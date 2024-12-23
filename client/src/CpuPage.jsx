import React, { useEffect, useState } from 'react';

const CpuPage = ({ section }) => {
    const [cpuData, setCpuData] = useState([{}]);
    const [websocketData, setWebsocketData] = useState([{}]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (section == 'cpu') {
            fetch('/api/cpu').then(
                response => response.json()
            ).then(
                data => {
                    setCpuData(data)
                    setLoading(false);
                }
            )

            const ws = new WebSocket('/ws/cpu');
            ws.onopen = () => {
                console.log('WebSocket connection opened');
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setWebsocketData(data);
            };
            ws.onclose = () => {
                console.log('WebSocket connection closed');
                // setWebSocketData([{}])
            };
            // ws.onerror = (error) => {
            //   console.error('WebSocket error:', error);
            // };
            return () => {
                ws.close();
            };
        }
    }, []);

    return (
        <>
            {(typeof cpuData === 'undefined') ? (<p>Loading...</p>) : (section == 'cpu') ? (
                <>
                    <h4>{"CPU count: " + cpuData.cpus}</h4>
                    <h4>{"CPU Usage"}</h4>
                    <ul className='cpu-list'>
                        {(websocketData.cpuUsage) && (
                            websocketData.cpuUsage.map((cpu, i) => {
                                const color = (cpu < 50) ? 'green' : cpu < 75 ? 'yellow' : 'red';
                                return (
                                    <div key={i}>
                                        <li className='m-3' >
                                            <h4>{'CPU#' + i + ': ' + cpu + '%'}</h4>
                                            <progress className='cpu-progress' value={cpu / 100}></progress>
                                        </li>
                                    </div>
                                )
                            }))
                        }
                    </ul>
                    <h4>{"CPU Temp: " + websocketData.cpuTemp + "C"}</h4>
                </>
            ) : (null)}
        </>
    )
}

export default CpuPage