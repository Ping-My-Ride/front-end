<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <font-awesome-icon icon="car-side" />
            <span> Ping My Ride!</span>
        </b-navbar-brand>
        
        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
            <b-nav-item to="/driver">Driver</b-nav-item>
            <b-nav-item to="/rider">Rider</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                <em>{{ userName || "User" }}</em>
                </template>
                <b-dropdown-item @click = "logout()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "navbar",
  computed: mapState({
    userName: "userName"
  }),
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
