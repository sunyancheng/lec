import React, { FunctionComponent, memo } from "react";
import { Table } from "leap-ui";
import classNames from "classnames";
import styles from "./style.less";

import { ProductTreeDataProps } from "@/types/ProductTree";

// const nullRender = (text = "-") => text || "-";
interface ListTableProps {
  tableOptions: { [key: string]: string };
  singlePage?: boolean;
  onPageChange: (page: string, page_size?: number) => void;
  data?: ProductTreeDataProps;
  className?: string;
  columns: { dataIndex: string; title: string }[];
}
export const ListTable: FunctionComponent<ListTableProps> = memo(
  ({ data, className, tableOptions={}, columns, onPageChange, singlePage }) => {
    const { pageOptions = {}, ...tableProps } = tableOptions;
    return (
      <Table
        className={classNames(className, styles.ListTable)}
        columns={columns}
        {...tableProps}
        dataSource={
          singlePage
            ? Array.isArray(data)
              ? data
              : []
            : Array.isArray(data?.data)
            ? data?.data
            : []
        }
        pagination={
          singlePage
            ? false
            : {
                ...pageOptions,
                current: Number(data?.current_page || 1),
                pageSize: Number(data?.page_size || data?.per_page || 20),
                total: Number(data?.total),
                onChange: (page, pageSize) => onPageChange(`${page}`, pageSize),
              }
        }
      />
    );
  }
);
