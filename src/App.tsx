import React, { useEffect, useState } from 'react';
import { apiCall } from './Api/apiCall';
import styles from './App.module.scss';

interface Station {
  is_charging_station: boolean;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_bikes_available_types: {
    ebike: number;
    mechanical: number;
  }
  num_docks_available: number;
  station_id: number;
  status: string;
}

const App = () => {
  const initCount = 0;
  const [count, setCount] = useState(initCount);
  const [data, setData] = useState<Station[]>();
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState<Station>();

  useEffect(() => {
    calcMaxBikes();
  },[data])
  
  const sumar = async () => {
    setLoading(true);
    const apiData = await apiCall('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status')
    setData(apiData.data.stations)
    setCount(count+1)
    setLoading(false);
  }

  const reset = () => {
    setCount(initCount);
    setData(undefined)
    setStation(undefined)
  }

  const calcMaxBikes = () => {
    if (data) {
      const maxBikesStation = data.reduce((a,b)=>a.num_bikes_available>b.num_bikes_available?a:b);
      setStation(maxBikesStation)
    } 
  }


  return (
    <div className={styles.App}>
      <div className={styles.buttonGroup}>
          <button onClick={() => sumar()}>Count</button>
          <button onClick={() => reset()}>Reset</button>
      </div>
      {loading ? <span>Cargando</span> : (
        data && <span>Station {station?.station_id} of {data.length} is the station with the most bicycles available: {station?.num_bikes_available} in total at the moment.</span>
      )}
    </div>
  );
}

export default App;
