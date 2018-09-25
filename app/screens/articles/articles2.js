import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import {SocialBar} from '../../components';
import {data} from '../../data';
let moment = require('moment');

export class Articles2 extends React.Component {
  static navigationOptions = {
    title: ''.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.data = data.getArticles('post');
    this.state = {
      viewedItems: [],
    };

    this.renderItem = this._renderItem.bind(this);
    this.registerViewedItem = this.registerViewedItem.bind(this);
    this.isItemViewed = this.isItemViewed.bind(this);
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  registerViewedItem(itemId){
    newViewItems = this.state.viewedItems.slice()
    // console.log("newViewItems from state:\n" + newViewItems)
    // console.log("Registering viewed item: " + itemId)
    newViewItems.push(itemId)
    // console.log("newViewItems now:\n" + newViewItems)
    // console.log("Setting new state.")
    // console.log("State before: " + this.state.viewedItems)
    this.setState(
      { viewedItems: newViewItems }
    );
    // console.log("State after: " + this.state.viewedItems)
    this.props.navigation.navigate('Article', {id: itemId})
  }

  isItemViewed(itemId){
    // console.log("Has item " + itemId + " been viewed already?")
    // console.log("Checking:\n" + this.state.viewedItems)
    for(let item of this.state.viewedItems){
      // console.log(item + " (" + item.className + ") === " + itemId + " (" + itemId.className + ") ?")
      if(item === itemId){
        // console.log(item + " === " + itemId + " (has been viewed).")
        // console.log("Yes")
        return true
      }
    }
    // console.log("No")
    return false
  }

  _renderItem(info) {

    var alreadyViewed = this.isItemViewed(info.item.id)
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.registerViewedItem(info.item.id)}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <ImageBackground rkCardImg source={info.item.photo}>
            <View style={{backgroundColor: (alreadyViewed ? 'rgba(124,252,0,0.7)' : 'rgba(256,256,256,0.0)'), flex: 1}}>

              <View rkCardImgOverlay rkCardContent style={styles.overlay}>
                <RkText rkType={'header4 inverseColor'}>{info.item.title}</RkText>
                { info.item.header ? <RkText rkType='header6 inverseColor'>{info.item.header}</RkText> : <View/> }
                <RkText style={styles.time} rkType='secondary2 inverseColor'>{ alreadyViewed ? '' : 'Takes approximately ' + info.item.time}</RkText>
              </View>
            </View>
          </ImageBackground>
          <View rkCardFooter>
            { alreadyViewed ? <RkText rkType='space'>DONE</RkText> : <RkText rkType='space'>Go ></RkText> }
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>

    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5
  }
}));