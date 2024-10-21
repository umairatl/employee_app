import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../constant/navigation';

export default function HomeFlatList({data, navigation}) {
  const onClickViewDetail = id => {
    navigation.navigate(SCREEN.EMPLOYEE_DETAILS, {id});
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      scrollEnabled={true}
      style={{height: 555}}
      renderItem={({item, index}) => (
        <View style={styles.item}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onClickViewDetail(item.id);
            }}>
            <View>
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
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#d6d6f2',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapFlatList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
