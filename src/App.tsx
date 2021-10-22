import { Button, Modal } from "leap-ui";
import React from "react";
import { useRef } from "react";
import { Page } from "./Page";
import { FormPage } from "./FormPage";

const filters = [
  {
    id: "username",
    key: "username",
    label: "用户名",
    mode: "Search",
    placeholder: "请输入用户名",
    rules: [{ require: true }],
    advRules: { required: true },
  },
  { id: "phone", key: "phone", label: "手机号", placeholder: "" },
  {
    id: "sex",
    key: "sex",
    label: "性别",
    type: "select",
    showAll: true,
    placeholder: "请选择性别",
    values: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  {
    id: "age",
    key: "age",
    label: "年龄",
    type: "select",
    showAll: true,
    placeholder: "请选择性别",
    values: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  {
    id: "channel",
    key: "channel",
    label: "渠道",
    type: "select",
    showAll: true,
    placeholder: "请选择性别",
    values: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  { id: "course_name", key: "course_name", label: "课程名称" },
  {
    id: "course_type",
    key: "course_type",
    label: "课程分类",
    type: "select",
    showAll: true,
    placeholder: "请选择性别",
    values: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  {
    id: "method",
    key: "method",
    label: "获课方式",
    type: "select",
    showAll: true,
    placeholder: "请选择性别",
    values: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  { id: "buy_time", key: "buy_time", label: "购买时间", type: "datePicker" },
  { id: "date", key: "date", label: "选择日期", type: "datePicker" },
];

const columns = [
  { id: "username", key: "username", title: "用户名" },
  { id: "phone", key: "phone", title: "手机号" },
  { id: "sex", key: "sex", title: "性别" },
  { id: "age", key: "age", title: "年龄" },
  { id: "channel", key: "channel", title: "渠道" },
  { id: "area", key: "area", title: "地区" },
  { id: "course_name", key: "course_name", title: "课程名称" },
  { id: "course_type", key: "course_type", title: "课程分类" },
  { id: "buy_time", key: "buy_time", title: "购买时间" },
  { id: "method", key: "method", title: "获课方式" },
  { id: "price", key: "price", title: "客单价" },
  { id: "day-completion", key: "day-completion", title: "当日完成度" },
  { id: "total-completion", key: "total-completion", title: "累计完成度" },
];

const buttons = [
  {
    title: "新增时段",
    type: "primary",
    modalTrigger: "CreateSchedule",
  },
  {
    title: "新增时段",
    type: "primary",
  },
];

const modals = [
  {
    name: "CreateSchedule",
    title: "新增时段",
    width: 800,
    formOptions: {
      layout: "horizontal",
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 4 },
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 },
      // },
      models: [
        {
          label: "产品名称",
          key: "product_name",
          id: "product_name",
          type: "input",
          // initialValue: "abc",
          placeholder: "请输入产品名称",
          advRules: { required: true, maxLen: 40 },
        },
        {
          label: "课程时长(分钟)",
          key: "lesson_duration",
          id: "lesson_duration",
          type: "inputNumber",
          placeholder: "请输入",
          // initialValue: 1,
          advRules: { required: true, min: 0, max: 999, type: "integer" },
        },
      ],
    },

    submitOptions: {
      payload: (model) => ({
        product_id: model.product_id,
        // act: COURSE_PRODUCT_ACTION_RELEASE,
      }),
      action: "RecallOrRelease",
      // onSuccess: () => {
      //   loadData();
      // },
    },
    action: "submit",
  },
];

const formPageModels = [
  {
    name: "CreateSchedule",
    title: "新增时段",
    width: 800,
    formOptions: {
      layout: "horizontal",
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 4 },
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 },
      // },
      models: [
        {
          label: "产品名称",
          key: "product_name",
          id: "product_name",
          type: "input",
          // initialValue: "abc",
          placeholder: "请输入产品名称",
          advRules: { required: true, maxLen: 40 },
        },
        {
          label: "课程时长(分钟)",
          key: "lesson_duration",
          id: "lesson_duration",
          type: "inputNumber",
          placeholder: "请输入",
          // initialValue: 1,
          advRules: { required: true, min: 0, max: 999, type: "integer" },
        },
      ],
    },

    submitOptions: {
      payload: (model) => ({
        product_id: model.product_id,
        // act: COURSE_PRODUCT_ACTION_RELEASE,
      }),
      action: "RecallOrRelease",
      // onSuccess: () => {
      //   loadData();
      // },
    },
  },
];

export default () => {
  const pageRef = useRef(null);
  return (
    <div style={{ marginTop: 50 }}>
      <Page
        modals={modals}
        buttons={buttons}
        filters={{ data: filters, manualSearch: true, manualReset: true }}
        ref={pageRef}
        tableOptions={{ columns }}
        API={{ lightLessonCompletionGetList: () => {} }}
        namespace="lightLessonCompletion"
        requestOptions={{ initialData: [{}, {}] }}
      >
        <Button
          type="link"
          onClick={() => pageRef.current.filters.resetFields()}
        >
          RESET
        </Button>
      </Page>
      <FormPage
        formOptions={{
          layout: "horizontal",
          models: [
            {
              label: "产品名称",
              key: "product_name",
              id: "product_name",
              type: "input",
              // initialValue: "abc",
              placeholder: "请输入产品名称",
              advRules: { required: true, maxLen: 40 },
            },
            {
              label: "课程时长(分钟)",
              key: "lesson_duration",
              id: "lesson_duration",
              type: "inputNumber",
              placeholder: "请输入",
              // initialValue: 1,
              advRules: { required: true, min: 0, max: 999, type: "integer" },
            },
          ],
        }}
        submitOptions={{
          payload: (model) => ({
            product_id: model.product_id,
            // act: COURSE_PRODUCT_ACTION_RELEASE,
          }),
          action: "RecallOrRelease",
          // onSuccess: () => {
          //   loadData();
          // },
        }}
      />
    </div>
  );
};
