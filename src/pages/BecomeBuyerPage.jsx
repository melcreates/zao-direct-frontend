import React from "react";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import WhyBecomeBuyer from "../components/WhyBecomeBuyer";
import CounterSection from "../components/CounterSection";
import BuyerStepsSection from "../components/BuyerStepsSection";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";

const BecomeBuyerPage = () => {
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
      <Breadcrumb title={"Register Your Shop"} />

      {/* WhyBecomeSeller */}
      <WhyBecomeBuyer />

      {/* CounterSection */}
      <CounterSection />

      {/* StepsSection */}
      <BuyerStepsSection />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default BecomeBuyerPage;
