<template>
    <div class="container">
        <h1>
            Posible drivers!
        </h1>

        <table>
            <thead>
                <th>
                    Person
                </th>
                <th>
                    Phone
                </th>
                <th>
                    Route
                </th>
            </thead>
            <tbody>
                <tr v-bind:key="route.person.id" v-for="route in routes">
                    <td>
                        {{ route.person.userName }}
                    </td>
                    <td>
                        {{ route.person.phone }}
                    </td>
                    <td>
                        <GmapMap
                        ref="route.person.id"
                        :center = "{ lat:  6.244203, lng: -75.581212 }"
                        map-type-id="terrain"
                        :zoom = "18"
                        style="width: 500px; height: 300px"
                    >
                        </GmapMap>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    userName: "userName",
    routes: "routes"
  })
};
</script>


<style lang="scss" scoped>
table {
    border: solid 1px #ddeeee;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    thead { 
        th {
            background-color: #ddefef;
            border: solid 1px #ddeeee;
            color: #336b6b;
            padding: 10px;
            text-align: left;
            text-shadow: 1px 1px 1px #fff;
        }
    }
    tbody {
        td {
            border: solid 1px #ddeeee;
            color: #333;
            padding: 10px;
            text-shadow: 1px 1px 1px #fff;
        }
    }
}
</style>
