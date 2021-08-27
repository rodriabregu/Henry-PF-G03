import './Slide.css';
import { Link } from 'react-router-dom';
import {useRef, useEffect, useCallback} from 'react';
import bannerimg1 from './bannerimg1.jpg';
import bannerimg2 from './bannerimg2.jpg';
import bannerimg3 from './bannerimg3.jpg';
import bannerimg4 from './bannerimg4.jpg';


export const Slide = ({
    autoplay = true,
    velocidad="1800",
    interval="4000"
}) => { 
    const slide = useRef(null)
    const intervalSlide = useRef(null);

    const nextImage = useCallback(() => {
        if(!slide.current) return;
        if(slide.current.children.length > 0){
			const firstElement = slide.current.children[0];
			slide.current.style.transition = `${velocidad}ms ease-out all`;

			const tamañoSlide = slide.current.children[0].offsetWidth;
			slide.current.style.transform = `translateX(-${tamañoSlide}px)`;

            const transicion = () => {
				slide.current.style.transition = 'none';
				slide.current.style.transform = `translateX(0)`;
				slide.current.appendChild(firstElement);
				slide.current.removeEventListener('transitionend', transicion);
			}
            slide.current.addEventListener('transitionend', transicion);
        }
    }, [velocidad]);
    
    const prevImage = () =>{
        if(slide.current.children.length > 0){
			const index = slide.current.children.length - 1;
			const ultimoElemento = slide.current.children[index];
			slide.current.insertBefore(ultimoElemento, slide.current.firstChild);
			
			slide.current.style.transition = 'none';
			const tamañoSlide = slide.current.children[0].offsetWidth;
			slide.current.style.transform = `translateX(-${tamañoSlide}px)`;
		
			setTimeout(() => {
				slide.current.style.transition = `${velocidad}ms ease-out all`;
				slide.current.style.transform = `translateX(0)`;
			}, 30);
		}
    }
    
    useEffect(() => {
		if(autoplay){
			intervalSlide.current = setInterval(() => {
				nextImage();
			}, interval);
	
			slide.current.addEventListener('mouseenter', () => {
				clearInterval(intervalSlide.current);
			});
	
			slide.current.addEventListener('mouseleave', () => {
				intervalSlide.current = setInterval(() => {
					nextImage();
				}, interval);
			});
		} return function cleanup() {clearInterval(intervalSlide.current)}
	}, [autoplay, interval, nextImage]);

    return (
    <div className='container-allslide'>
        <div className='container-slide' ref={slide}>
            <div className='slide'>
                <div className='text-slide'> <p>Welcome! Click on image to enter FC Crotone E-commerce</p> </div>
                <Link to='/home'> <img src={bannerimg1} alt='home' width='800 px' height='550px'/></Link>
            </div>
            <div className='slide'>
                <Link to='/home'> <img src={bannerimg2} alt='home' width='800 px' height='550px'/></Link>
            </div>
            <div className='slide'>
                <Link to='/home'> <img src={bannerimg3} alt='home' width='800 px' height='550px'/></Link>
            </div>
            <div className='slide'>
                <Link to='/home'> <img src={bannerimg4} alt='home' width='800 px' height='550px'/></Link>
            </div>
        </div>
        <div className='buttons'>
            <button className='btn-slide-l' onClick={prevImage}> {`<`} </button>
            <button className='btn-slide-r' onClick={nextImage}> {`>`} </button>
        </div>
    </div>
    )}


export default Slide;