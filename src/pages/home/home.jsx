import react, { Component } from 'react'
import PropTypes from 'prop-types'
import API from '@/api/API'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import env from '@/env'
import { saveFormData, saveImg, clearData } from '@/store/home/action'
import { clearSelectd } from '@/store/production/action'
import Pubilcheader from '@/component/header/header'

class Home extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImg: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired,
  }

  /**
   * isToast：是否弹窗
   * TipText：弹窗显示的文字
   */
  state = {
    isToast: false,
    TipText: ''
  }

  /**
   * 已选择商品列表
   */
  selectedList = []

  handleInput = (type, event) => {
    let value = event.target.value
    switch (type) {
      case 'orderSum':
        value = value.replace(/\D/g, '')
      break
      case 'name':
      break
      case 'phoneNo':
        value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target)
      break
      default:
    }
    this.props.saveFormData(value, type)
  }

  uploadImage = async event => {
    try {
      let formdata = new FormData()
      formdata.append('file', event.target.files[0])
      let result = await API.uploadImg({data: formdata})
      this.props.saveImg(env.imgUrl + result.image_path)
    } catch (error) {
      console.error(error)
    }
  }
  // 提交表单
  sumitForm = () => {
    const {orderSum, name, phoneNo} = this.props.formData
    let alertTip = ''
    if(!orderSum.toString().length){
      alertTip = '请填写金额'
    }else if(!name.toString().length){
      alertTip = '请填写姓名'
    }else if(!phoneNo.toString().length){
      alertTip = '请填写正确的手机号'
    }else{
      alertTip = '添加数据成功'
      this.props.clearSelected()
      this.props.clearData()
    }
    this.setState({
      isToast: true,
      TipText: alertTip,
    })
  }
  
  // 关闭弹款
  closeAlert = () => {
    this.setState({
      isToast: false,
      TipText: '',
    })
  }
  
  // 初始化数据，获取已选择的商品
  initData = props => {
    this.selectedProList = []
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selectNum){
        this.selectedProList.push(item)
      }
    })
  }
  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){
    this.initData(this.props)
  }

  render () {
    return (
      <main className="home-container">
        <PubilcHeader title='首页' record />
        <p className='common-title'>请录入您的信息</p>
        <form className="home-form">
          <div className='home-form-tiem'>
            <span>销售金额:</span>
            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this, 'name')}/>
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input type="text" maxLength="13" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')}/>
          </div>
        </form>
      </main>
    )
  }
}