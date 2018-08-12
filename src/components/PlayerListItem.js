import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { playerDelete } from '../actions'

const PlayerListItem = ({ player, playerDelete, teamsUpdate, playersList }) => {
  const { playerNameTextStyle } = styles

  const onPress = () => {
    playerDelete(player.name)
  }

  return (
    <TouchableHighlight underlayColor='rgba(2,2,2,0.08)' onPress={onPress}>
      <View>
        <Text style={playerNameTextStyle}>• {player.name}</Text>
      </View>
    </TouchableHighlight>
  )
}

PlayerListItem.propTypes = {
  player: PropTypes.object,
  playerDelete: PropTypes.func,
  playersList: PropTypes.array,
  teamsUpdate: PropTypes.func
}

const styles = {
  playerNameTextStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#FFF'
  }
}

export default connect(null, { playerDelete })(PlayerListItem)
