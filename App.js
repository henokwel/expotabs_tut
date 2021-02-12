import { StatusBar } from 'expo-status-bar';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Dimensions, Image, findNodeHandle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const { width, height } = Dimensions.get("screen")


const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/3984958/pexels-photo-3984958.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',

};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef()
}));

// console.log(data);

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress} >

      <View ref={ref}>
        <Text style={{
          color: "white",
          fontSize: 80 / data.length,
          fontWeight: "800", textTransform: "uppercase"
        }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
})

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width)
  })


  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x)
  })

  // console.log(measures);

  return <Animated.View
    style={{
      position: "absolute",
      height: 5,
      width: indicatorWidth,
      bottom: -10,
      backgroundColor: "white",
      transform: [{
        translateX,
      }]
    }}
  />
}
const Tabs = ({ data, scrollX, onItemPress }) => {

  const [measures, setMeasure] = useState([])

  const containerRef = React.useRef();

  useEffect(() => {
    let m = []

    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {

          m.push({ x, y, width, height });

          if (m.length === data.length) {
            setMeasure(m)
          }
        }
      );
    });

  }, [containerRef.current])
 
  return (
    <View style={{ position: "absolute", width, top: 40 }}>

      <View
        ref={containerRef}
        style={{ flex: 1, justifyContent: "space-evenly", flexDirection: "row" }}>
        {data.map((item, index) => {
          return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
        })}
      </View>
      {measures.length > 0 &&

        <Indicator measures={measures} scrollX={scrollX} />
      }


    </View>
  )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef()
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width
    })

  })

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        data={data}
        keyExtractor={item => item.key}

        renderItem={({ item }) => {
          return <View style={{ width, height }}>
            <Image
              source={{ uri: item.image }}
              style={{ flex: 1, resizeMode: "cover" }}
            />
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(192,192,192,0.3)" }]} />
          </View>
        }}

      />

      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
