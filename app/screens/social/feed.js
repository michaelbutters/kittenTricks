import React from 'react';
import {
  FlatList,
  View,
  Image,
} from 'react-native';
import {
  RkCard, RkButton,
  RkText, RkStyleSheet, RkTheme
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {SocialBar} from '../../components/socialBar';
import {data} from '../../data';
import {FontAwesome} from '../../assets/icons';
import {
  ProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart
} from '../../components/';


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

    let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
    let card;

  // <View style={chartBlockStyles}>
  //   <AreaChart/>
  // </View>
  // <View style={chartBlockStyles}>
  //   <AreaSmoothedChart/>
  // </View>

    if(info.item.subtype == 'learn-kanji'){

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>{FontAwesome.check} {'Learn Kanji'}</RkText>
              <RkText rkType='primary3'>{'Based on the building blocks you now have, you can learn this kanji'}</RkText>
            </View>
          </View>
          <RkText rkType='superhero center bold red'>{info.item.kanji}</RkText>
          <View rkCardContent>
            <RkText rkType='primary3'>{info.item.meaning}</RkText>
          </View>
          <View rkCardContent>
            <RkText rkType='primary3'>{info.item.story}</RkText>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'learn-vocab'){

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>{FontAwesome.check} {'Learn Word'}</RkText>
              <RkText rkType='primary3'>{'You know enough to learn how to write a new word using kanji'}</RkText>
            </View>
          </View>
          <RkText rkType='superhero center bold red'>{info.item.vocab}</RkText>
          <View rkCardContent>
            <RkText rkType='primary3'>{info.item.meaning}</RkText>
          </View>
          <View rkCardContent>
            <RkText rkType='primary3'>{info.item.story}</RkText>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'revise'){

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>{FontAwesome.check} {'Revise'}</RkText>
              <RkText rkType='primary3'>{'Practice kanji you learnt recently by playing this game of memory.'}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <Image rkCardImg source={info.item.photo}/>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'progress'){

      card =         
        <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>{FontAwesome.check} {'Your Progress'}</RkText>
              <RkText rkType='primary3'>{'Check out how much progress you are making towards your goal.'}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View style={chartBlockStyles}>
              <ProgressChart/>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
    }

    return (card);
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