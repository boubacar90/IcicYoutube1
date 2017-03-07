import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Slider,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import Video from 'react-native-video';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import { nowPlayingUpdate } from '../actions';

const { width } = Dimensions.get('window');

const serverUrl = 'http://10.10.0.239:3050';

class NowPlaying extends Component {
  componentWillMount() {
    this.state = {
      maxSeconds: 0,
      minSeconds: 0,
      currentSeconds: 0,
      paused: false
    }

    console.log("new", this.state)

    //this.streamVideo('hhhooRlEKIM')
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.currentSeconds)
    //this.player.seek(Math.round(nextProps.currentSeconds))
  }

  streamVideo(id) {
    console.log(serverUrl + '/stream/' + id)
    fetch(serverUrl + '/stream/' + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log(res)
        this.setState({
          uri: id + '.mp4'
        })
        this.props.nowPlayingUpdate({prop: uri, value: id + '.mp4'})
      })
  }

  downloadVideo(id) {
    let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob
    .config({
      path : dirs.DocumentDir + '/videos/' + id + '.mp4'
    })
    .fetch('GET', serverUrl + '/download/' + id, {
      //some headers ..
    })
    .progress((received, total) => {
        console.log('progress', received / total)
    })
    .then((res) => {
      // the temp file path with file extension `png`
      console.log('The file saved to ', res.path())
      this.setState({ uri: res.path() })
      // Beware that when using a file path as Image source on Android,
      // you must prepend "file://"" before the file path
      //imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path()  : '' + res.path() }}/>
    })
  }

  /* Change le temps depuis le slider */
  setTime(seconds) {
    this.player.seek(Math.round(seconds))
    this.setState({
      dragging: false
    })
  }

  /* Change le temps depuis la vidéo */
  changeTime(time) {
    if (!this.state.dragging) {
      //console.log(time)
      this.setState({ currentSeconds: time.currentTime, maxSeconds: Math.round(time.playableDuration) });
      //this.props.nowPlayingUpdate({prop: 'currentSeconds', value: time.currentTime })
    }
  }

  renderPlayButton() {
    if(this.state.paused) {
      return(
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this.setState({ paused: !this.state.paused })}>
          <Icon style={{marginLeft: 10, fontSize: 50}} name="ios-play" />
        </TouchableOpacity>
      )
    }
    else {
      return(
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this.setState({ paused: !this.state.paused })}>
          <Icon style={{marginLeft: 10, fontSize: 50}} name="ios-pause" />
        </TouchableOpacity>
      )
    }
  }

  test() {

    //this.player.seek(this.props.currentSeconds);
  }

  render() {
    const seconds = this.state.currentSeconds
    const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    const numseconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60);

    var stringMinutes = numminutes.toString()
    var stringSeconds = numseconds.toString()

    if (numminutes < 10) { stringMinutes = '0' + stringMinutes }
    if (numseconds < 10) { stringSeconds = '0' + stringSeconds }

    const maxSeconds = this.state.maxSeconds
    const numminutesMax = Math.floor((((maxSeconds % 31536000) % 86400) % 3600) / 60);
    const numsecondsMax = Math.round((((maxSeconds % 31536000) % 86400) % 3600) % 60);

    var stringMinutesMax = numminutesMax.toString()
    var stringSecondsMax = numsecondsMax.toString()

    if (numminutesMax < 10) { stringMinutesMax = '0' + stringMinutesMax }
    if (numsecondsMax < 10) { stringSecondsMax = '0' + stringSecondsMax }



    return (
      <View style={styles.container}>
        <View style={styles.topControlsContainer}>
          <Text style={styles.timeTextStart}>{stringMinutes}:{stringSeconds}</Text>
          <Slider style={{flex: 1}} onSlidingComplete={() => this.setTime(this.state.currentSeconds)} maximumValue={this.state.maxSeconds} onValueChange={(newValue) => this.setState({ dragging: true, currentSeconds: newValue })} minimumValue={this.state.minSeconds} value={this.state.currentSeconds} />
          <Text style={styles.timeTextEnd}>{stringMinutesMax}:{stringSecondsMax}</Text>
          <Text style={{fontSize: 30, fontWeight: '500', paddingLeft: 10, marginBottom: 6}}>+</Text>
        </View>
        <Video source={{uri: serverUrl + '/' + this.props.uri}}
           ref={(ref) => {
             this.player = ref
           }}                                      // Store reference
           rate={1}                              // 0 is paused, 1 is normal.
           volume={1}                            // 0 is muted, 1 is normal.
           muted={false}                           // Mutes the audio entirely.
           paused={this.state.paused}                          // Pauses playback entirely.
           resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
           repeat={true}                           // Repeat forever.
           playInBackground={true}                // Audio continues to play when app entering background.
           playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
           progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
           onProgress={(time) => this.changeTime(time)}
           onLoad={() => this.test()}
           style={styles.backgroundVideo}
        />
        <View style={styles.bottomControlsContainer}>
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon name="ios-rewind" />
          </TouchableOpacity>
          {this.renderPlayButton()}
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-start'}}>
            <Icon name="ios-fastforward" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.nowPlayingUpdate({ prop: 'uri', value: 'l74GqdrP_lA.mp4' })}>
          <Text>URI</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 68,
    flex: 1,
  },
  backgroundVideo: {
    height: 220,
    width: width
  },
  topControlsContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeTextStart: {
    paddingRight: 10
  },
  timeTextEnd: {
    paddingLeft: 10
  },
  bottomControlsContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

const mapStateToProps = (state) => {
  const { uri, currentSeconds } = state.nowPlaying
  return { uri, currentSeconds }
}

export default connect(mapStateToProps, { nowPlayingUpdate })(NowPlaying);
