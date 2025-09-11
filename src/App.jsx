import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'

const App = () => {

  const [isProject, setIsProject] = useState('home');

  useEffect(()=>{
    
    const handleScroll = () => {
      const projectOffset = document.getElementById('projects')?.offsetTop || 0;
      const aboutOffset = document.getElementById('about')?.offsetTop || 0;
      localStorage.setItem('scrollY', window.scrollY.toString()); //save scroll position
      const scrollY = window.scrollY;

      if(scrollY + window.innerHeight > aboutOffset +500){
        setIsProject('about');
      }else if(scrollY + window.innerHeight > projectOffset +100){
        setIsProject('projects');
      }else{
        setIsProject('home');
      }
    };
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return()=>window.removeEventListener('scroll', handleScroll);
  },[]);

  //restore scroll position
useLayoutEffect(() => {
  const savedScrollY = localStorage.getItem('scrollY');
  if (savedScrollY !== null) {
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: parseInt(savedScrollY),
        behavior: 'auto', // Use 'auto' here for immediate jump
      });
    });
  }
}, []);


  return (
    <div className='relative min-h-screen w-full'>
      {/* blue gradient */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${isProject==='home' ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(ellipse_at_top,_rgba(0,102,255,0.4)_20%,_transparent_90%)] `}/>
      

      {/* violet */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${isProject==='projects' ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(ellipse_at_top,_rgba(138,43,226,0.7)_20%,_white_90%)] `}/>


      {/* violet */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${isProject==='about' ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(ellipse_at_top,_rgba(0,128,64,1)_30%,_white_90%)] `}/>
        

  
      <div className='relative z-10 max-w-8xl mx-auto '>
      <Navbar/>
      <Hero/>
      <Projects/>
      <About/>
      </div>
    
    </div>
  )
}

export default App
