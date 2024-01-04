import { createContext, useState } from "react";

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void
}

export const GradientContext = createContext({} as ContextProps); // el tipo es lo q se quiere exponer hacia afuera

// definir el provider, es el higher order component el cual va servir como host de la informacion q se quiere proveer
export const GradientProvider = ({ children }: any) => {

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const [prevColors, setPrevColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const setMainColors = (colors: ImageColors) => {
        setColors(colors);
    }

    const setPrevMainColors = (colors: ImageColors) => {
        setPrevColors(colors);
    }

    return (
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColors,
            setPrevMainColors,
        }}>
            { children }
        </GradientContext.Provider>
    )
}