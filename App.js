import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Image
} from 'react-native';


const {UPIInstalledAppsModule} = NativeModules;

const App = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getInstalledUPIApps = async () => {
      const appList = await UPIInstalledAppsModule.getInstalledUPIAppLists();
      setResults(appList);
    };
    getInstalledUPIApps();
  }, []);

  return (
    <View style={styles.container}>
      {results?.map((app) => (
        <View style={styles.listView}>
          <Image
            source={{ uri: `data:image/png;base64, ${app?.icon}` }}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text>{app?.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listView: {
    flexDirection: 'column',
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default App;
