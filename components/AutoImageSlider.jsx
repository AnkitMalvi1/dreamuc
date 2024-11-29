import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { API_KEY } from "@env";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


const api_url = `${API_KEY}`;

const AutoImageSlider = () => {
  const [offerImages, setOfferImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    fetchOfferImages();
  }, []);

  const fetchOfferImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      setOfferImages(data.offer_images);
    } catch (error) {
      console.error('Error fetching offer images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === offerImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [offerImages]);

  return (
    <View style={styles.container}>
      {loading ?
        <ContentLoader
          backgroundColor="#eaedf1"
          foregroundColor="#fafafa">
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>

        :

        <Image
          source={{
            uri: `${api_url}${offerImages[currentImageIndex]?.img}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 185,
    padding: 16,
    backgroundColor: '#f7f8fa',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default AutoImageSlider;
