import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Box, Input, Button, Container } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Swal from "sweetalert2"
import axios from "axios"

import "./App.css"

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = React.useState(false)
  let navigate = useNavigate()

  const handleInputUsername = (e) => setUsername(e.target.value)
  const handleInputPassword = (e) => setPassword(e.target.value)
  const handleShowClick = () => setShowPassword(!showPassword)

  const handleLogin = async () => {
    let obj = {
      username,
      password,
    }

    const response = await axios
      .post("https://yugioh-256.herokuapp.com/api/login", obj)
      .catch((err) => {
        console.log(err)
        Swal.fire("Login Error", err.message, "error")
        return
      })

    if (response) {
      const jwt = response.data.jwt
      localStorage.setItem("jwt", JSON.stringify(jwt))
      if (localStorage.getItem("jwt")) {
        alert("SUCCESSFULL")
        navigate("/profile", { replace: true })
      }
    }
  }
  return (
    <>
      <Box className="box-form">
        <Box className="form" sx={{ boxShadow: 3 }}>
          {/* <Box
          sx={{
            top: 15,
          }}
        >
          YUGIOH
        </Box> */}
          <Box margin="20px">
            <Input
              fullWidth
              onChange={handleInputUsername}
              placeholder="username"
            />
            <Box>
              <Input
                type={showPassword ? "text" : "password"}
                fullWidth
                onChange={handleInputPassword}
                sx={{
                  marginTop: 2,
                  type: "password",
                }}
                placeholder="password"
              />
              <VisibilityIcon
                onClick={handleShowClick}
                sx={{
                  position: "absolute",
                  left: 250,
                  top: 70,
                  cursor: "pointer",
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                backgroundColor: "#65C18C",
                marginTop: "15%",
                width: "100%",
                ":hover": {
                  bgcolor: "black", // theme.palette.primary.main
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: 4,
              textAlign: "center",
              color: "#F582A7",
              textShadow: 3,
            }}
          >
            Create account?{" "}
            <Link className="link" to={"/register"}>
              Register
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
