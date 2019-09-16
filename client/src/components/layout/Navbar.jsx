import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Container, Menu } from "semantic-ui-react"

const Navbar = props => {
  const [activeItem, setActiveItem] = useState("")
  const handleItemClick = (e, { name }) => setActiveItem(name)
  return (
    <Menu pointing secondary>
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
          <Menu.Item
            name="signout"
            active={activeItem === "signout"}
            onClick={handleItemClick}
            exact
            as={NavLink}
            to="/signout"
          />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
