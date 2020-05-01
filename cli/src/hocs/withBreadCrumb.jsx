import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Card } from 'antd'
import { breadcrumbNames } from 'constants/variables'

export default function BreadCrumb(WrappedComponent) {
  function Crumb(props) {
    const [paths, setPaths] = useState([])

    useEffect(() => {
      // flat namePath and add to array
      let namePath = props.match.url.split('/')
      // cut first empty element in array
      namePath.shift()

      // use a regular expression to find string have over 10 number and remove that element
      namePath.forEach((e, i) => {
        if(e.replace(/[^0-9]/g,'').length >= 10) {
          namePath.splice(i, 1)
        }
      })

      // add first link create by namePath to paths
      let paths = [`/${namePath[0]}`]

      // connect final link in paths to the next namePath after that push new link was created to paths
      namePath.forEach((e, i) => {
        if(i > 0) {
          paths.push(paths[i-1] + '/' + namePath[i])
        }
      })

      setPaths(paths)
    }, [props.match.url])

    return (
      <Fragment>
        <Card className='gx-card'>
          <Breadcrumb>
            {
              paths.length > 0 && paths.map((path, i) => (
                <Breadcrumb.Item key={i}>
                  <Link to={path}>{breadcrumbNames[path]}</Link>
                </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
        </Card>
        <WrappedComponent {...props}/>
      </Fragment>
    )
  }

  return Crumb
}
