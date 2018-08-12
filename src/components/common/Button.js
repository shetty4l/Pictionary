import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children, style = {}, disabled }) => {
  const { buttonStyle, textStyle } = styles
  const { buttonStyle: parentButtonStyle, textStyle: parentTextStyle } = style
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[buttonStyle, parentButtonStyle]}
    >
      <Text style={[textStyle, parentTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool
}

const styles = {
  buttonStyle: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#3E5641',
    borderColor: '#A24936',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { Button }
