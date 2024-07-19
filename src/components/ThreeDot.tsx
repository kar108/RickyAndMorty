import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
  Pressable,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {DrawerOption} from '../Types';
import { base, styles } from '../assets/styles';
import { COLORS, DIMENSIONS, SIZES } from '../utils/constants';
import { isOs } from '../utils/helpers';
import Icon from './Icon';
import Typography from './Typography';

type Props = {
  fromcomments?: boolean;
  fromProfile?: boolean;
  testID?: any;
  style?: StyleProp<ViewStyle>;
  callback: (s: string) => void;
  options: any[];
  children: JSX.Element;
  showDivider?: boolean;
  right?: boolean;
  enableThreedot?:boolean;
  enableThreedotBottom?:boolean
};

function ThreeDots({
  fromProfile=false,
  fromcomments = false,
  testID,
  callback,
  children,
  options,
  showDivider = true,
  style,
  right = true,
  enableThreedot=true,
  enableThreedotBottom=false,
}: Props): JSX.Element {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const trigger: any = useRef<TouchableOpacity>(null);

  const toggle = () => {
    setShowDrawer(prev => {
      if (!prev) {
        trigger.current?.measure(
          (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
            const height = py - h * 2;
            setTop(height);
          },
        );
      }
      return !prev;
    });
  };

  const {row, align_center, bg_white, container, br_base, mr_s, w_auto} = base;
  const {box_shadow} = styles;
  const {drawer, divider, dividerStyle} = pageStyles;

  const renderOptions = () => {
    return options.map((option, index) => {
      const handlePress = () => {
        option.onPress(option);
        callback?.(option.label);
        toggle();
      };

      return (
        <View>
               {
                enableThreedot?
                index===0&&
                <View
                style={{
                  borderLeftWidth: 1,
                  borderTopWidth:1,
                  borderColor: '#D9D9D9',
                  height: 8,
                  width: 8,
                  position:"absolute",
                  top:-7,
                  right:5.5,
                  zIndex:-2,
                  borderRadius:2,
                  backgroundColor:COLORS.white,
                  transform: [{ rotate: '45deg' }],
                }}
              />:null
               }
                {enableThreedotBottom ? (
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderTopWidth: 1,
                    borderColor: '#D9D9D9',
                    height: 8,
                    width: 8,
                    position: 'absolute',
                    top: isOs('ios')?22:28,
                    left:22,
                    zIndex: -2,
                    borderRadius: 2,
                    backgroundColor: COLORS.white,
                    transform: [{rotate: '-140deg'}],
                  }}
                />
              )
            : null}
          <Pressable
            testID={option.label}
            key={option.label}
            onPress={handlePress}
            style={[
              row,
              align_center,
              {
                paddingLeft: fromProfile?'4.5%':right ? '6%' : '10%',

                paddingRight: right ? (isOs('ios') ? '4%' : '6%') : 0,
              },
            ]}>
            {option.icon ? (
              <Icon name={option.icon} style={mr_s} height={3} width={3} />
            ) : null}
            <Typography
              style={{paddingVertical: '1%'}}
              size={SIZES.font}
              textColor="black">
              {option.label}
            </Typography>
          </Pressable>
          {options.length > 1 && index + 1 != options.length && showDivider && (
            <View style={dividerStyle}>
              <View style={divider} />
            </View>
          )}
        </View>
      );
    });
  };


  const renderDrawer = () => {
    return (
      <Modal
        visible={showDrawer}
        transparent={true}
        animationType="fade"
        onRequestClose={toggle}>
          
        <Pressable
          testID={testID}
          // activeOpacity={1}
          onPress={toggle}
          style={[
            container,
            style && !fromcomments
              ? style
              : {top: isOs('ios') ? DIMENSIONS.hp(7) : DIMENSIONS.hp(2)},
          ]}>
          <View
            style={[
              bg_white,
              box_shadow,
              w_auto,
              drawer,
              {top},
              fromcomments ? style : null,
            ]}>
            {renderOptions()}
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <Pressable
      // android_ripple={{color: 'rgba(132, 139, 143, 0.50)', borderless: false}}
      style={({ pressed }) => [
        { backgroundColor: pressed ? COLORS.gray : 'transparent',borderRadius:10,opacity:10 }
    ]}
      hitSlop={15}
      onPress={toggle}
      ref={trigger}>
      {children}
      {renderDrawer()}
    </Pressable>
  );
}

const pageStyles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    right: '5%',
    paddingVertical: DIMENSIONS.hp(0.3),
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
    top: '50%',
  },
  dividerStyle: {
    padding: DIMENSIONS.hp(0.2),
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    flex: 1,
  },
});

export default ThreeDots;

export function AlumniTag() {
  return (
    <View
      style={{
        height: 20,
        justifyContent: 'center',
        minWidth: 50,
        backgroundColor: '#F5CD7A',
        borderRadius: 20,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        left: '20%',
        paddingHorizontal: '3%',
      }}>
      <Typography make500 textColor="black" style={{fontSize: 10}}>
        Alumni
      </Typography>
    </View>
  );
}
