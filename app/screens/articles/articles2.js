import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet, RkButton
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
    this.renderItem = this._renderItem.bind(this);
    this.registerViewedItem = this.registerViewedItem.bind(this);
    this.isItemViewed = this.isItemViewed.bind(this);
    this.numCompleteItemsAtStart = this.numCompleteItemsAtStart.bind(this)
    this.getCurrentWindow = this.getCurrentWindow.bind(this)

    this.totalData = data.getArticles('post');
    this.state = {
      totalData: this.totalData,
      viewedItems: [],
    };
  }

  componentWillMount() {
    var data = this.getCurrentWindow(this.state.totalData)
    this.setState({
      data: data
    })    
  }


  getCurrentWindow(totalList){
    var itemsToDisplay = totalList.slice()
    // Display the last 3 items and the next 7 items (10 in total)
    var numCompletesAtStart = this.numCompleteItemsAtStart(itemsToDisplay)
    if(numCompletesAtStart < 3){
      return itemsToDisplay.slice(0, numCompletesAtStart+2)
    }
    for(var i = 2; i < numCompletesAtStart; i++){
      // Remove the earliest list item
      itemsToDisplay.shift()
    }

    return itemsToDisplay.slice(0, 6)
  }

  numCompleteItemsAtStart(list){
    var num = 0;
    for(let item of list){
      if(this.isItemViewed(item.id)){
        num++;
      }
      else {
        break;
      }
    }
    return num;
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  registerViewedItem(itemId){
    newViewItems = this.state.viewedItems.slice()
    newViewItems.push(itemId)
    setTimeout(() => {
      this.setState(
        { viewedItems: newViewItems }
      )
    }, 1000);
    this.setState({
      data: this.getCurrentWindow(this.state.totalData)
    })
    this.props.navigation.navigate('Article', {id: itemId})
  }

  isItemViewed(itemId){
    for(let item of this.state.viewedItems){
      if(item === itemId){
        return true
      }
    }
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
            <View style={{backgroundColor: (alreadyViewed ? 'rgba(50,205,50,0.5)' : 'rgba(256,256,256,0.0)'), flex: 1}}>

              <View rkCardImgOverlay rkCardContent style={styles.overlay}>
                <RkText rkType={'header4 inverseColor'}>{info.item.title}</RkText>
                { info.item.header ? <RkText rkType='header6 inverseColor'>{info.item.header}</RkText> : <View/> }
                <RkText style={styles.time} rkType='secondary2 inverseColor'>{ alreadyViewed ? '' : 'Takes approximately ' + info.item.time}</RkText>
              </View>
            </View>
          </ImageBackground>
          <View rkCardFooter>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>
              <View style={{justifyContent: 'center', flexDirection: 'row', flex: 1}}>
                <RkText style={{textAlign: 'center'}} rkType={ (alreadyViewed ? 'success small' : 'info small') }>{ alreadyViewed ? 'COMPLETE ✓' : 'GO →'}</RkText>
              </View>
            </View>

          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={<View><ActivityIndicator size="large" color="#999999" animating = {true} /><RkText> </RkText><RkText> </RkText></View>}
          style={styles.container}/>
        
      </View>
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  time: {
    marginTop: 5
  }
}));
