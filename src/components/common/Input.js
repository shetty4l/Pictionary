import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput } from 'react-native'

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, parentStyles = {} }) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  const { parentInputStyle, parentLabelStyle, parentContainerStyle } = parentStyles

  return (
    <View style={[containerStyle, parentContainerStyle]}>
      <Text style={[labelStyle, parentLabelStyle]}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        autoCapitalize={'words'}
        placeholder={placeholder}
        style={[inputStyle, parentInputStyle]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  parentStyles: PropTypes.object
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export { Input }
