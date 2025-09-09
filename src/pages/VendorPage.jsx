import React from "react";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BreadcrumbThree from "../components/BreadcrumbThree";
import VendorsList from "../components/VendorsList";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import { useUser } from "../helper/UserContext";

const VendorPage = () => {
  const { user } = useUser();
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color='#299E60' />

      {/* HeaderOne */}
      <HeaderOne username={user?.user?.name} />

      {/* BreadcrumbThree */}
      <BreadcrumbThree title={"Farmers List"} />

      {/* VendorsList */}
      <VendorsList />

      {/* ShippingOne */}
      <ShippingOne />


      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default VendorPage;
