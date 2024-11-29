/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import { SafeAreaView, ScrollView, View, StatusBar, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AutoImageSlider from './components/AutoImageSlider';
import NewsComponent from './components/NewsComponent';
import RadioMarkNews from './components/RadioMarkNews';
import PollsCheckin from './components/PollsCheckin';
import UpcomingMatches from './components/UpcomingMatches';
import DetailsScreen from './screens/DetailsScreen';
import BottomNavbar from './components/BottomNavbar';
import RankScreen from './screens/RankScreen';
import RedeemScreen from './screens/RedeemScreen';
import AccountScreen from './screens/AccountScreen';
import Navbar from './components/Navbar';
import PollsScreen from './screens/PollsScreen';
import CheckInScreen from './screens/CheckInScreen';
import MiningScreen from './screens/MiningScreen';
import Footer from './components/Footer';
import MiningScreen2 from './screens/MiningScreen2';
import NotifyScreen from './screens/NotifyScreen';
import SymbolsScreen from './screens/SymbolsScreen';
import MatchRegister from './screens/MatchRegister';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider, useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import AccountScreenPut from './screens/AccountScreenPut';
import EsportsScreen from './screens/EsportsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Winners from './components/Winners';
import SplashScreen from 'react-native-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PrivacyPolicy from './drawerscreens/PrivacyPolicy';
import TermsConditions from './drawerscreens/TermsConditions';
import ChatScreen from './screens/ChatScreen';
import { API_KEY } from "@env";
import { TimerProvider } from './TimerContext';
import Mining from './components/Mining';
import HelpCenterScreen from './screens/HelpCenterScreen';
import DeviceInfo from 'react-native-device-info';
import UpdateDialog from './components/UpdateDialog';
import AcTransferScreen from './screens/AcTransferScreen';
import { SettingsProvider } from './SettingsContext';
import ErrorScreen from './screens/ErrorScreen';
import OfflineScreen from './screens/OfflineScreen';
import NetInfo from '@react-native-community/netinfo';
import Shop from './components/Shop';
import ShopScreen from './shopscreens/ShopScreen';
import ShopItemScreen from './shopscreens/ShopItemScreen';
import Achievement from './components/Achievement';
import { Image } from 'react-native';
import ForgotPassScreen from './screens/ForgotPassScreen';
import ResetPassScreen from './screens/ResetPassScreen';
import HistoryScreen from './screens/HistoryScreen';
import DailyCoupon from './components/DailyCoupon';
import ShopDetailsScreen from './shopscreens/ShopDetailsScreen';
import ShopPayScreen from './shopscreens/ShopPayScreen';
import AddDCScreen from './screens/AddDCScreen';
import Polls from './components/Polls';
import GiveawaysScreen from './giveawaysscreens/GiveawaysScreen';
import WinnersScreen from './giveawaysscreens/WinnersScreen';
import CommentsScreen from './giveawaysscreens/CommentsScreen';


const api_url = `${API_KEY}`;

function HomeScreen() {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { isLoggedIn, setIsLoggedIn, RefreshToken, loading } = useAuth();

  const navigation = useNavigation();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('refresh_token');
    // console.log('token', token);
    if (token) {
      const Refresh = await RefreshToken();
      // console.log('refresh',Refresh);
      if (Refresh === false) {
        // console.log('loading refresh token')
        navigation.replace('Login');
      }
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  // console.log('loading 1',loading, isLoggedIn);
  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Image source={require('./assets/loadgif.gif')} style={{ height: 400, width: 200, resizeMode: 'contain' }} />
      </View>
    )
  }

  // const version = DeviceInfo.getVersion();
  // console.log(version);


  return (
    <>
      <Navbar />
      <ScrollView style={{ backgroundColor: '#f7f8fa' }}>
        <SafeAreaView style={{ backgroundColor: '#f7f8fa' }}>
          <StatusBar animated={true} backgroundColor=".co" />
          {/* <View>
            <NewsComponent />
          </View> */}

          <View>
            <Winners />
          </View>

          <View>
            <AutoImageSlider />
          </View>

          <View>
            <RadioMarkNews />
          </View>

          <View>
            <PollsCheckin />
          </View>

          <View>
            <UpcomingMatches />
          </View>

          <View>
            <Polls />
          </View>

          <View>
            <Shop />
          </View>

        </SafeAreaView>
      </ScrollView>

      <View>
        <BottomNavbar />
      </View>
    </>
  );
}

// const Drawer = createDrawerNavigator();

// export const MyDrawer = () => {
//   return (
//     <Drawer.Navigator drawerContent={props => <SideBar {...props} />}>
//       <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
//       <Drawer.Screen name="TermsConditions" component={TermsConditions} />
//     </Drawer.Navigator>
//   )
// }

const Stack = createNativeStackNavigator();


const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(true); // Declare showUpdateDialog state variable

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    (
      isConnected ?


        <AuthProvider>
          <SettingsProvider>
            <TimerProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  {/* <Stack.Screen name='MyDrawer'>
          {props => <MyDrawer {...props} />}
        </Stack.Screen> */}
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                      headerShown: false,
                      animation: 'none',
                      title: 'Detail',
                    }}
                  />
                  <Stack.Screen
                    name="Rank"
                    component={RankScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Redeem"
                    component={RedeemScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="AccountPut"
                    component={AccountScreenPut}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Polls"
                    component={PollsScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="CheckIn"
                    component={CheckInScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Mining"
                    component={MiningScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Esports"
                    component={EsportsScreen}
                    options={{ headerShown: false, animation: 'none', title: 'Esports' }}
                  />
                  <Stack.Screen
                    name="Mining2"
                    component={MiningScreen2}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={NotifyScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Symbols"
                    component={SymbolsScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Registeration"
                    component={MatchRegister}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="ForgotPass"
                    component={ForgotPassScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="ResetPass"
                    component={ResetPassScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{ animation: 'none', headerTitle: 'Privacy Policy' }}
                  />
                  <Stack.Screen
                    name="Terms"
                    component={TermsConditions}
                    options={{ animation: 'none', headerTitle: 'Terms & Conditions' }}
                  />
                  <Stack.Screen
                    name="Help"
                    component={HelpCenterScreen}
                    options={{ animation: 'none', headerTitle: 'Help Center' }}
                  />
                  <Stack.Screen
                    name="AcTransfer"
                    component={AcTransferScreen}
                    options={{ animation: 'none', headerTitle: 'Account Transfer' }}
                  />
                  <Stack.Screen
                    name="Error"
                    component={ErrorScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Offline"
                    component={OfflineScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Shop"
                    component={ShopScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="ShopItem"
                    component={ShopItemScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="ShopDetails"
                    component={ShopDetailsScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Payment"
                    component={ShopPayScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="AddDC"
                    component={AddDCScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Giveaways"
                    component={GiveawaysScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Winners"
                    component={WinnersScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                  <Stack.Screen
                    name="Comments"
                    component={CommentsScreen}
                    options={{ headerShown: false, animation: 'none' }}
                  />
                </Stack.Navigator>
                <UpdateDialog isVisible={showUpdateDialog} onClose={closeUpdateDialog} />
              </NavigationContainer>
            </TimerProvider>
          </SettingsProvider>
        </AuthProvider>

        :

        <OfflineScreen />

    )
  );
};



export default App;
