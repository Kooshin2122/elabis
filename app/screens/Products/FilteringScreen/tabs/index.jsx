// Tabs
import CategoryTab from './CategoryTab';
import BrandsTab from './BrandsTab';
import ModelsTab from './ModelsTab';
import YearsTab from './YearsTab';
//
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//
const Tab = createMaterialTopTabNavigator();
//
function FilteringMaterialTopTabs({ activeTab = 'Category' }) {
    return (
        <Tab.Navigator
            initialRouteName={activeTab}
            screenOptions={{
                swipeEnabled: false,
                tabBarStyle: {
                    elevation: 1,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.primary_color
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
            }}
        >
            <Tab.Screen name={`Category`} component={CategoryTab} />
            <Tab.Screen name={`Brands`} component={BrandsTab} />
            <Tab.Screen name={`Models`} component={ModelsTab} />
            <Tab.Screen name={`Years`} component={YearsTab} />
        </Tab.Navigator>
    );
}

export default FilteringMaterialTopTabs;

// export function Badge() {
//     return (
//         <View style={{ width: 18, height: 18, backgroundColor: 'red', borderRadius: 40 }} >
//             <Text style={{ fontSize: 9, }}>
//                 10
//             </Text>
//         </View>
//     )
// }