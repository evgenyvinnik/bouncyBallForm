import { AppBar, Toolbar } from "@mui/material";
import { Container } from "@mui/system";

import RegisterForm from "./Register";
import React, { useState, useEffect } from "react";
import "./App.css";
import {} from "react-konva";
import { Stage, Layer } from "react-konva";
import Field from "./Field";
import Ball from "./Ball";
import { WIDTH, HEIGHT } from "./constants";

export function App() {
  const [end, setEnd] = useState("Play");
  const [typing, setTyping] = useState(0);

  const [title, setTitle] = useState(
    "Type in the form before the ball stops, or the form would lock itself. Each time you type the ball will get velocity."
  );

  useEffect(() => {
    if (end == "Winner") {
      setTitle("Congrats you have filed everything great!");
    } else if (end == "Over") {
      setTitle("Game Over");
    }
  }, [end]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>{title}</Toolbar>
      </AppBar>
      <Container>
        <Stage className="App" width={WIDTH} height={HEIGHT}>
          <Layer>
            <Field />
            <Ball end={end} setEnd={setEnd} typing={typing} />
          </Layer>
        </Stage>
        <RegisterForm
          typing={typing}
          end={end}
          setEnd={setEnd}
          setTyping={setTyping}
        />
      </Container>
    </>
  );
}
