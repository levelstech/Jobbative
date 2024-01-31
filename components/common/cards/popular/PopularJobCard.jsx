import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { images } from "@/constants";
import { checkImageURL } from "@/utils";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ job, selectedJob, handelCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, job)}
      onPress={() => handelCardPress(job)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, job)}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : images.baseJobImg,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text styles={styles.companyName} numberOfLines={1}>
        {job.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, job)} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.location}>{job.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
