import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  MD2Colors,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {getEmployeesByPagination} from '../api/employee';
import {HOMEPAGE} from '../constant/main';
import HomeFlatList from './Flatlist';
import {setEmployeeDataCounts} from '../store/employeeSlice';

const MainPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // modal section
  const [value, setValue] = useState('10');
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 50, margin: 40};

  const getEmployeesData = async () => {
    try {
      setIsLoading(true);
      const dataList = await getEmployeesByPagination(pageNo, pageSize);
      if (dataList) {
        setData(dataList.content);
        setTotalPages(dataList.totalPages);

        dispatch(
          setEmployeeDataCounts({
            countTotalEmployee: dataList.totalElements,
            countTotalPage: dataList.totalPages,
            countItemInList: dataList.content.length,
          }),
        );
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapPagination}>
        <TouchableOpacity onPress={showModal}>
          <View style={{marginLeft: 10}}>
            <MaterialIcons name="sort" size={30} />
          </View>
        </TouchableOpacity>

        <View>
          <Text>{`${HOMEPAGE.PAGE} ${pageNo + 1}/ ${totalPages}`}</Text>
        </View>

        <View flexDirection="row">
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

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 15}}>
            Sort by page size:
          </Text>
          <RadioButton.Group
            onValueChange={value => {
              setValue(value);
              setPageNo(0);
              setPageSize(value);
              setVisible(false);
            }}
            value={value}>
            <RadioButton.Item label="5 per page" value="5" />
            <RadioButton.Item label="10 per page" value="10" />
            <RadioButton.Item label="50 per page" value="50" />
            <RadioButton.Item label="100 per page" value="100" />
          </RadioButton.Group>
        </Modal>
      </Portal>

      <View style={{marginTop: 10}}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.blueGrey400} />
        ) : (
          <HomeFlatList data={data} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    marginTop: 20,
  },
  wrapPagination: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },

  dropdown: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 110,
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
