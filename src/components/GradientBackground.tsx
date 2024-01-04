import { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element[];
}
// x: 0 superior y: 0 izquierda: x: 0 superior y: 1 derecha
// end para saber donde para el gradiente, en este es casi en la mitad
export const GradientBackground = ({ children }: Props) => {

  const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);

  const { opacity, fadeIn, fadeOut } = useFade();

  useEffect(() => {
    fadeIn(() => {
      // lo q está dentro se ejecuta una vez que hace el fadeIn
      setPrevMainColors(colors);
      // el fadeOut con duration 0 da la impresión que la transicion es mas rápida
      // remueve el efecto del gradiente que está adelante
      fadeOut(0);
    });
  }, [colors]);
  // hay dos gradientes: gradiente principal y un gradiente secundario, uno encima del otro,cuando cambio el color de uno, lo animo para q aparezca con la opacidad, una vez q aparece, se establece los colores del gradiente de atras (con setPrevMainColors) para que cuando se remueva con el fadeOut la opacidad del nuevo gradiente (el q estaba en frente) ya no se mire el efecto de desvanecimiento del gradiente superior
  // Animated.View contiene un nuevo gradiente, sobreescribe el anterior (LinearGradient) y da el efecto que esta cambiando de gradiente
  return (
    <View style={{ flex: 1 }}>
        <LinearGradient
            colors={[ prevColors.primary, prevColors.secondary, 'white' ]}
            style={{ ...StyleSheet.absoluteFillObject }}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.5, y: 0.7 }}
        />

        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
          }}
        >
          <LinearGradient
            colors={[ colors.primary, colors.secondary, 'white' ]}
            style={{ ...StyleSheet.absoluteFillObject }}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.5, y: 0.7 }}
          />
        </Animated.View>

        { children }
    </View>
  )
}


