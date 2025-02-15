// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerImages } from '../../../constant';


const Banner = () => {
    return (
      <div className="w-full h-[80vh]  mt-16 my-11 ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  "
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full relative">
                <div className="absolute h-[80vh] w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                  <div className="absolute top-[40%] text-center left-[5%] lg:left-[30%]">
                    <h3 className="text-white font-bold  lg:text-5xl">
                      Real Estate Marketplace
                    </h3>
                    <p className=" text-2xl font-semibold  text-slate-300">
                      the most popular Real estate website{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]  bg-cover object-cover bg-no-repeat h-[80vh]  "
                    src={img.image}
                    alt=""
                  />
                </div>
                <div className="w-full   flex items-center justify-around p-4 bg-black opacity-30 h-[10vh] absolute bottom-0">
                  <div className="text-white ml-6 lg:mt-4">
                    <h2 className=" text-sm lg:text-xl text-white font-bold">
                      LEADING THE INDUSTRY
                    </h2>
                    <p className="text-sm">ABOUT US</p>
                  </div>
                  <div className="text-white hidden md:block lg:mt-4 ">
                    <h2 className="text-sm  lg:text-xl text-white font-bold">
                      Most Trusted
                    </h2>
                    <p className="text-sm">LEARN MORE</p>
                  </div>
                  <div className="text-white  lg:mt-4 ">
                    <h2 className="text-sm  lg:text-xl text-white font-bold">
                      2,500,000+ Client
                    </h2>
                    <p className="text-sm">OUR COMMUNITY</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <div className="w-full relative">
              <div className="absolute h-[70vh] w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                <div className="absolute top-[40%] text-center left-[5%] lg:left-[30%]">
                  <h3 className="text-white font-bold  lg:text-5xl">
                    Real Estate Marketplace
                  </h3>
                  <p className=" text-2xl font-semibold  text-slate-300">
                    the most popular Real estate website{" "}
                  </p>
                </div>
              </div>
              <div>
                <img
                  className="w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]  bg-cover bg-no-repeat h-[60vh]  "
                  src="https://i.ibb.co/4pWSZrx/whatsapp-image-2022-09-14-at-110649-am.jpg"
                  alt=""
                />
              </div>
              <div className="w-full   lg:items-center flex justify-around bg-black opacity-30 h-[10vh] absolute bottom-0">
                <div className="text-white ml-6 lg:mt-4">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    LEADING THE INDUSTRY
                  </h2>
                  <p className="text-sm">ABOUT US</p>
                </div>
                <div className="text-white lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    Most Trusted
                  </h2>
                  <p className="text-sm">LEARN MORE</p>
                </div>
                <div className="text-white lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    2,500,000+ Client
                  </h2>
                  <p className="text-sm">OUR COMMUNITY</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full relative">
              <div className="absolute h-[70vh] w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                <div className="absolute top-[40%] text-center left-[5%] lg:left-[30%]">
                  <h3 className="text-white font-bold  lg:text-5xl">
                    Real Estate Marketplace
                  </h3>
                  <p className=" text-2xl font-semibold  text-slate-300">
                    the most popular Real estate website{" "}
                  </p>
                </div>
              </div>
              <div>
                <img
                  className="w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]  bg-cover bg-no-repeat h-[60vh]  "
                  src="https://i.ibb.co/Pt1wtSR/images-q-tbn-ANd9-Gc-RAQj-UUs5k-ALvx-Rxo7-MYj-W4qnex3-B2-Tcugwkw-usqp-CAU.jpg"
                  alt=""
                />
              </div>
              <div className="w-full   lg:items-center flex justify-around bg-black opacity-30 h-[10vh] absolute bottom-0">
                <div className="text-white ml-6 lg:mt-4">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    LEADING THE INDUSTRY
                  </h2>
                  <p>ABOUT US</p>
                </div>
                <div className="text-white lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    Most Trusted
                  </h2>
                  <p>LEARN MORE</p>
                </div>
                <div className="text-white lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    2,500,000+ Client
                  </h2>
                  <p>OUR COMMUNITY</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full relative">
              <div className="absolute h-[70vh] w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                <div className="absolute top-[40%] text-center left-[5%] lg:left-[30%]">
                  <h3 className="text-white font-bold  lg:text-5xl">
                    Real Estate Marketplace
                  </h3>
                  <p className=" text-2xl font-semibold  text-slate-300">
                    the most popular Real estate website{" "}
                  </p>
                </div>
              </div>
              <div>
                <img
                  className="w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]  bg-cover bg-no-repeat h-[60vh]  "
                  src="https://i.ibb.co/kyDXgtW/7z-Nbx-UQm-F1x9-ZZoe-XSppc-WPs-Tm-I5q0-MKMIHmg9-DA.jpg"
                  alt=""
                />
              </div>
              <div className="w-full   lg:items-center flex justify-around bg-black opacity-30 h-[10vh] absolute bottom-0">
                <div className="text-white lg:mt-4">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    LEADING THE INDUSTRY
                  </h2>
                  <p>ABOUT US</p>
                </div>
                <div className="text-white ml-6 lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    Most Trusted
                  </h2>
                  <p>LEARN MORE</p>
                </div>
                <div className="text-white lg:mt-4 ">
                  <h2 className="text-sm lg:text-xl text-white font-bold">
                    2,500,000+ Client
                  </h2>
                  <p>OUR COMMUNITY</p>
                </div>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    );
};

export default Banner;