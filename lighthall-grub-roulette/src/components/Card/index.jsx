import { useState } from "react";

const Card = (props) => {
  // console.log(props);
  const { cardData, setCardData } = props;
  const [acceptedCards, setAcceptedCards] = useState([]);
  const [rejectedCards, setRejectedCards] = useState([]);
  const accpetFunction = (data) => {
    // setAcceptedCards([cardData.filter((e) => e.id !== data), ...acceptedCards]);
    setAcceptedCards([cardData.find((e) => e.id === data), ...acceptedCards]);
    setCardData(cardData.filter((e) => e.id !== data));
  };
  // console.log(cardData);
  return (
    <div>
      {cardData.map((e) => {
        return (
          <div key={e.id}>
            {e.name}
            <button onClick={() => accpetFunction(e.id)}>Accept</button>
            <button>Reject</button>
          </div>
        );
      })}
      <h3>Accepted Cards</h3>
      {acceptedCards.map((a, index) => (
        <div key={index}>{a.name}</div>
      ))}
    </div>
  );
};

export default Card;

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
