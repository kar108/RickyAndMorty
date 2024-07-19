import React, { useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, Modal, StyleSheet, TouchableOpacity } from "react-native";

import { useLoader, useSnackbar } from "../hooks";
import { SnackbarType } from "../stores/types";
import { COLORS, SIZES } from "../utils/constants";
import { base } from "../assets/styles";
import Typography from "./Typography";

const SNACK_DURATION = 5000;

function Overlay (): JSX.Element {

  const loader = useLoader();
  const snackbar = useSnackbar();


  const visible = loader.active || snackbar.active;

  useEffect(() => {
    if(snackbar.active){
      setTimeout(() => {
        snackbar.hide();
      }, SNACK_DURATION);
    }
  }, [snackbar.active]);

  const loaderStyle = {
    backgroundColor: loader.bg,
    zIndex: 999,
  }

  const snackbarStyle = {
    backgroundColor: (snackbar.type === SnackbarType.ERROR)?
      (COLORS.snackbar_error):
      (snackbar.type === SnackbarType.INFO)?
        (COLORS.snackbar_info):
        (COLORS.snackbar_success),
  }

  const { container, align_center, justify_center, w_80 } = base;

  const renderLoader = () => {
    if(!loader.active) return null;
    return(
      <View style={[container, align_center, justify_center, loaderStyle]}>
        <ActivityIndicator color={COLORS.white} size="large" />
      </View>
    );
  }

  // const renderSnackBar = () => {
  //   if(!snackbar.active) return null;
  //   return(
  //     <SafeAreaView style={[container, styles.snackContainer]}>
  //       <TouchableOpacity
  //         onPress={snackbar.hide}
  //         activeOpacity={1}
  //         style={container}
  //       />
  //       <View style={[styles.snack, snackbarStyle]}>
  //         <Typography
  //           textColor="white"
  //           size={SIZES.font}
  //           // weight="BLD_I"
  //           mb={0}
  //           style={[w_80]}
  //         >
  //           {snackbar.message}
  //         </Typography>
  //         <Link
  //           onPress={snackbar.hide}
  //           style={styles.snackButton}
  //         >
  //           OK
  //         </Link>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return(
    <Modal
      visible={visible}
      transparent={true}
      animationType={snackbar.active? "slide": "fade"}
    >
      {renderLoader()}
      {/* {renderSnackBar()} */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  snackContainer: {
    backgroundColor: COLORS.transparent,
    justifyContent: "flex-end",
    zIndex: 10,
  },
  snack: {
    width: "90%",
    backgroundColor: COLORS.snackbar_error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5%",
    margin: "5%",
    borderRadius: SIZES.xs,
  },
  snackButton: {
    width: "15%",
    textAlign: "center",
    color: COLORS.light_overlay,
  },
});

export default Overlay;