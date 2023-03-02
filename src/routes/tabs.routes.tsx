import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkSimple, House, MagnifyingGlass } from "phosphor-react-native";
import { Details } from "../screens/Details";
import { Home } from "../screens/Home";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242A32",
          height: 78,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296E5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296E5",
        tabBarInactiveTintColor: "#67686D",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={30} weight="light" />
          ),
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={30} weight="light" />
          ),
        }}
      />

      <Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookmarkSimple color={color} size={30} weight="light" />
          ),
        }}
      />

      <Screen
        name="Details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
