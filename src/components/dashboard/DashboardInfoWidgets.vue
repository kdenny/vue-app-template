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
            <div class="stats-title">Pageviews in last <strong>{{ currentTimeframe.name }}</strong></div>
            <div :class="deltaClass()">({{ current.delta }}% {{ current.direction }} than normal)</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget" v-if="statCards">
        <div class="info-widget-inner">
          <div class="info-widget-inner has-chart">
            <div class="stats">
              <div class="stats-number">
                {{ statCards.loggedIn }}
              </div>
              <div class="stats-title">Registered Users</div>
            </div>
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
              {{ statCards.anon }}
            </div>
            <div class="stats-title">Anonymous Users</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget" v-if="statCards">
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  export default {
    name: 'dashboard-info-widgets',
    props: ['current'],
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
        return numberWithCommas(this.$store.getters.pageviewCount)
      },
      anonCount () {
        let anony = this.$store.getters.pageviewCount - this.$store.getters.statCards.loggedIn
        return numberWithCommas(anony)
      },
      loggedInCount () {
        return numberWithCommas(this.$store.getters.statCards.loggedIn)
      },
      currentTimeframe () {
        return this.$store.getters.currentTimeframe
      },
      statCards () {
        if (this.$refs.circleProgress) {
          this.$refs.circleProgress.$data.value = Math.round(this.$store.getters.statCards.loggedIn)
        } else {
          if (!isNaN(this.$store.getters.statCards.loggedIn)) {
            this.loggedInPercent = numberWithCommas(this.$store.getters.statCards.loggedIn)
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
    },
    methods: {
      deltaClass () {
        let g = 'stats-title'
        if (this.current.direction === 'higher') {
          g += ' higher'
        }
        return g
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
    strong{
      font-weight: 400;
      color: $piano-navy;
    }
  }
  .stats-title{
    font-weight: 400;
    color: transparentize($piano-navy, .4);
  }

  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 2.25rem;
    margin-bottom: 0.75rem;

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

  .higher {
    color: green;
  }

</style>
