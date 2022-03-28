import React from "react"
import { CardMedia, Card, Button } from "@mui/material"

function CardDeck({ data }) {
  return (
    <Card sx={{ width: 200 }}>
      <CardMedia
        component="img"
        height="300px"
        image={data["card_images"][0]["image_url"]}
      />
      <Button sx={{ color: "black", textAlign: "center" }}>REMOVE</Button>
    </Card>
  )
}

export default CardDeck
