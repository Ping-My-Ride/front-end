<template>
    <div class="container driver-form">
        <h1>I'm a Rider!</h1>
        <p>
          Set the point you would like to be picked up, by default your current location is set
        </p>

        <div class="form-group row">
            <label class = "col-sm-12">Select location</label>
            <GmapMap
                ref="mapRef"
                :center = "{ lat:  6.244203, lng: -75.581212 }"
                map-type-id="terrain"
                :zoom = "18"
                style="width: 500px; height: 300px"
            >
              <GmapMarker
                  :position="location"
                  :clickable="true"
                  :draggable="true"
                  @click="center=location"
              />
            </GmapMap>
        </div>
        <div class="form-group">
            <input type="text" id="autoc" class="form-control">
        </div>
        <div class="form-group">
            <button class="btn btn-success" @click = "sendPosition()">Search routes</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      location: { lat: 6.244203, lng: -75.581212 }
    };
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        this.setMarkerLocation(pos);
      });

      var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autoc")
      );
      autocomplete.bindTo("bounds", map);
      autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(13);
        }
        this.location = place.geometry.location;
      });
    });
  },
  computed: mapState({
    userName: "userName"
  }),
  methods: {
    setMarkerLocation(pos) {
      this.location = pos;
    },
    sendPosition() {
      axios
        .get(
          `https://stormy-forest-77656.herokuapp.com/${this.userName}/drivers`,
          {
            params: {
              lat: this.location.lat,
              lng: this.location.lng
            }
          }
        )
        .then(res => {
          this.setRoutes(res.data.map(item => {
            debugger
            item.route
          }));
          this.$router.push("available-routes");
        });
    },
    ...mapActions(["setRoutes"])
  }
};
</script>



<style lang="scss" scoped>
.driver-form {
  padding: 5px;
  .btn {
    margin-right: 5px;
  }
}
</style>
