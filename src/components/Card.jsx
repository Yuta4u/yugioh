import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, CardActionArea } from "@mui/material"

function Card({ data }) {
  let navigate = useNavigate()

  return (
    <Box className="decks">
      <Box
        sx={{
          width: 270,
          height: 400,
          backgroundColor: "grey",
        }}
      >
        <Box sx={{ textAlign: "center" }}>{data["name_deck"]}</Box>
        <CardActionArea onClick={() => navigate(`/deck/${data["name_deck"]}`)}>
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4175c3f-297e-48be-8d30-8480016829c7/d6dlsyg-52f89407-773a-464f-93d3-4648cc91f3fb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTc1YzNmLTI5N2UtNDhiZS04ZDMwLTg0ODAwMTY4MjljN1wvZDZkbHN5Zy01MmY4OTQwNy03NzNhLTQ2NGYtOTNkMy00NjQ4Y2M5MWYzZmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.k4l8iCg25RvwL970YL9xb-4qbIzXhg9FMIB3KqF9_QA"
            width="270px"
            height="380px"
          />
        </CardActionArea>
      </Box>
    </Box>
  )
}

export default Card
