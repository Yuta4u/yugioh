import React from "react"
import { Card, CardMedia, CardActions, Button, Box } from "@mui/material"
import { useState } from "react"

function GlobalCard({ data }) {
  return (
    <Card sx={{ width: 200 }}>
      <CardMedia
        component="img"
        height="300px"
        image={data["card_images"][0]["image_url"]}
      />
    </Card>
  )
}

export default GlobalCard
