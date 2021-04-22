import '../../App.scss';

function DeviceComponent(props) {
  if (!props.componentInfo) {
    return <h2>Loading capability information...</h2>
  };

  return (
      <tbody>
      <tr align='center'>
        <td>Component</td>
        <td>Capability</td>
      </tr>
      {props.componentInfo.map(component => {
        return (
          <tr>
            <td>
              <strong>{component.id}</strong>
            </td>
            {component.capabilities.map(capability => {
              return (
                <tr>
                  <td>{capability.id}</td>
                </tr>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

function DeviceCapabilityInfo(props) {
  return (
    <table className='table is-bordered' id='table-cap-detail'>
      <thead>
        <th colSpan='2' align='center'>Capability Information</th>
      </thead>
      {DeviceComponent(props)}
    </table>
  )
}

export default DeviceCapabilityInfo;
