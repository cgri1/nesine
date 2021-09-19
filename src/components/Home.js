import React, { useState, useEffect, useRef, useContext } from 'react';
import 'antd/dist/antd.css';
import './home.css';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table, Card, Divider, Row } from 'antd';
import Context from '../store';

const events = require('../../data/bulten_data.json').Events;
const idOfEvents = Object.keys(events);
const lengthOfEvents = idOfEvents.length;

const dataSource = [];

export function Home(props) {
  let scrollY = document.body.offsetHeight - 55;
  const [tableWidth, setTableWidth] = useState(0);

  const { state, dispatch } = useContext(Context);

  const columns = [
    {
      title: 'Event Count: ' + lengthOfEvents,
      dataIndex: 'title',
      width: 360,
    },
    {
      title: 'Yorumlar',
      dataIndex: 'Yorumlar',
      width: 150,
    },
    {
      title: ' ',
      dataIndex: 'Empty',
    },
    {
      title: '1',
      dataIndex: 'MS1',
    },
    {
      title: 'x',
      dataIndex: 'MSx',
    },
    {
      title: '2',
      dataIndex: 'MS2',
    },
    {
      title: 'Alt',
      dataIndex: 'Alt',
    },
    {
      title: 'Üst',
      dataIndex: 'Üst',
    },
    {
      title: 'H1',
      dataIndex: 'H1',
    },
    {
      title: '1',
      dataIndex: 'H11',
    },
    {
      title: 'x',
      dataIndex: 'H1x',
    },
    {
      title: '2',
      dataIndex: 'H12',
    },
    {
      title: 'H2',
      dataIndex: 'H2',
    },
    {
      title: '1-X',
      dataIndex: 'CS1X',
    },
    {
      title: '1-2',
      dataIndex: 'CS12',
    },
    {
      title: 'X-2',
      dataIndex: 'CSX2',
    },
    {
      title: 'Var',
      dataIndex: 'Var',
    },
    {
      title: 'Yok',
      dataIndex: 'Yok',
    },
    {
      title: '+99',
      dataIndex: 'MS99',
    },
  ];


  idOfEvents.forEach((id, index) => {
    dataSource.push(
      {
        key: index,
        title: <span style={{ color: "red" }}><span style={{ color: "green" }}>{index}</span>{' ' + events[id].D + ' ' + events[id].DAY + ' ' + events[id].LN}</span>,
        Yorumlar: 'Yorumlar',
        Empty: ' ',
        MS1: '1',
        MSx: 'x',
        MS2: '2',
        Alt: 'Alt',
        Üst: 'Üst',
        H1: 'H1',
        H11: '1',
        H1x: 'x',
        H12: '2',
        H2: 'H2',
        CS1X: '1-X',
        CS12: '1-2',
        CSX2: 'X-2',
        Var: 'Var',
        Yok: 'Yok',
        MS99: '+99',
      },
      {
        key: index,
        title: events[id].C + '  ' + events[id].T + '  ' + events[id].N,
        Yorumlar: 'Yorumlar',
        Empty: '4',
        MS1: <div id={id} className="grid-cell-MS1" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[1].OC[0].O, Id: id, type: "MS1" }
            setBasketValue(state.basketValues, newValue);

          }
        }>{events[id].OCG[1].OC[0].O}</div>,
        MSx: <div id={id} className="grid-cell-MSx" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[1].OC[1].O, Id: id, type: "MSx" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[1].OC[1].O}</div>,
        MS2: ' ',
        Alt: <div id={id} className="grid-cell-Alt" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[5].OC[25].O, Id: id, type: "Alt" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[5].OC[25].O}</div>,
        Üst: <div id={id} className="grid-cell-Üst" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[5].OC[26].O, Id: id, type: "Üst" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[5].OC[26].O}</div>,
        H1: ' ',
        H11: ' ',
        H1x: ' ',
        H12: ' ',
        H2: ' ',
        CS1X: <div id={id} className="grid-cell-CS1X" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[2].OC[3].O, Id: id, type: "CS1X" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[2].OC[3].O}</div>,
        CS12: <div id={id} className="grid-cell-CS12" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[2].OC[4].O, Id: id, type: "CS12" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[2].OC[4].O}</div>,
        CSX2: <div id={id} className="grid-cell-CSX2" style={{ cursor: "pointer" }} onClick={
          () => {
            let newValue = { value: events[id].OCG[2].OC[5].O, Id: id, type: "CSX2" }
            setBasketValue(state.basketValues, newValue);
          }
        }>{events[id].OCG[2].OC[5].O}</div>,
        Var: ' ',
        Yok: ' ',
        MS99: '3',
      })
  })

  const widthColumnCount = columns.filter(({ width }) => !width).length;

  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      title: column.title, dataIndex: column.dataIndex,
      width: Math.floor(tableWidth / widthColumnCount)
    };
  });

  const gridRef = useRef();

  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scrollY && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scrollY}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          let sameId = false;
          if (rowIndex % 2 === 1) {
            for (let x = 0; x < state.basketValues.length; x++) {
              if (state.basketValues[x].Id === rawData[rowIndex].title.substring(0, 4) && state.basketValues[x].type === mergedColumns[columnIndex].dataIndex) {
                sameId = true;
              }
            }
          }
          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              }, { 'selected-cell': sameId })}
              style={style}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          )
        }}
      </Grid>
    );
  };

  const setBasketValue = (oldValue, newValue) => {
    let sameId = false;
    let sameIdDiffValue = false;

    oldValue.forEach(data => {
      if (data.value === newValue.value && data.Id === newValue.Id) {
        sameId = true;
      } else if (data.value !== newValue.value && data.Id === newValue.Id) {
        sameIdDiffValue = true;
      }
    })

    if (sameId) {
      dispatch({ type: 'POP_BASKET', value: newValue })
    } else if (sameIdDiffValue) {
      dispatch({ type: 'POP_BASKET', value: newValue })
      dispatch({ type: 'PUSH_BASKET', value: newValue })
    } else {
      dispatch({ type: 'PUSH_BASKET', value: newValue })
    }
  }
  let total = 1;

  return (
    <Row>
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          dataSource={dataSource}
          components={{
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
      <div className="basket-div">
        <Card>
          {state.basketValues.map(data => {
            total = total * Number(data.value);
            return (
              <div>
                <span>4 Kod {data.Id} Maç : {events[data.Id].N}</span>
                <br />
                <span>Oran : {data.value} MBS : {data.type === "MS1" || data.type === "MSx" ?
                  events[data.Id].OCG[1].MBS :
                  data.type === "Alt" || data.type === "Üst" ?
                    events[data.Id].OCG[5].MBS : events[data.Id].OCG[2].MBS
                }</span>
              </div>
            )
          })}
          {state.basketValues.length > 0 && <Divider style={{ fontSize: "24px" }} />}
          <span style={{ fontSize: "24px" }}>Toplam Tutar :{total}</span>
        </Card>
      </div>
    </Row>
  );
}
