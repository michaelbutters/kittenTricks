import React from 'react';
import {
  FlatList,
  View,
  Image,
} from 'react-native';
import {
  RkCard, RkButton,
  RkText, RkStyleSheet
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {SocialBar} from '../../components/socialBar';
import {data} from '../../data';
import {FontAwesome} from '../../assets/icons';

let moment = require('moment');

export class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.data = data.getArticles('post');
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {

    let image;
    if(info.item.photo){
      image = <Image rkCardImg source={info.item.photo}/>           
    }
    else {
      image = <RkText />
    }

    let description;
    if(info.item.text){
      description = <View rkCardContent><RkText rkType='primary3'>{info.item.text}</RkText></View>

    }
    else {
      description = <RkText />
    }


    return (
      <RkCard style={styles.card}>
        <View rkCardHeader>
          <View>
            <RkText rkType='header4'>{FontAwesome.check} {info.item.header}</RkText>
            <RkText rkType='primary3'>{info.item.subtitle}</RkText>
          </View>
        </View>
        { description }
        { image }
        <View rkCardFooter>
          <SocialBar/>
        </View >
      </RkCard>
    )
  }

  render() {
    return (
      <FlatList data={this.data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.container}/>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16
  }
}));