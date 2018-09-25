import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet, RkButton, RkTheme
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar} from '../../components';
import {SocialBar} from '../../components';
import PopoverTooltip from 'react-native-popover-tooltip';
import {YesNoBar} from '../../components/yesNoBar';
import {OkBar} from '../../components/okBar';
import {MemoryGame} from '../../components/memoryGame';
import {SentencePractice} from '../../components/sentencePractice';
import {StoryPractice} from '../../components/storyPractice';
import {SimilarGame} from '../../components/similarGame';
import {FontAwesome} from '../../assets/icons';
import {
  ProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart
} from '../../components/';
let moment = require('moment');


export class Article extends React.Component {
  static navigationOptions = {
    title: ''.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    this.data = data.getArticle(id);
  }

  _onItemSelected = (selectedId) => {
    // Navigate back, after a short delay
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 1500);
  }

  render() {

    var card_data = this.data

    let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
    let card;

    showing = card_data.showing
    showingStyle = (showing ? styles.show : styles.hide)

    if(card_data.subtype === 'learn-kanji'){

      kanjiCharacter = (card_data.image ? <View style={styles.imageView}><Image source={card_data.image}/></View> : <RkText rkType='largekanji center warning'>{card_data.kanji}</RkText>)

      if(card_data.learntype === 'read'){

        var hasSimilar = !(card_data.similar === undefined || card_data.similar.length == 0)
        var hasComponents = !(card_data.components === undefined || card_data.components.length == 0)

        components = (hasComponents ? <View><RkText rkType='heading4 center'>Components</RkText><RkText rkType='center warning header2'>{card_data.components.join(" ")}</RkText><RkText rkType='primary3'>Can you see these component kanji within this new kanji?</RkText></View> : <View/> )

        explanationWithTooltip = <PopoverTooltip ref='tooltip1'
            buttonComponent={
              <View>
                <RkText rkType='primary3'>{ card_data.explanation }</RkText>
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
                  <RkText rkType='center header3'>{card_data.similar.join(" ")}</RkText>
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
                  <RkText rkType='heading1 center warning'>{card_data.meaning}</RkText>
                </View>
                { components }
                <View>
                  <RkText rkType='heading4'> </RkText>
                  <RkText rkType='heading4'>Story</RkText>
                  { storyBlurbWithTooltip }
                  <RkText rkType='primary2 warning'>{card_data.story}</RkText>
                  <RkText rkType='primary3'> </RkText>
                </View>
                { hasSimilar ? similarWithTooltip : <View/> }
              </View>
        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Learn Kanji</RkText>
                  { showing ? explanationWithTooltip : <View/> }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >              
          </RkCard>
      }
      else if(card_data.learntype === 'write'){

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
              <StoryPractice story={card_data.story}/>
            </View>

        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Learn Kanji</RkText>
                  { showing ? explanationWithTooltip : <View/> }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>        
      }
    }
    else if(card_data.subtype == 'learn-vocab'){

      explanation = (showing ? <RkText rkType='primary3'>{ card_data.explanation }</RkText> : <View/>)

      mainContent = <View/>
      if(showing){
        mainContent = 
        <View>
            <View rkCardContent>
              <RkText rkType='largervocab center warning'>{card_data.vocab}</RkText>
              <RkText rkType='heading4 center'>Meaning</RkText>
              <RkText rkType='primary3 center'>{card_data.meaning}</RkText>
            </View>
            <View>
              <RkText rkType='heading4'>Story</RkText>
              <RkText rkType='primary3'>{card_data.story}</RkText>
            </View>        
          </View>        
      }

      card =         
        <RkCard rkType='article' style={styles.card}>
          <View style={showingStyle}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Learn Word</RkText>
                { explanation }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
            </View >
          </View >
        </RkCard>
    }
    else if(card_data.subtype == 'revise'){
      if(card_data.gametype == 'memory'){  

        explanation = (showing ? <RkText rkType='primary3'>{'Practice kanji you learnt recently by playing this game of memory.'}</RkText> : <View/>)
        mainContent = <View/>
        if(showing){
          mainContent = 
            <View rkCardContent>
              <MemoryGame list={card_data.list} />
            </View>          
        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation}
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>
      }
      else if(card_data.gametype == 'sentence'){

        explanation = (showing ? <RkText rkType='primary3'>{'Can you read this entire sentence and understand what it means?'}</RkText> : <View/>)

        mainContent = <View/>
        if(showing){
          mainContent = 
              <View rkCardContent>
                <SentencePractice sentence={card_data.sentence} kanji={card_data.kanji} furigana={card_data.furigana} meaning={card_data.meaning} />
              </View>
        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>

      }
      else if(card_data.gametype == 'similar'){

        explanation = (showing ? <RkText rkType='primary3'>{'Test your knowledge of this kanji. Based on your knowledge of the meaning of this kanji, determine the words that use this kanji vs. the words that use other similar-looking kanji.'}</RkText> : <View/>)

        mainContent = <View/>
        if(showing){
          mainContent = 
              <View rkCardContent>
                <View >
                  <RkText rkType='largekanji center warning'>{card_data.kanji}</RkText>
                </View>
                <SimilarGame kanji={card_data.kanji} list={card_data.list} meaning={card_data.meaning} />
              </View>
        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise</RkText>
                  { explanation }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <SocialBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>

      }
    }
    else if(card_data.subtype == 'help'){

      mainContent = <View/>
      if(showing){
        mainContent = 
          <View rkCardContent>
            <Image rkCardImg source={card_data.photo}/>
            <RkText> </RkText>
            <RkText rkType='primary3'>{card_data.text}</RkText>
          </View>

      }

      card =         
        <RkCard rkType='article' style={styles.card}>
          <View style={ showingStyle }>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>{card_data.title}</RkText>
                { showing ? <RkText rkType='primary3'>{card_data.header}</RkText> : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <OkBar onPress={()=>this._onItemSelected(card_data.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(card_data.subtype == 'prime'){

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
              <RkText rkType='largevocab center warning'>{card_data.vocab}</RkText>
              <RkText rkType='heading4 center'>Meaning</RkText>
              <RkText rkType='primary3 center'>{card_data.meaning}</RkText>
            </View>
      }

      card =         
        <RkCard rkType='article' style={styles.card}>
          <View style={ showingStyle }>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Prime</RkText>
                { showing ? explanationWithTooltip : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <YesNoBar onPress={()=>this._onItemSelected(card_data.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(card_data.subtype == 'progress-percentage'){

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
        <RkCard rkType='article' style={styles.card}>
          <View style={showingStyle}>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>Your Progress</RkText>
                { showing ? <RkText rkType='primary3'>{'You are making great progress towards your goal.'}</RkText> : <View/> }
              </View>
            </View>
            { mainContent }
            <View rkCardFooter>
              <OkBar onPress={()=>this._onItemSelected(card_data.id)}/>
            </View >
          </View>
        </RkCard>
    }
    else if(card_data.subtype == 'progress-time'){

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
        <RkCard rkType='article' style={styles.card}>
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
              <OkBar onPress={()=>this._onItemSelected(card_data.id)}/>
            </View >
          </View >
        </RkCard>
    }

    return (
        <ScrollView style={styles.root}>{ card }
          <RkText> </RkText>
          <RkText> </RkText>
        </ScrollView>
      );
  }

    // return (
      // <ScrollView style={styles.root}>
      //   <RkCard rkType='article'>
      //     <Image rkCardImg source={this.data.photo}/>
      //     <View rkCardHeader>
      //       <View>
      //         <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
      //         <RkText rkType='secondary2 hintColor'>{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
      //       </View>
      //       <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.user.id})}>
      //         <Avatar rkType='circle' img={this.data.user.photo}/>
      //       </TouchableOpacity>
      //     </View>
      //     <View rkCardContent>
      //       <View>
      //         <RkText rkType='primary3 bigLine'>{this.data.text}</RkText>
      //       </View>
      //     </View>
      //     <View rkCardFooter>
      //       <SocialBar/>
      //     </View>
      //   </RkCard>
      // </ScrollView>
    // )
  // }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));