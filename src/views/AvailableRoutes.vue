<template>
    <div>
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
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
