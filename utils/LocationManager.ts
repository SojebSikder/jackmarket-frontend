import { AppConfig } from "@/config/app.config";

export class LocaltionManager {
  static getLocation(setLocationImageUrl: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latlon = position.coords.latitude + "," + position.coords.longitude;

        let img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
        "${latlon}"&zoom=14&size=400x300&sensor=false&key=${
          AppConfig().map.key
        }`;

        setLocationImageUrl(img_url);

        // document.getElementById("mapholder").innerHTML =
        //   "<img src='" + img_url + "'>";
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  //   static showPosition(position) {
  //     console.log("Latitude: " + position.coords.latitude);
  //     console.log("Longitude: " + position.coords.longitude);
  //   }
  // static showPosition(position) {
  //   let latlon = position.coords.latitude + "," + position.coords.longitude;

  //   let img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
  //   "${latlon}"&zoom=14&size=400x300&sensor=false&key=${AppConfig().map.key}`;

  //   // document.getElementById("mapholder").innerHTML =
  //   //   "<img src='" + img_url + "'>";
  // }
}
