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
import {YesNoBar} from '../../components/yesNoBar';
import {OkBar} from '../../components/okBar';
import {MemoryGame} from '../../components/memoryGame';
import {SentencePractice} from '../../components/sentencePractice';
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
    title: 'Study'.toUpperCase()
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

    if(info.item.subtype == 'learn-kanji'){

      kanjiCharacter = (info.item.image ? <View style={styles.imageView}><Image source={info.item.image}/></View> : <RkText rkType='largekanji center warning'>{info.item.kanji}</RkText>)

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>Learn Kanji</RkText>
              <RkText rkType='primary3'>{ info.item.explanation }</RkText>
            </View>
          </View>
          <View rkCardContent>
            { kanjiCharacter }
            <RkText rkType='heading4 center'>Meaning</RkText>
            <RkText rkType='primary3 center italic'>{info.item.meaning}</RkText>
            <View>
              <RkText rkType='heading4'>Story</RkText>
              <RkText rkType='primary3'>{info.item.story}</RkText>
            </View>
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
              <RkText rkType='header4'>Learn Word</RkText>
              <RkText rkType='primary3'>{ info.item.explanation }</RkText>
            </View>
          </View>
          <View rkCardContent>
            <RkText rkType='largervocab center warning'>{info.item.vocab}</RkText>
            <RkText rkType='heading4 center'>Meaning</RkText>
            <RkText rkType='primary3 center italic'>{info.item.meaning}</RkText>
          </View>
          <View>
            <RkText rkType='heading4'>Story</RkText>
            <RkText rkType='primary3'>{info.item.story}</RkText>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'revise'){
      if(info.item.gametype == 'memory'){        
        card =         
        <RkCard style={styles.card}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Revise</RkText>
                <RkText rkType='primary3'>{'Practice kanji you learnt recently by playing this game of memory.'}</RkText>
              </View>
            </View>
            <View rkCardContent>
              <MemoryGame list={info.item.list} />
            </View>
            <View rkCardFooter>
              <SocialBar/>
            </View >
          </RkCard>
      }
      else if(info.item.gametype == 'sentence'){
        card =         
        <RkCard style={styles.card}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Revise</RkText>
                <RkText rkType='primary3'>{'Can you read this entire sentence?'}</RkText>
              </View>
            </View>
            <View rkCardContent>
              <SentencePractice sentence={info.item.sentence} kanji={info.item.kanji} furigana={info.item.furigana} meaning={info.item.meaning} />
            </View>
            <View rkCardFooter>
              <SocialBar/>
            </View >
          </RkCard>

      }
    }
    else if(info.item.subtype == 'prime'){

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>Prime</RkText>
              <RkText rkType='primary3'>Do you know this word?</RkText>
              <RkText rkType='primary4'>Telling us what you already know helps prime the algorithm to teach you words in the best possible order.</RkText>
            </View>
          </View>
          <View rkCardContent>
            <RkText rkType='largevocab center info'>{info.item.vocab}</RkText>
            <RkText rkType='heading4 center'>Meaning</RkText>
            <RkText rkType='primary3 center italic'>{info.item.meaning}</RkText>
          </View>
          <View rkCardFooter>
            <YesNoBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'progress-percentage'){

      card =         
        <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>Your Progress</RkText>
              <RkText rkType='primary3'>{'You are making great progress towards your goal.'}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View style={chartBlockStyles}>
              <ProgressChart/>
            </View>
          </View>
          <View rkCardFooter>
            <OkBar/>
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'progress-time'){

      card =         
        <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>Your Progress</RkText>
              <RkText rkType='primary3'>{'You have been putting in a great effort recently. Keep it up!'}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View style={chartBlockStyles}>
              <AreaChart/>
            </View>
          </View>
          <View rkCardFooter>
            <OkBar/>
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
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16
  }
}));