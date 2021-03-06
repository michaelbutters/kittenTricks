import React from 'react';
import {
  View
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {
  VictoryPie,
} from "victory-native";

import {Svg, Text as SvgText} from 'react-native-svg';
import {scale} from '../../utils/scale';

export class ProgressChart extends RkComponent {


  constructor(props) {
    super(props);
    this.size = 120;
    this.fontSize = 25;
    this.state = {
      percents: 59
    }
  }

  getData() {
    return [{x: 1, y: this.state.percents}, {x: 2, y: 100 - this.state.percents}]
  }

  render() {
    return (
      <View>
        <View style={styles.chartContainer}>
          <Svg width={scale(this.size)} height={scale(this.size)}>
            <VictoryPie
              labels={[]}
              padding={0}
              standalone={false}
              width={scale(this.size)} height={scale(this.size)}
              style={{
                data: {
                  fill: (d) => {
                    const color = RkTheme.current.colors.charts.followersProgress;
                    return d.x === 1 ? color : 'transparent';
                  }
                }
              }}
              data={this.getData()}
              cornerRadius={scale(25)}
              innerRadius={scale(40)}>
            </VictoryPie>
            <SvgText
              textAnchor="middle" verticalAnchor="middle"
              x={scale(this.size / 2)}
              y={scale(this.size / 2 - this.fontSize / 2)}
              dy={scale(this.fontSize * -0.25)}
              height={scale(this.fontSize)}
              fontSize={scale(this.fontSize)}
              fontFamily={RkTheme.current.fonts.family.regular}
              stroke={RkTheme.current.colors.text.base}
              fill={RkTheme.current.colors.text.base}>
              {`${this.state.percents}%`}
            </SvgText>
          </Svg>
          <View>
            <RkText rkType='secondary2'>You have learned</RkText>
            <RkText rkType='header2'>1,172 kanji</RkText>
            <RkText rkType='secondary2'>towards your goal of</RkText>
            <RkText rkType='header4'>2,000</RkText>
          </View>
        </View>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  }
}));
