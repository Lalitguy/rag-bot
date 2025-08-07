import { useAllKnowledge } from "@/src/api/knowledge";
import AddButton from "@/src/components/animated/AddButton";
import KnowledgeListItem from "@/src/components/cards/KnowledgeListItem";
import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import LoadingPage from "@/src/components/common/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

const KnowledgeList = () => {
  const queryClient = useQueryClient();
  const handleRedirect = () => {
    router.push("/(rag-bot)/knowledge-base/add");
  };

  const { data, isLoading, isFetching } = useAllKnowledge();

  const { data: knowledgeList } = data || {};

  if (isLoading) return <LoadingPage />;

  return (
    <Container noPadding>
      <FlatList
        data={knowledgeList}
        renderItem={({ item }) => (
          <KnowledgeListItem knowledge={item} key={item._id} />
        )}
        onRefresh={() =>
          queryClient.invalidateQueries({ queryKey: ["knowledge"] })
        }
        refreshing={isFetching}
        refreshControl={<RefreshControl refreshing={isFetching} />}
      />
      <AddButton onPress={handleRedirect} />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: "50%",
  },
  btnText: {
    fontFamily: "Nunito-Bold",
  },
});

export default KnowledgeList;
