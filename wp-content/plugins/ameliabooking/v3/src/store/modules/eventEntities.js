import httpClient from "../../plugins/axios.js"
import { useUrlParams } from "../../assets/js/common/helper"
import {
  useTranslateEntities,
  getNameTranslated,
  getDescriptionTranslated,
  getTicketTranslated,
  getBadgeTranslated
} from "../../assets/js/public/translation"
import moment from "moment/moment";

function setTicketsData (event) {
  event.bookingToEventTickets = []
  let bookingToEventTickets = []
  event.customTickets.forEach(ticket => {
    bookingToEventTickets.push({
      id: Math.random(),
      customerBookingId: null,
      eventTicketId: ticket.id,
      persons: 0,
      waiting: 0,
      price: ticket.dateRangePrice ? ticket.dateRangePrice : ticket.price
    })
  })
  return bookingToEventTickets
}

function setEmployeeBadgesData (employees, providerBadges) {
  employees.forEach(employee => {
    if (employee.badgeId) {
      employee.badge = providerBadges.find(badge => badge.id === employee.badgeId)
    } else {
      employee.badge = null
    }
  })
}

function setEventWaitingListSettings (event, settings) {
  let generalSettings = JSON.parse(JSON.stringify(settings.appointments.waitingListEvents))
  let parsedSettings = JSON.parse(event.settings)

  // * if global waiting list is turned off
  if (!generalSettings.enabled && parsedSettings !== null && 'waitingList' in parsedSettings) {
    parsedSettings.waitingList.enabled = generalSettings.enabled
  }

  // * waiting list is not in use, but it's enabled
  if (!('peopleWaiting' in generalSettings)) generalSettings.peopleWaiting = 0

  return parsedSettings !== null && parsedSettings?.waitingList ? parsedSettings.waitingList : generalSettings
}

function getEntitiesVariableName () {
  return 'ameliaEventEntities' in window
    ? 'ameliaEventEntities'
    : ('ameliaEntities' in window ? 'ameliaEntities' : false)
}

