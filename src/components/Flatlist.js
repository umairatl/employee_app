import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../constant/navigation';
import {useDispatch} from 'react-redux';
import {setEmployeeId} from '../store/employeeSlice';

export default function HomeFlatList({data, navigation}) {
  const dispatch = useDispatch();

  const onClickViewDetail = id => {
    dispatch(
      setEmployeeId({
        employeeId: id,
      }),
    );

    navigation.navigate(SCREEN.EMPLOYEE_DETAILS);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      scrollEnabled={true}
      style={{height: 500}}
      renderItem={({item, index}) => (
        <View style={styles.item}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onClickViewDetail(item.id);
            }}>
            <View style={styles.layout}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{
                  width: 70,
                  height: 70,
                }}
              />

              <View style={styles.detailsLayout}>
                <View style={styles.wrapFlatList}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#292989',
                      borderRadius: 50,
                    }}></View>
                  <Text>{item.department}</Text>
                </View>

                <Text
                  style={
                    styles.taskText
                  }>{`${item.firstName} ${item.lastName}`}</Text>
                <Text style={styles.taskText}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 5,
    borderLeftColor: '#4c669f',
    borderLeftWidth: 5,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsLayout: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15,
  },
  wrapFlatList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
