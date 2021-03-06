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
import {SocialBar} from '../../components/socialBar';
import {RightWrongBar} from '../../components/rightWrongBar';
import PopoverTooltip from 'react-native-popover-tooltip';
import {YesNoBar} from '../../components/yesNoBar';
import {CheerNoBar} from '../../components/cheerNoBar';
import {OkBar} from '../../components/okBar';
import {MemoryGame} from '../../components/memoryGame';
import {BuilderGame} from '../../components/builderGame';
import {BlankGame} from '../../components/blankGame';
import {SentencePractice} from '../../components/sentencePractice';
import {OtherWordPractice} from '../../components/otherWordPractice';
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
        // NO LONGER USED
        // explanationWithTooltip = <PopoverTooltip ref='tooltip1'
        //     buttonComponent={
        //       <View>
        //         <RkText rkType='primary3'>Test how well you know the story that you just recently learned by typing it from memory. Then click the button to see how well you did.</RkText>
        //         <RkText rkType='primary3 helpLink'> ...More info</RkText>
        //         <View><RkText> </RkText></View>
        //       </View>
        //     }
        //     items={[
        //       {
        //         label: 'Writing down the story that you recently learned will help solidify it in your mind, over and above simply reading the story. As you write the story down, use this as a chance to replay the story in your mind in vivid detail. Remember that the more vivid the colors, textures, sounds and emotions, the better your brain will retain it.',
        //         onPress: () => {}
        //       }
        //     ]}
        //     />

        // mainContent = <View/>
        // if(showing){
        //   mainContent = 
        //     <View rkCardContent>
        //       { kanjiCharacter }
        //       <StoryPractice story={card_data.story}/>
        //     </View>

        // }

        // card =         
        //   <RkCard rkType='article' style={styles.card}>
        //     <View style={showingStyle}>
        //       <View rkCardHeader>
        //         <View>
        //           <RkText rkType='header4'>Learn Kanji</RkText>
        //           { showing ? explanationWithTooltip : <View/> }
        //         </View>
        //       </View>
        //       { mainContent }
        //       <View rkCardFooter>
        //         <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
        //       </View >
        //     </View >
        //   </RkCard>        
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
      if(card_data.gametype == 'write'){
        
        kanjiCharacter = (card_data.image ? <View style={styles.imageView}><Image source={card_data.image}/></View> : <RkText rkType='largekanji center warning'>{card_data.kanji}</RkText>)

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
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>        

      }
      else if(card_data.gametype == 'memory'){  

        explanation = (showing ? <RkText rkType='primary3'>{'Practice kanji you learned recently by playing this game of memory.'}</RkText> : <View/>)
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
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>
      }
      else if(card_data.gametype == 'builder'){

        explanation = (showing ? <RkText rkType='primary3'>{'Test yourself on a kanji you learned recently by playing this game.'}</RkText> : <View/>)
        mainContent = <View/>
        if(showing){
          mainContent = 
            <View rkCardContent>
              <BuilderGame corrects={card_data.corrects} incorrects={card_data.incorrects} kanji={card_data.kanji} meaning={card_data.meaning} />
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
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>
      }
      else if(card_data.gametype == 'blanks'){

        explanation = (showing ? <View><RkText> </RkText><RkText rkType='primary3'>{'Test how well you remember the kanji story you just learned by playing this game.'}</RkText></View> : <View/>)
        mainContent = <View/>
        if(showing){
          mainContent = 
            <View rkCardContent>
              <BlankGame story={card_data.story} corrects={card_data.corrects} incorrects={card_data.incorrects} kanji={card_data.kanji} meaning={card_data.meaning} />
            </View>          
        }

        card =
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Revise Story</RkText>
                  { explanation}
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>
      }
      else if(card_data.gametype == 'sentence'){

        explanation = (showing ? <View><RkText>{' '}</RkText><RkText rkType='primary3'>{'Can you read this entire sentence and understand what it means?'}</RkText></View> : <View/>)

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
                  <RkText rkType='header4'>Practice Sentence</RkText>
                  { explanation }
                </View>
              </View>
              <View rkCardContent>
                <Image rkCardImg source={card_data.photo}/>
              </View>
              { mainContent }
              <View rkCardFooter>
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
              </View >
            </View >
          </RkCard>

      }
      else if(card_data.gametype == 'other-word'){

        explanation = (showing ? <RkText rkType='primary3'>{"Revise these kanji that you've learned by trying to guess the reading and meaning of this brand new word.\n\nDon't panic. You may have never seen this word before, and you certainly haven't learned this word using Rapid Kanji. But, did you realise that you have learned all of the kanji that make up this word and you know the reading for each of the kanji that are used in this word? So take your time and see if you can guess. If you get it wrong, it's no biggie.\n\nBut this is good practice for when you come across new words using kanji that you've learned when you are reading books, a newspaper or whatever. And this is how you will learn new vocabulary easily in your every day reading.\n\nTry and guess the both the reading and the meaning, then tap 'Show Answer' to see how close you got."}</RkText> : <View/>)

        mainContent = <View/>
        if(showing){
          mainContent = 
              <View rkCardContent>
                <OtherWordPractice kanji={card_data.kanji} furigana={card_data.furigana} meaning={card_data.meaning} />
              </View>
        }

        card =         
          <RkCard rkType='article' style={styles.card}>
            <View style={showingStyle}>
              <View rkCardHeader>
                <View>
                  <RkText rkType='header4'>Guess The New Word</RkText>
                  <RkText> </RkText>
                  { explanation }
                </View>
              </View>
              { mainContent }
              <View rkCardFooter>
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
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
                <RightWrongBar onPress={()=>this._onItemSelected(card_data.id)}/>
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
              <RkText rkType='primary3'>{ "Help the Rapid Kanji algorithm work effectively by indicating whether you already know that this Japanese word has this English meaning.\n\n(Don't worry about whether or not you know how to write it using kanji)." }</RkText>
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
                <RkText rkType='header4'>Do You Know This Vocab?</RkText>
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
    else if(card_data.subtype == 'friend-shared-progress'){

      let avatarList = []
      if(card_data.avatar_photos){
        var i = 0
        for(avatar of card_data.avatar_photos){
          avatarList.push(
            <View key={i}>
              <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}}>
                <Avatar rkType='circle' img={avatar}/>
                <RkText>{'  '}</RkText>
                <RkText rkType='secondary4'>{card_data.friends[i]}</RkText>
                <RkText>{'\t'}</RkText>
                <RkText rkType='smallkanji warning'>{card_data.learnt[i]}</RkText>
              </View>
              <RkText> </RkText>
            </View>
          )
          i++
        }
      }

      card =         
        <RkCard rkType='article' style={styles.card}>
          <View style={ showingStyle }>
            <View rkCardHeader>
              <View>
                <RkText rkType='header4'>{ "Your friends recently learned these kanji." }</RkText>
                <RkText rkType='header4'>{ " " }</RkText>
                <View>{ avatarList }</View>
                <RkText> </RkText>
                <View style={{alignItems: 'center'}}>
                  <Image rkCardImg style={{width: 80, height: 80}} source={require('../../data/img/clapping-emoji.png')}/>
                </View>
              </View>
            </View>
            <View rkCardFooter>
              <CheerNoBar onPress={()=>this._onItemSelected(card_data.id)}/>
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
                { showing ? <RkText rkType='primary3'>{"You have been putting in a great effort already. You may not have realised it but you have learned 9 completely new kanji today, along with a few radicals. Now that's rapid!"}</RkText> : <View/> }
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
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));