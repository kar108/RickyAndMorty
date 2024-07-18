import React, { useState, useRef, useMemo } from "react";
import { View, FlatList, Modal, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextInput, KeyboardAvoidingView, Keyboard, Dimensions } from "react-native";

import { SIZES, DIMENSIONS, COLORS, FONTS } from "../utils/constants";
import { base, styles } from "../assets/styles";
import Typography from "./Typography";
import Icon from "./Icon";
import { isOs } from "../utils/helpers";

type Props = {
  value: string;
  label?: string;
  options: any[];
  onSelect: (x: any) => void;
  labelExtractor?: (x: any) => string;
  valueExtractor?: (x: any) => string;
  multiple?: boolean;
  placeholder?: string;
  searchable?: boolean;
  infoText?: string;
  onSearch?: (t: string) => void;
  disabled?: boolean;
  errorText?: string;
  style?: StyleProp<ViewStyle>;
  heightPercent?: number;
  showChips?: boolean;
  renderBase?: () => React.ReactNode | undefined,
}

function Dropdown({
  value,
  options,
  label = "",
  onSelect,
  labelExtractor = (x: any) => (x?.label || ""),
  valueExtractor = (x: any) => (x?.value || ""),
  multiple = false,
  searchable = false,
  placeholder = "Select",
  infoText = "",
  onSearch,
  disabled = false,
  errorText = "",
  style,
  heightPercent = 80,
  renderBase,
}: Props): JSX.Element {

  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const headerSearch = useRef<TextInput>(null);

  const filteredOptions = useMemo(
    () => {
      if (!searchTerm) return options;
      return options.filter(opt => (labelExtractor(opt).toLowerCase().includes(searchTerm.toLowerCase())));
    },
    [options, searchTerm]);

  const selectedItem = useMemo(() => options?.find?.(
    opt => (opt === value)),
    [value]);

  const toggleDropdown = () => setOpen(prev => {
    const isDropdownOpening = !prev;
    if (isDropdownOpening) {
      headerSearch.current?.focus?.();
    }
    return !prev;
  });

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    onSearch?.(text);
  }

  const handleSelect = (item: any) => {
    onSelect(item);
    handleSearch("");
    // if (!multiple) toggleDropdown();
    toggleDropdown();
  }

  const clearSelection = () => {
    onSelect("");
    handleSearch("");
  }

  const { row, align_center, justify_between, p_s, br_base, p_xxs, bg_secondaryAlt, mr_xs } = base;
  const { box_shadow } = styles;
  const { container, actionArea, dropdownWrapper, searchbar, info, option, overlay, cross } = pageStyles;

  const emptyComponent = (
    <View style={p_s}>
      <Typography align="center" size={SIZES.xl * 1.5} weight="BLD" textColor="text">No Data</Typography>
    </View>
  );

  const renderLabel = () => {
    if (!label) return null;
    return <Typography
      align="left"
      textColor="text"
      style={[base.mb_xxs]}
      size={SIZES.unit * 13}>
      {label}
    </Typography>;
  }

  const renderContent = () => {
    if (typeof renderBase === "function") return renderBase();
    if (searchable) return (
      <>
        <Icon name="search" width={2} height={2} style={[mr_xs, { tintColor: COLORS.form }]} />
        <Typography weight="REG" textColor="text3" size={SIZES.font} style={base.container}>{selectedItem || placeholder}</Typography>
        {(searchable && !multiple && value) ? (
          <TouchableOpacity onPress={clearSelection}>
            <Icon name="cross" height={1.5} style={cross} />
          </TouchableOpacity>
        ) : null}
      </>
    );
    return (
      <>
        <Typography weight="MED" textColor={selectedItem ? "white" : 'placeholder'} size={SIZES.font}>{selectedItem || placeholder}</Typography>
        <Icon name="chevronDown" width={2} height={2} />
      </>
    );
  }

  const renderInfo = () => {
    if (!infoText) return null;
    return <Typography weight="MED" textColor="form" size={SIZES.l} style={info}>{infoText}</Typography>;
  }

  const renderError = (): React.ReactNode => {
    if (errorText) {
      return <View style={[base.row, base.d_flex, base.w_90, base.align_center,{marginTop:'1%'}]}>
        <Typography weight="REG" textColor="primary" size={SIZES.unit * 12}>
          {errorText}
        </Typography>
      </View>
    }
    return null;
  }

  const renderOptions = ({ item, index }: { item: any, index: any }) => {
    const isSelected = item === value;
    console.log(item, "sdbb")
    const handlePress = () => handleSelect(item);
    return (
      <TouchableOpacity
        key={index}
        onPress={handlePress}
        style={[p_xxs, option]}
      >
        <Typography weight="REG" textColor={isSelected ? "primary" : "white"} size={SIZES.xl}>{item}</Typography>
      </TouchableOpacity>
    );
  }

  const renderDropdown = () => {
    return (
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={toggleDropdown}
      >
        <View style={base.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleDropdown}
            style={[base.container, overlay]}
          />
          <View style={[dropdownWrapper, box_shadow, p_s, br_base, { height: DIMENSIONS.hp(heightPercent) }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={filteredOptions}
              renderItem={renderOptions}
              keyExtractor={valueExtractor}
              stickyHeaderIndices={searchable ? [0] : []}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              ListEmptyComponent={emptyComponent}
              ListHeaderComponent={searchable ? (
                <TextInput
                  value={searchTerm}
                  onChangeText={handleSearch}
                  placeholder={placeholder}
                  ref={headerSearch}
                  placeholderTextColor={COLORS.form}
                  style={[searchbar, base.container]}
                />
              ) : null}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={container}>
      {renderLabel()}
      <TouchableOpacity
        onPress={toggleDropdown}
        disabled={disabled}
        style={[row, align_center, actionArea, (!searchable ? justify_between : {}), (disabled ? bg_lgray : bg_secondaryAlt), style]}
      >
        {renderContent()}
      </TouchableOpacity>
      {renderInfo()}
      {renderError()}
      {renderDropdown()}
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.hp(1.5)
  },
  actionArea: {
    // borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.m,
    padding: isOs('ios') ? DIMENSIONS.wp(4) : DIMENSIONS.wp(4),
  },
  dropdownWrapper: {
    backgroundColor: COLORS.secondaryAlt,
    // height: DIMENSIONS.hp(80),
  },
  overlay: {
    backgroundColor: COLORS.dark_overlay,
  },
  searchbar: {
    paddingVertical: DIMENSIONS.wp(3),
    color: COLORS.form,
    fontFamily: FONTS.REG,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    marginBottom: SIZES.xs,
  },
  info: {
    marginTop: DIMENSIONS.hp(.5),
  },
  option: {
    borderRadius: SIZES.base,
    marginBottom: DIMENSIONS.hp(.5),
  },
  cross: {
    tintColor: COLORS.form,
  }
});

export default Dropdown;