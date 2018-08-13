import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { CardContainer, Button, CloseButton } from './common'
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

  render () {
    const {
      mainContainerStyle,
      closeButtonStyle,
      playerTurnTextStyle,
      wordContainerStyle,
      wordTextStyle,
      timerTextStyle,
      actionButtonsContainerStyle,
      actionButtonStyle,
      nextButtonStyle
    } = styles

    return (
      <View style={mainContainerStyle}>
        <CloseButton style={closeButtonStyle} onPress={this.onCloseButtonPressed} />
        <Text style={playerTurnTextStyle}>{this.props.player.name}'s Turn</Text>

        <CardContainer style={wordContainerStyle}>
          <Text style={wordTextStyle}>{this.props.player.word.word}</Text>
          <Text style={timerTextStyle}>{this.props.timer}</Text>
        </CardContainer>

        <View style={actionButtonsContainerStyle}>
          <Button
            style={{ buttonStyle: actionButtonStyle }}
            onPress={this.onResetTimer}
          >
            Reset
          </Button>
          <Button
            style={{ buttonStyle: actionButtonStyle }}
            onPress={this.onStartTimer}
          >
              Start
          </Button>
        </View>

        {/* <Button
          style={{ buttonStyle: nextButtonStyle }}
          onPress={this.onNextButton}
        >
          Next
        </Button> */}

        <Button
          style={{ buttonStyle: nextButtonStyle }}
          onPress={this.onSuccess}
        >
          Success
        </Button>

        <Button
          style={{ buttonStyle: nextButtonStyle }}
          onPress={this.onFail}
        >
          Fail
        </Button>

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
    backgroundColor: '#282B28'
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
    marginLeft: 20,
    marginRight: 20,
    height: '30%',
    borderRadius: 16,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  wordTextStyle: {
    fontSize: 36,
    alignSelf: 'center'
  },
  timerTextStyle: {
    fontSize: 24,
    alignSelf: 'center'
  },
  actionButtonsContainerStyle: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
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
