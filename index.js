import {AppRegistry} from 'react-360';
import TopPosts from './TopPosts';
import CurrentPost from './CurrentPost';
import ModelView from './ModelView';
import VCR from './VCR';
import * as Store from './Store';
Store.initialize('AIzaSyDqrbXobSdlW2ZRtA5aDoOV_USxGTdaMSs');

AppRegistry.registerComponent('TopPosts', () => TopPosts);
AppRegistry.registerComponent('CurrentPost', () => CurrentPost);
AppRegistry.registerComponent('ModelView', () => ModelView);
AppRegistry.registerComponent('VCR', () => VCR);
