<template>
    <div class="container landing">
    <b-jumbotron header="Ping My Ride!">
        <div class="button-group">
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
