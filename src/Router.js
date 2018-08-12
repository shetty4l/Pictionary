import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import NewGame from './components/NewGame'
import GameConfiguration from './components/GameConfiguration'
import Game from './components/Game'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene key='newGame' initial component={NewGame} />
        <Scene key='config' component={GameConfiguration} />
        <Scene key='game' component={Game} />
      </Scene>
    </Router>
  )
}

export default RouterComponent
