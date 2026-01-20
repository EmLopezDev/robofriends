import Card from "../card/Card.tsx";
import { type RobotType } from "../../data/robots.tsx";

type CardListType = {
    robots: RobotType[];
};

function CardList({ robots }: CardListType) {
    return (
        <div>
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
