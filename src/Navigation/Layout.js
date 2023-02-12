import React, { Fragment } from 'react'
import NavBar from './NavBar'

export default function Layout(props) {
  return (
    <Fragment>
        <NavBar/>
        <body className=" overflow-hidden bg-orange-50">{props.children}</body>
    </Fragment>

  )
}
