import * as React from 'react';

import {Image, StyleSheet, Text, View, VrButton} from 'react-360';
import {connect} from './Store';
import {PostButton} from './TopPosts';

/**
 * Render a description of the currently-selected model.
 * Connected to the global store to receive inputs.
 */
const CurrentPost = props => {
  if (!props.posts) {
    return <View style={styles.wrapper} />;
  }
  if (props.current < 0) {
    return (
      <View style={styles.wrapper}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Select a Model</Text>
        </View>
      </View>
    );
  } else if (props.current == 0) {
    console.log("selct 0 ",props.current);
    var seatCol = ['A','B','C'];
    return (
      <View style={styles.wrapper}>
        <View style={{flex: 10, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Select your seat</Text>
        </View>

        {Array(8).fill().map((_, i) => (
        <View style={{flex: 10,flexDirection: 'row', justifyContent: 'center'}}>
        {seatCol.map( (a,j) => (
        <VrButton
          style={styles.postButton}
          onClick={() => console.log("select 1")}
          >
          <View style={styles.postButtonLabel}>
              <Text style={styles.postButtonName}>{i+1}{a}</Text>
          </View>
        </VrButton>
        )) }
        </View>
      ))}
      </View>
    );
  } else {
    console.log("selct 2 ",props.current);
    return (
      <View style={styles.wrapper}>
      <View style={{flex: 1, justifyContent: 'center'}}>

      </View>
    </View>
    );

  }
  const post = props.posts[props.current];
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{post.name}</Text>
      <Text style={styles.author}>{post.author}</Text>
      <Text style={styles.description}>{post.description}</Text>
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
const ConnectedCurrentPost = connect(CurrentPost);

export default ConnectedCurrentPost;
