import { React, useState, useEffect } from 'react'
import { UserLayout } from '../../Components/Layout/UserLayout'
import { AdertiseImage, BookImage, Fancy, MainNoval, NovalImage } from '../../Assets/images'
import { Link } from 'react-router-dom';

export const Home = () => {
    const [ads, setAds] = useState([]);
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
    const adsListing = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/ads_listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                setAds(data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const BookListing = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/book_listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data.data)
                setBooks(data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GenreData = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/genre_listing')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setGenres(data.data);
                if (data.data.length > 0) {
                    setSelectedGenre(data.data[0]); // Select the first genre by default
                  }
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    useEffect(() => {
        adsListing()
        BookListing()
        GenreData()
    }, [])

    const handleTabClick = (genre) => {
        setSelectedGenre(genre);
    };



    return (
        <UserLayout>
            <section className="first-wrap">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-md-2 p-0">
                            {ads && ads.map((item, index) => (
                                <div className="advertise-main-div" key={index}>
                                    <div className="img-div">
                                        <a href="javascript:;"><img src={base_url + item?.ad_image} className="form-control" alt="advertise image" /></a>
                                    </div>
                                    <h6><a href="javascript:;">{item?.ad_title}</a></h6>
                                </div>
                            ))}

                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                {
                                    books && books.map((item, index) => (
                                        <div className="col-md-3" key={index}>
                                            <div className="book-category-main">
                                                <h4>{item?.name}</h4>
                                                <div className="img-div">
                                                    <a href="javascript:;"><img src={base_url + item?.image} className="form-control" alt="book" /></a>
                                                </div>
                                                <div className="book-category-price">
                                                    <div>
                                                        <h6>Price</h6>
                                                        <h5>{`$ ${item?.price}`}</h5>
                                                    </div>
                                                    <div className="arrow-icon">
                                                        <Link to={`/book-listing/product-detail/${item?.id}`}><i className="fa-solid fa-arrow-right"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular_tags_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content">
                                <h1>Our Genre</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry’s standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="tag_list">
                        <div className="tab-container">
                            {genres.map((genre, index) => (
                                <div
                                    key={genre.title}
                                    className={`tab ${selectedGenre === genre  ? 'active' : ''}`}
                                    onClick={() => handleTabClick(genre)}
                                >
                                    {genre.title}
                                </div>
                            ))}
                        </div>
                        <div className="genre-details tag_list py-5">
                            {selectedGenre && (
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="img_div">
                                            <img src={base_url + selectedGenre.image} alt={selectedGenre.title} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='content'>
                                            <h4>{selectedGenre.title}</h4>
                                            <p>{selectedGenre.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>


            </section>
        </UserLayout >
    )
}
