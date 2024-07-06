import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types";
import axios from "axios";
import { API_KEY, APP_ID, ORGANIZATION_ID } from "@env";
import CustomAlert from "@/components/CustomAlert";

const products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.timbu.cloud/products", {
          params: {
            organization_id: ORGANIZATION_ID,
            reverse_sort: "false",
            page: 1,
            size: 12,
            Appid: APP_ID,
            Apikey: API_KEY,
          },
        });
        setProducts(res.data.items);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  const handleCloseAlert = () => {
    setError(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hey! what do you want?</Text>
        <Image style={styles.avi} source={require("@/assets/images/avi.png")} />
      </View>
      {loading ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          style={styles.productsWrapper}
          data={products}
          renderItem={({ item }) => <ProductCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 30,
          }}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      )}
      <CustomAlert
        visible={error}
        message={"Failed to load products. Please try again later."}
        onClose={handleCloseAlert}
      />
    </SafeAreaView>
  );
};

export default products;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "800",
    fontSize: 28,
    width: "50%",
  },
  avi: {
    width: 49,
    height: 49,
    borderRadius: 400,
  },
  productsWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
