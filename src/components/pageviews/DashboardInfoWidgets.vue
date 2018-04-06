<template>
  <div class="row dashboard-info-widgets">
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number" v-if="viewCount">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ viewCount }}

            </div>
            <div class="stats-title">Pageviews in last <strong>12 minutes</strong></div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-arrow-down-c text-danger stats-icon"></i>
              76
            </div>
            <div class="stats-title">Checkouts started in last <strong>12 minutes</strong></div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-danger" v-if="statCards">
        <div class="info-widget-inner">
          <div class="info-widget-inner has-chart">
            <div class="stats">
              <div class="stats-number">
                {{ statCards.loggedIn }}%
              </div>
              <div class="stats-title">Registered Users</div>
            </div>
            <div class="chart-container" v-if="loggedInPercent > 0">
              <progress-bar type="circle" ref="circleProgress" :colorName="'white'" :backgroundColorName="'danger'"
                            :startColorName="'danger'"></progress-bar>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-info" v-if="statCards">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-android-people stats-icon icon-wide"></i>
              {{ statCards.adblock }}%
            </div>
            <div class="stats-title">Adblock Disabled</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  import ProgressBar from '../../components/vuestic-components/vuestic-progress-bar/VuesticProgressBar'

  export default {
    name: 'dashboard-info-widgets',
    components: {
      ProgressBar
    },
    data () {
      return {loggedInPercent: 0}
    },
    computed: {
      pubData () {
        return this.$store.getters.formattedResult
      },
      viewCount () {
        return this.$store.getters.pageviewCount
      },
      statCards () {
        if (this.$refs.circleProgress) {
          this.$refs.circleProgress.$data.value = Math.round(this.$store.getters.statCards.loggedIn)
        } else {
          if (!isNaN(this.$store.getters.statCards.loggedIn)) {
            this.loggedInPercent = Math.round(this.$store.getters.statCards.loggedIn)
            console.log(this.loggedInPercent)
          }
        }
        return this.$store.getters.statCards
      }
    },
    mounted () {
//      console.log(this.$refs.circleProgress.$data.value)
      if (this.loggedInPercent > 0) {
        console.log(this.loggedInPercent)
        this.$refs.circleProgress.$data.value = this.loggedInPercent
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
  }

  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 2.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }

</style>
