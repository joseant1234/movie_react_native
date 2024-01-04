import { useRef } from "react";
import { Animated } from "react-native";

export const useFade = () => {
    // Animated.Value(0) es el valor inicial, 0 es su valor por defecto
    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn = (callback?: Function) => {
        // configurar el tiempo de animacion
        // { toValue: 1 } es el punto maximo que se va alcanzar, en este caso se hara completamente visible (opacity en 1)
        // duration en 1000 es lo que tarda en llegar al valor, el tiempo es 1 segundo
        // useNativeDriver hace q sea acelerado por hardware
        // start() es para q inicie la animacion, sino solo se estaría definiendo
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }
        ).start(() => callback ? callback() : null);
    }

    const fadeOut = (duration: number = 300) => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration,
                useNativeDriver: true,
            }
        ).start();
    }

    return {
        opacity,
        fadeIn,
        fadeOut,
    };

}
