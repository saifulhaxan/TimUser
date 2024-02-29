import { React, useState, useEffect } from 'react'
import { UserLayout } from '../../Components/Layout/UserLayout'
import { Logo, manaImage } from '../../Assets/images'
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEye } from '@fortawesome/free-solid-svg-icons';
import CustomButton from "../../Components/CustomButton"
import CustomTable from "../../Components/CustomTable"
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './index.css'
import CustomInput from '../../Components/CustomInput';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'

export const MyAccount = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [user, setUser] = useState();
    const [order, setOrder] = useState()
    const [mana, setMana] = useState(1);
    const [currency, setCurrency] = useState()
    const [library, setLibrary] = useState([])
    const [usd, setUsd] = useState(.3);
    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
    const LoginToken = localStorage.getItem('loginUser');
    const [paymentInfo, setPaymentInfo] = useState();



    const ProfileData = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/view-profile',
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
                console.log(data)
                setUser(data?.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


 



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
                setOrder(data?.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const GetLibrary = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/wish-list`,
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
                console.log('lib', data)
                setLibrary(data?.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const UserCredit = () => {
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/getbalance',
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
                console.log(data?.data)
                setCurrency(data?.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    const tableKeys = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "image",
            title: "Bookm Image",
        },
        {
            key: "title",
            title: "Book Title",
        },
        {
            key: "price",
            title: "Price",
        },
        {
            key: "chapter",
            title: "Chapter",
        },
        {
            key: "created_at",
            title: "Created On",
        },
    ];

    const libraryKeys = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "image",
            title: "Bookm Image",
        },
        {
            key: "title",
            title: "Book Title",
        },
        {
            key: "price",
            title: "Price",
        },
        {
            key: "chapter",
            title: "Chapter",
        },
        {
            key: "created_at",
            title: "Created On",
        },
        {
            key: "action",
            title: "Action",
        },
    ];


    useEffect(() => {
        ProfileData()
        GetOrderHistory()
        UserCredit()
        GetLibrary()
    }, [])


    const paymentSend = (tokenData) => {
        const FormDataMethod = new FormData();

        FormDataMethod.append("mana", mana);
        FormDataMethod.append("token", tokenData);

        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/mana-purchase',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${LoginToken}`
                },
                body: FormDataMethod
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)

            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { token, error } = await stripe.createToken(elements.getElement(CardElement));

        if (error) {
            console.error(error);
        } else {
            // Send the token to your server for processing
            console.log(token?.id);
            paymentSend(token?.id)
        }
    };




    return (
        <UserLayout>
            <section className="book_listing_main_wrap myAccountPage pt-3">
                <div className="container">
                    <div className="row">
                        <div className='col-md-12 text-center'>
                            <div className='titleBox mb-4'>
                                <h3>My Account</h3>
                            </div>
                        </div>

                        {/* tabs  */}
                        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                            <Row>
                                <Col sm={3} className='bg-light'>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="profile">My Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="library">My Library</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="MyOrder">My Orders</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="currency">My Credits</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="profile">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='pageTitle mb-4'>
                                                        <h3>My Profile</h3>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                                        <div className="profileImage">
                                                            <img src={Logo} alt="User" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-lg-10">
                                                    <div className="row mb-4">
                                                        <div className="col-lg-6 mb-3">
                                                            <h4 className="secondaryLabel">Name:</h4>
                                                            <p className="secondaryText">{user?.name}</p>
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                            <h4 className="secondaryLabel">Email</h4>
                                                            <p className="secondaryText">{user?.email}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* <div className="col-12">
                                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Edit Profile" onClick={() => { navigate('/profile/edit-profile') }} />
                                                        <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Change Password" onClick={() => { navigate('/profile/change-password') }} />
                                                    </div> */}

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="library">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='pageTitle mb-4'>
                                                        <h3>My Library</h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="dashCards">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <CustomTable
                                                                        headers={libraryKeys}

                                                                    >
                                                                        <tbody>
                                                                            {library?.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td><img src={base_url + item?.wish_book?.image} className="avatarIcon" /></td>
                                                                                    <td className="text-capitalize">
                                                                                        {item?.wish_book?.name}
                                                                                    </td>
                                                                                    <td>{`Mana ${item?.wish_book?.price}`}</td>
                                                                                    <td>{item?.wish_book?.chapters.length}</td>
                                                                                    <td>{item?.created_at}</td>
                                                                                    {/* <td className={!item.status ? 'greenColor' : "redColor"}>{!item.status ? 'Active' : "Inactive"}</td> */}
                                                                                    <td>
                                                                                        <Dropdown className="tableDropdown">
                                                                                            <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                                                            </Dropdown.Toggle>
                                                                                            <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                                                <Link to={`/book-listing/product-detail/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />Edit</Link>

                                                                                            </Dropdown.Menu>
                                                                                        </Dropdown>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </CustomTable>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="MyOrder">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='pageTitle mb-4'>
                                                        <h3>My Orders</h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="dashCards">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <CustomTable
                                                                        headers={tableKeys}

                                                                    >
                                                                        <tbody>
                                                                            {order?.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td><img src={base_url + item?.bookpurchase?.image} className="avatarIcon" /></td>
                                                                                    <td className="text-capitalize">
                                                                                        {item?.bookpurchase?.name}
                                                                                    </td>
                                                                                    <td>{`Mana ${item?.book_price}`}</td>
                                                                                    <td>{item?.bookpurchase?.chapters.length}</td>
                                                                                    <td>{item?.created_at}</td>
                                                                                    {/* <td className={!item.status ? 'greenColor' : "redColor"}>{!item.status ? 'Active' : "Inactive"}</td> */}
                                                                                    {/* <td>
                                                                                        <Dropdown className="tableDropdown">
                                                                                            <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                                                            </Dropdown.Toggle>
                                                                                            <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                                                <Link to={`/ads-management/edit-ads/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>

                                                                                            </Dropdown.Menu>
                                                                                        </Dropdown>
                                                                                    </td> */}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </CustomTable>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="currency">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='row justify-content-between'>
                                                        <div className='col-md-4'>
                                                            <div className='pageTitle mb-4'>
                                                                <h3>My Credits</h3>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-4 text-md-right'>
                                                            <div className='totalCredeit'>
                                                                <p className='font-weight-bold'>Available Mana: <span className='text-success'>{currency}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="manaThumnail">
                                                            <img src={manaImage} className="mw-100" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-5">
                                                    <div className="col-md-3">
                                                        <CustomInput
                                                            label="Mana"
                                                            type="number"
                                                            placeholder="1 Mana"
                                                            name="name"
                                                            labelClass='mainLabel'
                                                            inputClass='mainInput'
                                                            value={mana}
                                                            onChange={(event) => {
                                                                setMana(event.target.value);
                                                                setUsd((.1 * event.target.value))
                                                                console.log(mana)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-1 text-center">
                                                        <span>=</span>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <CustomInput
                                                            label="USD"
                                                            type="number"
                                                            placeholder="$1"
                                                            name="name"
                                                            labelClass='mainLabel'
                                                            inputClass='mainInput'
                                                            value={usd}
                                                        />
                                                    </div>
                                                    <div className='col-md-12 mt-5'>
                                                        <CardElement />
                                                    </div>
                                                    <div className='col-md-12 mt-5'>

                                                        {/* <InjectedCheckoutForm /> */}
                                                        {/* </Elements> */}
                                                        <CustomButton text="Buy Now" variant='primaryButton' onClick={handleSubmit} />
                                                    </div>
                                                </div>

                                            </div>

                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                        {/* end  */}
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}
