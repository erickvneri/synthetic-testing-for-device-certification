import '../../App.scss';

function DeviceInfo(props) {
  if (!props.deviceInfo) {
    return <h2>Loading Device Information...</h2>
  }
  return (
    <table className='table is-bordered'>
      <thead>
        <th colSpan='2' align='center'>Device Information</th>
      </thead>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{props.deviceInfo.type}</td>
          </tr>
          <tr>
            <td>Device Id</td>
            <td>{props.deviceInfo.deviceId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{props.deviceInfo.name}</td>
          </tr>
          <tr>
            <td>Label</td>
            <td>{props.deviceInfo.label}</td>
          </tr>
          <tr>
            <td>Manufacturer Name</td>
            <td>{props.deviceInfo.manufacturerName}</td>
          </tr>
          <tr>
            <td>Model Name</td>
            <td>{props.deviceInfo.manufacturerName}</td>
          </tr>
          <tr>
            <td>Presentation Id</td>
            <td>{props.deviceInfo.presentationId}</td>
          </tr>
          <tr>
            <td>Location Id</td>
            <td>{props.deviceInfo.locationId}</td>
          </tr>
          <tr>
            <td>Device Type Id</td>
            <td>{props.deviceInfo.deviceTypeId}</td>
          </tr>
          <tr>
            <td>Device Type Name</td>
            <td>{props.deviceInfo.deviceTypeName}</td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>{props.deviceInfo.createTime}</td>
          </tr>
        </tbody>
    </table>
  )
}

export default DeviceInfo;
