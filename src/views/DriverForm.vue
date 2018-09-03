<template>
    <div class="container driver-form">
        <h1>I'm a Driver!</h1>
        <p>
          Please set the route you follow everyday to the office clicking on the map and setting the way using points,
          when you reach the last point doble click on the same place to set the last point
        </p>
        <div class="form-group row">
            <label for="" class="col-md-3">Route name</label>
            <input v-model="routeName" type="text" class="form-control col-md-9">
        </div>

        <div class="form-group row">
            <label for="" class="col-md-3">Phone</label>
            <input type="text" class="form-control col-md-9">
        </div>
        <div class="form-group row">
            <label for="" class="col-md-3">Select Time</label>
            <input type="time" class="form-control col-md-9"/>    
        </div>

        <div class="form-group row">
            <label class = "col-sm-12">Select route</label>
            <GmapMap
                ref="mapRef"
                :center = "{ lat:  6.244203, lng: -75.581212 }"
                map-type-id="terrain"
                :zoom = "18"
                style="width: 500px; height: 300px"
            >
            </GmapMap>
        </div>
        <div class="form-group">
            <input type="text" id="autoc" class="form-control">
        </div>
        <div class="form-group">
            <button class="btn btn-danger" @click = "clear()">Clear route</button>
            <button class="btn btn-success" @click = "sendPoints()">Save route</button>
        </div>
    </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import axios from "axios";
export default {
  data: () => {
    return {
      polylines: [],
      apiKey: "AIzaSyBi-OGFAZ7gayR5e4arP3lCVQ0avJh0-QI",
      allOverlays: []
    };
  },
  computed: { google: gmapApi },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      console.log("method initialize called.");
      var apiKey = "AIzaSyBi-OGFAZ7gayR5e4arP3lCVQ0avJh0-QI";
      var polylines = [];
      var placeIdArray = [];
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      });

      // Adds a Places search box. Searching for a place will center the map on that
      // location.
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
        document.getElementById("bar")
      );
      var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autoc")
      );
      autocomplete.bindTo("bounds", map);
      autocomplete.addListener("place_changed", function() {
        var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(13);
        }
      });

      // Enables the polyline drawing control. Click on the map to start drawing a
      // polyline. Each click will add a new vertice. Double-click to stop drawing.
      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYLINE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
        },
        polylineOptions: {
          strokeColor: "#FF0000",
          strokeWeight: 2,
          strokeOpacity: 1.0
        }
      });
      this.drawingManager.setMap(map);

      google.maps.event.addListener(
        this.drawingManager,
        "overlaycomplete",
        e => {
          this.allOverlays.push(e);
          if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            this.drawingManager.setDrawingMode(null);
            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
          }
        }
      );
      this.drawingManager.addListener("polylinecomplete", poly => {
        console.log("polyline complete!!!");
        var path = poly.getPath();
        polylines.push(poly);
        placeIdArray = [];
        this.allOverlays.forEach(item => item.overlay.setMap(null));
        this.runSnapToRoad(path);
      });
    });
  },
  methods: {
    clear() {
      for (var i = 0; i < this.polylines.length; ++i) {
        this.polylines[i].setMap(null);
      }
      this.polylines = [];
      return false;
    },
    saveRoute() {
      axios
        .post("https://stormy-forest-77656.herokuapp.com/routes/")
        .then(res => {});
    },
    runSnapToRoad(path) {
      var pathValues = [];
      for (var i = 0; i < path.getLength(); i++) {
        pathValues.push(path.getAt(i).toUrlValue());
        console.log("this is a path: " + path.getArray().toString());
      }

      console.log("Snap to road init");
      axios
        .get("https://roads.googleapis.com/v1/snapToRoads", {
          params: {
            interpolate: true,
            key: this.apiKey,
            path: pathValues.join("|")
          }
        })
        .then(data => {
          console.log("Snap to road callback");
          this.processSnapToRoadResponse(data);
          this.drawSnappedPolyline();
          //getAndDrawSpeedLimits();
        });
    },

    // Store snapped polyline returned by the snap-to-road service.
    processSnapToRoadResponse(data) {
      this.snappedCoordinates = [];
      this.placeIdArray = [];
      for (var i = 0; i < data.data.snappedPoints.length; i++) {
        var latlng = new google.maps.LatLng(
          data.data.snappedPoints[i].location.latitude,
          data.data.snappedPoints[i].location.longitude
        );
        console.log("Data to be send to backend:" + data);
        this.snappedCoordinates.push(latlng);
        this.placeIdArray.push(data.data.snappedPoints[i].placeId);
      }
    },

    // Draws the snapped polyline (after processing snap-to-road response).
    drawSnappedPolyline() {
      var snappedPolyline = new google.maps.Polyline({
        path: this.snappedCoordinates,
        strokeColor: "black",
        strokeWeight: 3
      });
      this.$refs.mapRef.$mapPromise.then(map => {
        snappedPolyline.setMap(map);
        console.log("drawing a point");
        console.log(snappedPolyline);
        this.polylines.push(snappedPolyline);
      });
    }
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
