import { useState, useEffect } from "react";
import { Link, json, useParams } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Accordion from 'react-bootstrap/Accordion';
import CustomInput from "../../Components/CustomInput";
import { UserLayout } from "../../Components/Layout/UserLayout";
import './style.css'
import { BookListingCover } from "../../Assets/images";

export const ProductDetail = () => {

    const { id } = useParams();

    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'

    const [data, setData] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [formData, setFormData] = useState({});
    const [modalData, setModalData] = useState({});
    const [CapterShow, setChapterShow] = useState(false);

    const LoginToken = localStorage.getItem('loginUser');



    const chapterData = (paramId) => {
        document.title = 'Tim User | Book Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/book_view/${paramId}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)

                setData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const chapterDataLogin = (LoginparamId) => {
        document.title = 'Tim User | Book Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/book_view/${LoginparamId}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LoginToken}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)

                setData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const BuyChapter = (chapterID) => {
        // Show loader
        document.querySelector('.loaderBox').classList.remove("d-none");

        // Create FormData and append chapter_id
        const formData = new FormData();
        formData.append("chapter_id", chapterID);

        // Make the API request
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/book_purchase/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LoginToken}`
                // Add other necessary headers if needed
            },
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Hide loader on successful response
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                setShowModal(false);
                setShowModal1(true);
                setTimeout(() => {
                    setShowModal1(false);
                }, 1000);
                chapterDataLogin(id)
            })
            .catch((error) => {
                // Handle errors
                document.querySelector('.loaderBox').classList.add("d-none");
                console.error('Error during fetch:', error);
                // You might want to handle errors more gracefully, show a message to the user, etc.
            });
    };

    const GetOrderHistory = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/view-order-history`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LoginToken}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log('order', data)

                // setData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }


    const PaymentModal = (amount) => {
        setModalData(amount)
        setShowModal(true)
    }

    useEffect(() => {
        console.log(modalData)
    }, [modalData])

    useEffect(() => {
        if (!LoginToken) {
            setChapterShow(false)
            chapterData(id)
        } else {
            chapterDataLogin(id)
            setChapterShow(true)
        }

        GetOrderHistory()
    }, []);



    return (
        <>
            <UserLayout subHeader={BookListingCover}>
                <div className="container">
                    <div className="dashCard my-4">
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-md-4 mb-4">

                                        <div className="productImage">
                                            <img src={base_url + data?.image} />
                                        </div>
                                    </div>
                                    <div className="col-md-8 mb-4">
                                        <div className="productInfo">
                                            <h3 className="text-capitalize">{data?.name}</h3>
                                            {data?.price && (
                                                <h4><span className="font-weight-bold">Price:</span>{` $ ${data?.price}`}</h4>
                                            )}
                                            <p>{data?.description}</p>
                                            <p><span className="font-weight-bold">Category:</span> <span>{data?.category?.name}</span></p>

                                        </div>
                                    </div>
                                </div>

                                {CapterShow ? (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-flex justify-content-between">
                                                <h2 className="mainTitle mb-4">
                                                    Book Chapters
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <Accordion defaultActiveKey="0">
                                                {data?.chapters && data?.chapters.map((item, index) => (
                                                    <Accordion.Item eventKey={index}>
                                                        <Accordion.Header>{`Chapter ${index + 1}`}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {item?.isPay ? (
                                                                <>
                                                                    <h3 className="text-capitalize">{item?.title}</h3>
                                                                    <p> {item?.description}</p>
                                                                </>
                                                            ) : (
                                                                <div className="text-center">
                                                                    {/* <button type="button" onClick={() => { PaymentModal(item) }} className="primaryButton btn bg-success text-white">Pay {item?.price} Mana For this Chapter</button> */}


                            
                                                                    <button
  type="button"
  onClick={() => { PaymentModal(item) }}
  className="primaryButton btn text- white"
  style={{ backgroundColor: '#f7944d', color: 'black' }}
>
  Pay {item?.price} Mana For this Chapter
</button>

 

                                                                </div>
                                                            )}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                ))}
                                            </Accordion>
                                        </div>

                                    </div>
                                ) : (<p className="text-center">Please <Link to="/login">Login</Link> To See Chapters for this Book</p>)}

                            </div>
                        </div>
                    </div>
                </div>


                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading={`Chapter Fee`} >
                    <table className="table table-bordered">
                        <tr>
                            <th>Chapter</th>
                            <th>Chapter Amount</th>
                        </tr>
                        <tr>
                            <td>{`Chapter ${modalData?.id}`}</td>
                            <td>{`Mana ${modalData?.price}`}</td>
                        </tr>
                    </table>
                    <div className="text-left pt-4">
                        <button type="button" className="btn bg-success text-white" onClick={(() => { BuyChapter(modalData?.id) })}>Pay Now</button>
                    </div>
                </CustomModal>

                <CustomModal show={showModal1} close={() => { setShowModal1(false) }} success heading="You Chapter Payment has been Done." />
            </UserLayout>
        </>
    );
};

