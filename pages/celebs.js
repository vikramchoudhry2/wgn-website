import React, { useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import ParallaxSlider from '@/components/ParallaxSlider';

const celebrities = [
  {
    id: 1,
    name: 'Fateh',
    image: '/assets/fateh.png',
    description: 'Music Artist & Basketball Enthusiast',
  },
  {
    id: 2,
    name: 'JTA',
    image: '/assets/jta.png',
    description: 'Professional Basketball Player',
  },
  {
    id: 3,
    name: 'Nightwing',
    image: '/assets/nightwing.png',
    description: 'Basketball Influencer',
  },
  {
    id: 4,
    name: 'Bone Collector',
    image: '/assets/bone-collector.png',
    description: 'Streetball Legend',
  },
  {
    id: 5,
    name: 'Puneet Singh',
    image: '/assets/puneet.png',
    description: 'Community Leader',
  },
  {
    id: 6,
    name: 'Sukhdeep',
    image: '/assets/sukhdeep.png',
    description: 'Basketball Coach',
  },
];

export default function Celebs() {
  const leftBallRef = useRef(null);
  const rightBallRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Rotate up to -120deg as you scroll 0 to 600px
      const maxScroll = 600;
      const leftBase = 60; // more clockwise for puneet-bg.png
      const rightBase = 240; // more clockwise for wgn-balls.png
      const leftRotation = Math.max(-120, -scrollY / maxScroll * 120);
      const rightRotation = Math.min(120, scrollY / maxScroll * 120);
      if (leftBallRef.current) {
        leftBallRef.current.style.transform = `translateY(-30%) rotate(${leftBase + leftRotation}deg)`;
      }
      if (rightBallRef.current) {
        rightBallRef.current.style.transform = `translateY(-40%) rotate(${rightBase + rightRotation}deg)`;
      }
      // Debugging
      // console.log('ScrollY:', scrollY, 'Left:', leftBase + leftRotation, 'Right:', rightBase + rightRotation);
    };
    // Set initial transform on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="We Got Next - Community">
      {/* Video Header Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/assets/bone.MOV"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/celebs.png"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-center text-white drop-shadow-lg mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif', letterSpacing: '0.05em'}}>
            WeGotNext
          </h1>
          <Image 
            src="/assets/swoosh.png"
            alt="Swoosh"
            width={200}
            height={50}
            className="mx-auto"
          />
        </div>
      </div>
      {/* Support Structure Section */}
      <section className="relative w-full bg-black py-24 overflow-x-clip">
        {/* Left Basketball/Swoosh */}
        <img ref={leftBallRef} src="/assets/puneet-bg.png" alt="Basketball Swoosh" className="hidden md:block absolute left-[-60px] top-1/4 w-52 z-0" style={{transform: 'translateY(-30%)'}} />
        {/* Right Basketball/Swoosh */}
        <img ref={rightBallRef} src="/assets/wgn-balls.png" alt="Basketball Swoosh" className="hidden md:block absolute right-[-80px] top-[-40px] w-72 z-0" style={{transform: 'translateY(-40%) rotate(240deg)'}} />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-4 px-2 md:px-0">
          {/* Left Column: Text + Image */}
          <div className="flex-1 flex flex-col justify-center md:justify-start items-start md:pr-8 max-w-md">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-left leading-tight mb-8 max-w-xs md:max-w-md" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
              We wouldn't be here without the greatest support structure - our people
            </h2>
            <img src="/assets/sg.png" alt="Support Person" className="rounded-xl shadow-xl w-72 md:w-80 lg:w-96 object-cover" />
          </div>
          {/* Right Column: Paragraphs and List */}
          <div className="flex-1 flex flex-col justify-center text-white max-w-xl w-full md:pl-8">
            <p className="mb-6 text-base md:text-lg leading-relaxed text-left">
              We're incredibly fortunate to have such outstanding individuals representing our brand every single day. Striving to be more than just a brand is no small task—and it's often taken the belief and commitment of key people to make it happen.
            </p>
            <p className="mb-6 text-base md:text-lg leading-relaxed text-left">
              What makes it truly special is how many have embraced our vision from the very beginning. For that, we're deeply grateful. We're especially thankful for those who consistently show up to support the camp and serve as exceptional role models for the kids, including:
            </p>
            <ul className="list-none pl-0 space-y-1 text-base md:text-lg text-left">
              <li>Bone Collector</li>
              <li>Phil Handy</li>
              <li>Juan Toscano Anderson</li>
              <li>Fateh Singh</li>
              <li>Nightwing</li>
              <li>Preet Chahal</li>
              <li>Anamika Dubb</li>
              <li>Sukhman Gill</li>
              <li>Amandeep Kang</li>
              <li>Jay Trak</li>
              <li>Britt Lucio</li>
              <li>And so many more!</li>
            </ul>
          </div>
        </div>
      </section>
      <ParallaxSlider />
      {/* Rest of Community Page */}
      <div className="bg-black text-white py-20">
        <div className="container-center">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              We Got Next is proud to be connected with amazing athletes, celebrities, and community leaders who share our passion for basketball and community building. Here are some of the incredible individuals who have been part of our journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrities.map((celeb) => (
              <div key={celeb.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={celeb.image}
                    alt={celeb.name}
                    width={500}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold">{celeb.name}</h3>
                    <p className="text-gray-300">{celeb.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            {/* Video/Quote Section: Juan Toscano Anderson */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
              <div className="w-full md:w-1/2 flex justify-center">
                <video
                  src="/assets/jta-video.mov"
                  controls
                  className="rounded-xl w-full max-w-md bg-black"
                  poster="/assets/jta1.png"
                />
              </div>
              <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>Juan Toscano Anderson</h2>
                <p className="text-white text-lg md:text-xl mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
                  "When you go ask your parents for advice or your friends for advice or your big brother for advice, you kind of want the answer and there's no answer. You got to work hard. That's a non-negotiable, but you also have to be a good person. You have to treat people the right way. You have to be respectful because when you're not a good person, opportunities close for you, doors close for you. People don't want to work with you. People don't want to be around you. You have to be smart. You have to make good choices. I mean, there's a lot of different things. If you want to get to the highest level, like everything in your life has to be clicking, right? You have to be super focused on that. But working hard is probably like the baseline, right? You have no chance if you don't work hard."
                </p>
                <a href="http://Journeytoachieve.org" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-orange-400 font-bold underline text-lg md:text-xl">Here's a link to his foundation!</a>
              </div>
            </div>
            {/* Video/Quote Section: Bone Collector */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
              <div className="w-full md:w-1/2 flex justify-center">
                <video
                  src="/assets/bone-practice.mov"
                  controls
                  className="rounded-xl w-full max-w-md bg-black"
                  poster="/assets/bone-collector.png"
                />
              </div>
              <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>Bone Collector</h2>
                <p className="text-white text-lg md:text-xl" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
                  "People see me just have the ball on a string all the time. It doesn't just happen overnight. Hard work and passion for what I do from a young age have brought me to where I am today."
                </p>
              </div>
            </div>
            {/* End Video/Quote Section */}
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Want to be part of the We Got Next family? Join our community events, camps, and programs!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                Upcoming Events
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 