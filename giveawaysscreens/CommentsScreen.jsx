// screens/CommentsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}`;

const CommentsScreen = ({ route }) => {
  const { giveawayId } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [sendDisabled, setSendDisabled] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/giveaways/${giveawayId}/comments/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    setSendDisabled(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/giveaways/${giveawayId}/comments/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (response.status === 201) {
        ToastAndroid.show('Comment sent', ToastAndroid.SHORT);
        setComment('');
        fetchComments();
      } else {
        ToastAndroid.show('Failed to send comment', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error sending comment:', error);
    }
    setSendDisabled(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          {comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Text>Username: {comment.user.bgmi_username}</Text>
              <Text>Comment: {comment.comment}</Text>
              <Button title="Like" onPress={() => handleLike(comment.id)} />
              <Text>Likes Count: {comment.likes_count}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
      />
      <Button title={sendDisabled ? 'Sent' : 'Send'} onPress={handleSend} disabled={sendDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  comment: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

export default CommentsScreen;
