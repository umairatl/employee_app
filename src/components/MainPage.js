import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {getEmployeesByPagination} from '../api/employee';
import {SCREEN} from '../constant/navigation';
import {PAGESIZE_DROPDOWN} from '../constant/table';
import HomeFlatList from './Flatlist';
import {HOMEPAGE} from '../constant/main';

const MainPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployeesData = async () => {
    try {
      setIsLoading(true);
      const dataList = await getEmployeesByPagination(pageNo, pageSize);
      if (dataList) {
        setData(dataList.content);
        setTotalPages(dataList.totalPages);
      }
    } catch (err) {
      console.log('Error getEmployeesData', err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPageNo(0);
      setPageSize(10);
      setTotalPages(1);
      getEmployeesData();
    }, []),
  );

  useEffect(() => {
    getEmployeesData();
  }, [pageNo, pageSize]);

  const onClickPrev = () => {
    setPageNo(prev => Math.max(prev - 1, 0));
  };

  const onClickNext = () => {
    setPageNo(prev => prev + 1);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectPageSize = size => {
    setPageNo(0);
    setPageSize(size);
    setShowDropdown(false);
  };

  const onClickAddEmployee = () => {
    navigation.navigate(SCREEN.EMPLOYEE_ADD);
  };

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', zIndex: 999}}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text>Page Size: {pageSize}</Text>
        </TouchableOpacity>
        {showDropdown && (
          <FlatList
            style={{height: 70}}
            data={PAGESIZE_DROPDOWN}
            scrollEnabled={true}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectPageSize(item)}>
                <Text>{item} </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={{marginTop: 70}}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.blueGrey400} />
        ) : (
          <HomeFlatList data={data} navigation={navigation} />
        )}
        <View style={styles.wrapPagination}>
          <TouchableOpacity onPress={onClickAddEmployee}>
            <View style={styles.btnEmployee}>
              <Text style={{color: 'white'}}>{HOMEPAGE.ADD_EMPLOYEE}</Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text>{`${HOMEPAGE.PAGE} ${pageNo + 1}/ ${totalPages}`}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={onClickPrev} disabled={pageNo === 0}>
              <View
                style={{
                  backgroundColor: pageNo === 0 ? '#D3D3D3' : '#292989',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Icon name="chevron-left" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClickNext}
              disabled={pageNo === totalPages - 1}>
              <View
                style={{
                  backgroundColor:
                    pageNo === totalPages - 1 ? '#D3D3D3' : '#292989',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="chevron-right" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
  },
  wrapPagination: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  dropdown: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 110,
    marginLeft: 260,
    marginTop: 20,
  },
  dropdownItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    width: 110,
    marginLeft: 260,
  },
  btnEmployee: {
    backgroundColor: '#292989',
    width: 115,
    padding: 10,
    borderRadius: 10,
  },
});
