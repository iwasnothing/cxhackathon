import * as React from 'react';
import {Image, StyleSheet, Text, View, VrButton, asset} from 'react-360';
import {connect, setCurrent} from './Store';
import GazeButton from "react-360-gaze-button";

class PostButton extends React.Component {
  state = {
    hover: false,
    gazed: false,
  };


  setGazed = () => {
    this.setState({ gazed: true });
  };
  render() {

    return (
      <GazeButton
        duration={2000}
      //<VrButton
        style={styles.postButton}

        //onEnter={() => setCurrent(this.props.index)}
        //onExit={() => this.setState({hover: false})}
        onClick={() => setCurrent(this.props.index)}

        render={(remainingTime, isGazed) => (
        <View>

          <View style={styles.postButtonLabel}>
            <Text style={styles.postButtonName}>{this.props.name}</Text>
          </View>
          <Image style={styles.postButtonPreview} source={asset(this.props.preview)} />
        </View>
      )}
      />
    );
  }
}

const TopPosts = props => {

  if (!props.posts) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>

      {props.posts.map((post, i) => (
        <PostButton
          key={post.id}
          index={i}
          name={post.name}
          preview={post.preview}
        />
      ))}

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
  },
  postButton: {
    height: 100,
    backgroundColor: '#000000',
    overflow: 'hidden',
    transform: [{scaleX: 0.5},{scaleY: 0.5}]
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
  },

    panel: {
      // Fill the entire surface
      width: 1000,
      height: 600,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      justifyContent: "center",
      alignItems: "center"
    },
    greetingBox: {
      padding: 0,
      backgroundColor: "#000000",
      borderColor: "#639dda",
      borderWidth: 1
    },
    greeting: {
      fontSize: 8
    }

});

const ConnectedTopPosts = connect(TopPosts);

export default ConnectedTopPosts;
