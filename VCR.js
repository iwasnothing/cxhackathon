import * as React from 'react';

import {Image, StyleSheet, Text, View, VrButton,NativeModules} from 'react-360';
import {connect, setVar} from './Store';
import {PostButton} from './TopPosts';
import GazeButton from "react-360-gaze-button";
/**
 * Render a description of the currently-selected model.
 * Connected to the global store to receive inputs.
 */
const {VideoModule} = NativeModules;
const {MyModule} = NativeModules;


const VCR = props => {
//class CurrentPost extends React.Component {



    return (

        <View style={{flexDirection: 'row', height: 50, width: 900, padding: 10}}>
          <GazeButton
            duration={2000}
            style={styles.postButton}
            onClick={() => VideoModule.resume('myplayer')}
            render={(remainingTime, isGazed) => (
            <View style={styles.postButtonLabel}>
              <Text style={{textAlign: 'center'}}>Play</Text>
            </View>
            )}/>
            <GazeButton
              duration={2000}
              style={styles.postButton}
              onClick={() => VideoModule.pause('myplayer')}
            render={(remainingTime, isGazed) => (
              <View style={styles.postButtonLabel}>
                <Text style={{textAlign: 'center'}}>Pause</Text>
              </View>
              )}/>
              <GazeButton
                duration={2000}
                style={styles.postButton}
                onClick={() => MyModule.resume_surface() }
              render={(remainingTime, isGazed) => (
                <View style={styles.postButtonLabel}>
                  <Text style={{textAlign: 'center'}}>Quit</Text>
                </View>
                )}/>

      </View>
    );


};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#303050',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
  },
  author: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
  },

  postButton: {
    height: 120,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  postButtonInfo: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'column',
  },
  postButtonPreview: {
    width: '100%',
    height: 225,
  },
  postButtonInfoHover: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  postButtonLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  postButtonName: {
    fontSize: 24,
  },
  postButtonAuthor: {
    fontSize: 16,
  }
});
const ConnectedVCR = connect(VCR);

export default ConnectedVCR;
