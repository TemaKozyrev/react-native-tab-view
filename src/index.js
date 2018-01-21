import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Dimensions, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';

class TabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorPosition: new Animated.Value(0),
      currentIndex: 0,
      action: false,
    };
  }

  changeIngex(nextPosition) {
    const { width } = this.props;
    const { indicatorPosition, action } = this.state;

    if (!action) {
      this.setState({ action: true });
      Animated.timing(
        indicatorPosition,
        {
          toValue: nextPosition,
          duration: 300,
        },
      ).start();
      this.scroll.scrollTo({ x: nextPosition, animated: true });
      setTimeout(() => this.setState({ action: false }), 300);
      this.setState({
        currentIndex: nextPosition / width,
      });
    }
  }

  renderIndicator() {
    const { children, indicatorStyle, width } = this.props;
    const { indicatorPosition } = this.state;
    return (
      <Animated.View style={{
      width: width / children.length,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: indicatorPosition.interpolate({
        inputRange: [...children.map((item, index) => index * width)],
        outputRange: [...children.map((item, index) => index * (width / children.length))],
      }),
      }}
      >
        <View style={[indicatorStyle, {
          width: StyleSheet.flatten(indicatorStyle).width < (width / children.length)
            ? StyleSheet.flatten(indicatorStyle).width
            : (width / children.length),
        }]}
        />
      </Animated.View>);
  }

  renderTabBar() {
    const {
      children,
      tabBarWrapperStyle,
      tabLabelTextStyle,
      tabButtonStyle,
      unactiveTabButtonStyle,
      unactiveTabLabelTextStyle,
      width,
    } = this.props;

    const { currentIndex } = this.state;

    return (
      <View style={[{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }, tabBarWrapperStyle]}
      >
        {
          children.map((item, index) =>
            <TouchableOpacity
              key={index} //eslint-disable-line
              style={[{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }, tabButtonStyle, currentIndex !== index && unactiveTabButtonStyle]}
              onPress={() => this.changeIngex(index * width)}
            >
              <Text style={[
                tabLabelTextStyle,
                currentIndex !== index && unactiveTabLabelTextStyle]}
              >
                {item.props.label}
              </Text>
            </TouchableOpacity>)
        }
        {
          this.renderIndicator()
        }
      </View>
    );
  }

  renderContent() {
    const { children, contentScrollViewProps, width } = this.props;
    const { action } = this.state;

    return (
      <ScrollView
        ref={(scroll) => { this.scroll = scroll; }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => this.setState({
          currentIndex: event.nativeEvent.contentOffset.x / width,
        })}
        onScroll={!action && Animated.event([{
          nativeEvent: {
              contentOffset: {
                x: this.state.indicatorPosition,
              },
            },
          }])}
        scrollEventThrottle={1}
        contentContainerStyle={{
          marginTop: 10,
        }}
        {...contentScrollViewProps}
      >
        {children.map(item =>
          <View
            key={item.props.label}
            style={{
              width,
            }}
          >
            {item}
          </View>)}
      </ScrollView>
    );
  }

  render() {
    const { width, wrapperStyle } = this.props;
    return (
      <View style={[{ width }, wrapperStyle]}>
        {this.renderTabBar()}
        {this.renderContent()}
      </View>
    );
  }
}

TabView.propTypes = {
  width: PropTypes.number,
  children: PropTypes.array.isRequired,
  indicatorStyle: PropTypes.object,
  tabBarWrapperStyle: PropTypes.object,
  contentScrollViewProps: PropTypes.object,
  tabLabelTextStyle: PropTypes.object,
  tabButtonStyle: PropTypes.object,
  unactiveTabButtonStyle: PropTypes.object,
  unactiveTabLabelTextStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
};

TabView.defaultProps = {
  width: Dimensions.get('window').width,
  indicatorStyle: {
    backgroundColor: 'blue',
    height: 2,
  },
  tabBarWrapperStyle: {},
  contentScrollViewProps: {},
  tabLabelTextStyle: {},
  wrapperStyle: {},
  tabButtonStyle: {},
  unactiveTabButtonStyle: {},
  unactiveTabLabelTextStyle: {},
};


export default TabView;
