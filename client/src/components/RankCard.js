import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const RankCard = ({ rankname, index }) => {
  const heights = ["30rem", "32rem", "35rem", "38rem", "41rem"];
  const widths = ["12rem", "13rem", "14rem", "16rem", "18rem"];

  return (
    <Card
      style={{
        width: widths[index],
        height: heights[index],
        borderRadius: "25px",
        boxShadow: "-5px 3px",
        marginBottom: "5px",
        marginTop: "5px",
      }}
      className="text-center"
    >
      <Card.Img variant="top" src="./logo.png" />

      <Card.Body>
        <Card.Title>{rankname}</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Button variant="dark" size="lg" href="somwhere">
          Enter
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RankCard;
