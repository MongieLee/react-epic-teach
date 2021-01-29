import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../store";
import InfiniteScroll from "react-infinite-scroller";
import { List as AdList, Spin } from "antd";
import sytled from "styled-components";
const Image = sytled.img`
  height:120;
  widht:100;
  object-fit:'contain'
  border:1px solid #ccc
`;
const List = observer(() => {
  const { HistoryStore } = useStores();
  useEffect(() => {
    return () => {
      HistoryStore.reset();
    };
  }, []);
  const loadMore = () => {
    console.log("irun");
    HistoryStore.find();
  };
  const scrollProps = {
    initialLoad: true,
    pageStart: 0,
    loadMore: loadMore,
    hasMore: !HistoryStore.isLoading && HistoryStore.hasMore,
    useWindow: true,
  };

  return (
    <InfiniteScroll {...scrollProps}>
      <AdList
        dataSource={HistoryStore.dataList}
        renderItem={(item) => {
          return (
            <AdList.Item key={item.id}>
              <div>
                <Image alt="图片" src={item.attributes.url.attributes.url} />
                <div>
                  <h5>{item.attributes.filename}</h5>
                </div>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.attributes.url.attributes.url}
                  >
                    {item.attributes.filename}
                  </a>
                </div>
              </div>
            </AdList.Item>
          );
        }}
      >
        {HistoryStore.isLoading && HistoryStore.hasMore && (
          <div>
            <Spin tip="加载中..." />
          </div>
        )}
      </AdList>
    </InfiniteScroll>
  );
});

export default List;
