import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ShadowedView } from 'react-native-fast-shadow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';

const api_url = `${API_KEY}/`;

const RedeemedR = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchRanks(page);
  }, [page]);

  const fetchRanks = async (page) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}rank/?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setRanks((prevRanks) => [...prevRanks, ...data.results]);
      setHasMore(data.next !== null);

      // Log the number of objects loaded
      // console.log('Loaded objects:', data.results.length);
      // console.log('Total objects so far:', [...ranks, ...data.results].length);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 20 }} />;
  };

  return (
    <View style={{ flex: 1, marginTop: 10, paddingVertical: 15, paddingHorizontal: 15 }}>
      <FlatList
        data={ranks}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 10 }} key={item.id}>
            <ShadowedView
              style={{
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <View
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', width: 20 }}>
                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222' }}>{index + 1}</Text>
                  </View>
                  <Image
                    source={{ uri: `${api_url}${item.user_profile}` }}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'cover',
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  />
                  <View>
                    <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222' }}>{item.bgmi_username}</Text>
                    <Text style={{ fontFamily: 'MavenPro-Regular', color: '#222' }}>{item.bgmi_id}</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: 5,
                    borderRadius: 5,
                    flexDirection: 'row',
                  }}
                >
                  <Image
                    source={require('../assets/DreamUC-DC.png')}
                    style={{ height: 19, width: 19, resizeMode: 'cover', marginRight: 4 }}
                  />
                  <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222' }}>{item.userpoint}</Text>
                </View>
              </View>
            </ShadowedView>
          </View>
        )}
      />
    </View>
  );
};

export default RedeemedR;
