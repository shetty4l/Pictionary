import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types'
import { playerDelete } from '../actions'

class PlayerListItem extends Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
    this.onPress = this.onPress.bind(this)
    this.onLongPress = this.onLongPress.bind(this)
  }

  onPress () {
    this.setState({ checked: !this.state.checked })
  }

  onLongPress () {
    const { player, playerDelete } = this.props
    playerDelete(player.name)
  }

  render () {
    const { uncheckedContainerStyle, checkedContainerStyle, textStyle } = styles
    return (
      <View>
        <CheckBox
          center
          title={this.props.player.name}
          checkedTitle={`Delete ${this.props.player.name}?`}
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='#F1FAEE'
          checked={this.state.checked}
          onPress={this.onPress}
          onIconPress={this.onPress}
          onLongPress={this.onLongPress}
          onLongIconPress={this.onLongPress}
          containerStyle={this.state.checked ? checkedContainerStyle : uncheckedContainerStyle}
          textStyle={textStyle}
        />
      </View>
    )
  }
}

PlayerListItem.propTypes = {
  player: PropTypes.object,
  playerDelete: PropTypes.func
}

const styles = {
  uncheckedContainerStyle: {
    backgroundColor: '#457B9D',
    borderColor: '#457B9D'
  },
  checkedContainerStyle: {
    backgroundColor: '#1D3557',
    borderColor: '#1D3557'
  },
  textStyle: {
    color: '#F1FAEE'
  }
}

export default connect(null, { playerDelete })(PlayerListItem)
