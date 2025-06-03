import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 53.8847608, lng: 27.4532862 };

function GoogleMapPage() {
  return (
    <div style={{ height: "800px" }}>
      <APIProvider apiKey="AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg">
        <Map
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={5}
        >
          <Marker position={{ lat: 40.6976701, lng: -74.2598654 }} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default React.memo(GoogleMapPage);
