import React from 'react'
import { View } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
// import { CardContainer, Button } from './common'

const NewGame = () => {
  const { mainContainerStyle, cardContainerStyle, buttonStyle } = styles
  return (
    <View style={mainContainerStyle}>
      <Card containerStyle={cardContainerStyle}>
        <Button
          raised
          title='New Game'
          buttonStyle={buttonStyle}
          onPress={() => Actions.config()}
        />
      </Card>
    </View>
  )
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F1FAEE'
  },
  cardContainerStyle: {
    height: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#1D3557',
    borderColor: '#1D3557'
  },
  buttonStyle: {
    backgroundColor: '#E63946',
    borderColor: '#E63946',
    height: 50,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  }
}

export default NewGame
