import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { CardContainer, Button } from './common'

const NewGame = () => {
  const { mainContainerStyle, cardContainerStyle, buttonStyle, textStyle } = styles
  return (
    <View style={mainContainerStyle}>
      <CardContainer style={cardContainerStyle}>
        <Button style={{ buttonStyle, textStyle }} onPress={() => Actions.config()}>
          New Game
        </Button>
      </CardContainer>
    </View>
  )
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  cardContainerStyle: {
    height: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#A24936',
    borderColor: '#A24936'
  },
  buttonStyle: {
    backgroundColor: '#3E5641',
    borderColor: '#3E5641',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  textStyle: {
    color: '#FFF'
  }
}

export default NewGame
