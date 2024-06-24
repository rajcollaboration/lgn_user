import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { getlocalStorage, httpRequest } from "../../services/services";


const Home = () => {
  const [banners, setBanners] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const callFunctionsInParallel = useCallback(async () => {
   const {token} = await getlocalStorage("user_details");
   const header = {
    'x-access-token': token
  }
  const header2 = {
    "Authorization": "Bearer " + token
  }
    try {
      const results = await Promise.all([httpRequest("GET", "api/v1/banners",{}, header),httpRequest("GET", "api/tournament/all-tournaments",{},header2)]);
   
      setBanners(results[0].data);
      setTournaments(results[1].allTournaments)
    } catch (error) {
      console.error('Error in executing functions', error);
    }
  }, []);
  useEffect(()=>{
    callFunctionsInParallel();
  },[])
  return (
    <content>
      <div className="relative left_side">
        <Sidebar />
      </div>
      <div className="stream_area">
      <div className="banner_area order-sm-2">
        <Swiper
          className="home_banner"
          loop={true}
          navigation={true}
          modules={[Navigation]}
        >
          {banners?.map((banner) => (
            <SwiperSlide>
              <figure>
                <img
                  src={banner.image}
                  alt="Banner 1"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        <h4>Upcoming Tournament</h4>
        <div className="tournament_block">
          <div className="row g-2 g-sm-3">
            {
                tournaments?.map((tournament,key)=> (
            <div key={key} className="col-6 col-sm-2" >
              <figure>
                <Link to={`/tournament/${tournament._id}`}>
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                  />
                </Link>
              </figure>
              <figcaption>{tournament.title}</figcaption>
            </div>
                ))
            }
          </div>
        </div>
      </div>
      </div>
    </content>
  );
};

export default Home;
