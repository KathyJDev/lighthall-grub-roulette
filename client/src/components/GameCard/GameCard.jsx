import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GameCard = (props) => {
  // console.log(props);
  const { cardData, setCardData } = props;
  const [acceptedCards, setAcceptedCards] = useState([]);
  const [rejectedCards, setRejectedCards] = useState([]);
  const acceptFunction = (data) => {
    // setAcceptedCards([cardData.filter((e) => e.id !== data), ...acceptedCards]);
    setAcceptedCards([...acceptedCards, cardData.find((e) => e.id === data)]);
    console.log(acceptedCards);
    setCardData(cardData.filter((e) => e.id !== data));
  };
  // console.log(cardData);
  return (
    <div>
      <div className="card-container">
        {cardData.map((e) => {
          return (
            <Card style={{ width: '16rem' }}>
              <Card.Img variant="top" src={e.image_url} />
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Text>
                  <h6>{e.location.display_address[0]}</h6>
                  <h6>Rating: {e.rating}</h6>

                </Card.Text>
                <Button onClick={() => acceptFunction(e.id)} variant="success">Accept</Button>
                {' '}
                <Button variant="danger">Reject</Button>
              </Card.Body>
            </Card>
          );
        })}
        <div>
        </div>
      </div>

      <div className="card-container">
        <h1>Selected Restaurants</h1>
        {acceptedCards.map((a, index) => (
          <Card key={index} style={{ width: '14rem', height: "20rem" }}>
            <Card.Img variant="top" src={a.image_url} />
            <Card.Body>
              <Card.Title>{a.name}</Card.Title>
              <Card.Text>
                <h6>{a.location.display_address[0]}</h6>
                <h6>Rating: {a.rating}</h6>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default GameCard;

// "id": "4-_AV-TK2u4dL5Y9ePhRrA",
//             "alias": "troyka-restaurant-forest-hills",
//             "name": "Troyka Restaurant",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/PSLxAx34Q5YtI2mSak8eYg/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/troyka-restaurant-forest-hills?adjust_creative=WNDQ3TaHHwg_p85Huq5Btw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=WNDQ3TaHHwg_p85Huq5Btw",
//             "review_count": 13,
//             "categories": [
//                 {
//                     "alias": "italian",
//                     "title": "Italian"
//                 }
//             ],
//             "rating": 2,
//             "coordinates": {
//                 "latitude": 40.725278,
//                 "longitude": -73.849998
//             },
//             "transactions": [],
//             "price": "$$$$",
//             "location": {
//                 "address1": "10255 Queens Blvd",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Forest Hills",
//                 "zip_code": "11375",
//                 "country": "US",
//                 "state": "NY",
//                 "display_address": [
//                     "10255 Queens Blvd",
//                     "Forest Hills, NY 11375"
//                 ]
//             },
//             "phone": "+17188300500",
//             "display_phone": "(718) 830-0500",
//             "distance": 11972.561065763706
//         }
