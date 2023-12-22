import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HeaderTop, Logo } from './../../../Assets/images/'


import "./style.css";


export const Header = (props) => {
  const navigate = useNavigate();
  const [mana, setMana] = useState('');
  const Logintoken = localStorage.getItem('loginUser');
  console.log(Logintoken);

  const handleLogout = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Show loader or loading indicator
    document.querySelector('.loaderBox').classList.remove("d-none");

    // Define the API URL for the logout endpoint
    const apiUrl = 'https://custom.mystagingserver.site/Tim-WDLLC/public/api/logout';

    try {
      // Make a POST request to the logout API endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Logintoken}` // Fix typo: 'barear' -> 'Bearer'
        }
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response data as JSON
        const responseData = await response.json();

        // Remove user login information from local storage
        localStorage.removeItem('login');
        localStorage.removeItem('loginUser');

        // Log the logout response data
        console.log('Logout Response:', responseData);

        // Hide the loader or loading indicator
        document.querySelector('.loaderBox').classList.add("d-none");
        UserCredit()

        // Navigate to the home page (assuming 'Navigate' is a function from your routing library)
        navigate('/');
      }
    } catch (error) {
      // Handle errors by logging them to the console
      document.querySelector('.loaderBox').classList.add("d-none");
      console.error('Error:', error);
    }
  };

  const UserCredit = () => {
    fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/user/getbalance',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Logintoken}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        console.log(data?.data)
        setMana(data?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if(Logintoken) {
      UserCredit()
    }
  }, [])

  return (
    <header>
      <div className="mobile-menu">
        <div className="mobile-top">
          <div className="img-div">
            <img src="/public/images/logo.png" className="img-fluid" alt="" />
          </div>
          <div className="circle" id="navbar"><i className="fa fa-bars" aria-hidden="true"></i></div>
        </div>
        <div className="nveMenu text-left">
          <div className="mobile-cross close-btn-nav" id="navbar"><i className="fas fa-times" aria-hidden="true"></i></div>
          <div>
            <a href="index.php"><img src="/public/images/logo.png" className="img-fluid" /></a>
          </div>
          <ul className="navlinks p-0 mt-4">
            <li><Link to="#" className="active">Home</Link></li>
            <li><Link to="#">Author</Link></li>
            <li><Link to="/book-listing">Our Books</Link></li>
            <li><Link to="#">Client's Reviews</Link></li>
            <li><Link to="#">Blogs</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            {Logintoken ?
              (
                <li><Link to="/account">My Account</Link></li>

              ) :
              (
                <li><Link to="/login">Login / Sign up</Link></li>
              )
            }



            {Logintoken && (
              <li>
                <button className="border-0 bg-transparent" onClick={((event) => { handleLogout(event) })}>Logout</button>
              </li>
            )}
          </ul>
        </div>
        <div className="overlay"></div>
      </div>
      <div className="header-top">
        <div className="container-fluid">
          <div className="two-colors-division row">
            <div className="first-div col-md-6"></div>
            <div className="second-div col-md-6 p-0">
              <img src={HeaderTop} className="" alt="" />
            </div>
          </div>
        </div>
        <div className="logo-img">
          <img src={Logo} className="form-control" alt="" />
        </div>
      </div>
      <div className="desktop-header">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="input-div">
                <input type="text" className="form-control" placeholder="Search..." />
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
            <div className="col-md-10">
              <div className="userNav d-md-flex justify-content-between">
                <div className="navBar">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">Author</Link></li>
                    <li><Link to="/book-listing">Our Books</Link></li>
                    <li><Link to="#">Client's Reviews</Link></li>
                    <li><Link to="#">Blogs</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                    {Logintoken ?
                      (
                        <li><Link to="/account">My Account</Link></li>

                      ) :
                      (
                        <li><Link to="/login">Login / Sign up</Link></li>
                      )
                    }



                    {Logintoken && (
                      <li>
                        <button className="border-0 bg-transparent" onClick={((event) => { handleLogout(event) })}>Logout</button>
                      </li>
                    )}
                  </ul>
                </div>
                {
                  mana && (
                    <div className="currencyUser">
                      <p>Mana: <span className="text-success">{mana}</span></p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
