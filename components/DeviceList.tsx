import { gql, useQuery, } from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const ALL_DEVICES_QUERY = gql`
  query deviceList {
    temperatureControllers {
      name
      tempProbeDetails {
        name
        reading
      }
    }
  }
`

export default function DeviceList () {
  const { loading, error, data, } = useQuery(
    ALL_DEVICES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      pollInterval: 500,
    },
  )

  if (error) {
    return <ErrorMessage message="Error loading devices." />;
  }
  if (loading && !data) return <div>Loading</div>;

  const allDevices = data.temperatureControllers;

  return (
    <section>
      <ul>
        {allDevices.map(temperatureController, () => (
          <li key={temperatureController.name}>
            <div>
              <span>{temperatureController.name}.</span>
            </div>
            {temperatureController.tempProbeDetails.map(probe, () => {
              return <span key={probe.name}>{probe.name} - {probe.reading}</span>
            },)}
          </li>
        ),)}
      </ul>
    </section>
  )
}
