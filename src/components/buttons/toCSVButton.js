import { useState, useEffect } from 'react';
import CSVDownloader from 'react-csv-downloader';

function ToCSVButton(props) {
  const [rawData, setRawData] = useState([]);

  /*
    * Hook will automatically stop
    * rendering when props.testCases
    * stop populating.
    * */
  useEffect(() => {
    setRawData(props.testCases);
  });

  return (
    <CSVDownloader
      datas={rawData}
      filename={`device-synthetic-testing-${new Date().toISOString()}`}>
      <button
        className='button is-medium'>export to .csv</button>
    </CSVDownloader>
  )
}

export default ToCSVButton;
