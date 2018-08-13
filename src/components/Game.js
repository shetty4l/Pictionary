import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Icon, Card } from 'react-native-elements'
import PropTypes from 'prop-types'
import Deck from './Deck'

import {
  resetPlayer,
  currentPlayerChange,
  initPlayingQueue,
  updatePlayer,
  newWord,
  updateWord,
  startTimer,
  resetTimer
} from '../actions'

const SCREEN_HEIGHT = Dimensions.get('window').height

class Game extends Component {
  constructor (props) {
    super(props)

    this.onCloseButtonPressed = this.onCloseButtonPressed.bind(this)
    this.onStartTimer = this.onStartTimer.bind(this)
    this.onResetTimer = this.onResetTimer.bind(this)
    this.onNextButton = this.onNextButton.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onFail = this.onFail.bind(this)
  }

  componentWillMount () {
    // await this.props.currentPlayerChange(this.props.playingQueue.queue[0])
    // this.props.updateWord(this.props.word)
  }

  onCloseButtonPressed () {
    this.props.resetPlayer()
    Actions.newGame({ type: 'reset' })
  }

  async getNewWord () {
    // const { solved, failed } = this.props.player
    // const currentConfig = { solved, failed }
    // await this.props.newWord(currentConfig, this.props.playingQueue.wordsAlreadyAppeared)
  }

  async onStartTimer () {
    this.props.startTimer()

    if (this.props.word.word === this.props.word.stylizedWord.toLowerCase()) {
      this.getNewWord()
    }
  }

  async onResetTimer () {
    this.props.resetTimer()
  }

  async onNextButton () {
    this.onResetTimer()

    if (this.props.word.word === this.props.word.stylizedWord.toLowerCase()) {
      await this.getNewWord()
      await this.props.updateWord(this.props.word)
      this.props.currentPlayerChange(this.props.playingQueue.queue[0])
    } else {
      await this.props.updateWord(this.props.word)
      await this.props.currentPlayerChange(this.props.playingQueue.queue[0])
    }
  }

  async onSuccess () {
    const { player } = this.props
    const { category } = player.word
    const scoreEntry = { category, result: 'solved' }
    await this.props.updatePlayer(player, this.props.playingQueue.wordsAlreadyAppeared, scoreEntry)
    this.props.currentPlayerChange(this.props.playingQueue.queue[0])
    // this.onNextButton()
  }

  async onFail () {
    const { player } = this.props
    const { category } = player.word
    const scoreEntry = { category, result: 'failed' }
    await this.props.updatePlayer(player, this.props.playingQueue.wordsAlreadyAppeared, scoreEntry)
    this.props.currentPlayerChange(this.props.playingQueue.queue[0])
    // this.onNextButton()
  }

  renderCard (player, timer) {
    const {
      wordContainerStyle,
      wordTextStyle,
      timerTextStyle
    } = styles

    return (
      <Card
        flexDirection='column'
        containerStyle={wordContainerStyle}
        wrapperStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}
      >
        <Text style={wordTextStyle}>{player.word.word}</Text>
        <Text style={timerTextStyle}>{timer}</Text>
      </Card>
      // {/* <CardContainer style={wordContainerStyle}>
      //   <Text style={wordTextStyle}>{player.word.word}</Text>
      //   <Text style={timerTextStyle}>{timer}</Text>
      // </CardContainer> */}
    )
  }

  render () {
    const {
      mainContainerStyle,
      closeButtonStyle,
      playerTurnTextStyle,
      actionButtonsContainerStyle
    } = styles

    return (
      <View style={mainContainerStyle}>
        <View style={closeButtonStyle}>
          <Icon
            reverse
            name='close'
            size={10}
            onPress={this.onCloseButtonPressed}
          />
        </View>

        <View>
          <Text style={playerTurnTextStyle}>{this.props.player.name}'s Turn</Text>
        </View>

        <View style={{ height: SCREEN_HEIGHT / 2.5 }}>
          <Deck
            data={this.props.playingQueue.queue}
            renderCard={this.renderCard}
            timer={this.props.timer}
          />
        </View>

        <View style={[actionButtonsContainerStyle, { marginTop: 30, justifyContent: 'center' }]}>
          <Icon
            name='close'
            color='#aa2e25'
            size={30}
            onPress={this.onFail}
            reverse
            raised
          />
          <Icon
            name='check-circle'
            color='#4caf50'
            size={30}
            onPress={this.onSuccess}
            reverse
            raised
          />
        </View>
        <View style={[actionButtonsContainerStyle, { justifyContent: 'space-between' }]}>
          <Icon
            reverse
            raised
            name='timer-off'
            size={30}
            onPress={this.onResetTimer}
          >
            Reset
          </Icon>
          <Icon
            reverse
            raised
            name='timer'
            size={30}
            onPress={this.onStartTimer}
          >
              Start
          </Icon>
        </View>
      </View>
    )
  }
}

Game.propTypes = {
  updateWord: PropTypes.func,
  word: PropTypes.object,
  startTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  timer: PropTypes.string,
  stylizedWord: PropTypes.string,
  currentPlayerChange: PropTypes.func,
  player: PropTypes.object,
  resetPlayer: PropTypes.func,
  updatePlayer: PropTypes.func,
  playingQueue: PropTypes.object
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  closeButtonStyle: {
    marginTop: 40,
    marginLeft: 20
  },
  playerTurnTextStyle: {
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 40,
    color: '#FFF'
  },
  wordContainerStyle: {
    height: '100%',
    borderRadius: 5
  },
  wordTextStyle: {
    fontSize: 48,
    alignSelf: 'center',
    color: '#000'
  },
  timerTextStyle: {
    fontSize: 36,
    alignSelf: 'center'
  },
  actionButtonsContainerStyle: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20
  },
  actionButtonStyle: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  nextButtonStyle: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 30,
    width: '45%'
  }
}

const mapStateToProps = (state) => {
  const { category } = state.player.word
  const { wordContainerStyle } = styles

  if (category === 'easy') {
    styles.wordContainerStyle = { ...wordContainerStyle, backgroundColor: '#FFC107' }
  } else if (category === 'medium') {
    styles.wordContainerStyle = { ...wordContainerStyle, backgroundColor: '#009688' }
  } else if (category === 'hard') {
    styles.wordContainerStyle = { ...wordContainerStyle, backgroundColor: '#673AB7' }
  }

  return state
}

export default connect(mapStateToProps, {
  resetPlayer,
  currentPlayerChange,
  initPlayingQueue,
  updatePlayer,
  newWord,
  updateWord,
  startTimer,
  resetTimer
})(Game)
