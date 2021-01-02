import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Breadcrumb } from 'antd'
import Icon from '@ant-design/icons'
import { breadNames } from 'constants/variables'
import { get, split } from 'lodash'

function BreadcrumbBar(location) {
  const [paths, setPaths] = useState([])

  useEffect(() => {
    let namePath = split(get(location, 'location.pathname'), '/')
    namePath.shift() // remove empty element at the beginnings

    // if the element have over 10 number then remove it
    namePath.forEach((e, i) => {
      if (e.replace(/[^0-9]/g,'').length >= 10) {
        namePath.splice(i, 1)
      }
    })

    // Generate list of links for each breadcrumb item
    let paths = [`/${namePath[0]}`]
    namePath.forEach((_, i) => i > 0 && paths.push(`${paths[i-1]}/${namePath[i]}`))
    setPaths(paths)
  }, [location])

  const styling = path => path !== paths[paths.length - 1] ? 'gx-link' : ''

  return (
    <Card className='gx-card'>
      <Breadcrumb>
        {
          paths.length > 0 && paths.map((path, i) => (
            <Breadcrumb.Item key={i} href={path}>
              <span className={styling(path)}>
                {
                  breadNames[path].icon && <Icon
                    component={breadNames[path].icon}
                    style={{ verticalAlign: 'middle', height: '19px' }}
                  />
                }
                <span className='gx-ml-2'>{breadNames[path].name}</span>
              </span>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </Card>
  )
}

export default withRouter(BreadcrumbBar)