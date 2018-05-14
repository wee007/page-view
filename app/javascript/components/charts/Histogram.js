import React from "react"
import PropTypes from "prop-types"
import { render } from 'react-dom'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLegend,
  VictoryStack,
  VictoryTooltip
} from 'victory'

class Histogram extends React.Component {
  transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y;
      }, 0);
    });
    return dataset.map((data) => {
      return data.map((datum, i) => {
        return { x: datum.x, y: datum.y };
      });
    });
  }

  buildLegendData() {
    let legendData = []
    this.props.queryData.map((data) => {
      legendData.push({name: data["aggregations"]["url"]["buckets"][0]["key"]})
    })
    return legendData
  }

  buildDataset() {
    let dataset = []
    if (this.props.queryData.length > 0 && !this.props.queryData[0]["error"]) {
      let axisValues = []
      this.props.queryData.map((data) => {
        data.aggregations.count_over_time.buckets.map((bucket) => {
          axisValues.push({ x: bucket.key_as_string, y: bucket.doc_count, label: data.aggregations.url.buckets[0].key })
        })
        dataset.push(axisValues)
      })
    }
    return dataset
  }

  render () {
    const requestedDataset = this.buildDataset()
    if (requestedDataset.length > 0) {
      const dataset = this.transformData(requestedDataset)
      return (
        <React.Fragment>
          <h2>Count Over Time</h2>
          <VictoryChart height={400} width={400} domainPadding={{ x: 60, y: 20 }} >
            <VictoryStack>
              {dataset.map((data, i) => {
                return <VictoryBar data={data} key={i} labelComponent={<VictoryTooltip/>} />;
              })}
            </VictoryStack>
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
            <VictoryAxis tickFormat={requestedDataset[0].map((data) => data.x)} />
            <VictoryLegend x={50} y={0}
              orientation="vertical"
              gutter={20}
              data={requestedDataset}
            />
          </VictoryChart>
        </React.Fragment>
      )
    } else {
      return (<React.Fragment><div></div></React.Fragment>)
    }
  }
}

Histogram.propTypes = {
  queryData: PropTypes.array
}

export default Histogram
