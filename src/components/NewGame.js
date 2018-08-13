import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'
import { Text, Card, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { Font } from 'expo'

class NewGame extends Component {
  constructor (props) {
    super(props)
    this.state = { fontLoaded: false }
  }
  async componentWillMount () {
    await Font.loadAsync({
      'phosphate': require('../../assets/fonts/Phosphate-Inline-01.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  renderComponent () {
    const { mainContainerStyle, backgroundImageStyle, cardContainerStyle, buttonStyle } = styles

    let background = require('../../assets/images/background.png')
    let fontColor = 'rgb(0, 0, 0)'
    const hour = new Date().getHours()
    if (hour > 6 && hour < 18) {
      background = require('../../assets/images/background.png')
      fontColor = 'rgb(77, 63, 176)'
    } else {
      background = require('../../assets/images/background_night.png')
      fontColor = 'rgb(255, 197, 83)'
    }

    return (
      <View style={mainContainerStyle}>
        <ImageBackground
          source={background}
          style={backgroundImageStyle}
        >
          <Text
            style={{ color: fontColor, alignSelf: 'center' }}
            fontFamily='phosphate' h1
          >
            Pictionary
          </Text>
          <Card containerStyle={cardContainerStyle}>
            <Button
              raised
              title='New Game'
              buttonStyle={buttonStyle}
              onPress={() => Actions.config()}
            />
          </Card>
        </ImageBackground>
      </View>
    )
  }

  render () {
    if (this.state.fontLoaded) return this.renderComponent()
    else return <View />
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#F1FAEE'
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  cardContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent'
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
