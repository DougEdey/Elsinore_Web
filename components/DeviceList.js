import { useQuery } from '@apollo/client'
import ErrorMessage from './ErrorMessage'
import Device from './Device'
import {deviceList} from './graphql/DeviceList.graphql'

export default function DeviceList() {
  const { loading, error, data } = useQuery(
    deviceList,
    {
      notifyOnNetworkStatusChange: true,
      pollInterval: 5000,
    },
  )

  if (error) {
    return <ErrorMessage message="Error loading devices." />
  }
  if (loading && !data) return <div>Loading</div>

  const allControllers = data.temperatureControllers

  return (
    allControllers.map(temperatureController => (
      <Device temperatureController={temperatureController} key={temperatureController.name} />
    ))
  )
}