import Request from '../units/request'

class API extends Request {
  /**
   * uploadImage
   */
  async uploadImg (params = {}) {
    try {
      let result = await this.axios('post', '//', params)
      if (result && result.status === 1) {
        return result
      } else {
        let err = {
          tip: '上传图片失败',
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

  /**
   * 获取商品数据
   */
  async getProduction (params = {}) {
    try {
      let result = await this.axios('get', '', params)
      if (result && (result.data instanceof Object) && result.http_code === 200) {
        return result.data.data || []
      } else {
        let err = {
          tip: '获取商品失败',
          data: params,
          response: result,
          url: ''
        }
        throw err
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 获取佣金数据
   */
  async getBalance (params = {}) {
    try {
      let result = await this.axios('get', '', params) 
      if (result && (result.data instanceof Object) && result.http_code === 200) {
        return result.data.data || []
      } else {
        let err = {
          tip: '获取佣金数据失败',
          response: params,
          data: result,
          url: ''
        }
        throw err
      }
    } catch (error) {
      throw error
    }
  }
}

export default new API()