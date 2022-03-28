import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Button, Modal, Typography, Grid } from "@mui/material"
import axios from "axios"
import GlobalCard from "./GlobalCard"
import CardDeck from "./cards/CardDeck"

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const DetailDeck = () => {
  let params = useParams()
  const [open, setOpen] = React.useState(false)
  const [cards, setCards] = useState([])
  const [cardDeck, setCardDeck] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  let apy = JSON.parse(localStorage.getItem("jwt"))
  async function getGlobalCards() {
    try {
      const { data } = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?race=dragon&attribute=water"
      )

      setCards(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const addCard = (card) => {
    let temp = cardDeck
    temp.push(card)
    setCardDeck(temp)

    let newCard = cards.filter((e) => {
      return e.id !== card.id
    })

    setCards(newCard)
  }

  const saveCardDeck = async () => {
    const response = await axios
      .put(
        "https://yugioh-256.herokuapp.com/api/save_deck",
        {
          name_deck: params.name,
          card: cardDeck,
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
      alert("success")
      setOpen(false)
    }
  }

  async function getCardDeck() {
    try {
      const { data } = await axios.get(
        `https://yugioh-256.herokuapp.com/api/pick_deck/${params.name}`,
        {
          headers: {
            jwt: apy,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      console.log(data)
      setCardDeck(data[0]["card"])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getGlobalCards()
    getCardDeck()
    saveCardDeck()
    // Navigation Guard
  }, [])

  return (
    <Box
      sx={{
        width: "90%",
        height: "500px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%%",
          textAlign: "center",
          fontSize: 70,
          backgroundColor: "purple",
        }}
      >
        {params.name} Deck
      </Box>
      <Button onClick={handleOpen}>ADD CARD</Button>
      <Modal
        className="modal-global-cards"
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
            }}
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
          >
            CARD
            <Grid container spacing={5}>
              {cards.map((globalCard) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <GlobalCard data={globalCard} />
                  <Button onClick={() => addCard(globalCard)}>ADD</Button>
                </Box>
              ))}
            </Grid>
            <Button onClick={() => saveCardDeck()}>SAVE</Button>
          </Typography>
        </Box>
      </Modal>
      <Grid container style={{ gap: 15 }}>
        {cardDeck.map((cardDeck) => (
          <CardDeck data={cardDeck} />
        ))}
      </Grid>
    </Box>
  )
}

export default DetailDeck
