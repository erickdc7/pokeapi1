import { useEffect, useState } from "react";

function App() {
	const [allPokemons, setAllPokemons] = useState([]);
	const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

	const getAllPokemons = async () => {
		const res = await fetch(loadMore);
		const data = await res.json();

		setLoadMore(data.next);

		function createPokemonObject(result) {
			result.forEach(async (pokemon) => {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
				const data = await res.json();

				setAllPokemons(currentList => [...currentList, data]);
			});
		}

		createPokemonObject(data.results);
		await console.log(allPokemons);
	}

	useEffect(() => {
		getAllPokemons();
	}, [])

	return (
		<div className="app-container">
			<h1>Pokemon Evolution</h1>
			<div className="pokemon-container">
				<div className="all-container">

				</div>
				<button className="load-more">Load more</button>
			</div>
		</div>
	);
}

export default App;
