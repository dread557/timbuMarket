import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CustomAlert from "./CustomAlert";
import { IProduct } from "@/types";
import { Link } from "expo-router";
import { truncateName } from "@/utils/misc";

const colors = [
  "#CBD6FF",
  "#E0E0E0",
  "#FCEEE1",
  "#FFE663",
  "#66B4FBs",
  "#ff6600",
];

const ProductCard = ({
  photos,
  name,
  selling_price,
  id,
  current_price,
}: IProduct) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link
      href={{
        pathname: "/details/[id]",
        params: { id, price: current_price?.[0].NGN[0] },
      }}
    >
      <View style={styles.wrapper}>
        <CustomAlert
          visible={alertVisible}
          message={`Added ${name} to cart`}
          onClose={() => setAlertVisible(false)}
        />
        <View style={[styles.imgWrapper, { backgroundColor: bgColor }]}>
          <Image
            style={styles.image}
            source={{ uri: `https://api.timbu.cloud/images/${photos[0].url}` }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Text style={styles.name}>{truncateName(name)}</Text>
          <Text style={styles.price}>{` ₦ ${
            (current_price && current_price?.[0].NGN[0].toLocaleString()) || 0
          }`}</Text>
        </View>
      </View>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "47%",
    marginBottom: 20,
    paddingRight: 20,
  },
  imgWrapper: {
    width: "100%",
    borderRadius: 35,
    padding: 30,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333",
  },
  price: {
    fontSize: 17,
    fontWeight: "900",
    color: "#808080",
  },
});
