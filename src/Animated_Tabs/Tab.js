import React, { forwardRef } from 'react'
import { View, Text, findNodeHandle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = forwardRef(({ item, data, onItemPress }, ref) => {

    return (
        <TouchableOpacity onPress={onItemPress}>

            <View ref={ref}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 80 / data.length,
                        fontWeight: "800",
                        textTransform: "uppercase"
                    }}>
                    {item.title}</Text>
            </View>
        </TouchableOpacity>
    )

})
export default Tab;