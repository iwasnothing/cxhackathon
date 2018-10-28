import * as React from 'react';
import {Animated, View,asset} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
import {connect} from './Store';


const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class ModelView extends React.Component {
  rotation = new Animated.Value(0);

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.rotation.setValue(0);
      Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
    }
  }

  render() {
    if (!this.props.posts || this.props.current < 0) {
      return (
        <View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}]}}
          />
          <AnimatedEntity
            source={{gltf2: asset('earth_obj.gltf')}}
          />
        </View>
      );
    } else if (this.props.current == 0 ) {
      console.log("model", this.props.current);
      return (
        <View>
          <AmbientLight intensity={1.0} color={'#ffffff'} />
          <PointLight
            intensity={0.4}
            style={{transform: [{translate: [0, 4, -1]}]}}
          />
          <AnimatedEntity
            style={{transform: [{scaleX: 0.5},{scaleY: 0.5}] }}
            source={{gltf2: asset('Toilet_01.gltf')}}
          />
        </View>
      );

    }
    const post = this.props.posts[this.props.current];
    const source = post.source;
    return (
      <View>
        <AmbientLight intensity={1.0} color={'#ffffff'} />
        <PointLight
          intensity={0.4}
          style={{transform: [{translate: [0, 4, -1]}]}}
        />
        <AnimatedEntity
          style={{transform: [{rotateY: this.rotation}]}}
          source={{gltf2: source.root.url}}
        />
      </View>
    );
  }
}

const ConnectedModelView = connect(ModelView);

export default ConnectedModelView;
