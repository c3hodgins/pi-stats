import React from 'react';

const SideBar = ({ sideBarFunction, values, icons }) => {
    return (
        <div className='sidebar'>
            {values.map((value, i) => (
                <SidebarIcon
                    key={i}
                    sideBarIconFunction={sideBarFunction}
                    value={value}
                    icon = {icons[i]}
                />
            ))}
        </div>
    );
};

const SidebarIcon = ({ icon, value, sideBarIconFunction }) => {
    return (
        <div onClick={() => sideBarIconFunction(value)} className='sidebar-icon group'>
            {icon}
            <span className='sidebar-tooltip group-hover:scale-100'>{value}</span>
        </div>
    );
};

export default SideBar;
