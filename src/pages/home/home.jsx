import react, { Component } from 'react'
import propTypes from 'prop-types'

class Home extends Component {
  static propTypes = {
    formData: propTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired
  }

  state = {
    isToast: false,
    TipText: ''
  }

  selectedList = []
}