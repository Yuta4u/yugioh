import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Register from "./components/Register"
import Profile from "./components/Profile"
import DetailDeck from "./components/DetailDecks"

const rootElement = document.getElementById("root")
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/deck">
          <Route path=":name" element={<DetailDeck />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  rootElement
)
