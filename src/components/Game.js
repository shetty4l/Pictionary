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
const EASY_COLOR = '#FFC107'
const MEDIUM_COLOR = '#009688'
const HARD_COLOR = '#673AB7'

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
    const { queue, wordsAlreadyAppeared, currentPlayerIndex } = this.props.playingQueue
    const scoreEntry = { category, result: 'solved' }
    await this.props.updatePlayer(player, wordsAlreadyAppeared, scoreEntry)
    this.props.currentPlayerChange(queue[currentPlayerIndex + 1])
    // this.onNextButton()
  }

  async onFail () {
    const { player } = this.props
    const { category } = player.word
    const { queue, wordsAlreadyAppeared, currentPlayerIndex } = this.props.playingQueue
    const scoreEntry = { category, result: 'failed' }
    await this.props.updatePlayer(player, wordsAlreadyAppeared, scoreEntry)
    this.props.currentPlayerChange(queue[currentPlayerIndex + 1])
    // this.onNextButton()
  }

  stylizeWord (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  renderCard (player, timer, stylizeWord) {
    const {
      wordContainerStyle,
      playerTurnTextStyle,
      wordTextStyle,
      timerTextStyle
    } = styles

    let color = null
    if (player.word.category === 'easy') color = EASY_COLOR
    else if (player.word.category === 'medium') color = MEDIUM_COLOR
    else if (player.word.category === 'hard') color = HARD_COLOR

    return (
      <Card
        flexDirection='column'
        containerStyle={[wordContainerStyle, { backgroundColor: color }]}
        wrapperStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}
      >
        <Text style={playerTurnTextStyle}>{player.name}'s Turn</Text>
        <Text style={wordTextStyle}>{stylizeWord(player.word.word)}</Text>
        <Text style={timerTextStyle}>{timer}</Text>
      </Card>
    )
  }

  render () {
    const {
      mainContainerStyle,
      closeButtonStyle,
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

        <View style={{ height: SCREEN_HEIGHT / 2.5 }}>
          <Deck
            data={this.props.playingQueue.queue}
            renderCard={this.renderCard}
            timer={this.props.timer}
            stylizeWord={this.stylizeWord}
            onSwipeRight={this.onSuccess}
            onSwipeLeft={this.onFail}
          />
        </View>

        <View style={[actionButtonsContainerStyle, { marginTop: 45, justifyContent: 'center' }]}>
          <Icon
            name='close'
            color='#aa2e25'
            size={40}
            onPress={this.onFail}
            reverse
            raised
          />
          <Icon
            name='check-circle'
            color='#4caf50'
            size={40}
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
    color: '#000'
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

const mapStateToProps = state => {
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
