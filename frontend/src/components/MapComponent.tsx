"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  fees: any[];
};

export default function MapComponent({ fees }: Props) {

  return (

    <MapContainer

      key={JSON.stringify(
        fees.map(
          (f) => `${f.bank}-${f.lat}-${f.lng}`
        )
      )}

      center={[22.9734, 78.6569]}
      zoom={5}

      scrollWheelZoom={true}

      style={{
        height: "100vh",
        width: "100%",
      }}

    >

      <TileLayer

        attribution="&copy; OpenStreetMap contributors"

        url="
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
"

      />

      {fees.map((item, index) => (

        <Marker

          key={index}

          position={[
            item.lat,
            item.lng
          ]}

        >

          <Popup>

            <div>

              <h2>{item.bank}</h2>

              <p>{item.city}</p>

              <p>

                Fee: ₹{item.fee}

              </p>

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );
}