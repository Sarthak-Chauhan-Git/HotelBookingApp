module.exports = async function getCoordinates(locationStr) {
  if (!locationStr) throw new Error("Location string is required");
  const API_KEY = process.env.GEOAPIFY_KEY || "1697e4e5933b46c591e5a246df38258d";
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    locationStr
  )}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  const { features = [] } = await response.json();
  if (features.length === 0) throw new Error("Location not found");

  // GeoJSON coords are [lon, lat]
  const [lon, lat] = features[0].geometry.coordinates;
  return { lat, lng: lon };
};
