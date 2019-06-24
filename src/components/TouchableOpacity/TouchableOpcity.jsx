import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import './TouchableOpacity.less'

export default class TouchableOpacity extends Component {
  static propTypes = {
    clickCallBack: PropTypes.func,
    text: PropTypes.string,
    className: PropTypes.string
  }
  handleTouchStart = () => {
    this.refs.btn.style.opacity = '0.3'
  }
  handleTOuchEnd = () => {
    this.refs.btn.style.opacity = '1'
    this.props.clickCallBack()
  }
  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextState)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render () {
    return (
      <div className={`btn-con ${this.props.className}`} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTOuchEnd} ref='btn'>{this.props.text || '确认'}</div>
    )
  }
}