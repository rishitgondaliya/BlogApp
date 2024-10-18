/* eslint-disable react/prop-types */
import Carousel from 'react-material-ui-carousel';
import blog from '../assets/blog.png';
import blog1 from '../assets/blog2.png';
import blog2 from '../assets/blog3.png';

const ImageSlider = ({ setBgColor }) => {
    const items = [
        {
            img: blog,
            alt: "Blog 1",
            bgColor: "#cf3e34" 
        },
        {
            img: blog1,
            alt: "Blog 2",
            bgColor: "#2c9985"
        },
        {
            img: blog2,
            alt: "Blog 3",
            bgColor: "#4898e8" 
        },
    ];

    const handleSlideChange = (index) => {
        setBgColor(items[index].bgColor); // Pass the background color to the parent
    };

    return (
        <Carousel
            autoPlay={true}          
            animation="fade"        
            indicators={false}  
            duration={300}      
            navButtonsAlwaysVisible={false} 
            className='mb-0'
            onChange={handleSlideChange} // Call when slide changes
        >
            {items.map((item, index) => (
                <div key={index}>
                    <img
                        src={item.img}
                        alt={item.alt}
                        className="w-2/3 mx-auto bottom-0 rounded"
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageSlider;
