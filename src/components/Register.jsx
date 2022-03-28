import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { Box, Input, Button, Container } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate()

  const handleInputUsername = (e) => setUsername(e.target.value)
  const handleInputEmail = (e) => setEmail(e.target.value)
  const handleInputPassword = (e) => setPassword(e.target.value)
  const handleShowClick = () => setShowPassword(!showPassword)

  const handleRegister = async () => {
    let obj = {
      username,
      email,
      password,
    }

    const response = await axios
      .post("https://yugioh-256.herokuapp.com/api/register", obj)
      .catch((err) => {
        console.log(err)
        Swal.fire("Register Error", err.message, "error")
        return
      })

    if (response) {
      alert("REGISTER SUCCESSFULLY!")
      navigate("/", { replace: true })
    }
  }

  return (
    <>
      <Box className="box-form">
        <Box className="form-register" sx={{ boxShadow: 3 }}>
          {/* <Box
          sx={{
            top: 15,
          }}
        >
          YUGIOH
        </Box> */}
          <Box margin="20px">
            <Input
              value={username}
              onChange={handleInputUsername}
              fullWidth
              sx={{ top: 20 }}
              placeholder="username"
            />
            <Input
              value={email}
              onChange={handleInputEmail}
              fullWidth
              sx={{ top: 40 }}
              placeholder="email"
            />

            <Input
              value={password}
              onChange={handleInputPassword}
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{
                marginTop: 2,
                top: 45,
                type: "password",
              }}
              placeholder="password"
            />
            <VisibilityIcon
              onClick={handleShowClick}
              sx={{
                position: "absolute",
                left: 250,
                top: 150,
                cursor: "pointer",
              }}
            />

            <Button
              onClick={handleRegister}
              variant="contained"
              sx={{
                backgroundColor: "#65C18C",
                top: 100,
                width: "100%",
                ":hover": {
                  bgcolor: "black", // theme.palette.primary.main
                  color: "white",
                },
              }}
            >
              Register
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: 17,
              marginLeft: 16,
            }}
          >
            <Link className="link" to={"/"}>
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
