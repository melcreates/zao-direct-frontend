import React from "react";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import BreadcrumbImage from "../components/BreadcrumbImage";
import WhyBecomeSeller from "../components/WhyBecomeSeller";
import CounterSection from "../components/CounterSection";
import StepsSection from "../components/StepsSection";
import TestimonialOne from "../components/TestimonialOne";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";

const BecomeSellerPage = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color='#299E60' />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderOne category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Become Seller"} />

      {/* BreadcrumbImage */}
      <BreadcrumbImage />

      {/* WhyBecomeSeller */}
      <WhyBecomeSeller />

      {/* CounterSection */}
      <CounterSection />

      {/* StepsSection */}
      <StepsSection />

      {/* TestimonialOne */}
      <section className='pb-120'>
        <TestimonialOne />
      </section>

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default BecomeSellerPage;
