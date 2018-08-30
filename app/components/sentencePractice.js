import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import {FontAwesome} from '../assets/icons';

export class SentencePractice extends React.Component {

  constructor(props) {
    super(props);

    var kanji_sentence = props.sentence
    var kanji = props.kanji
    var furigana = props.furigana
    var furigana_sentence = kanji_sentence.replace(kanji, furigana)
    var sentence_meaning = props.meaning

    this.state = {
      show_furigana: false,
      default_sentence: kanji_sentence,
      alt_sentence: furigana_sentence,
      meaning: sentence_meaning,
    }

  }

  render() {

    let toggleShowFurigana = () => {
      this.setState((prevState, props) => {
         if(!prevState.show_furigana){
           return { show_furigana: true }
         }
         else {
           return { show_furigana: false }
         }
       });
     }

    var display_sentence = ( this.state.show_furigana ? this.state.alt_sentence : this.state.default_sentence )
    var display_meaning = ( this.state.show_furigana ? this.state.meaning : ' ' )

    return (
      <View style={styles.container}>
        <View>
          <RkText rkType='primary1'>{ display_sentence }</RkText>
          <RkText rkType='primary1'>{ display_meaning }</RkText>
        </View>
        <View>
          <RkButton rkType='clear' onPress={toggleShowFurigana}>
            <RkText rkType={ (this.state.skip ? 'awesome hintColor' : 'awesome hintColor') } style={styles.icon}>{FontAwesome.slashEye}</RkText>
            <RkText rkType={ (this.state.skip ? 'hintColor small' : 'info small') }> { (this.state.show_furigana ? 'Hide Answer' : 'Show Answer') }</RkText>
          </RkButton>
        </View>

      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10
  },
  icon: {
    fontSize: 20,
    color: theme.colors.text.inverse,
  },  
}));