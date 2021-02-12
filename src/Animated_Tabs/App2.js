import React, { createRef, useCallback, useRef } from 'react'
import { Text, View, Animated, FlatList, Dimensions, StyleSheet, StatusBar, Image, findNodeHandle, ScrollView } from 'react-native'
import Tabs from './Tabs';


const { width, height } = Dimensions.get("screen");

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
    ref: React.createRef(),
}));

const data2 = [
    {
        "image": "https://images.pexels.com/photos/3984958/pexels-photo-3984958.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "key": "help",
        "ref": createRef(),
        "title": "help",
        "content": "Welcome to Help"
    },
    {
        image: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        "key": "men",
        "ref": createRef(),
        "title": "men",
        "content": "Welcome to men"
    },
    {
        image: 'https://i.pinimg.com/564x/77/e0/fd/77e0fd1187b193b471d736a6aedfb5d9.jpg',
        "key": "luffy",
        "ref": createRef(),
        "title": "Luffy",
        "content": "  dfd. "
    }
]


export default function App2() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef()
    const onItemPress = useCallback(itemIdex => {
        ref?.current?.scrollToOffset({
            offset: itemIdex * width
        })
    })
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Animated.FlatList
                ref={ref}
                data={data2}
                keyExtractor={item => item.key}
                horizontal


                pagingEnabled
                onScroll={
                    Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false })
                }
                bounces={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, height }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ flex: 1, resizeMode: "cover" }}
                            />
                            <View
                                style={[
                                    StyleSheet.absoluteFillObject, { backgroundColor: "rgba(0,0,0,0.5) " }
                                ]} />
                                <Text style={[StyleSheet.absoluteFillObject, {fontSize:50}]}>{item.title}</Text>
                            <ScrollView style={[StyleSheet.absoluteFillObject, { top:100 }]}>
                                <Text style={{ fontSize: 20, color: "white" }}>{item.content}</Text>
                            </ScrollView>
                        </View>
                    )
                }}
            />
            <Tabs scrollX={scrollX} data={data2} onItemPress={onItemPress} />

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
