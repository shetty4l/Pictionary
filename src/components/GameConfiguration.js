import _ from 'lodash'
import React, { Component } from 'react'
import { Text, TextInput, View, FlatList } from 'react-native'
import { Icon, Card, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import PlayerListItem from './PlayerListItem'
import TeamMembersListItem from './TeamMembersListItem'
import {
  playerNameUpdate,
  playerAdd,
  playerDelete,
  currentPlayerChange,
  initPlayingQueue,
  teamAUpdate,
  teamBUpdate,
  teamsUpdate,
  newWord
} from '../actions'

class GameConfiguration extends Component {
  constructor (props) {
    super(props)

    this.onNameChange = this.onNameChange.bind(this)
    this.onAddPlayerPressed = this.onAddPlayerPressed.bind(this)
    this.onTeamANameChange = this.onTeamANameChange.bind(this)
    this.onTeamBNameChange = this.onTeamBNameChange.bind(this)
    this.onBeginGame = this.onBeginGame.bind(this)
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

  async onBeginGame () {
    const { teamA, teamB } = this.props.teamMembers
    if ((teamA && teamA.length > 0) && (teamB && teamB.length > 0)) {
      await this.props.initPlayingQueue(this.props.teamMembers)
      this.props.currentPlayerChange(this.props.playingQueue.queue[0])
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
      playerCardStyle,
      playerInputContainerStyle,
      addButtonStyle,
      playerListCardStyle,
      normalTextStyle,
      teamNameTextStyle,
      outerTeamsCardContainerStyle,
      teamsViewContainerStyle,
      teamsCardContainerStyle,
      beginGameButtonStyle
    } = styles

    return (
      <View style={mainContainerStyle}>
        <Card
          containerStyle={playerCardStyle.containerStyle}
          wrapperStyle={playerCardStyle.wrapperStyle}
        >
          <Input
            shake
            label='Players'
            placeholder='Suyash'
            rightIcon={
              <Icon
                raised
                reverse
                name='add'
                size={15}
                color='#E63946'
                onPress={this.onAddPlayerPressed}
              />
            }
            containerStyle={{ flex: 1 }}
            labelStyle={{ color: '#FFF' }}
            inputStyle={{ color: '#1D3557' }}
            onChangeText={this.onNameChange}
            value={this.props.player.name}
          />
        </Card>

        <Card
          containerStyle={playerListCardStyle}
        >
          <FlatList
            data={this.props.playersList}
            extraData={this.props.playersList}
            renderItem={this.renderPlayerNames}
            keyExtractor={(player) => player.name}
          />
        </Card>

        <Card containerStyle={outerTeamsCardContainerStyle}>
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
              <Card containerStyle={teamsCardContainerStyle}>
                <FlatList
                  data={this.props.teamMembers.teamA}
                  extraData={this.props.teamMembers.teamA}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </Card>

              <Card containerStyle={teamsCardContainerStyle}>
                <FlatList
                  data={this.props.teamMembers.teamB}
                  extraData={this.props.teamMembers.teamB}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </Card>
            </View>
          </View>

          <View style={{ flex: 0.5 }}>
            <Button
              raised
              title='Begin Game'
              buttonStyle={beginGameButtonStyle}
              disabled={this.props.beginGameButtonDisabled}
              onPress={this.onBeginGame}
            />
          </View>
        </Card>
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
  currentPlayerChange: PropTypes.func,
  initPlayingQueue: PropTypes.func,
  playingQueue: PropTypes.object
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#F1FAEE'
  },
  playerCardStyle: {
    containerStyle: {
      marginTop: 45,
      backgroundColor: '#A8DADC',
      borderColor: '#A8DADC'
    },
    wrapperStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  playerInputContainerStyle: {
    flex: 4,
    backgroundColor: 'green'
  },
  addButtonStyle: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  playerListCardStyle: {
    height: 200,
    backgroundColor: '#A8DADC',
    borderColor: '#A8DADC'
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
  const { player, players, teamNames, teamMembers, playingQueue } = state
  const playersList = _.map(players, (val, name) => (val))
  var beginGameButtonDisabled = true

  if (playersList.length > 1) {
    styles.beginGameButtonStyle = { ...styles.beginGameButtonStyle, opacity: 0.2 }
    styles.beginGameButtonStyle = { ...styles.beginGameButtonStyle, shadowOpacity: 0.4 }
    beginGameButtonDisabled = false
  } else {
    styles.beginGameButtonStyle = { ...styles.beginGameButtonStyle, opacity: 0.2 }
    styles.beginGameButtonStyle = { ...styles.beginGameButtonStyle, shadowOpacity: 0 }
    beginGameButtonDisabled = true
  }

  return {
    player,
    players,
    playersList,
    playingQueue,
    teamNames,
    teamMembers,
    beginGameButtonDisabled }
}

export default connect(mapStateToProps, {
  playerNameUpdate,
  playerAdd,
  playerDelete,
  currentPlayerChange,
  initPlayingQueue,
  teamAUpdate,
  teamBUpdate,
  teamsUpdate,
  newWord
})(GameConfiguration)
