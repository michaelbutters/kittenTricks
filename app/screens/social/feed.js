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
import PopoverTooltip from 'react-native-popover-tooltip';
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

      var hasSimilar = !(info.item.similar === undefined || info.item.similar.length == 0)
      var hasComponents = !(info.item.components === undefined || info.item.components.length == 0)

      kanjiCharacter = (info.item.image ? <View style={styles.imageView}><Image source={info.item.image}/></View> : <RkText rkType='largekanji center warning'>{info.item.kanji}</RkText>)
      components = (hasComponents ? <View><RkText rkType='heading4 center'>Components</RkText><RkText rkType='center warning header2'>{info.item.components.join(" ")}</RkText><RkText rkType='primary3'>Can you see these component kanji within this new kanji?</RkText></View> : <View/> )

      explanationWithTooltip = <PopoverTooltip ref='tooltip1'
          buttonComponent={
            <View>
              <RkText rkType='primary3'>{ info.item.explanation }</RkText>
              <RkText rkType='primary3 helpLink'> ...More info</RkText>
              <View><RkText> </RkText></View>
            </View>
          }
          items={[
            {
              label: 'The Rapid Kanji algorithm ensures that you never get given a new kanji to learn until you have learned ALL of the kanji and/or radicals that make up that kanji. This is just one way that your learning effort is maximized.',
              onPress: () => {}
            }
          ]}
          />

      storyBlurbWithTooltip = <PopoverTooltip ref='tooltip2'
          buttonComponent={
            <View>
              <RkText rkType='primary3 helpLink'> ...More info</RkText>
            </View>
          }
          items={[
            {
              label: 'Mnemonics - sometimes called Stories, can be extremely effective in assisting your brain to link a number of things together. Rapid Kanji stories link the component kanji together with the meaning of the resulting kanji.',
              onPress: () => {}
            },
            {
              label: 'This is a suggested story, but you are welcome to come up with your own if you prefer. Remember that the more memorable the story, and the more emotion it evokes when you think of it, the less likely you are to forget it. When learning kanji using a story, take time to clearly picture in your mind the detail of each of the key elements of the story (the words in CAPS). What colour? What texture? How do you feel?',
              onPress: () => {}
            },
          ]}
          />

      var similarWithTooltip
      if(hasSimilar){
        similarWithTooltip = <PopoverTooltip ref='tooltip3'
            buttonComponent={
              <View>
                <RkText rkType='heading4'>Similar Kanji</RkText>
                <RkText rkType='primary3'>Take care to not confuse this kanji with other similar looking kanji like: </RkText>
                <RkText rkType='primary3 helpLink'> ...More info</RkText>
                <RkText rkType='center header3'>{info.item.similar.join(" ")}</RkText>
              </View>
            }
            items={[
              {
                label: 'Two kanji can be confusingly similar when they have component kanji or radicals in common. To avoid getting confused, look closely at the kanji you are learning and the similar kanji and pick out what makes them different. Replay the story in your mind and make sure the aspects that make this kanji different are as vivid as possible.',
                onPress: () => {}
              },
            ]}
            />
        }

      card =         
      <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>Learn Kanji</RkText>
              { explanationWithTooltip }
            </View>
          </View>
          <View rkCardContent>
            { kanjiCharacter }
            <View>
              <RkText rkType='heading2 center'>Meaning</RkText>
              <RkText rkType='heading1 center warning'>{info.item.meaning}</RkText>
            </View>
            { components }
            <View>
              <RkText rkType='heading4'> </RkText>
              <RkText rkType='heading4'>Story</RkText>
              { storyBlurbWithTooltip }
              <RkText rkType='primary2 warning'>{info.item.story}</RkText>
              <RkText rkType='primary3'> </RkText>
            </View>
            { hasSimilar ? similarWithTooltip : <View/> }
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
            <RkText rkType='primary3 center'>{info.item.meaning}</RkText>
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
            <RkText rkType='primary3 center'>{info.item.meaning}</RkText>
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