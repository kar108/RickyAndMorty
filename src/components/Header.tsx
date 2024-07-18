import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { base } from '../assets/styles';
import Typography from './Typography';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';
import { SIZES } from '../utils/constants';

type Params = {
    iconColor?: string,
    title: string,
    titleColor?: any,
    wrapperStyle?:StyleProp<ViewStyle>;
};

function Header({ iconColor, title, titleColor ,wrapperStyle}: Params) {
    const navigation: any = useNavigation()

    const { bg_secondary, py_xs } = base;

    return (
        <View
            style={[
                wrapperStyle,
                py_xs,
                wrapperStyle?null:bg_secondary]}>
            <View style={[styles.headerCont]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backIconContainer}>
                    <Icon name="back" width={6} height={2} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Typography
                        weight='BLD'
                        textColor='white'
                        size={SIZES.xl}>
                        {title}
                    </Typography>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 50,
    },
    backIconContainer: {
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textTransform: 'uppercase',
    },
});

export default Header
