import React, { Component } from 'react'

export default function asyncCom (importCom) {
  class AsyncCom extends Component {
    constructor (props) {
      super(props);
      this.state = {
        Component: null
      };
    }
    async componentDidMount () {
      const { default: Component } = await importCom()
      this.setState({Component})
    }
    render () {
      const C = this.state.Component
      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncCom
}