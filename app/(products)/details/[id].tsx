import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { IProduct } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { APP_ID, API_KEY, ORGANIZATION_ID } from "@env";

const { width } = Dimensions.get("window");

const details = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();
  const { id, price } = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://api.timbu.cloud/products/${id}`, {
          params: {
            organization_id: ORGANIZATION_ID,
            reverse_sort: "false",
            page: 1,
            size: 10,
            Appid: APP_ID,
            Apikey: API_KEY,
          },
        });
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const parsedPrice = typeof price === "string" ? parseFloat(price) : 0;
  return (
    <SafeAreaView>
      {loading ? (
        <View style={{ justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Text style={styles.Title}>Product Info</Text>
            <View />
          </View>
          <ScrollView
            horizontal
            style={styles.scrollView}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {product?.photos.map((photo, index) => (
              <View key={index} style={styles.imgWrapper}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={{
                    uri: `https://api.timbu.cloud/images/${photo.url}`,
                  }}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.container}>
            <Text style={styles.name}>{product?.name}</Text>
            <Text style={styles.price}>{`₦ ${
              parsedPrice.toLocaleString() || 0
            }`}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Product Description
            </Text>
            <Text style={{ fontSize: 14 }}>{product?.description}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default details;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  Title: {
    fontSize: 20,
  },
  scrollView: {
    width: "100%",
    height: 300,
  },
  imgWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  image: {
    width: "70%",
    height: "100%",
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#0C1A30",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#FE3A30",
  },
});
