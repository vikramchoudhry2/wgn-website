import React, { useRef } from 'react';

const cards = [
  { id: 1, image: '/assets/phil.png', title: 'Phil Handy', text: "A Moment We'll Never Forget - We were deeply honored to welcome Coach Phil Handy to our basketball academy — a true legend in the game, a world-class mentor, and an even better human being. Our program is built for the youth in our Punjabi community, many of whom come from blue-collar families and don't often have access to opportunities like this. For Coach Handy to take the time to pour into our kids, to teach, inspire, and uplift — it meant the world. This wasn't just a visit. It was a moment of impact. Coach Handy brought a level of knowledge, energy, and mentorship that most only dream of experiencing. His presence gave our players a glimpse of what's possible, both on and off the court. We are beyond grateful for the relationship we've built with Coach Handy. It's one of those rare and special connections that will stay with our kids forever — because when someone of his caliber steps into your gym and believes in your potential, it changes everything. Thank you, Coach Handy. You're not just a mentor — you're now part of our family."},
  { id: 2, image: '/assets/our-story.jpg', title: 'Bone Collector', text: "A Living Legend – Thank You, Bone Collector. When Bone Collector — the one and only Larry Williams — pulled up to our academy, he brought more than just handles. He brought energy, passion, and a presence that lit the gym up. For our kids, many of whom grew up watching his legendary And1 mixtapes or following him on social media, meeting him in real life felt like a dream. But Bone didn't just show out — he showed up. He connected with every kid, shared wisdom from his journey, and reminded them that greatness comes from discipline, creativity, and staying true to who you are. He didn't come with ego — he came with love. He treated our youth like they were his own, making sure each of them walked away with knowledge, confidence, and inspiration. He gave game, told stories, and dropped gems that will stick with our kids for years to come. Bone Collector is more than a streetball icon — he's a teacher, a motivator, and a mentor. And for our community of Punjabi youth, many from blue-collar backgrounds, his visit was more than basketball — it was a reminder that no dream is too big if you're willing to work for it. Bone, thank you for blessing our gym, for investing your time and energy into our kids, and for being a real one in every sense. You're forever a part of our family now — and the impact you left behind is unforgettable." },
  { id: 3, image: '/assets/jta1.png', title: 'Juan Toscano Anderson', text: "A Real One – Thank You, Juan Toscano-Anderson Having Juan Toscano-Anderson in our gym was more than just a visit — it was a powerful experience for our entire academy. Juan's story, his energy, and his authenticity deeply resonated with our youth — many of whom come from hardworking, blue-collar Punjabi families who rarely get to connect with someone who's walked the path from humble beginnings to the NBA. Juan showed our kids that greatness isn't reserved for the privileged — it's built through resilience, work ethic, and heart. He didn't just show up — he showed love. He connected with every kid, gave game, dropped wisdom, and made sure each one felt seen. That kind of presence? You can't fake it. Juan is as real as they come — and his humility and character make him a role model our youth will never forget. We're incredibly grateful for the bond we've formed with Juan. His visit reminded us all why we do what we do: to uplift, inspire, and create access to greatness. Juan, thank you for being a light in our gym. You've left a mark that will last a lifetime — and you'll always have family here." },
  { id: 4, image: '/assets/fateh.png', title: 'Fateh Singh', text: "From the Heart – Thank You, Fateh Singh When Fateh Singh stepped into our academy, he didn't come as a celebrity or an artist — he came as a big brother. He connected with our youth in a way that was real, vulnerable, and full of heart. As a Punjabi rapper and singer who's carved his own lane in the music world, Fateh shared his journey with honesty — the struggles, the setbacks, the grind, and the perseverance it took to get where he is today. He didn't sugarcoat anything, and that's exactly why it hit home. Our kids saw themselves in him — in his story, in his hustle, in his strength. Fateh treated every kid like family. Whether it was a dap, a hug, a laugh, or a quiet moment of advice — he gave them his time and his presence, and that's something they'll never forget. For many of our kids from Punjabi, blue-collar families, moments like these are rare. Having someone like Fateh — someone who shares their culture, speaks their language, and understands their world — show up for them in such a meaningful way? That's powerful beyond words. Fateh, thank you for being a voice, a light, and a role model. Your words, your energy, and your love left a lasting imprint on our academy. You're more than an artist — you're family now." },
  { id: 5, image: '/assets/celebs.png', title: 'Sikh Youth All Star Game', text: "The Annual Celebrity Game is more than just an event—it's a celebration of Punjabi talent, culture, and community spirit. We believe that the definition of a celebrity is subjective; someone who inspires one person might not be a household name to another. And that's okay. This event is our way of honoring both established and emerging voices within the Punjabi community—artists, influencers, entrepreneurs, creators, and changemakers—who are making a positive impact in their own unique ways. Our goal is to create a platform where recognition is not limited by fame but fueled by inspiration, authenticity, and community support." },
  { id: 6, image: '/assets/celeb.png', title: "The Sikh Youth All-Star Game", text: "is more than just a basketball event — it's a celebration of excellence, leadership, and community. Each year, 24 standout athletes are selected to represent the best of Sikh youth talent across multiple academies. These players aren't just recognized for their skill on the court, but for the impact they make off it. Selections are made based on overall performance, consistency, leadership, and the ability to uplift those around them. Whether it's dropping buckets, locking down on defense, mentoring younger teammates, or leading by example in their communities, these all-stars embody what it means to be a complete player. This game is a platform to honor the hard work, discipline, and dedication these young athletes have shown throughout the year. It's where talent meets purpose — and where the next generation of leaders and hoopers take center stage."}
];

export default function ParallaxSlider() {
  const sliderRef = useRef(null);

  return (
    <section className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>Our Stories & Highlights</h2>
        <div
          ref={sliderRef}
          className="overflow-x-auto flex gap-8 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="parallax-slide flex-shrink-0 bg-white/5 rounded-2xl shadow-xl snap-center flex flex-col items-center"
              style={{ minWidth: '90vw', maxWidth: '95vw', width: '90vw' }}
            >
              <div className="relative w-full h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={card.image}
                  alt="Parallax Card"
                  className="object-cover w-full h-full transition-transform duration-300"
                  draggable={false}
                />
              </div>
              <div className="p-6 text-white text-center flex flex-col gap-2 w-full" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
                <div className="text-xl md:text-2xl font-bold mb-1">{card.title}</div>
                <div className="text-sm md:text-base font-medium">{card.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .parallax-slide {
            min-width: 32rem !important;
            max-width: 36rem !important;
            width: 32rem !important;
          }
          .overflow-x-auto {
            scroll-snap-type: x mandatory;
          }
        }
      `}</style>
    </section>
  );
} 