export default {
  namespaced: true,

  state: () => ({
    events: [],
    tags:[],
    locations: [],
    employees: [],
    customFields: [],
    taxes: [],
    calendarEvents: [],
    upcomingEvents: [],
    upcomingLoading: true,
    eventsDisplay: ''
  }),

  getters: {
    getEvents (state) {
      return state.events
    },

    getEvent: (state) => (id) => {
      return state.events.find(event => parseInt(event.id) === parseInt(id)) || null
    },

    getTags (state) {
      return state.tags
    },

    getEmployees (state) {
      return state.employees
    },

    getLocations (state) {
      return state.locations
    },

    getCustomFields (state) {
      return state.customFields
    },

    getEventCustomFields: (state) => (id) => {
      return state.customFields.filter(customField => customField.events.filter(event => event.id === id).length)
    },

    getFilteredLocations: (state) => (shortcode) => {
      return state.locations.filter(l => (shortcode.locations && shortcode.locations.length > 0 ? shortcode.locations.find(loc => parseInt(loc) === l.id) : true ))
    },

    getFilteredTags: (state) => (shortcode) => {
      return state.tags.filter(t =>
        (shortcode.tags && shortcode.tags.length > 0 ? shortcode.tags.includes(t.name) : true )
        // ! this cause problems on visibility filter tag field
        && (shortcode.ids && shortcode.ids.length > 0 ? state.events.map(e => e.tags).flat().filter(tag => tag.name === t.name).length > 0 : true)
      )
    },

    getTaxes (state) {
      return state.taxes
    },

    getTax: (state) => (id) => {
      return state.taxes.find(i => parseInt(i.id) === parseInt(id)) || null
    },

    getCalendarEvents (state) {
      return state.calendarEvents
    },

    getUpcomingEvents (state) {
      return state.upcomingEvents
    },

    getUpcomingLoading (state) {
      return state.upcomingLoading
    },

    getEventsDisplay (state) {
      return state.eventsDisplay
    }
  },

  mutations: {
    setTaxes (state, payload) {
      state.taxes = payload
    },

    setEvents (state, payload) {
      state.events = payload
    },

    setTags (state, payload) {
      state.tags = payload
    },

    setEmployees (state, payload) {
      state.employees = payload.filter(e => e.status !== 'hidden')
    },

    setLocations (state, payload) {
      state.locations = payload.filter(l => l.status !== 'hidden')
    },

    setCustomFields (state, payload) {
      state.customFields = [...Object.values(payload)]
    },

    setCalendarEvents (state, payload) {
      state.calendarEvents = payload
    },

    setUpcomingEvents (state, payload) {
      state.upcomingEvents = payload
    },

    setArrayPartsToEvents (state, payload) {
      const eventIds = new Set(state.events.map(item => item.id))
      const filteredArrayParts = payload.filter(item => !eventIds.has(item.id))

      state.events = [...state.events, ...filteredArrayParts]
    },

    setUpcomingLoading (state, payload) {
      state.upcomingLoading = payload
    },

    setEventsDisplay (state, payload) {
      state.eventsDisplay = payload
    }
  },

  actions: {
    requestEntities ({ dispatch, commit, rootGetters }, payload) {
      commit('setReady', false, {root: true})
      commit('params/setParams', rootGetters['shortcodeParams/getShortcodeParams'], {root: true})

      let serverData = {
        types: payload.types
      }

      if (payload.loadEntities && !getEntitiesVariableName()) {
        httpClient.get(
          '/entities',
          { params: useUrlParams({types: serverData.types, lite: true}) }
        ).then(response => {
          window.ameliaEventEntities = response.data.data

          serverData.entities = JSON.parse(JSON.stringify(window.ameliaEventEntities))

          dispatch('fillingOutData', serverData)
        })
      } else {
        let ameliaApiInterval = setInterval(
          () => {
            let name = getEntitiesVariableName()

            if (name) {
              clearInterval(ameliaApiInterval)

              serverData.entities = JSON.parse(JSON.stringify(window[name]))

              dispatch('fillingOutData', serverData)
            }
          },
          1000
        )
      }
    },

    fillingOutData ({ commit, dispatch, rootState, getters }, payload) {
      let availableTranslationsShort = rootState.settings.general.usedLanguages.map(
        key => key.length > 2 ? key.slice(0, 2) : key
      )

      if (rootState.settings.general.usedLanguages.indexOf(rootState.localLanguage) !== -1 ||
        availableTranslationsShort.indexOf(rootState.localLanguage.split('_')[0]) !== -1
      ) {
        useTranslateEntities(payload.entities)

        rootState.settings.roles.providerBadges.badges.forEach(badge => {
          badge.content = getBadgeTranslated(badge)
        })
      }

      setEmployeeBadgesData(payload.entities.employees, rootState.settings.roles.providerBadges.badges)

      payload.types.forEach(ent => {
        if (!(ent in payload.entities)) {
          payload.entities[ent] = []
        }

        commit(
          `set${ent.charAt(0).toUpperCase()}${ent.slice(1)}`,
          ent === 'customFields' ? payload.entities['customFields'].sort(function(a, b) {
            return ((a['position'] < b['position']) ? -1 : ((a['position'] > b['position']) ? 1 : 0));
          }) : payload.entities[ent]
        )
      })

      if (getters['getEventsDisplay']) {
        dispatch('requestEvents', getters['getEventsDisplay'])
      } else {
        dispatch('requestEvents')
      }
    },

    requestEvents ({ commit, rootState, rootGetters }, payload) {
      let eventParams = {...rootGetters['params/getEventParams'], page: rootGetters['pagination/getPage']}

      if (payload === 'upcoming') {
        commit('setUpcomingLoading', true)
        eventParams = {...rootGetters['params/getUpcomingEventParams'], page: rootGetters['pagination/getPage']}
      } else {
        commit('setLoading', true, {root: true})
      }

      httpClient.get(
        '/events',
        { params: useUrlParams(eventParams)}
      ).then(response => {

        commit('pagination/setCount', response.data.data.count , {root: true})
        commit('pagination/setShow', rootState.settings.general.itemsPerPage , {root: true})

        let events = []

        let availableTranslationsShort = rootState.settings.general.usedLanguages.map(
          key => key.length > 2 ? key.slice(0, 2) : key
        )

        let useTranslations = rootState.settings.general.usedLanguages.indexOf(rootState.localLanguage) !== -1 ||
          availableTranslationsShort.indexOf(rootState.localLanguage.split('_')[0]) !== -1

        response.data.data.events.forEach(function (event) {
          event.gallery = event.gallery.sort((a, b) => (a.position > b.position) ? 1 : -1)

          if (useTranslations) {
            event.name = getNameTranslated(event)
            event.description = getDescriptionTranslated(event)

            event.customTickets.forEach((ticket) => {
              ticket.name = getTicketTranslated(ticket)
            })
          }

          if (event.customTickets.length && event.customPricing) {
            event.bookingToEventTickets = setTicketsData(event)
          }

          event.waitingList = setEventWaitingListSettings(event, rootState.settings)

          events.push(event)

          if (rootState.settings.general.showClientTimeZone) {
            event.periods.forEach(function (period) {
              let utcOffsetStart = moment(period.periodStart, 'YYYY-MM-DD HH:mm:ss').toDate().getTimezoneOffset()
              let utcOffsetEnd = moment(period.periodEnd, 'YYYY-MM-DD HH:mm:ss').toDate().getTimezoneOffset()

              if (utcOffsetStart > 0) {
                period.periodStart = moment.utc(period.periodStart, 'YYYY-MM-DD HH:mm:ss').subtract(utcOffsetStart, 'minutes').format('YYYY-MM-DD HH:mm:ss')
              } else {
                period.periodStart = moment.utc(period.periodStart, 'YYYY-MM-DD HH:mm:ss').add(-1 * utcOffsetStart, 'minutes').format('YYYY-MM-DD HH:mm:ss')
              }

              if (utcOffsetEnd > 0) {
                period.periodEnd = moment.utc(period.periodEnd, 'YYYY-MM-DD HH:mm:ss').subtract(utcOffsetEnd, 'minutes').format('YYYY-MM-DD HH:mm:ss')
              } else {
                period.periodEnd = moment.utc(period.periodEnd, 'YYYY-MM-DD HH:mm:ss').add(-1 * utcOffsetEnd, 'minutes').format('YYYY-MM-DD HH:mm:ss')
              }
            })
          }
        })

        if (payload === 'calendar') {
          commit('setCalendarEvents', events)
          commit('setArrayPartsToEvents', events)
        } else if (payload === 'upcoming') {
          commit('setUpcomingEvents', events)
          commit('setArrayPartsToEvents', events)
        } else {
          commit('setEvents', events)
        }

        commit('setReady', true, { root: true })
        if (payload === 'upcoming') {
          commit('setUpcomingLoading', false)
        } else {
          commit('setLoading', false, { root: true })
        }
      })
    },
  }
}
