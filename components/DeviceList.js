import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './ErrorMessage'
// import PostUpvoter from './PostUpvoter'

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

// export const allPostsQueryVars = {
//   skip: 0,
//   first: 10,
// }

export default function DeviceList() {
  const { loading, error, data } = useQuery(
    ALL_DEVICES_QUERY,
    {
      // variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
      pollInterval: 500,
      credentials: 'same-origin',
    }
  )

  // const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length,
  //     },
  //   })
  // }

  if (error) {
    return <ErrorMessage message="Error loading devices." />
  }
  if (loading && !data) return <div>Loading</div>

  const allDevices = data.temperatureControllers

  return (
    <section>
      <ul>
        {allDevices.map(temperatureController => (
          <li key={temperatureController.name}>
            <div>
              <span>{temperatureController.name}.</span>
            </div>
            {temperatureController.tempProbeDetails.map(probe => {
              return <span key={probe.name}>{probe.name} - {probe.reading}</span>
            })}
          </li>
        ))}
      </ul>      
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
