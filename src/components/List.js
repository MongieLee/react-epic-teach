import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../store";
import { Table } from "antd";

const { Column } = Table;
const List = observer(() => {
  const { HistoryStore } = useStores();
  useEffect(() => {
    HistoryStore.find();
    return () => {
      HistoryStore.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table
      rowKey={(item) => {
        return item.id;
      }}
      dataSource={HistoryStore.dataList}
      loading={HistoryStore.isLoading}
      scroll={{ scrollToFirstRowOnChange: true, x: "100%", y: "650px" }}
      pagination={{
        onChange(page) {
          HistoryStore.changePage(page - 1);
          HistoryStore.find();
        },
        hideOnSinglePage: true,
        pageSize: 10,
        showQuickJumper: true,
        total: HistoryStore.total,
        showTotal: (total) => `共 ${total} 条数据`,
      }}
    >
      <Column
        title="图片缩略图"
        dataIndex={["attributes", "url", "attributes", "url"]}
        render={(value) => {
          return (
            <img
              style={{ objectFit: "contain" }}
              height={50}
              width={70}
              src={value}
              alt="图片"
            />
          );
        }}
      />
      <Column title="图片名称" dataIndex={["attributes", "filename"]} />

      <Column
        title="图片地址"
        dataIndex={["attributes", "url", "attributes", "url"]}
        render={(value) => {
          return (
            <a target="_blank" rel="noopener noreferrer" href={value}>
              {value}
            </a>
          );
        }}
      />
    </Table>
  );
});

export default List;
