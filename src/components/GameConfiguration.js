import _ from 'lodash'
import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
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
      playerListCardStyle,
      normalTextStyle,
      outerTeamsCardStyle,
      teamsViewContainerStyle,
      teamsCardStyle,
      beginGameButtonStyle,
      beginGameButtonDisabledStyle
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

        <Card
          containerStyle={outerTeamsCardStyle.containerStyle}
          wrapperStyle={outerTeamsCardStyle.wrapperStyle}
        >
          <View>
            <Input
              shake
              label='Team Names'
              labelStyle={{ color: '#F1FAEE' }}
              inputStyle={{ color: '#1D3557' }}
              placeholder='Team A'
              autoCapitalize={'words'}
              containerStyle={{ width: '100%' }}
              onChangeText={this.onTeamANameChange}
              value={this.props.teamNames.teamAName}

            />
            <Input
              shake
              placeholder='Team B'
              autoCapitalize={'words'}
              inputStyle={{ color: '#1D3557' }}
              containerStyle={{ width: '100%' }}
              onChangeText={this.onTeamBNameChange}
              value={this.props.teamNames.teamBName}
            />
          </View>

          <View>
            <View style={teamsViewContainerStyle}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={normalTextStyle}>{this.props.teamNames.teamAName}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={normalTextStyle}>{this.props.teamNames.teamBName}</Text>
              </View>
            </View>

            <View style={teamsViewContainerStyle}>
              <Card
                containerStyle={[teamsCardStyle.containerStyle, { marginRight: 10 }]}
                wrapperStyle={teamsCardStyle.wrapperStyle}
              >
                <FlatList
                  data={this.props.teamMembers.teamA}
                  extraData={this.props.teamMembers.teamA}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </Card>

              <Card
                containerStyle={[teamsCardStyle.containerStyle, { marginLeft: 10 }]}
                wrapperStyle={teamsCardStyle.wrapperStyle}
              >
                <FlatList
                  data={this.props.teamMembers.teamB}
                  extraData={this.props.teamMembers.teamB}
                  renderItem={this.renderTeamMembers}
                  keyExtractor={(player) => player.name}
                />
              </Card>
            </View>
          </View>

          <View>
            <Button
              raised
              title='Begin Game'
              buttonStyle={[beginGameButtonStyle, this.props.beginGameButtonDisabled ? beginGameButtonDisabledStyle : null]}
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
    color: '#000'
  },
  outerTeamsCardStyle: {
    containerStyle: {
      backgroundColor: '#A8DADC',
      borderColor: '#A8DADC',
      flex: 0.98
    },
    wrapperStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    }
  },
  teamsViewContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  teamsCardStyle: {
    containerStyle: {
      flex: 1,
      minHeight: 150,
      backgroundColor: '#457B9D',
      borderColor: '#457B9D',
      margin: 0,
      padding: 0
    },
    wrapperStyle: {
      flexDirection: 'column'
    }
  },
  beginGameButtonStyle: {
    height: 50,
    backgroundColor: '#E63946',
    borderColor: '#E63946',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  beginGameButtonDisabledStyle: {
    opacity: 0.2,
    shadowOpacity: 0
  }
}

const mapStateToProps = (state) => {
  const { player, players, teamNames, teamMembers, playingQueue } = state
  const playersList = _.map(players, (val, name) => (val))
  let beginGameButtonDisabled = true

  if (playersList.length > 1) {
    beginGameButtonDisabled = false
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
