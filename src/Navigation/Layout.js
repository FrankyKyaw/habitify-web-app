import React, { Fragment } from 'react'
import NavBar from './NavBar'

export default function Layout(props) {
  return (
    <Fragment>
        <NavBar/>
        <body>{props.children}</body>
    </Fragment>

  )
}
