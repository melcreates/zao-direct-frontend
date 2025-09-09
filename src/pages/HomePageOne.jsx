import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import FeatureOne from "../components/FeatureOne";
import ProductListOne from "../components/ProductListOne";
import RecommendedOne from "../components/RecommendedOne";
import TopVendorsOne from "../components/TopVendorsOne";
import DeliveryOne from "../components/DeliveryOne";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import { useUser } from "../helper/UserContext";
const HomePageOne = () => {
  const { user } = useUser();
  return (

    <>

      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* HeaderOne */}
      <HeaderOne username={user?.user?.name}/>

      {/* BannerOne */}
      <BannerOne />

      {/* FeatureOne */}
      <FeatureOne />

      {/* ProductListOne */}
      <ProductListOne />

      {/* TopVendorsOne */}
      <TopVendorsOne />

      {/* RecommendedOne */}
      <RecommendedOne />

      {/* ShippingOne */}
      <ShippingOne />

      {/* DeliveryOne */}
      <DeliveryOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default HomePageOne;
