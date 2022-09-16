import React, { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import "./Searchbar.css"

const Searchbar = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const Navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if(!searchTerm){
            alert("Please enter something to search..")
            return
        }
        
        Navigate(`/search?q=${searchTerm}`)
        setSearchTerm("")
    }

    return (
        <form className='search-form' onSubmit={handleSearch}>
            <div className='search-bar'>
                <HiOutlineSearch
                    style={
                        {
                            fontSize: "20px",
                            color: "#333",
                            marginLeft: "5px",
                            cursor:"pointer"
                        }}
                     onClick={handleSearch}
                        />
                <input
                    type="search"
                    placeholder='Search...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>
        </form>
    )
}

export default Searchbar