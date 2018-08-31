import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class SimilarGame extends RkComponent {
  componentName = 'SimilarGame';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      list: props.list,
      selectedYes: [],
      selectedNo: [],
      overall_kanji: props.kanji,
      overall_meaning: props.meaning,
    }
  }

  handlePress = (id, yes) => {

    this.setState((prevState, props) => {



      var newSelectedList = (yes ? prevState.selectedYes.slice(0) : prevState.selectedNo.slice(0))
      newSelectedList[id] = true

      return ( yes ? { selectedYes: newSelectedList } : { selectedNo: newSelectedList } )
    });
  }

  selectedYes = (id) => {
    return this.state.selectedYes[id]
  }

  selectedNo = (id) => {
    return this.state.selectedNo[id]
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    var rows = []
    for(var j = 0; j < this.state.list.length; j++){

      let i = j;

      var tuple = this.state.list[i];
      var kanji_word = tuple[0];
      var kana_word = tuple[1];
      var meaning_word = tuple[2];
      var correct = tuple[3];
      var isYesSelected = this.selectedYes(i);
      var isNoSelected = this.selectedNo(i);

      var button_style
      var text_type = 'info'
      var text_value = kana_word + ' (' + meaning_word + ')'

      yes_button_style = 'similargame basic square'
      no_button_style = 'similargame basic square'
      text_value = kana_word + ' (' + meaning_word + ')'

      if(correct){
        if(isYesSelected){
          yes_button_style = 'similargame basic square success'
          text_value = kanji_word + ' (' + meaning_word + ')'
        }
        else if(isNoSelected){
          no_button_style = 'similargame basic square memoryfailed'
          text_value = kanji_word + ' (' + meaning_word + ')'
        }        
      }
      else {
        if(isYesSelected){
          yes_button_style = 'similargame basic square memoryfailed'
          text_value = kanji_word + ' (' + meaning_word + ')'
        }
        else if(isNoSelected){
          no_button_style = 'similargame basic square success'
          text_value = kanji_word + ' (' + meaning_word + ')'
        }        
      }

      rows.push(
          <View key={ kanji_word} >
            <RkText rkType={ text_type }>{ text_value }</RkText>
            <RkButton rkType={ yes_button_style } containerViewStyle={{width: '100%', marginLeft: 0}} onPress={() => this.handlePress(i, true)}>
              <RkText rkType={ text_type }>{ this.state.overall_kanji }</RkText>
            </RkButton>
            <RkButton rkType={ no_button_style } containerViewStyle={{width: '100%', marginLeft: 0}} onPress={() => this.handlePress(i, false)}>
              <RkText rkType={ text_type }> ? </RkText>
            </RkButton>
          </View>
        )
    }

    return (
      <View style={container}>
        <View rkType='similargame'>
          { rows }
        </View>
      </View>

    )
  }
}