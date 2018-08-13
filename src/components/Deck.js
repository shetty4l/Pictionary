import React, { Component } from 'react'
import { View, Animated, LayoutAnimation, PanResponder, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_DURATION = 250

class Deck extends Component {
  constructor (props) {
    super(props)

    this.forceSwipe = this.forceSwipe.bind(this)
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })

    this.position = position
    this.panResponder = panResponder
    this.state = { index: 0 }
  }

  componentWillUpdate () {
    LayoutAnimation.spring()
  }

  forceSwipe (direction) {
    const x = (direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH) * 1.2
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_DURATION
    }).start(() => this.onSwipeCompletion(direction))
  }

  resetPosition () {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }

  async onSwipeCompletion (direction) {
    const { onSwipeRight, onSwipeLeft } = this.props
    await direction === 'right' ? onSwipeRight() : onSwipeLeft()
    this.position.setValue({ x: 0, y: 0 })
    this.setState({ index: this.state.index + 1 })
  }

  getCardStyle () {
    const rotate = this.position.x.interpolate({
      inputRange: [-1.5 * SCREEN_WIDTH, 0, 1.5 * SCREEN_WIDTH],
      outputRange: ['-30deg', '0deg', '30deg']
    })
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards () {
    const { data, timer, stylizeWord } = this.props
    return data.map((player, index) => {
      if (index < this.state.index) return null
      if (index === this.state.index) {
        return (
          <Animated.View
            key={index}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(player, timer, stylizeWord)}
          </Animated.View>
        )
      }

      return (
        <Animated.View
          key={index}
          style={[styles.cardStyle, { top: 10 * (index - this.state.index), zIndex: 5 }]}
        >
          {this.props.renderCard(player, timer, stylizeWord)}
        </Animated.View>
      )
    }).reverse()
  }

  render () {
    return (
      <View style={{ 'height': '100%' }}>
        {this.renderCards()}
      </View>
    )
  }
}

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {}
}

Deck.propTypes = {
  renderCard: PropTypes.func,
  stylizeWord: PropTypes.func,
  data: PropTypes.array,
  timer: PropTypes.string,
  onSwipeRight: PropTypes.func,
  onSwipeLeft: PropTypes.func
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%'
  }
}

export default Deck
