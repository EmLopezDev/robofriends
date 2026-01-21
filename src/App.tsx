import { useState, useEffect } from "react";
import CardList from "./components/cardlist/CardList";
import Search from "./components/search/Search";
import { type RobotType } from "./data/robots";

function App() {
    const [searchField, setSearchField] = useState<string>("");
    const [robotsList, setRobotsList] = useState<RobotType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const data = await response.json();
                setRobotsList(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(evt.target.value);
    };

    const filteredRobots = robotsList.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
        <div className="app">
            <div className="appHeader">
                <h1>RoboFriends</h1>
                <Search searchChange={onSearchChange} />
            </div>
            {isLoading ? (
                <p>Is Loading...</p>
            ) : !filteredRobots.length ? (
                <p>No Robots Found</p>
            ) : (
                <CardList robots={filteredRobots} />
            )}
        </div>
    );
}

export default App;
