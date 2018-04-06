<template>
  <nav class="navbar app-navbar navbar-toggleable-md">
    <div class="navbar-brand-container d-flex align-items-center justify-content-start">
      <!-- <a class="navbar-brand" href="#" style="color: #161616; font-weight: 400;"> -->
        <!--<i class="i-vuestic"></i>-->
        <!-- piano -->
      <!-- </a> -->
      <a href='#/' id="logo" style="padding-top: 0.75rem; width: 70px;"class="navbar-brand">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1083.94 400"><path d="M974.07 100.73c-63.14 0-110.28 44.27-110.28 110.69v3.28c0 65.19 46.74 109.05 109.87 109.05s110.28-43.46 110.28-110.28v-3.28c0-65.6-47.14-109.46-109.87-109.46zm59 113.15c0 43.87-22.14 71.33-59 71.33-37.72 0-59.45-27.47-59.45-71.33v-3.28c0-44.28 22.55-70.92 59.45-70.92s59 27.06 59 71.33zM715.8 100.73c-63.13 0-110.28 44.27-110.28 110.69v112.33h50.83V210.6c0-44.28 22.55-70.92 59.45-70.92s59 27.06 59 71.33v112.74h50.83V210.19c.04-65.6-47.11-109.46-109.83-109.46zm-457.52 0h50.83v223.02h-50.83zm-148 0H0V400h50.84v-76.25h59c63.13 0 110.28-43.46 110.28-110.28v-3.28c.03-65.6-47.12-109.46-109.84-109.46zm59 113.15c0 43.87-22.14 71.33-59 71.33H50.84V139.67h59.45c36.9 0 59 27.06 59 71.33zm288.24-113.15c-63.13 0-110.28 44.27-110.28 110.69v3.28c0 64.45 45.69 108 107.73 109h2.14c28.69-.65 46.27-10.86 59.37-26.67v26.73h50.91V210.19c0-65.6-47.15-109.46-109.87-109.46zm59 154.27c-5.94 19.28-25.53 30.22-50.48 30.22h-8.49c-37.71 0-59.44-27.47-59.44-71.33v-3.29c0-44.28 22.55-70.92 59.45-70.92s59 27.06 59 71.33zM283.75 0c-17.72 0-31 12.43-31 31.07V32c0 18.3 13.12 30.61 30.84 30.61s31-12.2 31-31v-.92C314.59 12.31 301.36 0 283.75 0z" fill="#101820"/></svg>
      </a>
    </div>

    <div class="row navbar-container">

      <div class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col">
        <a class="menu-icon i-menu-expanded" style="filter: invert(100%); opacity: 0.3" href="#" @click.prevent="toggleSidebar(false)" v-if="sidebarOpened"></a>
        <a class="menu-icon i-menu-collapsed" style="filter: invert(100%; opacity: 0.3" href="#" @click.prevent="toggleSidebar(true)" v-else></a>
      </div>

      <div class="offset-lg-7"></div>
      <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
        <!--<div v-if="loaded" style="float: left; margin-right: 20px;">-->
          <!--<progress class="progress is-large is-info" v-bind:value="timerCount" max="30"></progress>-->
        <!--</div>-->
        <!--<a style="width: 80px;opacity: 0.4" class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">-->
          <!--&lt;!&ndash;<span class="i-nav-notification notify"></span>&ndash;&gt;-->
          <!--<span>{{ currentTimeframe.name }}</span>-->
        <!--</a>-->
        <!--<div class="dropdown-menu">-->
          <!--<div class="dropdown-menu-content">-->
            <!--<a class="dropdown-item" href="#" v-for="tf in timeframes">-->
              <!--<span class="ellipsis" v-on:click="selectTimeframe(tf)">{{ tf.name }}</span>-->
            <!--</a>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--<div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>-->
        <!--<a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu" v-if="currentFilter === 'none'">-->
          <!--No Current Filter-->
        <!--</a>-->
        <!--<a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu" v-if="currentFilter !== 'none'">-->
          <!--Filtering by {{ currentFilter.filter }}-->
        <!--</a>-->
        <!--<div class="dropdown-menu">-->
          <!--<div class="dropdown-menu-content">-->
            <!--<a class="dropdown-item" href="#">-->
              <!--<span class="ellipsis" v-on:click="paidFilter">Filter Paid</span>-->
            <!--</a>-->
            <!--<a class="dropdown-item" href="#">-->
              <!--<span class="ellipsis" v-on:click="adblockFilter">Filter Adblock</span>-->
            <!--</a>-->
            <!--<a class="dropdown-item" href="#">-->
              <!--<span class="ellipsis" v-on:click="loggedInFilter">Filter Logged In</span>-->
            <!--</a>-->
            <!--<a class="dropdown-item" href="#">-->
              <!--<span class="ellipsis" v-on:click="resetFilter">Clear Filters</span>-->
            <!--</a>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>-->
        <!--<a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">-->
          <!--<span>{{ currentPublisher.name }}</span>-->
        <!--</a>-->
        <!--<div class="dropdown-menu last">-->
          <!--<div class="dropdown-menu-content" style="max-height: 500px; overflow-x:hidden; overflow-y: scroll;">-->
            <!--<div class="dropdown-item plain-link-item" v-for="pub in sortedPublishers">-->
              <!--<a class="plain-link" href="#" v-on:click="selectPub(pub)">{{ pub.name }}</a>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <modal ref="languageModal"
     v-bind:small="true" :okClass="'none'" :cancelClass="'none'">
      <div slot="title">{{'user.language' | translate}}</div>
      <div class="text-center">
              <button class="btn btn-info" @click="setLanguage('en')">
                {{'language.english' | translate}}
              </button>
              <hr>
              <button class="btn btn-info" @click="setLanguage('es')">
                {{'language.spanish' | translate}}
              </button>
      </div>
    </modal>
  </nav>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import Dropdown from 'directives/Dropdown'
  import Modal from '../../vuestic-components/vuestic-modal/VuesticModal'
  import PublisherList from './NewPublisherList'

  export default {
    name: 'navbar',
    components: {
      Modal
    },
    directives: {
      dropdown: Dropdown
    },
    data () {
      return {
        publishers: PublisherList.publishers,
        loaded: true,
        timeframes: [
          {name: 'Past hour', id: 'hour'},
          {name: 'Past month', id: 'month'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'sidebarOpened',
        'toggleWithoutAnimation'
      ]),
      currentLanguage () {
        return Vue.i18n.locale() === 'en' ? 'English' : 'Spanish'
      },
      currentPublisher () {
        return this.$store.getters.currentPublisher
      },
      timerCount () {
        return this.$store.getters.timer
      },
      currentFilter () {
        return this.$store.getters.currentFilter
      },
      currentTimeframe () {
        return this.$store.getters.currentTimeframe
      },
      sortedPublishers () {
        let g = this.publishers
        return g.sort(this.getSortOrder('name'))
      }
    },
    methods: {
      ...mapActions([
        'closeMenu',
        'toggleSidebar',
        'isToggleWithoutAnimation'
      ]),
      showLanguageModal () {
        this.$refs.languageModal.open()
      },
      setLanguage (locale) {
        Vue.i18n.set(locale)
        this.$refs.languageModal.cancel()
      },
      selectPub (pub) {
        this.$store.dispatch('switchClient', {
          client: pub
        })
      },
      selectTimeframe (tf) {
        console.log(tf)
        this.$store.dispatch('switchTimeframe', {
          timeframe: tf
        })
      },
      paidFilter () {
        this.$store.dispatch('changeFilterPaid', {
        })
      },
      adblockFilter () {
        this.$store.dispatch('changeFilterAdblock', {
        })
      },
      loggedInFilter () {
        this.$store.dispatch('changeFilterLoggedIn', {
        })
      },
      resetFilter () {
        this.$store.dispatch('filterReset', {
        })
      },
      getSortOrder (prop) {
        return function (a, b) {
          if (a[prop] > b[prop]) {
            return 1
          } else if (a[prop] < b[prop]) {
            return -1
          }
          return 0
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../../node_modules/bootstrap/scss/variables";

  .navbar.app-navbar {
    .navbar-container {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    height: $top-nav-height;
    padding-left: $nav-padding-left;
    padding-right: $nav-padding-right;
    background-color: $top-nav-bg;

    .avatar-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      border: 2px solid $lighter-gray;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .menu-icon-container {
      padding: 0;
      font-size: $font-size-base;
    }

    .navbar-brand-container {
      position: absolute;
      z-index: 3;
      height: 100%;
      left: $navbar-brand-container-left;
      top: 0;
    }

    .nav-item {
      padding: 0;
      height: 100%;
      a{
        color: $piano-navy;
        font-weight: 400;
      }
    }

    .dropdown.navbar-dropdown {
      .dropdown-toggle {
        padding: 0;
        &:after {
           display: none;
         }
      }

      &.show {
        @include media-breakpoint-up(lg) {
          .dropdown-menu {
            left: auto;
            right: 0;
          }
        }
        &:after {
           position: absolute;
           bottom: -$dropdown-show-b;
           right: calc(50% - 10px);
           width: 0;
           height: 0;
           display: block;
           content: '';
           border-left: 10px solid transparent;
           border-right: 10px solid transparent;
           border-bottom: 10px solid $white;
         }
      }

      .dropdown-menu {
        margin-top: $dropdown-show-b;
        padding-top: 0;
        width: 100%;
      }


      .dropdown-item {
        height: $navbar-dd-item-height;
        cursor: pointer;
        font-size: $font-size-base;

        &:hover, &:active, &:focus, &.active {
          outline: none;
        }

        &.plain-link-item {
          color: $piano-navy;

          &:hover, &:active, &:focus {
            background: $dropdown-background;
          }

          .plain-link {
            text-decoration: none;
          }
        }
      }
    }

    .notify {
      position: relative;

      &::after {
         content: '';
         position: absolute;
         right: -6px;
         top: -6px;
         background-color: $brand-primary;
         height: 12px;
         width: 12px;
         border-radius: 50%;
       }
    }

    .i-nav-notification.notify::after {
      right: -4px;
      top: 0;
    }

    @include media-breakpoint-down(md) {
      height: $top-mobile-nav-height;
      padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb $nav-mobile-padding-h;

      .navbar-brand-container {
        width: $nav-mobile-brand-width;
        top: $nav-mobile-brand-top;
        left: $nav-mobile-brand-left;
        height: auto;
        .navbar-brand {
          height: $font-size-smaller;
          font-size: $font-size-smaller;
        }
      }

      .dropdown.navbar-dropdown {
        &.show {
          display: flex;
          &:after {
            bottom: -$dropdown-mobile-show-b;
            z-index: 2;
          }
          .dropdown-menu {
            margin-top: $dropdown-mobile-show-b;
            left: auto;
            &.last {
              right: 0;
            }
          }
        }
      }
    }
  }
</style>
