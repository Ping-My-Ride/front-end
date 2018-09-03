<template>
    <div class="container landing">
    <b-jumbotron header="Ping My Ride!">
        <div v-if="!userName">

            <div class="form-group">
                <label for="">Username</label>
                <input type="text" class="form-control" v-model = "userNameInput">
            </div>

            <div class="form-group">
                <label for="">Password</label>
                <input type="password" class="form-control">
            </div>
        </div>

        <div class="button-group" v-if="!userName">
            <button class="btn button btn-success" @click = "login(userNameInput)">
                Login
            </button>
            <button class="btn button btn-primary">
                Create Account
            </button>
        </div>
        <div class="button-group" v-if="userName">
            <b-btn class="button" variant="primary" to="/rider">
                <span>I'm a Rider! </span>
                <font-awesome-icon icon="car-side" />
            </b-btn>
            <b-btn class="button" variant="primary" to="/driver">
                <span>I'm a Driver! </span>
                <font-awesome-icon icon="car-side" />
            </b-btn>
        </div>
    </b-jumbotron>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => {
    return {
      userNameInput: ""
    };
  },
  computed: mapState({
    userName: "userName"
  }),
  methods: {
    ...mapActions(["login"])
  }
};
</script>


<style lang="scss" scoped>
.landing {
  margin-top: 20px;
  .button-group {
    display: flex;
    .button {
      margin: 5px;
      flex: 1;
      color: #fff;
    }
  }
}
</style>
