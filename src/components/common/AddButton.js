import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name='ios-add-circle-outline' size={30} color='#83BCA9' />
    </TouchableOpacity>
  )
}

AddButton.propTypes = {
  onPress: PropTypes.func
}

export { AddButton }
