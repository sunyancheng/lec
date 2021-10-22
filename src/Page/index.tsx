import React, {
  forwardRef,
  FunctionComponent,
  useState,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import { Filters } from "../Filters";
import { ListTable } from "../ListTable";
import { PageProps } from "./types";
import useRequest from "@luban-hooks/use-request";

import { Modal, Button } from "leap-ui";

import { REQUEST, REQUEST_MANUAL } from "../utils/request";
import { FormModal } from "../FormModal";
import { useRef } from "react";

const initialPageCriteria = { page: 1, page_size: 20 };

export interface ActionProps {
  (
    api: string,
    namespace: string,
    columns: [],
    actions: { [key: string]: string }
  ): {};
}

const generateAction: ActionProps = (API, namespace, columns, options) => {
  return columns.map((column) => {
    if (column.dataIndex === "actionColumn" && column.actionList) {
      const render = (text, record) => {
        const actions = column.actionList(text, record);
        if (actions.length === 0) return column.nullRender || "";
        return (
          <div className="over_text">
            {actions.map((item, index) =>
              item.type === "download" ? (
                <a
                  href={item.downloadURL}
                  className={classNames("icon_blue", {
                    disabled: item.disabled,
                  })}
                  download
                >
                  {item.title}
                </a>
              ) : (
                <span
                  key={index}
                  className={classNames("icon_blue", {
                    disabled: item.disabled,
                  })}
                  onClick={() => {
                    if (item.disabled) return;
                    if (item.modalTrigger) {
                      item.onTriggered && item.onTriggered(record);
                      options.setVisibleModal(item.modalTrigger);
                      options.setModalPayload(record);
                      return;
                    }

                    if (item.type === "confirm") {
                      Modal.confirm({
                        title: "删除后不可恢复，确认删除？",
                        onOk: () => {
                          REQUEST(
                            API,
                            namespace,
                            item.action,
                            item.payload,
                            options.getList
                          );
                        },
                        ...item.confirm,
                      });
                    } else {
                      item.onClick(record);
                    }
                  }}
                >
                  {item.title}
                </span>
              )
            )}
          </div>
        );
      };
      return { ...column, render };
    }
    if (column.action && column.render) {
      const render = (text, record) => {
        const action = REQUEST_MANUAL(
          API,
          namespace,
          column.action,
          options.getList
        );
        return column.render(text, record, action);
      };
      return { ...column, render };
    }
    return column;
  });
};

const Buttons: FunctionComponent = ({ buttons, setVisibleModal }) => {
  if (!Array.isArray(buttons)) return null;

  return (
    <div className="topButtonGroup">
      {buttons.map(({ modalTrigger, navigator, ...btn }, key: number) => (
        <Button
          {...btn}
          key={key}
          onClick={
            modalTrigger
              ? () => setVisibleModal(modalTrigger)
              : btn.onClick
              ? btn.onClick
              : null
          }
        >
          {btn.title}
        </Button>
      ))}
    </div>
  );
};

const Modals: React.FunctionComponent = ({
  modals,
  visibleModal,
  setVisibleModal,
  getList,
  modalPayload,
}) => {
  if (!Array.isArray(modals)) return null;
  const onCancel = () => setVisibleModal(null);
  const submitOptions = (modal) => ({
    ...modal.submitOptions,
    onSuccess: () => {
      const onSuccess = modal.submitOptions.onSuccess;

      if (onSuccess) {
        onSuccess();
      }

      getList();
    },
  });

  return (
    <div className="topButtonGroup">
      {modals.map(
        ({ name, ...modal }, key: number) =>
          visibleModal === name && (
            <FormModal
              visible
              onCancel={onCancel}
              {...modal}
              formOptions={
                typeof modal.formOptions === "function"
                  ? modal.formOptions(modalPayload)
                  : modal.formOptions
              }
              submitOptions={submitOptions(modal)}
              key={key}
            />
          )
      )}
    </div>
  );
};

const Page: FunctionComponent<PageProps> = forwardRef(
  (
    {
      modals,
      filters,
      tableOptions,
      buttons,
      namespace,
      children,
      controlBar,
      defaultSearchCriteria,
      API,
      requestOptions,
      singlePage,
      onComplete,
      formatter,
    },
    leComponentRef
  ) => {
    // filter从model中接收initialValue 作为初始查询参数,
    const initialCriteria = (Array.isArray(filters) ? filters : filters.data)
      .filter((m) => m.initialValue !== undefined)
      .reduce((p, { id, initialValue, valueToModel }) => {
        const criteria = valueToModel
          ? valueToModel(id, initialValue)
          : { [id]: initialValue };
        return { ...p, ...criteria };
      }, {});
    const filterType = useRef<"filter" | "page">("filter");
    const [criteria, setCriteria] = useState(
      singlePage
        ? initialCriteria
        : { ...initialPageCriteria, ...initialCriteria }
    );

    const { data: listData, run: loadData2 } = useRequest(
      API[`${namespace}GetList`],
      {
        initialData: [],
        defaultParams: { ...criteria, ...defaultSearchCriteria },
        formatter: formatter ? formatter : (res) => res.data.data,
        onSuccess: (data) => {
          setLoading(false);
          if (onComplete) onComplete(data, filterType.current);
        },
        onError: () => {
          setLoading(false);
          if (onComplete) onComplete();
        },
        ...requestOptions,
      }
    );

    const loadData = (params) => {
      setLoading(true);
      loadData2(params);
    };

    const filterRef = useRef(null);

    useImperativeHandle(leComponentRef, () => ({
      criteria,
      pageData: listData,
      loadData: (c) => loadData({ ...criteria, ...c }),
      filters: filterRef?.current?.form,
    }));

    const onFilter = (newCriteria: object) => {
      const params = { ...criteria, ...newCriteria };
      if (
        !Array.isArray(filters) &&
        filters.toVerify &&
        !filters.toVerify({ ...params })
      )
        return;
      const page = singlePage ? undefined : "1";
      setCriteria((prevCriteria) => ({
        ...prevCriteria,
        ...newCriteria,
        page,
      }));
      filterType.current = "filter";

      loadData({ ...params });
    };

    const onPageChange = (page: string, page_size: number) => {
      loadData({ ...criteria, page, page_size });
      filterType.current = "page";
      setCriteria({ ...criteria, page });
    };

    const { columns: tableColumns, ...tableRestOptions } = tableOptions;

    const getList = () => loadData(criteria);

    const [visibleModal, setVisibleModal] = useState([]);

    const [modalPayload, setModalPayload] = useState(null);

    const [loading, setLoading] = useState(true);

    const columns = generateAction(API, namespace, tableColumns, {
      setVisibleModal,
      setModalPayload,
      getList,
    });

    return (
      <div className="normal-page">
        <Modals
          modals={modals}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          modalPayload={modalPayload}
          getList={getList}
        />

        <Buttons buttons={buttons} setVisibleModal={setVisibleModal} />

        <Filters filters={filters} onSubmit={onFilter} ref={filterRef} />

        {controlBar ? controlBar(criteria) : null}

        <ListTable
          tableOptions={{ loading, ...tableRestOptions }}
          columns={columns}
          data={listData}
          singlePage={singlePage}
          onPageChange={singlePage ? undefined : onPageChange}
        />
        {children}
      </div>
    );
  }
);

export { Page };
