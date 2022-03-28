import React, { useState, useEffect } from "react"
import { Box, Grid, Button, TextField, Input } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Card from "./Card"

function Profile() {
  const [decks, setDecks] = useState([])
  const [newDeck, setNewDeck] = useState("")
  const handleInputDeck = (e) => setNewDeck(e.target.value)
  let navigate = useNavigate()
  let apy = JSON.parse(localStorage.getItem("jwt"))

  async function getDecks() {
    try {
      const { data } = await axios.get(
        "https://yugioh-256.herokuapp.com/api/user_deck",
        {
          headers: {
            jwt: apy,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      setDecks(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddDeck = async () => {
    const response = await axios
      .post(
        "https://yugioh-256.herokuapp.com/api/add_deck",
        {
          name_deck: newDeck,
        },
        {
          headers: {
            jwt: apy,
          },
        }
      )
      .catch((err) => {
        console.log(err)
        return
      })
    if (response) {
      alert("success, please press f5")
      navigate("/profile", { replace: true })
    }
  }
  useEffect(() => {
    getDecks()
    handleAddDeck()
    // Navigation Guard
  }, [])
  return (
    <Box className="bg-profile">
      <Box className="bg2-profile">
        <Box className="profile"></Box>
        <Box
          sx={{
            width: "70%",
            height: "80%",
            backgroundColor: "white",
            margin: "3%",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "90%",
          border: "solid",
          height: "auto",
          // display: "flex",
          // flexDirection: "column",
          margin: "auto",
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
          }}
        >
          {decks.map((data, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card data={data} />
            </Grid>
          ))}
        </Grid>
        <Box>
          <Input fullWidth onChange={handleInputDeck} placeholder="new deck" />
          <Button onClick={() => handleAddDeck()} variant="contained">
            add deck
          </Button>
        </Box>
      </Box>
      {/* <Grid spacing={2}>
        {decks.map((data)=>(

        ))}
        </Grid> */}
    </Box>
  )
}

export default Profile
