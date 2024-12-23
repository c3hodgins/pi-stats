import React, { useState, useEffect } from 'react';

function TopBar({ icon, section }) {
    const [generalData, setGeneralData] = useState([{}]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/general').then(
            response => response.json()
        ).then(data => {
            setGeneralData(data);
            setLoading(false);
        })
    }, []);

    return (
        <div className='topbar'>
            <div className='icon'>{icon}</div>
            {(loading) ? (<h3>{generalData.hostname}</h3>) : (<h3>{generalData.user.username + '@' + generalData.hostname}</h3>)}
            <h1 className='section-header'>{section}</h1>
        </div>
    )
}

export default TopBar;