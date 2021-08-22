import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {useState} from 'react'
import getCenter from 'geolib/es/getCenter'
function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    const coordinates = searchResults.map((result) =>({
        longitude: result.long,
        latitude: result.lat
    }))
    const center = getCenter(coordinates);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })
    return (
        <ReactMapGL
            mapStyle='mapbox://styles/gerardoraor/cksmg7omf16ek18rwi76p8l1t'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewPort)=> setViewport(nextViewPort)}
        >
            {
                searchResults.map((result) =>(
                    <div key={result.log}>
                        <Marker 
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p onClick={()=>setSelectedLocation(result)} className='text-white cursor-pointer text-2xl animate-bounce'>Hello</p>
                        </Marker>
                        {
                            selectedLocation.long === result.long ? (
                                <Popup
                                    onClose={() => setSelectedLocation({})}
                                    closeOnClick={true}
                                    longitude={result.long}
                                    latitude={result.lat}
                                >
                                    {result.title}
                                </Popup>
                            ):(false)
                        }
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map
