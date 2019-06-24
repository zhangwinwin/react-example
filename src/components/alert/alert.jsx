import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import TouchableOpactity from '@/components/TouchableOpactity/TouchableOpactity'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './alert.less'

export default class Alert extends Component {
  static propTypes = {
    closeAlert: PropTypes.func.isRequired,
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired
  }

  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.Children)
    return childrenArray[0] || null
  }

  confirm = () => {
    this.props.closeAlert()
  }
  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(this.nextProps)) || !is(fromJS(this.state), fromJS(this.nextState))
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        component={this.FirstChild}
        transitionName='alert'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {
          this.props.alertStatus && <div className='alert-con'>
            <div className='alert-context'>
              <div className='alert-context-detail'></div>
                {this.props.alertTip}
                <TouchableOpactity className='confirm=-btn' clickCallBack={this.confirm}></TouchableOpactity>
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}