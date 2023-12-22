import React from 'react'
import { UserLayout } from '../../Components/Layout/UserLayout'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'
import { useState } from 'react';
import { useEffect } from 'react';

export const Novel = () => {
    const [novel, setNovel] = useState();
    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'

    const NovelData = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/novel_listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data.data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setNovel(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }

    useEffect(() => {
        NovelData();
    }, [])


    const reusableSetting = (item, centerMode) => {
        return {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: item, // Number of items to display at once
            slidesToScroll: 1, // Number of items to scroll at a time
            centerMode: centerMode
        };
    };

    const settingsForTwoItems = reusableSetting(2, true); // Example for 3 items
    const settingsForFiveItems = reusableSetting(5, false);
    const settingsForThreeItems = reusableSetting(3, false);

    return (
        <UserLayout>
            <section className="inner_page_banner_img">
                <img src="./images/novel_page_bg.png" className="img-fluid" alt="" />
            </section>

            <section className="novel_first_wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <h1>Top 10 Rated Novels</h1>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="related_novel_carousel owl-carousel owl-theme">

                                <Slider {...settingsForFiveItems}>
                                    {novel && novel.map((item, index) => (
                                        <div className="item novel_rated_card text-center position-relative">
                                            <img src={base_url + item?.image} className="img-fluid" alt="" />
                                            {item?.reviews != 0 ? (
                                                <div className="rating">
                                                    {item?.reviews && item?.reviews.map((count, index) => (
                                                        <i key={index} className="fa-solid fa-star"></i>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="rating">No Reviews</div>
                                            )}

                                            <h4>{item?.name}</h4>
                                            <p>{item?.category?.name}</p>
                                            <div className="shoping_cart">
                                                <h5>Price Here:</h5>
                                                <h2>{`$ ${item?.price}`}</h2>
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Add more images here */}
                                </Slider>

                            </div>
                            {/* <!-- nav buttons --> */}
                            {/* <div className="related_novel_nav">
                                <span className="related_novel_next_button">
                                    <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
                                </span>
                                <span className="related_novel_prev_button">
                                    <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
                                </span>

                            </div> */}




                        </div>
                    </div>
                </div>
            </section>


            <section className="featured_novels_sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Featured Novels</h1>
                        </div>
                    </div>
                </div>

                <div className="featured_novel_carousel owl-carousel owl-theme">

                    <Slider {...settingsForTwoItems}>
                        {
                            novel && novel.map((item) => (
                                <div className="item featured_novel_card">
                                    <div className="img_div">
                                        <img src={base_url + item?.image} className="img-fluid" alt="" />
                                    </div>
                                    <div className="content_div">
                                        <div className="category">
                                            <span><a href="javascript:;">{item?.category?.name}</a></span>

                                            {item?.reviews && (
                                                <span className="rating">
                                                    {item?.reviews.map((count, index) => (
                                                        <i key={index} className="fa-solid fa-star"></i>
                                                    ))}
                                                </span>
                                            )}



                                            <span className="rating_p">{item?.reviews?.length}</span>
                                        </div>
                                        <h4>{item?.name}</h4>
                                        <p className='shortDescription'>{item?.description}</p>
                                        <h2>{`$ ${item?.price}`}</h2>

                                    </div>
                                </div>
                            ))
                        }

                    </Slider>
                </div>

            </section>


            <section className="novel_first_wrap novel_second_wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <h1>Best Author Novels</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="best_autor_novel_carousel owl-carousel owl-theme">
                            <Slider {...settingsForThreeItems}>
                                {
                                    novel && novel.map((item) => (
                                        <div className="item novel_rated_card position-relative best_author_card">
                                            <div className="img_div">
                                                <img src={base_url + item?.image} className="img-fluid" alt="" />
                                            </div>
                                            <div className="content_div">
                                                <div className="category">
                                                    <span><a href="javascript:;">{item?.category?.name}</a></span>
                                                </div>
                                                <h4>{item?.name}</h4>
                                                <p>{item?.category?.name}</p>
                                                <h2>{`$ ${item?.price}`}</h2>
                                                {item?.reviews && (
                                                    <span className="rating">
                                                        {item?.reviews.map((count, index) => (
                                                            <i key={index} className="fa-solid fa-star"></i>
                                                        ))}
                                                    </span>
                                                )}
                                            </div>

                                        </div>
                                    ))
                                }
                            </Slider>

                        </div>
                        {/* <div className="best_author_nav">
                            <span className="best_author_next_button">
                                <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
                            </span>
                            <span className="best_author_prev_button">
                                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
                            </span>

                        </div> */}

                    </div>
                </div>
            </section>
        </UserLayout>
    )
}
