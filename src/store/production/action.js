import * as type from './action-type'
import API from '@/api/api'

export const getProData = () => {
  return async dispatch => {
    try {
      let result = await API.getProduction()
      result.ap(item => {
        item.selectStatus = true
        item.selectNum = 0
        return item
      })
      dispatch({
        type: type.GETPRODUCTION,
        dataList: result
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const togSelectPro = index => {
  return {
    type: type.TOGGLESELECT,
    index
  }
}

export const editPro = (index, selectNum) => {
  return {
    type: type.EDITPRODUCTION,
    index,
    selectNum
  }
}

export const clearSelected = () => {
  return {
    type: type.CLEARSELECTED
  }
}