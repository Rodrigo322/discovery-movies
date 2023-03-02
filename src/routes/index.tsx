import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./tabs.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
