import React, { useState, useEffect } from "react";
import { Ellipse } from "react-konva";
import { WIDTH, HEIGHT } from "./constants";
export default function Ball({ end, setEnd, typing }) {
  const timeDiff = 50;
  const defaultRadius = 50;
  const minRadius = 30;
  const gravity = 10;
  var speedIncrementFromGravityEachFrame = (gravity * timeDiff) / 1000;
  var collisionDamper = 0.4;
  // 20% energy loss
  var floorFriction = 5;
  // px / second^2
  var floorFrictionSpeedReduction = (floorFriction * timeDiff) / 1000;
  const maxSpeed = 20;

  const [xDraw, setXDraw] = useState(defaultRadius * 2);
  const [yDraw, setYDraw] = useState(defaultRadius * 2);
  const [xRadiusDraw, setXRadiusDraw] = useState(defaultRadius);
  const [yRadiusDraw, setYRadiusDraw] = useState(defaultRadius);
  const [velocityDraw, setVelocityDraw] = useState({
    x: Math.random() * maxSpeed,
    y: Math.random() * maxSpeed,
  });

  const [innerTyping, setInnerTyping] = useState(typing);

  //const [time, setTime] = useState(Date.now());

  const animate = () => {
    let velocity = velocityDraw;
    let x = xDraw;
    let y = yDraw;
    let radiusX = xRadiusDraw;
    let radiusY = yRadiusDraw;

    // gravity
    velocity.y += speedIncrementFromGravityEachFrame;
    if (innerTyping < typing) {
      setInnerTyping(typing);
      velocity.y -= 10;
    }

    x += velocity.x;
    y += velocity.y;

    if (velocity.y > maxSpeed || velocity.y < -maxSpeed) {
      velocity.y = maxSpeed;
    }
    if (velocity.x > maxSpeed || velocity.x < -maxSpeed) {
      velocity.x = maxSpeed;
    }

    // ceiling condition
    if (y < radiusY) {
      y = radiusY;
      velocity.y *= -1;
      velocity.y *= 1 - collisionDamper;
    }

    // floor condition
    if (y > HEIGHT - radiusY) {
      y = HEIGHT - radiusY;
      velocity.y *= -1;
      velocity.y *= 1 - collisionDamper;
    }

    // floor friction
    if (y == HEIGHT - radiusY) {
      if (velocity.x > 0.1) {
        velocity.y -= floorFrictionSpeedReduction;
      } else if (velocity.x < -0.1) {
        velocity.x += floorFrictionSpeedReduction;
      } else {
        velocity.x = 0;
        if (end == "Play") {
          setEnd("Over");
        }
      }
    }

    // right wall condition
    if (x > WIDTH - radiusX) {
      x = WIDTH - radiusX;
      velocity.x *= -1;
      velocity.x *= 1 - collisionDamper;
    }

    // left wall condition
    if (x < radiusX) {
      x = radiusX;
      velocity.x *= -1;
      velocity.x *= 1 - collisionDamper;
    }

    // If moving down and close to the bottom
    // Squash until half size
    if (y + defaultRadius > HEIGHT && velocity.y >= 0) {
      // Find out how much to squash
      let delta = y + defaultRadius - HEIGHT;

      let newHeight = radiusY - delta;
      let newWidth = radiusX + delta;

      if (newHeight < minRadius) {
        newWidth = radiusY + delta;
        newHeight = radiusX - delta;
      }

      radiusY = newHeight;
      radiusX = newWidth;
    }

    // STRETCH while the ball is moving quickly
    else if (velocity.y < -6) {
      // Stretch
      let newWidth = radiusX - 3;
      let newHeight = radiusY + 3;

      if (newWidth < minRadius) {
        newWidth = radiusX + 3;
        newHeight = radiusY - 3;
      }
      radiusY = newHeight;
      radiusX = newWidth;
    }
    // Return to normal as the ball slows down
    else if (velocity.y >= -6 && velocity.y <= -3) {
      let newWidth = radiusX + 2;
      let newHeight = radiusY - 2;
      if (newHeight < minRadius) {
        newWidth = radiusX + 2;
        newHeight = radiusY - 2;
      }

      radiusX = newWidth;
      radiusY = newHeight;
    }
    // Otherwise set the ball to a round shape
    else {
      radiusX = defaultRadius;
      radiusY = defaultRadius;
    }
    // Update new position

    setVelocityDraw(velocity);
    setXDraw(x);
    setYDraw(y);
    setXRadiusDraw(radiusX);
    setYRadiusDraw(radiusY);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      //setTime(Date.now());
      animate();
    }, timeDiff);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Ellipse
      x={xDraw}
      y={yDraw}
      radiusX={xRadiusDraw}
      radiusY={yRadiusDraw}
      fill="blue"
      shadowBlur={2}
    />
  );
}
