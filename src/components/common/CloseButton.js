import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

const CloseButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name='ios-close-circle-outline' size={30} color='#FFF' />
    </TouchableOpacity>
  )
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object
}

export { CloseButton }
