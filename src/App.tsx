import { useState } from "react";
import CardList from "./components/cardlist/CardList";
import Search from "./components/search/Search";
import { robots, type RobotType } from "./data/robots";

function App() {
    const [searchField, setSearchField] = useState<string>("");

    const robotsList: RobotType[] = [...robots];

    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(evt.target.value);
    };

    const filteredRobots = robotsList.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
        <div className="app">
            <h1>RoboFriends</h1>
            <Search searchChange={onSearchChange} />
            <CardList robots={filteredRobots} />
        </div>
    );
}

export default App;
