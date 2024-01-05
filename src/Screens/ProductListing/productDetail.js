import { useState, useEffect } from "react";
import { Link, json, useParams } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Accordion from 'react-bootstrap/Accordion';
import CustomInput from "../../Components/CustomInput";
import { UserLayout } from "../../Components/Layout/UserLayout";
import './style.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
                                        {/* <div className="col-md-12">
                                            <div className="d-flex justify-content-between">
                                                <h2 className="mainTitle mb-4">
                                                    Book Chapters
                                                </h2>
                                            </div>
                                        </div> */}


<Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title=" Book Chapters">
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

      </Tab>
      <Tab eventKey="profile" title="Book Reviews">
      <section class="   text-center text-lg-start shadow-1-strong rounded" 
 
  >
  <div class="row d-flex justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body ">
          <div class="row">
            <div class="col-lg-2 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                class="rounded-circle img-fluid shadow-1" alt="woman avatar" width="200" height="200" />
            </div>
            <div class="col-lg-8">
            
              <p class="fw-bold lead mb-1"><strong>Anna Smith</strong></p>
              <p class="text-muted  mb-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente
                molestiae numquam quas, voluptates omnis nulla ea odio quia similique
                corrupti magnam.
              </p>
              <ul class="list-unstyled d-flex    ">
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star-half-alt fa-sm text-info"></i>
              </li>
            </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </Tab>
      



      <Tab eventKey="Poster" title="Poster Reviews">
      <section class="   text-center text-lg-start shadow-1-strong rounded" 
 
  >
  <div class="row d-flex justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body ">
          {/* <div class="row">
            <div class="col-lg-2 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                class="rounded-circle img-fluid shadow-1" alt="woman avatar"width="65"
                height="65" />
            </div>
            <div class="col-lg-8">
            
              <p class="fw-bold lead mb-1"><strong>John Smith</strong></p>
              <p class="text-muted  mb-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente
                molestiae numquam quas, voluptates omnis nulla ea odio quia similique
                corrupti magnam.
              </p>
              <ul class="list-unstyled d-flex    ">
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star-half-alt fa-sm text-info"></i>
              </li>
            </ul>
             </div>
          </div>
           */}




<div class="row d-flex  ">
      <div class="col-md-10 col-lg-8 col- xl-6">
        <div class=" ">
          <div class="card-body p-4">
            <div class="d-flex flex-start w-100">
              <img class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="avatar" width="65"
                height="65" />
              <div class="w-100">
              <p class="fw-bold lead mb-1"><strong>John Smith</strong></p>
                <ul class="list-unstyled d-flex    ">
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i class="fas fa-star-half-alt fa-sm text-info"></i>
              </li>
            </ul>
                <div class="form-outline">
                <p class="text-muted  mb-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente
                molestiae numquam quas, voluptates omnis nulla ea odio quia similique
                corrupti magnam.
              </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          <div class="row d-flex  ">
      <div class="col-md-10 col-lg-8 col- xl-6">
        <div class=" ">
          <div class="card-body p-4">
            <div class="d-flex flex-start w-100">
              <img class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                height="65" />
              <div class="w-100">
                <h5>Add a comment</h5>
                <ul class="rating mb-3 list-unstyled d-flex " data-mdb-toggle="rating">
                  <li>
                    <i class="far fa-star fa-sm text-info" title="Bad"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-info" title="Poor"></i>
                  </li>
                  <li>
                  <i class="far fa-star fa-sm text-info"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-info" title="Good"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-info" title="Excellent"></i>
                  </li>
                </ul>
                <div class="form-outline">
                  <textarea class="form-control" id="textAreaExample" rows="7"></textarea>
                  <label class="form-label" for="textAreaExample">What is your view?</label>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <button type="button" class="btn btn-danger">
                    Send <i class="fas fa-long-arrow-alt-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
    
  </div>


  
</section>

<section >
  <div class="container my-5 py-5 text-dark">
    {/* <div class="row d-flex justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-6">
        <div class="card">
          <div class="card-body p-4">
            <div class="d-flex flex-start w-100">
              <img class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                height="65" />
              <div class="w-100">
                <h5>Add a comment</h5>
                <ul class="rating mb-3" data-mdb-toggle="rating">
                  <li>
                    <i class="far fa-star fa-sm text-danger" title="Bad"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-danger" title="Poor"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-danger" title="OK"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-danger" title="Good"></i>
                  </li>
                  <li>
                    <i class="far fa-star fa-sm text-danger" title="Excellent"></i>
                  </li>
                </ul>
                <div class="form-outline">
                  <textarea class="form-control" id="textAreaExample" rows="4"></textarea>
                  <label class="form-label" for="textAreaExample">What is your view?</label>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <button type="button" class="btn btn-success">Danger</button>
                  <button type="button" class="btn btn-danger">
                    Send <i class="fas fa-long-arrow-alt-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </div>
</section>
      </Tab>
      
     
    </Tabs>
                                    
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

