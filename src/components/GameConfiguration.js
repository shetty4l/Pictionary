import _ from 'lodash'
import React, { Component } from 'react'
import { Text, TextInput, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import PlayerListItem from './PlayerListItem'
import TeamMembersListItem from './TeamMembersListItem'
import { CardContainer, Input, AddButton, Button } from './common'
import {
  playerNameUpdate, playerAdd, playerDelete, teamAUpdate, teamBUpdate, teamsUpdate, newWord
} from '../actions'

class GameConfiguration extends Component {
  constructor (props) {
    super(props)

    this.onNameChange = this.onNameChange.bind(this)
    this.onAddPlayerPressed = this.onAddPlayerPressed.bind(this)
    this.onTeamANameChange = this.onTeamANameChange.bind(this)
    this.onTeamBNameChange = this.onTeamBNameChange.bind(this)
    this.onBeginGame = this.onBeginGame.bind(this)

    const INITIAL_CONFIG = {
      solved: { easy: 0, medium: 0, hard: 0 },
      failed: { easy: 0, medium: 0, hard: 0 }
    }
    props.newWord(INITIAL_CONFIG, [])
  }

  onNameChange (text) {
    this.props.playerNameUpdate(text)
  }

  async onAddPlayerPressed () {
    const { name } = this.props.player
    if (name && /^[A-Za-z]*$/.test(name)) {
      await this.props.playerAdd(this.props.player)
      this.props.playerNameUpdate('')
    }
  }

  onTeamANameChange (text) {
    this.props.teamAUpdate(text)
  }

  onTeamBNameChange (text) {
    this.props.teamBUpdate(text)
  }

  onBeginGame () {
    const { teamA, teamB } = this.props.teamMembers
    if ((teamA && teamA.length > 0) && (teamB && teamB.length > 0)) {
      Actions.game()
    }
  }

  renderPlayerNames ({ item }) {
    return (
      <PlayerListItem
        player={item}
      />
    )
  }

  renderTeamMembers ({ item }) {
    return (
      <TeamMembersListItem
        player={item}
      />
    )
  }

  render () {
    const {
      mainContainerStyle,
      playerCardContainerStyle,
      playerInputContainerStyle,
      addButtonStyle,
      playerListCardContainerStyle,
      normalTextStyle,
      teamNameTextStyle,
      outerTeamsCardContainerStyle,
      teamsViewContainerStyle,
      teamsCardContainerStyle,
      beginGameButtonStyle
    } = styles

    return (
      <View style={mainContainerStyle}>
        <CardContainer style={playerCardContainerStyle}>
          <Input
            label='Players'
            placeholder='Suyash'
            onChangeText={this.onNameChange}
            value={this.props.player.name}
            parentStyles={{
              parentContainerStyle: playerInputContainerStyle,
              parentLabelStyle: { color: '#FFF' },
              parentInputStyle: { color: '#FFF' }
            }}
          />
          <View style={addButtonStyle}>
            <AddButton onPress={this.onAddPlayerPressed} />
          </View>
        </CardContainer>

        <CardContainer style={playerListCardContainerStyle}>
          <FlatList
            data={this.props.playersList}
            extraData={this.props.playersList}
            renderItem={this.renderPlayerNames}
            keyExtractor={(player) => player.name}
          />
        </CardContainer>

        <CardContainer style={outerTeamsCardContainerStyle}>
          <View style={{ flex: 1 }}>
            <Text style={[normalTextStyle, { paddingLeft: 20 }]}>Team Names:</Text>
            <TextInput
              placeholder='Team A'
              autoCapitalize={'words'}
              style={[normalTextStyle, teamNameTextStyle]}
              onChangeText={this.onTeamANameChange}
              value={this.props.teamNames.teamAName}
            />
            <TextInput
              placeholder='Team B'
              autoCapitalize={'words'}
              style={[normalTextStyle, teamNameTextStyle]}
              onChangeText={this.onTeamBNameChange}
              value={this.props.teamNames.teamBName}
            />
          </View>

          <View style={{ flex: 1.5 }}>
            <View style={teamsViewContainerStyle}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={normalTextStyle}>{this.props.teamNames.teamAName}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={normalTextStyle}>{this.props.teamNames.teamBName}</Text>
              </View>
            </View>

            <View style={teamsViewContainerStyle}>
              <CardContainer style={teamsCardContainerStyle}>
                <FlatList
                  data={this.props.teamMembers.teamA}
                  extraData={this.props.teamMembers.teamA}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </CardContainer>

              <CardContainer style={teamsCardContainerStyle}>
                <FlatList
                  data={this.props.teamMembers.teamB}
                  extraData={this.props.teamMembers.teamB}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </CardContainer>
            </View>
          </View>

          <View style={{ flex: 0.5 }}>
            <Button
              disabled={this.props.beginGameButtonDisabled}
              style={{ buttonStyle: beginGameButtonStyle, textStyle: { color: '#FFF' } }}
              onPress={this.onBeginGame}
            >
              Begin Game
            </Button>
          </View>
        </CardContainer>
      </View>
    )
  }
}

GameConfiguration.propTypes = {
  playerNameUpdate: PropTypes.func,
  playerAdd: PropTypes.func,
  player: PropTypes.object,
  playersList: PropTypes.array,
  name: PropTypes.string,
  teamAUpdate: PropTypes.func,
  teamBUpdate: PropTypes.func,
  teamNames: PropTypes.object,
  teamMembers: PropTypes.object,
  beginGameButtonDisabled: PropTypes.bool,
  newWord: PropTypes.func
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#282B28'
  },
  playerCardContainerStyle: {
    marginTop: 45,
    height: 60,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#A24936',
    borderColor: '#A24936'
  },
  playerInputContainerStyle: {
    flex: 4
  },
  addButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  playerListCardContainerStyle: {
    height: 200,
    backgroundColor: '#282B28',
    borderColor: '#A24936'
  },
  normalTextStyle: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#FFF'
  },
  outerTeamsCardContainerStyle: {
    backgroundColor: '#282B28',
    borderColor: '#A24936',
    flex: 0.98,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  teamNameTextStyle: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#A24936',
    borderColor: '#A24936'
  },
  teamsViewContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  teamsCardContainerStyle: {
    flex: 1,
    minHeight: 150,
    flexDirection: 'column',
    backgroundColor: '#282B28',
    borderColor: '#A24936'
  },
  beginGameButtonStyle: {
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4
  }
}

const mapStateToProps = (state) => {
  const { player, players, teamNames, teamMembers } = state
  const playersList = _.map(players, (val, name) => (val))
  var beginGameButtonDisabled = true

  if (playersList.length > 1) {
    styles.beginGameButtonStyle.opacity = 1
    styles.beginGameButtonStyle.shadowOpacity = 0.4
    beginGameButtonDisabled = false
  } else {
    styles.beginGameButtonStyle.opacity = 0.2
    styles.beginGameButtonStyle.shadowOpacity = 0
    beginGameButtonDisabled = true
  }

  return { player, players, playersList, teamNames, teamMembers, beginGameButtonDisabled }
}

export default connect(mapStateToProps, {
  playerNameUpdate,
  playerAdd,
  playerDelete,
  teamAUpdate,
  teamBUpdate,
  teamsUpdate,
  newWord
})(GameConfiguration)
