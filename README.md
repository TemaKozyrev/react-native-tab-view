# react-native-tab-view


### Example

<img src="https://github.com/TemaKozyrev/react-native-tab-view/blob/master/example/%D1%8F%D0%BD%D0%B2.-21-2018%2012-32-27.gif" width="280">


### Usage

```
import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import TabView from 'react-native-tab-view';


export default class App extends Component {
  render() {
    return (
      <ScrollView>
        <TabView
          wrapperStyle={{ marginTop: 60 }}
          unactiveTabLabelTextStyle={{ color: 'red' }}
          tabLabelTextStyle={{ color: 'blue' }}
          indicatorStyle={{ borderRadius: 2, height: 2, backgroundColor: 'green' }}
        >
          <View label="first" style={{ width: 50, height: 50, backgroundColor: 'green' }} />
          <View label="second" style={{ width: 50, height: 50, backgroundColor: 'red' }} />
          <View label="third" style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
        </TabView>
      </ScrollView>
    );
  }
}
```

### Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| width | screen width | `number` | TabView width
| indicatorStyle | none | `object` | TabBar indicator styles |
| tabBarWrapperStyle | none | `object` | TabBar wrapper styles |
| contentScrollViewProps | none | `object` | props for horizontal ScrollView |
| tabLabelTextStyle | none | `object` | styles for TabBar labels (Text) |
| unactiveTabLabelTextStyle | none | `object` | styles for unactive TabBar labels (Text) |
| tabButtonStyle | none | `object` | styles for TabBar buttons (TouchableOpacity) |
| unactiveTabButtonStyle | none | `object` | styles for unactive TabBar buttons (TouchableOpacity) |
| wrapperStyle | none | `object` | styles for TabView wrapper (View) |

