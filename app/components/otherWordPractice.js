import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import {FontAwesome} from '../assets/icons';

export class OtherWordPractice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show_furigana: false,
      default_word: props.kanji,
      alt_word: props.furigana,
      meaning: props.meaning,
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

    var display_word = ( this.state.show_furigana ? this.state.alt_word : '' )
    var display_meaning = ( this.state.show_furigana ? this.state.meaning : ' ' )

    return (
      <View style={styles.container}>
        <View>
        <RkText rkType='largevocab center warning'>{ this.state.default_word }</RkText>
          <RkText rkType='primary1'>{ display_word }</RkText>
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