import React from "react";
import Card from "../Shared/Components/Generic/Card";
import Button from "../Shared/Components/Generic/Button";
import Place from "./Place";
import "./ListOfPlaces.css";

function ListOfPlaces(props) {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No added places!</h2>
                    <h5>Click below to add a place to your list.</h5>
                    <Button to="/places/new">Add Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="list-of-places">
            {props.items.map((place) => (
                <Place
                    key={place.id}
                    id={place.id}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={props.onDeletePlace}
                />
            ))}
        </ul>
    );
}

export default ListOfPlaces;
