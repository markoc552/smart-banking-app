import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import _ from "lodash"
import {motion} from "framer-motion"

let reviews = [
  {
    image: "https://www.flaticon.com/svg/static/icons/svg/168/168904.svg",
    name: "Julia Richards",
    meta: "Long time user",
    description: "I am very happy with this app. I can recommend it to anyone!",
  },
  {
    image: "https://www.flaticon.com/svg/static/icons/svg/3048/3048176.svg",
    name: "Steve Sanders",
    meta: "New user",
    description: "I am new to this kind of apps.",
  },
  {
    image: "https://www.flaticon.com/svg/static/icons/svg/560/560216.svg",
    name: "Elliot Baker",
    meta: "Software developer",
    description: "This app is awesome!",
  },
  {
    image: "https://www.flaticon.com/svg/static/icons/svg/949/949635.svg",
    name: "Molly Thomas",
    meta: "New User",
    description: "In the first it was not easy to use.",
  },
  {
    image: "https://www.flaticon.com/svg/static/icons/svg/3463/3463779.svg",
    name: "Jenny Doe",
    meta: "Long time user",
    description: "I have few remarks on this app.",
  },
];

function move(arr, old_index, new_index) {
  console.log(reviews)
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    console.log(reviews)
    return arr;
};

const CardExampleGroups = () => {
  return (
    <Card.Group centered>
      {reviews.map((index) => {
        return (
          <Card>
            <Card.Content>
              <Image floated="left" size="tiny" src={index.image} />
              <Card.Header>{index.name}</Card.Header>
              <Card.Meta>{index.meta}</Card.Meta>
              <Card.Description>{index.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="blue">
                  Was this helpful?
                </Button>
              </div>
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
};

export default CardExampleGroups;
