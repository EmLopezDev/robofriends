import "./card.css";

type CardType = {
    id: number;
    name: string;
    email: string;
};

function Card({ id, name, email }: CardType) {
    return (
        <div className="card">
            <img
                className="robotImage"
                src={`https://robohash.org/${id}`}
                alt={`${name} profile picture`}
            />
            <div>
                <p className="robotName">{name}</p>
                <p className="robotEmail">{email}</p>
            </div>
        </div>
    );
}

export default Card;
