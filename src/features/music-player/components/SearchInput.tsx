import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@shared/components/IonIcon';
import { COLORS } from '@config/theme/Colors';

interface SearchInputProps extends Partial<TextInputProps> {
    placeholder?: string;
    icon?: string;
    text: string;
    setText: (value: string) => void;
    inputAccessoryViewID?: string;
    debounceDelay?: number;
}
export function SearchInput({
    placeholder = 'Search your music...',
    icon = 'search',
    text,
    setText,
    inputAccessoryViewID,
    debounceDelay = 500,
}: SearchInputProps) {
    const [internalValue, setInternalValue] = useState(text);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setText(internalValue);
        }, debounceDelay);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [internalValue]);


    return (
        <View style={styles.inputContainer}>
            <IonIcon name={icon} size={20} color={COLORS.GREY.base} style={styles.icon} />
            <TextInput
                style={styles.textInput}
                inputAccessoryViewID={inputAccessoryViewID}
                onChangeText={setInternalValue}
                value={internalValue}
                placeholder={placeholder}
                placeholderTextColor={COLORS.GREY.base}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE.base,
        borderRadius: 10,
        height: 50,

        shadowColor: COLORS.DARK.base,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 10,
    },
    icon: {
        marginRight: 8,
        marginLeft: 12
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
});