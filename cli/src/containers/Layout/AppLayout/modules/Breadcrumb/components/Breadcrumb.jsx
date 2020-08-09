import React, { useState, useEffect } from 'react'
import { Card, Breadcrumb } from 'antd'
import Icon from '@ant-design/icons'
import { breadcrumbNames } from 'constants/variables'

export default function BreadcrumbBar() {
  const [paths, setPaths] = useState([])

  useEffect(() => {
    // flat namePath and add to array
    let namePath = window.location.pathname.split('/')
    // cut first empty element in array
    namePath.shift()

    // use a regular expression to find string have over 10 number and remove that element
    namePath.forEach((e, i) => {
      if (e.replace(/[^0-9]/g,'').length >= 10) {
        namePath.splice(i, 1)
      }
    })

    // add first link create by namePath to paths
    let paths = [`/${namePath[0]}`]

    // connect final link in paths to the next namePath after that push new link was created to paths
    namePath.forEach((e, i) => {
      if (i > 0) {
        paths.push(paths[i-1] + '/' + namePath[i])
      }
    })

    setPaths(paths)
  }, [window.location.pathname])

  return (
    <Card className='gx-card'>
      <Breadcrumb>
        {
          paths.length > 0 && paths.map((path, i) => (
            <Breadcrumb.Item key={i} href={path}>
              <span className='gx-link'>
                <Icon component={breadcrumbNames[path].icon} style={{ verticalAlign: 'middle', height: '19px' }} />
                <span className='gx-ml-2'>{breadcrumbNames[path].name}</span>
              </span>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </Card>
  )
}