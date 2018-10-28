import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  posts: [],
  posts1: [],
  posts2: [],
  current: -1,
  menuid: 1,
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

const POLY_PATH = 'https://poly.googleapis.com/v1/assets?';
const POLY_GET = "https://poly.googleapis.com/v1/assets/";


export function listObj(apiKey,kw,varname) {
  // Fetch the top 5 posts from Google Poly
  const options = {
    keywords: kw,
    curated: true,
    format: 'GLTF2',
    key: apiKey,
    pageSize: 5,
  };
  options['keywords'] = "menu"
  var queryString = Object.keys(options)
    .map(k => `${k}=${options[k]}`)
    .join('&');
  fetch(POLY_PATH + queryString)
    .then(response => response.json())
    .then(body => {
      const entries = body.assets.map(asset => {
        const objSource = asset.formats.filter(
          format => format.formatType === 'GLTF2'
        )[0];
        return {
          id: asset.name,
          name: asset.displayName,
          author: asset.authorName,
          description: asset.description,
          source: objSource,
          preview: asset.thumbnail.url,
        };
      });

      State[varname] = entries;

      updateComponents();
    });

}
export function insertObj(apiKey,obj01,varname) {
  var keystr = "/?key=";
  fetch(POLY_GET + obj01 + keystr + apiKey)
    .then(response => response.json())
    .then(asset => {
      console.log('entry2',asset)
      const entry = {
          id: asset.name,
          name: asset.displayName,
          author: asset.authorName,
          description: asset.description,
          source: asset.formats.filter(
            format => format.formatType === 'GLTF2'
          )[0],
          preview: asset.thumbnail.url,
        };

      State[varname].push(entry) ;
      console.log('var',varname)
      console.log('posts',State.posts)
      //console.log('posts2',State.posts2)
      updateComponents();
    });

}

export function initialize(apiKey) {
  // Fetch the top 5 posts from Google Poly

  const obj01 = "1HpVP5w2x1D";
  const obj02 = "8ciDd9k8wha";
  const places = ["awKaTYlSN_S","5ASgNeRuMit","fWkKVpwLwN9","9f2pChLYng6"]
  const place02 = "3jcF27RDvOk";
  const menu01 =
  {
  Meal01: "enzdcnFjosN",
  Meal02: "3jcF27RDvOk",
  Toilet: "3EU_Af2k03w",
  Earth: "53DjTbNlu9z",
  hammer: "1Fwroo2PYGl",
  Gift: "8eJfmMDsvso",
  Movie02: "8e_b2DTysDE",
  Movie02: "6RNCP1PTavR"
};



  State.posts = [
    {id: 1, name: "Toilet", preview: "toilet_pic.png"},
    {id: 2, name: "Travel", preview: "earth_texture.jpg"},
    {id: 3, name: "Auction", preview: "hammar_pic.png"},
    {id: 4, name: "Meal", preview: "meal_pic.png"},
    {id: 5, name: "Shopping", preview: "gift_pic.png"},
    {id: 6, name: "Movie", preview: ""},
  ]
  places.map(plc => insertObj(apiKey,plc,'ß'))
  State.menuid = 1

}

export function setCurrent(value) {
  console.log("store", value)
  State.current = value;
  updateComponents();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      posts: State.posts,
      posts1: State.posts1,
      posts2: State.posts2,
      current: State.current,
      menuid: State.menuid
    };

    _listener = () => {
      this.setState({
        posts: State.posts,
        posts1: State.posts1,
        posts2: State.posts2,
        current: State.current,
        menuid: State.menuid
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          posts={this.state.posts}
          posts1={this.state.posts1}
          posts2={this.state.posts2}
          current={this.state.current}
          menuid={this.state.menuid}
        />
      );
    }
  };
}
