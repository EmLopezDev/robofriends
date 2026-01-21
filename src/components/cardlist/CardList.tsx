import Card from "../card/Card.tsx";
import { type RobotType } from "../../data/robots.tsx";
import "./cardlist.css";

type CardListType = {
    robots: RobotType[];
};

function CardList({ robots }: CardListType) {
    return (
        <div className="cardList">
            {robots.map(({ id, name, email }: RobotType) => {
                return (
                    <Card
                        key={id}
                        id={id}
                        name={name}
                        email={email}
                    />
                );
            })}
        </div>
    );
}

export default CardList;
