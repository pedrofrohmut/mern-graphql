import React, { useContext, useState } from "react"

import { AuthContext } from "../../context/auth"

import { NavLink } from "react-router-dom"
import { Container, Menu } from "semantic-ui-react"

const Navbar = props => {
  const context = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState("")
  const handleItemClick = (e, { name }) => setActiveItem(name)
  return (
    <Menu pointing size="large" secondary style={{ marginBottom: "3rem", opacity: "0.75" }}>
      <Container>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          exact
          as={NavLink}
          to="/"
        />
        <Menu.Menu position="right">
          {!context.user && (
            <>
              <Menu.Item
                name="signin"
                active={activeItem === "signin"}
                onClick={handleItemClick}
                exact
                as={NavLink}
                to="/signin"
              />
              <Menu.Item
                name="signup"
                active={activeItem === "signup"}
                onClick={handleItemClick}
                exact
                as={NavLink}
                to="/signup"
              />
            </>
          )}
          {context.user && <Menu.Item name="signout" onClick={() => context.signOut()} />}
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
