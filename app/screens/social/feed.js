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
import {StoryPractice} from '../../components/storyPractice';
import {SimilarGame} from '../../components/similarGame';
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
    this.data2 = data.getArticles('post');
    this.state = {
      show_story: false,
      loading: false,
      data: this.data2,
      error: null,
      refreshing: false,
    };    
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _onItemSelected = (selectedId) => {
    var array = this.state.data;
    var item = this._findItemById(array, selectedId)
    var prevShowing = item.showing
    item.showing = !prevShowing
    // console.log("item changed showing from " + prevShowing + " to " + item.showing + ". Result: " + item)
    this.setState({data: array });
    // console.log("yeah",this.state.data)
  }

  _findItemById(array, id){
    for(let item of array){
      if(item.id === id){
        return item
      }
    }
    return null
  }

  _renderItem(info) {

    let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
    let card;

    showing = info.item.showing
    showingStyle = (showing ? styles.show : styles.hide)

    if(info.item.subtype === 'learn-kanji'){

      kanjiCharacter = (info.item.image ? <View style={styles.imageView}><Image source={info.item.image}/></View> : <RkText rkType='largekanji center warning'>{info.item.kanji}</RkText>)

      if(info.item.learntype === 'read'){

        var hasSimilar = !(info.item.similar === undefined || info.item.similar.length == 0)
        var hasComponents = !(info.item.components === undefined || info.item.components.length == 0)

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

        mainContent = <View/>
        if(showing){
          mainContent = 
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
        }

        card =         
          <RkCard style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Learn Kanji</RkText>
                  { showing ? explanationWithTooltip : <View/> }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
              </View >
            </View >              
          </RkCard>
      }
      else if(info.item.learntype === 'write'){

        explanationWithTooltip = <PopoverTooltip ref='tooltip1'
            buttonComponent={
              <View>
                <RkText rkType='primary3'>Test how well you know the story that you just recently learned by typing it from memory. Then click the button to see how well you did.</RkText>
                <RkText rkType='primary3 helpLink'> ...More info</RkText>
                <View><RkText> </RkText></View>
              </View>
            }
            items={[
              {
                label: 'Writing down the story that you recently learned will help solidify it in your mind, over and above simply reading the story. As you write the story down, use this as a chance to replay the story in your mind in vivid detail. Remember that the more vivid the colors, textures, sounds and emotions, the better your brain will retain it.',
                onPress: () => {}
              }
            ]}
            />

        mainContent = <View/>
        if(showing){
          mainContent = 
            <View rkCardContent>
              { kanjiCharacter }
              <StoryPractice story={info.item.story}/>
            </View>

        }

        card =         
          <RkCard style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Learn Kanji</RkText>
                  { showing ? explanationWithTooltip : <View/> }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
              </View >
            </View >
          </RkCard>        
      }
    }
    else if(info.item.subtype == 'learn-vocab'){

      explanation = (showing ? <RkText rkType='primary3'>{ info.item.explanation }</RkText> : <View/>)

      mainContent = <View/>
      if(showing){
        mainContent = 
        <View>
            <View rkCardContent>
              <RkText rkType='largervocab center warning'>{info.item.vocab}</RkText>
              <RkText rkType='heading4 center'>Meaning</RkText>
              <RkText rkType='primary3 center'>{info.item.meaning}</RkText>
            </View>
            <View>
              <RkText rkType='heading4'>Story</RkText>
              <RkText rkType='primary3'>{info.item.story}</RkText>
            </View>        
          </View>        
      }

      card =         
        <RkCard style={styles.card}>
          <View style={showingStyle}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Learn Word</RkText>
                { explanation }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
            </View >
          </View >
        </RkCard>
    }
    else if(info.item.subtype == 'revise'){
      if(info.item.gametype == 'memory'){  

        explanation = (showing ? <RkText rkType='primary3'>{'Practice kanji you learnt recently by playing this game of memory.'}</RkText> : <View/>)
        mainContent = <View/>
        if(showing){
          mainContent = 
            <View rkCardContent>
              <MemoryGame list={info.item.list} />
            </View>          
        }

        card =         
          <RkCard style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation}
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
              </View >
            </View >
          </RkCard>
      }
      else if(info.item.gametype == 'sentence'){

        explanation = (showing ? <RkText rkType='primary3'>{'Can you read this entire sentence and understand what it means?'}</RkText> : <View/>)

        mainContent = <View/>
        if(showing){
          mainContent = 
              <View rkCardContent>
                <SentencePractice sentence={info.item.sentence} kanji={info.item.kanji} furigana={info.item.furigana} meaning={info.item.meaning} />
              </View>
        }

        card =         
          <RkCard style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
              </View >
            </View >
          </RkCard>

      }
      else if(info.item.gametype == 'similar'){

        explanation = (showing ? <RkText rkType='primary3'>{'Test your knowledge of this kanji. Based on your knowledge of the meaning of this kanji, determine the words that use this kanji vs. the words that use other similar-looking kanji.'}</RkText> : <View/>)

        mainContent = <View/>
        if(showing){
          mainContent = 
              <View rkCardContent>
                <View >
                  <RkText rkType='largekanji center warning'>{info.item.kanji}</RkText>
                </View>
                <SimilarGame kanji={info.item.kanji} list={info.item.list} meaning={info.item.meaning} />
              </View>
        }

        card =         
          <RkCard style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(info.item.id)}/>
              </View >
            </View >
          </RkCard>

      }
    }
    else if(info.item.subtype == 'help'){

      mainContent = <View/>
      if(showing){
        mainContent = 
          <View rkCardContent>
            <Image rkCardImg source={info.item.photo}/>
            <RkText> </RkText>
            <RkText rkType='primary3'>{info.item.text}</RkText>
          </View>

      }

      card =         
        <RkCard style={styles.card}>
          <View style={ showingStyle }>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>{info.item.title}</RkText>
                { showing ? <RkText rkType='primary3'>{info.item.header}</RkText> : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <OkBar onPress={()=>this._onItemSelected(info.item.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(info.item.subtype == 'prime'){

      explanationWithTooltip = <PopoverTooltip ref='tooltip1'
          buttonComponent={
            <View rkCardContent>
              <RkText rkType='primary3'>Help the algorithm work effectively by indicating whether you already know this vocabulary.</RkText>
              <RkText rkType='primary3 helpLink'> ...More info</RkText>
              <View><RkText> </RkText></View>
            </View>
          }
          items={[
            {
              label: 'Telling us what you already know helps prime the algorithm to teach you words in the best possible order.',
              onPress: () => {}
            }
          ]}
          />

      mainContent = <View/>
      if(showing){
        mainContent = 
            <View rkCardContent>
              <RkText rkType='largevocab center warning'>{info.item.vocab}</RkText>
              <RkText rkType='heading4 center'>Meaning</RkText>
              <RkText rkType='primary3 center'>{info.item.meaning}</RkText>
            </View>
      }

      card =         
        <RkCard style={styles.card}>
          <View style={ showingStyle }>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Prime</RkText>
                { showing ? explanationWithTooltip : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <YesNoBar onPress={()=>this._onItemSelected(info.item.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(info.item.subtype == 'progress-percentage'){

      mainContent = <View/>
      if(showing){
        mainContent = 
          <View rkCardContent>
            <View style={chartBlockStyles}>
              <ProgressChart/>
            </View>
          </View>

      }

      card =         
        <RkCard style={styles.card}>
          <View style={showingStyle}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Your Progress</RkText>
                { showing ? <RkText rkType='primary3'>{'You are making great progress towards your goal.'}</RkText> : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <OkBar onPress={()=>this._onItemSelected(info.item.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(info.item.subtype == 'progress-time'){

      mainContent = <View/>
      if(showing){
        mainContent = 
                    <View rkCardContent>
              <View style={chartBlockStyles}>
                <AreaChart/>
              </View>
            </View>
      }

      card =         
        <RkCard style={styles.card}>
          <View style={showingStyle}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Your Progress</RkText>
                { showing ? <RkText rkType='primary3'>{"You have been putting in a great effort already. You may not have realised it but you have learned 10 completely new kanji today, although with a few radicals. Now that's rapid!"}</RkText> : <View/> }
                { showing ? <RkText rkType='primary3'>{"At this rate you would be able to easily achieve your goal of knowing 2,000 kanji in less than 6 months! And with Rapid Kanji only costing $3.99/month, that's less than 2 cents per kanji!"}</RkText> : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <OkBar onPress={()=>this._onItemSelected(info.item.id)}/>
            </View >
          </View >
        </RkCard>
    }

    return (card);
  }

  render() {
    return (
      <FlatList data={this.data}
                extraData={this.state}
                renderItem={this._renderItem.bind(this)}
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
  hide: {
    backgroundColor: theme.colors.disabled,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16
  }
}));