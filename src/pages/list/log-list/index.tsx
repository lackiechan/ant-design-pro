import { PlusOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { ActionType, ProCard, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { TableListItem } from "../table-list/data";
import { rule } from "../table-list/service";

const LogList: React.FC=()=>{
    const salesData: {
        x: string;
        y: number;
      }[] = [];
      
      for (let i = 0; i < 50; i += 1) {
        salesData.push({
          x: `2020-10-10 ${i}:19:12`,
          y: Math.random()*2000,
        });
      }

    // const salesData=[
    //     {x:'2020-10-10 02:19:12',y:120},
    //     {x:'2020-10-10 03:19:12',y:80},
    //     {x:'2020-10-10 04:19:12',y:80},
    //     {x:'2020-10-10 05:19:12',y:80},
    //     {x:'2020-10-10 06:19:12',y:80},
    // ];
    const actionRef = useRef<ActionType>();
      /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

    const columns: ProColumns<TableListItem>[] = [
        {
          title: '规则名称',
          dataIndex: 'name',
          tip: '规则名称是唯一的 key',
          fixed: 'left',
        },
        {
          title: '描述HA',
          dataIndex: 'desc',
          valueType: 'textarea',
        },
        {
          title: '描述2',
          dataIndex: 'desc',
          valueType: 'textarea',
        },
        {
          title: '描述3',
          dataIndex: 'desc',
          valueType: 'textarea',
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          sorter: true,
          hideInForm: true,
          renderText: (val: string) => `${val}万`,
        },
        {
          title: '状态',
          dataIndex: 'status',
          hideInForm: true,
          valueEnum: {
            0: {
              text: '关闭1',
              status: 'Default',
            },
            1: {
              text: '运行中',
              status: 'Processing',
            },
            2: {
              text: '已上线',
              status: 'Success',
            },
            3: {
              text: '异常',
              status: 'Error',
            },
          },
        },
        {
          title: '上次调度时间',
          sorter: true,
          dataIndex: 'updatedAt',
          valueType: 'dateTime',
          renderFormItem: (item, { defaultRender, ...rest }, form) => {
            const status = form.getFieldValue('status');
    
            if (`${status}` === '0') {
              return false;
            }
    
            if (`${status}` === '3') {
              return <Input {...rest} placeholder="请输入异常原因！" />;
            }
    
            return defaultRender(item);
          },
        },
      ];

    return (
        <><ProTable<TableListItem>
           
            actionRef={actionRef}
            rowKey="key"
            options={false}
            search={{
                labelWidth: 120,
                showHiddenNum:true

            }}
            tableExtraRender={(_, data) => (
                <ProCard style={{ height: 120,width:'100%' }}>
                <Column
                    height={100}
                
                    data={salesData}
                    xField="x"
                    yField="y"
                    paddingBottom={12}
                    axis={{
                        x: {
                            title: false,
                        },
                        y: {
                            title: false,
                            gridLineDash: [1, 1],
                            gridStroke: 'rgb(102, 102, 102)',
                            gridLineWidth: 1
                        },
                    }}
                    scale={{
                        x: { paddingInner: 0.4 },
                    }}
                    tooltip={{
                        name: '数量',
                        channel: 'y',
                    }} />
            </ProCard>
              )}
            toolBarRender={() => [
                <div></div>
            ]}
            request={rule}
            columns={columns}
            rowSelection={{
                onChange: (_, selectedRows) => {
                    setSelectedRows(selectedRows);
                },
            }} /></>
    );
}


export default LogList;