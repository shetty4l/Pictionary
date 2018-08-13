import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const SCREEN_WIDTH = Dimensions.get('window').width

class Deck extends Component {
  renderCards () {
    const { data, timer } = this.props
    return data.map((player) => {
      return (
        <View key={player.name} style={styles.cardStyle}>
          {this.props.renderCard(player, timer)}
        </View>
      )
    })
  }

  render () {
    return (
      <View style={{ 'height': '100%' }}>
        {this.renderCards()}
      </View>
    )
  }
}

Deck.propTypes = {
  renderCard: PropTypes.func,
  data: PropTypes.array,
  timer: PropTypes.string
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%'
  }
}

export default Deck
