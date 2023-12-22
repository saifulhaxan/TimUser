import { React, useState, useEffect } from 'react'
import { UserLayout } from '../../Components/Layout/UserLayout'
import { BookListingCover } from '../../Assets/images'
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export const ProductListing = () => {
    const [books, setBooks] = useState([]);
    const [bookFilter, setBookFilter] = useState()
    const [activeItem, setActiveItem] = useState(null);
    const [categories, setCategores] = useState();
    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
    const LoginToken = localStorage.getItem('loginUser');

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
                setBookFilter(data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const BookListingUser = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/book_listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LoginToken}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data.data)
                setBooks(data.data);
                setBookFilter(data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const categoriesListing = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/category_listing',
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
                setCategores(data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (LoginToken) {
            BookListingUser()
        } else {
            BookListing()
        }
        categoriesListing()
    }, [])
    const toggleAccordion = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const filterCategory = (event) => {
        const filterCategory = event.target.value;
        const filteredBooks = bookFilter?.filter(book => book.category_id == filterCategory);
        setBooks(filteredBooks)
    }


    const accordionData = [
        {
            title: 'categories',
            items: ['One', 'Two', 'Three'],
        },
        {
            title: 'Author',
            items: ['One', 'Two', 'Three'],
        },
        {
            title: 'Format',
            items: ['One', 'Two', 'Three'],
        },
        {
            title: 'Filter By Price',
            items: ['One', 'Two', 'Three'],
        },
        {
            title: 'By Review',
            items: ['One', 'Two', 'Three'],
        },
        {
            title: 'Featured Books',
            items: ['One', 'Two', 'Three'],
        },
    ];

    return (
        <UserLayout subHeader={BookListingCover}>
            <section className="book_listing_main_wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="book_listing_popular_filter">
                                <div id="accordion" className="filter_accordian">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Filter:</h4>
                                        </div>
                                    </div>
                                    {accordionData.map((item, index) => (
                                        <div className="card" key={index}>
                                            <div className="card-header" id={`heading${index}`}>
                                                <h5 className="mb-0">
                                                    <button
                                                        className={`btn btn-link ${activeItem === `collapse${index}` ? '' : 'collapsed'}`}
                                                        onClick={() => toggleAccordion(`collapse${index}`)}
                                                        data-toggle="collapse"
                                                        data-target={`#collapse${index}`}
                                                        aria-expanded={activeItem === `collapse${index}`}
                                                        aria-controls={`collapse${index}`}
                                                    >
                                                        {item.title} <i className="fa-solid fa-caret-down"></i>
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id={`collapse${index}`} className={`collapse ${activeItem === `collapse${index}` ? 'show' : ''}`}>
                                                <div className="card-body">
                                                    <ul>
                                                        {item.items.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <a href="javascript:;">{subItem}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="popular_listing_books">
                                <h4>Most Popular Books</h4>
                                <div className="popular_book_card">
                                    <div className="img_div">
                                        <img src="./images/p_img_1.png" className="img-fluid" alt="" />
                                    </div>
                                    <h4>Book Name Goes Here</h4>
                                    <h5>$23.00 <span>$28.00</span></h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing & typesetting industry lorem Ipsum has been the industry's standard.
                                        like Aldus PageMaker including versions of Lorem Ipsum.

                                    </p>
                                </div>
                                <div className="popular_book_card">
                                    <div className="img_div">
                                        <img src="./images/p_img_2.png" className="img-fluid" alt="" />
                                    </div>
                                    <h4>Book Name Goes Here</h4>
                                    <h5>$23.00 <span>$28.00</span></h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing & typesetting industry lorem Ipsum has been the industry's standard.
                                        like Aldus PageMaker including versions of Lorem Ipsum.

                                    </p>
                                </div>
                                <div className="popular_book_card">
                                    <div className="img_div">
                                        <img src="./images/p_img_3.png" className="img-fluid" alt="" />
                                    </div>
                                    <h4>Book Name Goes Here</h4>
                                    <h5>$23.00 <span>$28.00</span></h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing & typesetting industry lorem Ipsum has been the industry's standard.
                                        like Aldus PageMaker including versions of Lorem Ipsum.

                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="popular_tabing">
                                <div className="row tabing_top">
                                    <div className="col-md-4">
                                        <h4>Popular By Genre</h4>
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            {
                                                categories && categories.map((item, index) => (
                                                    <li className="nav-item" key={index}>
                                                        <button className="nav-link text-black p-2" value={item?.id} onClick={filterCategory}>{item?.name}</button>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className='row popular_tabing mt-5'>

                                    {books && books.map((item, index) => (
                                        <div className="col-md-6">
                                            <div className="tab_card">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="book_logo">
                                                            <img src={base_url + item?.image} className="img-fluid" alt="" />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <div className='cardHeader'>
                                                                <h4>{item?.name}</h4>
                                                                <div className="dots_dropdown">
                                                                    <Dropdown className="tableDropdown">
                                                                        <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                            <FontAwesomeIcon icon={faEllipsisV} />
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu align="end" className="tableDropdownMenu">

                                                                            <Link to={`/book-listing/product-detail/${item?.id}`} className="tableAction">View</Link>

                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>

                                                            </div>
                                                            <h5>{`$ ${item?.price}`}</h5>
                                                            {
                                                                item.reviews != 0 && (
                                                                    <div className="rating_star">
                                                                        {item?.reviews && item?.reviews.map((review, index) => (
                                                                            <i className="fa-solid fa-star active"></i>

                                                                        ))}

                                                                        <span>{item?.reviews?.length}</span>
                                                                    </div>
                                                                )
                                                            }


                                                            <p className='shortDescription'>{item?.description}</p>
                                                            {item?.isPay && (
                                                                <p className='text-success'>Free</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 p-0">
                                                        <div className="tab_card_bottom">
                                                            <div className="user_img">
                                                                <img src="./images/user_img.png" className="img-fluid" alt="" />
                                                            </div>
                                                            <div className="user_name">
                                                                <h5>Micheal James <span>Last Added In Library</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}
