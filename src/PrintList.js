import { gql, useQuery } from "@apollo/client";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";

import './PrintList.css'

const ITEMS_PER_PAGE = 10;

const PRINTS_QUERY = gql`
  query Query($size: Int, $page: Int) {
    prints(size: $size, page: $page) {
      title
      technique
      century
      url
      department
      primaryimageurl
    }
  }
`;

function PrintList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data, fetchMore } = useQuery(PRINTS_QUERY, {
    variables: { size: ITEMS_PER_PAGE, page: 1 },
  });

  const onClickLoadMore = () => {
    setCurrentPage(currentPage + 1);
    return fetchMore({
      variables: { page: currentPage + 1 }
    });
  };

  if (loading) return <div className="PrintList-loader"><Spinner animation="border" /></div>;
  if (error) return <p>An error has occurred.</p>;

  return (
    <div>
      <ul className="PrintList">
        {data.prints.map((print) => (
          <li key={print.title} className="PrintList-item">
            <Card>
              <Card.Body>
                <Card.Title>{print.title}</Card.Title>
                <Image src={`${print.primaryimageurl}?width=300`} />
                <Card.Text>{print.technique}</Card.Text>
                <Card.Text>{print.department}</Card.Text>
                <Card.Text>{print.century}</Card.Text>
                <Card.Link href={print.url}>Details</Card.Link>
              </Card.Body>
            </Card>
          </li>
        ))}
        <li className="PrintList-item">
          <Button onClick={onClickLoadMore}>Load more</Button>
        </li>
      </ul>
    </div>
  )
}

export default PrintList;