import React, {useState} from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {base, styles} from '../assets/styles';
import {useAsync} from '../hooks/async';
import {GetCharacters} from '../services/characters';
import Typography from '../components/Typography';
import Input from '../components/Input';
import {useDebounce} from '../hooks';
import {COLORS, SIZES} from '../utils/constants';
import ThreeDots from '../components/ThreeDot';
import Button from '../components/Button';
import BareBottomSheet from '../components/BareBottomSheet';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation<any>();

  const statusList = ['alive', 'dead', 'unkown'];
  const speciesList = ['human', 'alien', 'unkown'];
  const genderList = ['female', 'male', 'genderless', 'unknown'];

  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({
    status: '',
    species: '',
    gender: '',
  });
  const [apply, setApply] = useState<boolean>(false);

  const debounced_search = useDebounce(searchKey, setPage);

  const updateCharacterList = (res: any) => {
    if (page > 1) {
      setData(prevData => [...prevData, ...res?.data?.results]);
    } else {
      setData(res?.data?.results);
    }
    setMaxPage(res?.data?.info?.pages);
  };

  const {refetch: rel} = useAsync(GetCharacters, {
    onSuccess: updateCharacterList,
    onError: (e: any) => {
      setData([]);
      console.log(e, 'error');
    },
    args: [
      debounced_search,
      page,
      filters.status,
      filters.species,
      filters.gender,
    ],
    deps: [debounced_search, page, apply],
    loader: 'GLOBAL',
  });

  const {p_xs, bg_secondary, mt_s} = base;

  const renderCards = ({item}: {item: Character}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail', {details: item});
        }}
        style={pagestyles.item}>
        <Image source={{uri: item?.image}} style={pagestyles.image} />
        <Typography weight="BLD" style={pagestyles.text} lines={1}>
          {item?.name}
        </Typography>
      </TouchableOpacity>
    );
  };

  const renderEmptyPage = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Typography weight="BLD" size={20}>
          There is nothing here
        </Typography>
      </View>
    );
  };

  const renderFilters = () => {
    return (
      <View style={{gap: 20, padding: 10}}>
        <Typography
          size={16}
          weight="BLD"
          style={{textTransform: 'capitalize'}}>
          Filters
        </Typography>

        <View style={[base.row, {gap: 10}]}>
          <TouchableOpacity
            onPress={() => {
              setApply(!apply);
              setPage(1);
              setShow(false);
            }}
            style={[
              pagestyles.btn,
              {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: COLORS.secondary,
              },
            ]}>
            <Typography size={12} style={{textTransform: 'capitalize'}}>
              Apply
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setFilters({...filters, species: '', status: '', gender: ''});
              setPage(1);
              setApply(!apply);
              setShow(false);
            }}
            style={[
              pagestyles.btn,
              {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: COLORS.secondary,
              },
            ]}>
            <Typography size={12} style={{textTransform: 'capitalize'}}>
              Clear
            </Typography>
          </TouchableOpacity>
        </View>

        <View style={{gap: 5}}>
          <Typography size={14}>Status: </Typography>
          <View style={[base.row, {gap: 5}]}>
            {statusList.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFilters({...filters, status: item});
                  }}
                  style={[
                    pagestyles.btn,
                    {
                      backgroundColor:
                        filters.status === item
                          ? COLORS.primary
                          : COLORS.secondary,
                    },
                  ]}>
                  <Typography size={12} style={{textTransform: 'capitalize'}}>
                    {item}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{gap: 5}}>
          <Typography size={14}>Species: </Typography>
          <View style={[base.row, {gap: 5}]}>
            {speciesList.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFilters({...filters, species: item});
                  }}
                  style={[
                    pagestyles.btn,
                    {
                      backgroundColor:
                        filters.species === item
                          ? COLORS.primary
                          : COLORS.secondary,
                    },
                  ]}>
                  <Typography size={12} style={{textTransform: 'capitalize'}}>
                    {item}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{gap: 5}}>
          <Typography size={14}>Gender: </Typography>
          <View style={[base.row, {gap: 5}]}>
            {genderList.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFilters({...filters, gender: item});
                  }}
                  style={[
                    pagestyles.btn,
                    {
                      backgroundColor:
                        filters.gender === item
                          ? COLORS.primary
                          : COLORS.secondary,
                    },
                  ]}>
                  <Typography size={12} style={{textTransform: 'capitalize'}}>
                    {item}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View>
        <Input
          value={searchKey}
          onChange={(e: string) => {
            setSearchKey(e);
          }}
          placeholder="search by name"
          iconStyle={{tintColor: 'white'}}
          icon={{
            name: 'filter',
            action: () => {
              setShow(true);
            },
          }}
          wrapperStyle={[bg_secondary, mt_s]}
        />
        <BareBottomSheet
          visible={show}
          onClose={() => {
            setShow(false);
          }}>
          {renderFilters()}
        </BareBottomSheet>
      </View>
    );
  };

  return (
    <View style={[styles.primary_container, p_xs]}>
      {renderSearchBar()}
      <FlatList
        contentContainerStyle={{flex: data ? 0 : 1}}
        data={data}
        renderItem={renderCards}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={() => {
          if (page < maxPage) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={1}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={rel}
            progressViewOffset={-500}
          />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={6}
        ListEmptyComponent={renderEmptyPage}
      />
    </View>
  );
}

const pagestyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: '2.5%',
  },
  btn: {
    backgroundColor: COLORS.secondary,
    width: '20%',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Home;
