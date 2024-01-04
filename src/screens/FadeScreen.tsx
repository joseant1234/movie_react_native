import React, { useRef } from 'react'
import { Animated, Button, View } from 'react-native'
import { useFade } from '../hooks/useFade'

export const FadeScreen = () => {

    const { opacity, fadeIn, fadeOut } = useFade();

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* si solo se deja en View sin el Animated.View, el opacity mostrará un error, porque opacity en estilos no recibe un objeto opacity (del ref) de tipo Animated */}
            <Animated.View
                style={{
                    backgroundColor: '#084F6A',
                    width: 150,
                    height: 150,
                    borderColor: 'white',
                    borderWidth: 10,
                    marginBottom: 10,
                    opacity,
                }}
            />

            <Button
                title="FadeIn"
                onPress={ () => fadeIn() }
            />

            <Button
                title="FadeOut"
                onPress={ () => fadeOut() }
            />
        </View>
    )
}

