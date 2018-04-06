
const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const colors = state => state.app.config.chartPalette
const isLoading = state => state.app.isLoading
const timer = state => state.websocket.timer.timerCount

// const dashboardFormat = (l, fieldColors, fieldName, keepCount) => {
//   let newl = []
//   if (l) {
//     let co = 0
//     l[fieldName].map(cs => {
//       cs.color = fieldColors[co]
//       co++
//       if (newl.length < keepCount && cs.id !== '') {
//         newl.push(cs)
//       }
//       return cs
//     })
//     return newl
//   }
// }

// const formattedResult = (state) => {
//   let v = {...state.websocket.socket.message}
//   let or = {}
//   if (v.type === 'PageviewAggregationResultWrapper') {
//     const modifiedResult = etl.reformat(v)
//
//     if (state.websocket.rdata.results) {
//       // //always keep the first entry
//       if (state.websocket.rdata.results.length > 1) {
//         state.websocket.rdata.results.pop()
//       }
//       state.websocket.rdata.results.push(modifiedResult)
//       if (state.websocket.rdata.results.length === 2) {
//         state.websocket.rdata.results = etl.calcDiffs(state.websocket.rdata, 'pageviews')
//         or = state.websocket.rdata.results[1]
//       }
//     } else {
//       state.websocket.rdata.results = [modifiedResult]
//       or = state.websocket.rdata.results[0]
//     }
//
//     // Finally set the data back into the model
//     return or
//   } else {
//     console.log(v.type)
//     return null
//   }
// }


export {
  menuItems,
  toggleWithoutAnimation,
  sidebarOpened,
  timer,
  config,
  palette,
  colors,
  isLoading
}
