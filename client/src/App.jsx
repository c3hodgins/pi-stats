import React, { useState, useEffect } from 'react'
import './App.css';
import SideBar from './SideBar';
import CpuPage from './CpuPage';
import TopBar from './TopBar';
import { LuCpu,LuHardDrive, LuMemoryStick } from "react-icons/lu";
import { FaRaspberryPi } from "react-icons/fa";
import MemPage from './MemPage';

// add sign in page, 

const icons = [<LuCpu />, <LuMemoryStick/>];
const values = ['Cpu', 'Memory']

function App() {
  // const [backendData, setBackendData] = useState([{}]);
  const [generalData, setGeneralData] = useState([{}]);
  // const [websocketData, setWebsocketData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('cpu');

  const handleTab = (tab) => {
    if (tab == 'Cpu') {
      setSection('cpu');
    } else if (tab == 'Storage') {
      setSection('storage');
    } else if (tab == 'Memory') {
      setSection('memory');
    }
  }

  useEffect(() => {
    fetch('/api/general').then(
      response => response.json()
    ).then(
      data => {
        setGeneralData(data);
      }
    )
  }, [])

  // useEffect(() => {
  //   if (section == 'cpu') {
  //     fetch('/api').then(
  //       response => response.json()
  //     ).then(
  //       data => {
  //         setBackendData(data)
  //         setLoading(false);
  //       }
  //     )

  //     const ws = new WebSocket('/ws');
  //     ws.onopen = () => {
  //       console.log('WebSocket connection opened');
  //     };
  //     ws.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       setWebsocketData(data);
  //     };
  //     ws.onclose = () => {
  //       console.log('WebSocket connection closed');
  //     };
  //     // ws.onerror = (error) => {
  //     //   console.error('WebSocket error:', error);
  //     // };
  //     return () => {
  //       ws.close();
  //     };
  //   }
  // }, [section]);

  return (
    <>
      <TopBar section = {section} icon = {<FaRaspberryPi className='h-12 text-red-800'></FaRaspberryPi>}></TopBar>
      <SideBar icons = {icons} values={values} sideBarFunction={handleTab} />
      <div className='content-header'>
          {(section == 'cpu') && <CpuPage section={section}/>}
          {(section == 'memory') && <MemPage section = {section}/>}
      </div>
    </>
  )
};

export default App;