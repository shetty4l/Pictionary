import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types'
import { teamChange } from '../actions'

class TeamMembersListItem extends Component {
  constructor (props) {
    super(props)

    this.state = { checked: false }
    this.onPress = this.onPress.bind(this)
    this.onLongPress = this.onLongPress.bind(this)
  }

  onPress () {
    this.setState({ checked: !this.state.checked })
  }

  onLongPress () {
    this.props.teamChange(this.props.player)
  }

  render () {
    const { uncheckedContainerStyle, checkedContainerStyle, textStyle } = styles
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <CheckBox
          center
          title={this.props.player.name}
          iconRight={this.props.player.team === 1}
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon={this.props.player.team ? 'chevron-right' : 'chevron-left'}
          checkedColor='#F1FAEE'
          uncheckedColor='#E63946'
          checked={this.state.checked}
          onPress={this.onPress}
          onIconPress={this.onPress}
          onLongPress={this.onLongPress}
          onLongIconPress={this.onLongPress}
          containerStyle={this.state.checked ? checkedContainerStyle : uncheckedContainerStyle}
          textStyle={this.state.checked ? textStyle.checked : textStyle.unchecked}
        />
      </View>
    )
  }
}

TeamMembersListItem.propTypes = {
  player: PropTypes.object,
  teamChange: PropTypes.func
}

const styles = {
  uncheckedContainerStyle: {
    backgroundColor: '#F1FAEE',
    borderColor: '#F1FAEE'
  },
  checkedContainerStyle: {
    backgroundColor: '#1D3557',
    borderColor: '#1D3557'
  },
  textStyle: {
    unchecked: {
      color: '#E63946'
    },
    checked: {
      color: '#F1FAEE'
    }
  }
}

export default connect(null, { teamChange })(TeamMembersListItem)
