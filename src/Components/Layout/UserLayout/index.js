import { React, useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import "./style.css";

export const UserLayout = (props) => {
  return (
    <>
      <div className="userApp">
        <Header />
        {
          props.subHeader && (
            <section class="inner_page_banner_img">
              <img src={props.subHeader} className="img-fluid" alt="Slider" />
            </section>
          )
        }
        {props.children}
        <Footer />
      </div>

    </>
  );
};
