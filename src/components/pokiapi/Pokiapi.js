import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import pokiapi from "./pokiapi.css"

const Pokiapi = () => {
    const [pokemon, setPokemon] = useState("pikachu")
    const [pokemonDate, setPokemonDate] = useState([])
    const [pokemonType, setPokemonType] = useState("")

        const getPokemon = async () => {
            const toArray = [];
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
                const res = await axios.get(url)
                toArray.push(res.data)
                setPokemonType(res.data.types[0].type.name)
                setPokemonDate(toArray)
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }

        const handleChange = (e) => {
            setPokemon(e.target.value.toLowerCase())
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            getPokemon()
        }


    return (
        <div className="pokemonCon">
            <form className="pokemonContainer" onSubmit={handleSubmit}>
                <h3>Enter Pokemon's Name and Press Enter</h3>
                <label>
                    <input className="pokemonInput" type="text" onChange={handleChange} placeholder="Pikachu"/>
                </label>
            </form>
            {pokemonDate.map((data) => {
                return(
                    <div  className="pokemonDetail">
                        <img src={data.sprites["front_default"]} />
                        <div>Type: {pokemonType}</div>

                        <div>Height: {Math.round(data.height * 10)} cm</div>

                        <div>Weight: {Math.round(data.weight / 4.3 )} lbs</div>

                        <div>Number of Battle: {data.game_indices.length}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Pokiapi;
