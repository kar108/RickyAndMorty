import React from 'react';
import {base, styles} from '../assets/styles';
import {View, Image, StyleSheet} from 'react-native';
import Typography from '../components/Typography';

function DetailPage({route}: any) {
  const details: Character = route?.params.details;

  const {row, align_center, justify_between} = base;

  return (
    <View style={[styles.primary_container]}>
      <View style={{width: '100%', height: '40%', padding: '2.5%'}}>
        <Image
          source={{uri: details?.image}}
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        />
      </View>
      <View style={[pagestyles.BottomContainer]}>

        <Typography weight="BLD" size={30}>
          {details?.name}
        </Typography>

        <View style={[row, align_center, {gap: 5}]}>
          <View
            style={[
              pagestyles.dot,
              {backgroundColor: details?.status?.toLowerCase() === 'alive' ? 'green' : 'red'},
            ]}></View>
          <View style={[row, align_center]}>
            <Typography>{details?.status}</Typography>
            <Typography> - {details?.species}</Typography>
          </View>

          <Typography> ,  {details?.gender}</Typography>
        </View>

        <View style={{gap:5,marginTop:'5%'}}>
          <Typography textColor='secondary'>Last known location:</Typography>
          <Typography>{details?.location?.name}</Typography>
        </View>

        <View style={{gap:5,marginTop:'5%'}}>
          <Typography textColor='secondary'>First seen in:</Typography>
          <Typography>{details?.origin?.name}</Typography>
        </View>
      </View>
    </View>
  );
}

const pagestyles = StyleSheet.create({
  BottomContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: '2.5%',
    backgroundColor: '#141414',
    flex: 1,
    padding:'5%',
    flexWrap:'wrap'
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
  },
});

export default DetailPage;
