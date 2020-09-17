import React, {Component} from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const photos = [
    {
        name: "Photo 1",
        url: "https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595427454/contentservice/Nivea.jpg_rkHKcTBlv.jpg"
    },
    {
        name: "Pho 2",
        url: "https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1594898313/contentservice/10th-gen-copy.jpg_SyqKwn6Jw.jpg"
    },
    {
        name: "photo",
        url : "https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595252251/contentservice/evaslides.jpg_BJemRMmgv.jpg"
    }
]


export default class Slides extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        slidesToScroll:1,
        className: "sliders"
      };
      return (
        <div>
          <Slider {...settings}>
            {photos.map((photo) => {
                return(
                    <div>
                        <img width="100%" src={photo.url} />
                    </div>
                )
            })}
          </Slider>
        </div>
      );
    }
  }
  