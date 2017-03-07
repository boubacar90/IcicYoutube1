import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { View, Text } from 'react-native';

/* Components */
import NowPlaying from './components/NowPlaying';
import SplashScreen from './components/SplashScreen';

const test = "Test"

const TabIcon = ({ selected, title, iconName }) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name={selected ? iconName : iconName + "-outline"} size={30} style={{color: selected ? 'brown' :'gray'}} />
      <Text style={{color: selected ? 'brown' :'gray', fontSize: 8}}>{title}</Text>
    </View>
  );
}

const RouterComponent = () => {
  return(
    <Router navigationBarStyle={styles.navigationBar} titleStyle={styles.titleStyle}>
      <Scene key="initial"
        tabs={true}
        tabBarStyle={{ backgroundColor: '#FFFFFF', borderTopWidth: 0.5, borderColor: 'lightgray' }}
      >
        {/* Tab and it's scenes */}
        <Scene key="search" title="Recherche" icon={TabIcon} iconName="ios-search">
          <Scene
            key="searchscreen"
            component={SplashScreen}
            title="Recherche"
          />
        </Scene>

        {/* Tab and it's scenes */}
        <Scene key="playlists" title="Playlists" icon={TabIcon} iconName="ios-list">
          <Scene
            key="playlistsscreen"
            component={SplashScreen}
            title="Playlists"
          />
        </Scene>

        {/* Tab and it's scenes */}
        <Scene key="home" title="Live" icon={TabIcon} iconName="ios-play">
          <Scene
            key="homescreen"
            component={NowPlaying}
            title={test}
          />
        </Scene>

        {/* Tab and it's scenes */}
        <Scene key="contact" title="Contact" icon={TabIcon} iconName="ios-contact">
          <Scene
            key="contactscreen"
            component={SplashScreen}
            title="Contact"
          />
        </Scene>
      </Scene>
    </Router>
  )
}

const styles = {
  navigationBar: {
    backgroundColor: 'brown',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowOpacity: 0.2,
    elevation: 2,
    borderBottomWidth: 0
  },
  titleStyle : {
    color: 'white'
  }
}

export default RouterComponent;
