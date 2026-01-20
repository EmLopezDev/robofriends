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
                src={`https://robohash.org/${id}?200x200`}
                alt=""
            />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;
