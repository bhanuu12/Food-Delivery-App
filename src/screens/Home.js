import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            let response = await fetch('http://localhost:4000/api/foodData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            response = await response.json();
            setFoodItem(response[0] || []);
            setFoodCat(response[1] || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar />
            <Carousel />
            <div className="d-flex justify-content-center">
                <input
                    className="form-control me-2 w-75 bg-white text-dark"
                    type="search"
                    placeholder="Type in..."
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='container'>
                {foodCat.map((category) => (
                    <div key={category._id} className='row mb-3'>
                        <div className='fs-3 m-3'>{category.CategoryName}</div>
                        <hr />
                        {foodItem.filter((item) =>
                            item.CategoryName === category.CategoryName &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        ).map((data) => (
                            <div key={data._id} className='col-12 col-md-6 col-lg-4 mb-3'>
                                <Card foodItem={data} options={data.options[0]}  />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
