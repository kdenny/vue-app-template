import * as etl from './modules/websocket/etl'

const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const timer = state => state.websocket.timer.timerCount
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const colors = state => state.app.config.chartPalette
const isLoading = state => state.app.isLoading
const tuningData = state => state.websocket.tuningData
const dashboardData = state => state.websocket.dashboardData
const contentData = state => state.websocket.contentData
const dashboardTables = state => state.viz.dashboardTables
const scaleChart = state => state.viz.scaleChart
const heatmap = state => state.viz.heatmap
const vitalsTables = state => state.viz.vitalsTables

const dashboardFormat = (l, fieldColors, fieldName, keepCount) => {
  let newl = []
  if (l) {
    let co = 0
    l[fieldName].map(cs => {
      cs.color = fieldColors[co]
      co++
      if (newl.length < keepCount && cs.id !== '') {
        newl.push(cs)
      }
      return cs
    })
    return newl
  }
}

const formattedResult = (state) => {
  let v = {...state.websocket.socket.message}
  let or = {}
  if (v.type === 'PageviewAggregationResultWrapper') {
    const modifiedResult = etl.reformat(v)

    if (state.websocket.rdata.results) {
      // //always keep the first entry
      if (state.websocket.rdata.results.length > 1) {
        state.websocket.rdata.results.pop()
      }
      state.websocket.rdata.results.push(modifiedResult)
      if (state.websocket.rdata.results.length === 2) {
        state.websocket.rdata.results = etl.calcDiffs(state.websocket.rdata, 'pageviews')
        or = state.websocket.rdata.results[1]
      }
    } else {
      state.websocket.rdata.results = [modifiedResult]
      or = state.websocket.rdata.results[0]
    }

    // Finally set the data back into the model
    return or
  } else {
    console.log(v.type)
    return null
  }
}

const pageviewCount = (state) => {
  return state.websocket.totalViews
}

const isLoaded = (state) => {
  if (!state.websocket.loading) {
    return true
  } else {
    return false
  }
}

const topContentSections = (state) => {
  let l = formattedResult(state)
  if (state.app.activeData === 'websocket' && l) {
    let cl = state.app.config.chartPalette
    return dashboardFormat(l, cl, 'contentSection', 3)
  } else {
    return null
  }
}

const topArticles = (state) => {
  let l = formattedResult(state)
  if (state.app.activeData === 'websocket' && l) {
    let l = formattedResult(state)
    let cl = state.app.config.chartPalette
    return dashboardFormat(l, cl, 'topUrl', 10)
  } else {
    return null
  }
}

const topAuthors = (state) => {
  let l = formattedResult(state)
  let cl = state.app.config.chartPalette
  if (state.app.activeData === 'websocket' && l) {
    let newl = []
    let co = 0
    l['author'].map(cs => {
      cs.color = cl[co]
      co++
      if (newl.length < 3) {
        if (cs.id !== '' && cs.id !== currentPublisher(state).name) {
          newl.push(cs)
        }
      }
      return cs
    })
    return newl
  } else {
    return null
  }
}

const topCountries = (state) => {
  let l = formattedResult(state)
  if (state.app.activeData === 'websocket' && l) {
    let l = formattedResult(state)
    let cl = state.app.config.chartPalette
    return dashboardFormat(l, cl, 'geoData.country', 3)
  } else {
    return null
  }
}

const topCities = (state) => {
  let l = formattedResult(state)
  if (state.app.activeData === 'websocket' && l) {
    let l = formattedResult(state)
    let cl = state.app.config.chartPalette
    return dashboardFormat(l, cl, 'geoData.city', 3)
  } else {
    return null
  }
}

const topReferrers = (state) => {
  let l = formattedResult(state)
  let cl = state.app.config.chartPalette
  if (state.app.activeData === 'websocket' && l) {
    let newl = []
    let co = 0
    l['rawReferrer'].map(cs => {
      cs.color = cl[co]
      co++
      if (newl.length < 3) {
        if (cs.id !== '/' && cs.id !== currentPublisher(state).name) {
          newl.push(cs)
        }
      }
      return cs
    })
    return newl
  } else {
    return null
  }
}

const topReferrerSegments = (state) => {
  let l = formattedResult(state)
  if (state.app.activeData === 'websocket' && l) {
    let l = formattedResult(state)
    let cl = state.app.config.chartPalette
    return dashboardFormat(l, cl, 'referrer', 3)
  } else {
    return null
  }
}

const pageviewsArray = (state) => {
  let ret = {}
  let v = {...state.websocket.socket.message}
  if (v.value) {
    let m = v.value.data.visits[0]
    ret.month = m[0].month.visit.values
    ret.day = m[1].day.visit.values
    ret.week = m[2].week.visit.values
    ret.hour = m[3].hour.visit.values
    ret.minute = m[4].minute.visit.values
  }
  return ret
}

const statCards = (state) => {
  return state.websocket.computedStats
}

const currentPublisher = (state) => {
  return state.websocket.client
}

const currentFilter = (state) => {
  return state.websocket.currentFilter
}

const currentTimeframe = (state) => {
  return state.websocket.timeframe
}

const isSwitching = (state) => {
  return state.websocket.switching
}

const currentDatasource = (state) => {
  return state.app.activeData
}

export {
  menuItems,
  toggleWithoutAnimation,
  sidebarOpened,
  timer,
  config,
  palette,
  colors,
  isLoading,
  currentDatasource,
  isLoaded,
  formattedResult,
  currentFilter,
  currentTimeframe,
  pageviewCount,
  statCards,
  topContentSections,
  topArticles,
  topAuthors,
  currentPublisher,
  pageviewsArray,
  topCountries,
  topCities,
  topReferrers,
  topReferrerSegments,
  tuningData,
  isSwitching,
  dashboardData,
  contentData,
  dashboardTables,
  scaleChart,
  heatmap,
  vitalsTables
}
