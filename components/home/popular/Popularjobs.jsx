import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import PopularJobCard from "@/components/common/cards/popular/PopularJobCard";
import { COLORS, SIZES } from "@/constants";
import { useFetch } from "@/hook/useFetch";

import styles from "./popularjobs.style";

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
    date_posted: "3days",
  });

  const [selectedJob, setSelectedJob] = useState();
  const handelCardPress = (job) => {
    router.push(`/job-details/${job.job_id}`);
    setSelectedJob(job.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show all
            {/*TODO: SHOW ALL*/}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong, try again!</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                job={item}
                selectedJob={selectedJob}
                handelCardPress={handelCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
