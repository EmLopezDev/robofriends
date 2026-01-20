import CardList from "./components/cardlist/Cardlist";
import { robots } from "./data/robots";
function App() {
    return (
        <>
            <h1>RoboFriends</h1>
            <CardList robots={robots} />
        </>
    );
}

export default App;
