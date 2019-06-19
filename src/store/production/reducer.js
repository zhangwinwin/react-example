import * as type from './action-type'
import Immediate from 'immutable'

let defaultState = {
  dataList: []
}

export const proData = (state = defaultState, action) => {
  let imuDataLsit
  let imuItem
  switch (action.type) {
    case type.GETPRODUCTION:
      return {...state, ...action}
    case type.TOGGLESELECT:
      imuDataLsit = Immediate.List(state.dataList)
      imuItem = Immediate.Map(state.dataList[action.index])
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectstatus'))
      imuDataLsit = imuDataLsit.set(action.index, imuItem)
      return {...state, ...{dataList: imuDataLsit.toJS()}}
    case type.EDITPRODUCTION:
      imuDataLsit = Immediate.List(state.dataList)
      imuItem = Immediate.Map(state.dataList[action.index])
      imuItem = imuItem.set('selectNum', action.selectNum)
      imuDataLsit = imuDataLsit.set(action.index, imuItem)
      return {...state, ...{dataList: imuDataLsit.toJS()}}
    case type.CLEARSELECTED:
      imuDataLsit = imuDataLsit.fromJS(state.dataLsit)
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataLsit = Immediate.update(i, item => {
          item = item.set('selectStatus', false)
          item = item.set('selectNum', 0)
          return item
        })
      }
      return {...state, ...{dataList: imuDataLsit.toJS()}}
    default:
      return state
  }
}