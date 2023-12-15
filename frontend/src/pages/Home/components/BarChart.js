import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'


const BarChart = ({ title, data }) => {
  const chartRef = useRef(null)

  const keys = data.map(item => item.customer);
  const values = data.map(item => item.amount);
  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: keys,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: values,
          type: 'bar'
        }
      ]
    }
    option && myChart.setOption(option)

  }, [title, data])
  return <div ref={chartRef} style={{ width: '800px', height: '400px' }}></div>
}

export default BarChart