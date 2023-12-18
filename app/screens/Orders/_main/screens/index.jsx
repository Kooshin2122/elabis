//
import Basket from './Basket';
import OnProcess from './OnProcess';
import Completed from './Completed';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//
const Tab = createMaterialTopTabNavigator();
//
function MaterialTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarStyle: {
          elevation: 1,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary_color
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        // tabBarStyle: { marginHorizontal: '3%' },
        tabBarLabelStyle: { fontSize: 13, fontWeight: '500' },
      }}
    >
      <Tab.Screen name="Basket" component={Basket} />
      <Tab.Screen name="On-Process" component={OnProcess} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
}

export default MaterialTopTabs;