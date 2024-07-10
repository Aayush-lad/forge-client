"use client"
import Image from "next/image";
import Header from "../components/Home/Header";
import HeroSection from "../components/Home/HeroSection";
import About from "../components/Home/About";
import Pricing from "../components/Home/Pricing";
import Reviews from "../components/Home/Reviews";
import Footer from "../components/Home/Footer";

export default function Home() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <About/>
    <Reviews/>
    <Pricing/>
    <Footer/>
    </>
  );
}
