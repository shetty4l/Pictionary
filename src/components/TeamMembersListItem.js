import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { teamChange } from '../actions'

class TeamMembersListItem extends Component {
  constructor (props) {
    super(props)

    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    this.props.teamChange(this.props.player)
  }

  render () {
    const { playerNameTextStyle } = styles

    return (
      <TouchableHighlight underlayColor='rgba(2,2,2,0.08)' onPress={this.onPress}>
        <View style={{ alignItems: 'center' }}>
          <Text style={playerNameTextStyle}>{this.props.player.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

TeamMembersListItem.propTypes = {
  player: PropTypes.object,
  teamChange: PropTypes.func
}

const styles = {
  playerNameTextStyle: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#FFF'
  }
}

export default connect(null, { teamChange })(TeamMembersListItem)
