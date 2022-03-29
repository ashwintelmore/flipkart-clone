import React from 'react'
import Header from '../Header'
import HeaderMenu from '../HeaderMenu'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
      <>
        <Header />
        <HeaderMenu />
        {props.children}
     </>
   )

 }

export default Layout