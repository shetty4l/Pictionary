import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

const CardContainer = ({ children, style }) => {
  return (
    <View style={[styles.cardContainerStyle, style]}>
      {children}
    </View>
  )
}

CardContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

const styles = {
  cardContainerStyle: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
}

export { CardContainer } //eslint-disable-line
