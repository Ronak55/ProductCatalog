import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100');
      setData(response.data.object);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.mediaUrl }} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.variants[0].sellingPrice}</Text>
      <Text style={styles.stock}>
        {item.variants[0].isOutOfStock ? 'Out of Stock' : 'Available'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            {renderProductCard({ item })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: (width - 32) / 2, // Adjusted width for better proportions
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 130, // Adjusted height for better proportions
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 12,
    color: '#555555',
  },
  price: {
    fontSize: 15,
    color: '#4CAF50',
    marginBottom: 8,
  },
  stock: {
    fontSize: 14,
    color: '#888888',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
});

export default HomeScreen;
