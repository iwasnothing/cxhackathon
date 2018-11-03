import * as React from 'react';
import {Animated, View,asset,StyleSheet,Text,VrButton} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
import {connect,setVar} from './Store';

import GazeButton from "react-360-gaze-button";
import {Environment, NativeModules, staticResourceURL} from 'react-360';
const {VideoModule} = NativeModules;
const {MyModule} = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class ModelView extends React.Component {

  state = {
    rotation: new Animated.Value(90),
  };
  //rotation = new Animated.Value(0);
  //var rotation = 0

  componentWillReceiveProps(nextProps) {
    console.log("timer ", this.state.rotation);
    console.log("next ", nextProps.current);
    if (nextProps.current !== this.props.current) {
      console.log("start ", nextProps.current);
      this.state.rotation.setValue(90);
      Animated.timing(this.state.rotation, {toValue: 360, duration: 20000}).start();
    } else {
      console.log("next ", nextProps.current);
      //this.state.rotation.setValue(90);
    }
  }

  render() {

    if (!this.props.posts || this.props.current < 0) {
      //Environment.clearBackground();
      return (
        <View>
          <View style={{transform: [{translate: [-23, 8, 0]},{scaleX: 0.1},{scaleY: 0.1}] }}>
            <Text style={{fontSize: 6, textAlign: 'center'}} >Welcome, Mr. Lee</Text>
          </View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}] }}
          />
          <AnimatedEntity
            style={{transform: [{scaleX: 0.3},{scaleY: 0.3},{rotateX: 0},{rotateY: 90}] }}
            source={{gltf2: asset('Jet.gltf')}}
          />


        </View>
      );
    } else if (this.props.current == 0 ) {
      console.log("model", this.props.current);
      //Environment.clearBackground();
      return (
        <View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}]}}
          />
          <AnimatedEntity
            style={{transform: [{scaleX: 0.4},{scaleY: 0.4},{rotateX: 270},{rotateY: 0},{rotateZ: 180}] }}
            source={{gltf2: asset('Jet.gltf')}}
          />
        </View>
      );
    } else if (this.props.current == 1 ) {
      console.log("model", this.props.current);
      //Environment.clearBackground();
      return (
        <View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}]}}
          />
          <AnimatedEntity
            style={{transform: [{scaleX: 6},{scaleY: 6},{rotateY: this.state.rotation}] }}
            source={{     obj: asset('beer.obj'),
                          mtl: asset('beer.mtl')}}
          />
        </View>
      );

    } else if (this.props.current == 2 ) {
      //Environment.clearBackground();

      if ( !this.props.menuid || this.props.menuid == 1) {
          //Environment.clearBackground();
          console.log("model 1 ", this.props.current);
          console.log("menu 1 ", this.props.menuid);
          return (
            <View>
              <AmbientLight intensity={1.0} color={'#ffffff'} />
              <PointLight
                intensity={0.4}
                style={{transform: [{translate: [0, 4, -1]}]}}
              />
              <AnimatedEntity
                style={{transform: [{scaleX: 6},{scaleY: 6},{rotateY: this.state.rotation},{rotateX: -3}] }}
                source={{     obj: asset('meal01.obj'),
                              mtl: asset('meal01.mtl'),}}
              />
            </View>
          );
      } else {
        //Environment.clearBackground();
        console.log("model 2 ", this.props.current);
        return (
          <View>
            <AmbientLight intensity={1.0} color={'#ffffff'} />
            <PointLight
              intensity={0.4}
              style={{transform: [{translate: [0, 4, -1]}]}}
            />
            <AnimatedEntity
              style={{transform: [{scaleX: 6},{scaleY: 6},{rotateY: this.state.rotation},{rotateX: -3}] }}
              source={{     obj: asset('meal02.obj'),
                            mtl: asset('meal02.mtl'),}}
            />
          </View>
        );

      }
    } else if (this.props.current == 3 ) {
      console.log("model", this.props.current);
      return (
        <View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}]}}
          />
          <AnimatedEntity
            style={{transform: [{scaleX: 0.6},{scaleY: 0.6},{rotateY: this.state.rotation},{rotateZ: 45}] }}
            source={{     obj: asset('PerfumeBottle.obj'),
                          mtl: asset('PerfumeBottle.mtl'),}}
          />
        </View>
      );

    } else if (this.props.current == 4 ) {
      //NativeModules.CustomLinkingModule.openURL('https://example.net')
      //MyModule.leftP.resize(0,0);
      //MyModule.rightP.resize(0,0);



      MyModule.clear_surface();
      Environment.clearBackground();
      Environment.setBackgroundVideo('myplayer');
      VideoModule.resume('myplayer'); // Start playback
      console.log("movie")
      return (
        <View>
        <VrButton><View><Text> </Text></View></VrButton>
        </View>
      );
    } else {
      console.log("model 5 ", this.props.current);
      return (
        <View>
        <VrButton><View><Text> </Text></View></VrButton>
        </View>
      )
    }

  }
}

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
});

const ConnectedModelView = connect(ModelView);

export default ConnectedModelView;
