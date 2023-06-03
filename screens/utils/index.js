const GOOGLE_API_KEY = "AIzaSyA8M1SPxF0jSKATM2nh3intjBFqhNVgz-8";

export const decode = (polyline) => {
  let index = 0,
    len = polyline.length;
  let lat = 0,
    lng = 0;
  let coordinates = [];
  let shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change;
  let factor = Math.pow(10, 5);

  while (index < len) {
    byte = null;
    shift = 0;
    result = 0;
    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
    shift = result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ latitude: lat / factor, longitude: lng / factor });
  }
  return coordinates;
};

export const getRoute = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`
  );

  const data = await response.json();

  if (data.routes.length) {
    return decode(data.routes[0].overview_polyline.points);
  }
  return null;
};


export function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); 
  var dLon = deg2rad(lon2 - lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
