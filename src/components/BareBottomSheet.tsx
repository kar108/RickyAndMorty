import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { base } from '../assets/styles';
import { COLORS, SIZES } from '../utils/constants';
import { isOs } from '../utils/helpers';

type Props = {
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onClose: () => void;
  testID?: string;
  modalClose?: any;
  closer?: boolean
};

function BareBottomSheet({
  visible,
  children,
  style,
  onClose,
  testID,
  modalClose,
  closer = true
}: Props): JSX.Element {
  const { bg_white, p_xxs, container, p_xs } = base;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal transparent animationType="slide" visible={visible}
        onRequestClose={modalClose}
      >
        <Pressable
          onPress={onClose} style={styles.modalBackGround}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView
              style={[bg_white, p_xxs, styles.container, style]}
              behavior="padding" 
            >
              {children}
            </KeyboardAvoidingView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 0,
    elevation: SIZES.xs,
    // width: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    // maxHeight:'100%'
    backgroundColor: '#262626'
  },
  overlay: {
    backgroundColor: COLORS.dark_overlay,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: COLORS.dark_overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: '#262626',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BareBottomSheet;
