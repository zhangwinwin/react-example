import Request from '../units/request'

class API extends Request {
  /**
   * 获取记录数据
   * @method get
   * @return {promise}
   */
  async getRecord (params = {}) {
    try {
      let result = await this.axios('get', '')
      if (result && (result.data instanceof Object) && result.http_code === 200) {
        return result.data
      } else {
        let err ={
          response: result,
          data: params,
          url: ''
        }
        throw err
      }
    } catch (error) {
      throw error
    }
  }
}