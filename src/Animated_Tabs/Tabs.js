import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, findNodeHandle, Animated } from 'react-native'
import Tab from './Tab';

const { width, height } = Dimensions.get("screen");


const Indicator = ({ measures, scrollX, data }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.x)
    })
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.y)
    })

    return (
        <Animated.View
            style={{
                position: "absolute",
                 width: indicatorWidth,
                height: 5,

                transform: [{ translateX }],
                backgroundColor: "white",
                bottom: 10
            }}
        />

    )
}
export default function Tabs({ data, scrollX, onItemPress }) {
    const [measures, setMeasures] = useState([])
    const containerRef = useRef()
     
    useEffect(() => {
        const m = []
        data.forEach(item => {

            item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
                m.push({ x, y, width, height })
                if (m.length === data.length) {
                    setMeasures(m)
                }
            })

        })
    }, [])

    return (
        <View style={{ position: "absolute", bottom: 20 }}>
            <View
                ref={containerRef}
                style={{ flexDirection: "row", justifyContent: "space-evenly", width  , backgroundColor:"red", padding:10}}>
                {data.map((item,index) => {
                    return <Tab key={item.key} item={item} data={data} ref={item.ref}
                        onItemPress={() => onItemPress(index)}
                    />
                })}
            </View>
            {measures.length > 0 &&
                <Indicator measures={measures} scrollX={scrollX} data={data} />
            }
        </View>
    )
}
