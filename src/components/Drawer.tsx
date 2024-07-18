import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView, StyleProp, ViewStyle } from "react-native";

import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { base, styles } from "../assets/styles";
import Typography from "./Typography";
import Icon from "./Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerOption } from "./Types";

type Props = {
  style?:StyleProp<ViewStyle>;
  callback: (s: string) => void;
  options: DrawerOption[];
  children: JSX.Element;
  showDivider?: boolean;
}

function Drawer({ callback, children, options, showDivider = true ,style}: Props): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const trigger = useRef<TouchableOpacity>(null);

  const toggle = () => {
    setShowDrawer(prev => {
      if (!prev) {
        trigger.current?.measure((_fx, _fy, _w, h, _px, py) => {
          const height = py - (h * 2);
          setTop(height);
        });
      }
      return !prev;
    });
  }

  const { row, align_center, bg_white, container, bg_accent, br_base, mr_s, w_auto } = base;
  const { box_shadow } = styles;
  const { drawer, optionStyle, divider, dividerStyle } = pageStyles;

  const renderOptions = () => {
    return options.map((option, index) => {

      const handlePress = () => {
        option.onPress(option);
        callback?.(option.label);
        toggle();
      }

      return (
        <View>
          <TouchableOpacity
            key={option.label}
            onPress={handlePress}
            style={[row, align_center, optionStyle]}
          >
            {option.icon ? <Icon name={option.icon} style={mr_s} height={3} width={3} /> : null}
            <Typography size={SIZES.font} textColor="black">{option.label}</Typography>
          </TouchableOpacity>
          {options.length > 2 && index+1 != options.length && showDivider &&
            <View style={dividerStyle} >
              <View style={divider} />
            </View>
          }
        </View>
      );
    });
  }

  const renderDrawer = () => {

    return (
      <Modal
        visible={showDrawer}
        transparent={true}
        animationType="fade"
        onRequestClose={toggle}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggle}
          style={[container, bg_accent]}
        >
          <View style={[bg_white, box_shadow, w_auto, drawer,style, { top }]}>
            {renderOptions()}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <TouchableOpacity
      onPress={toggle}
      ref={trigger}
    >
      {children}
      {renderDrawer()}
    </TouchableOpacity>
  );
}

const pageStyles = StyleSheet.create({
  drawer: {
    position: "absolute",
    right: "5%",
    paddingHorizontal: DIMENSIONS.hp(1.5),
    paddingVertical: DIMENSIONS.hp(.3),
    borderWidth:1,
    borderColor:'#D8D8D8',
    borderRadius:5,
    top:'50%'
  },
  optionStyle: {
   padding:DIMENSIONS.hp(.4)
  },
  dividerStyle: {
    padding: DIMENSIONS.hp(0.2)
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    flex: 1,
  },
});

export default Drawer;
