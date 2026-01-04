import React from "react";
import { motion } from "framer-motion";

const MeetHeros = () => {
  const heroes = [
    {
      name: "Sarah & Luna",
      img: "https://i.ibb.co.com/ynnfrvNn/young-woman-her-cute-jack-600nw-1690835497.jpg",
      story:
        "Sarah adopted Luna, a shy rescue dog, and gave her a loving home. Now, Luna is the happiest dog on the block!",
      badge: "Dog Rescue",
    },
    {
      name: "Mike & Whiskers",
      img: "https://i.ibb.co.com/bMZC6sc4/images-q-tbn-ANd9-Gc-Q6-ZAwu-K-G3-QQyoo-IZoe-LHbsz48-Kl-Ci-Qf-KY-w-s.jpg",
      story:
        "Mike found Whiskers, a senior cat, through PawMart. He proves that older pets have just as much love to give.",
      badge: "Senior Cat",
    },
    {
      name: "The Ali Family & Patches",
      img: "https://static.toiimg.com/thumb/msid-122885506,width-1280,height-720,resizemode-4/122885506.jpg",
      story:
        "The Ali family wanted a playful kitten. They found Patches, who has brought endless joy and laughter to their home.",
      badge: "Family Joy",
    },
    {
      name: "Emma & Coco",
      img: "https://i.ibb.co.com/nsSW376J/girl-pet-owner-hugging-with-dog-puppy-happy-human-female-and-cute-funny-dog-lying-on-floor-together.jpg",
      story:
        "Emma rescued Coco from a shelter and together they’ve created a bond full of trust, cuddles, and fun adventures.",
      badge: "Rescue Story",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 my-5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-[#FE7F73]/10 dark:bg-[#FE7F73]/20 text-[#FE7F73] rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Meet Our Pet Heroes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real stories of love, compassion, and the joy of pet adoption
            </p>
          </motion.div>
        </div>

        {/* Heroes Timeline Layout */}
        <div className="max-w-6xl mx-auto space-y-16">
          {heroes.map((hero, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={hero.img}
                    alt={hero.name}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-xl">
                    <span className="text-sm font-bold text-[#FE7F73] flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {hero.badge}
                    </span>
                  </div>
                </div>

                {/* Decorative Element */}
                <div
                  className={`hidden md:block absolute -z-10 w-full h-full top-8 ${
                    index % 2 === 0 ? "left-8" : "right-8"
                  } bg-[#FE7F73]/10 dark:bg-[#FE7F73]/20 rounded-3xl`}
                ></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {/* Quote Icon */}
                    <svg
                      className="w-12 h-12 text-[#FE7F73] mb-4 opacity-50 dark:opacity-70"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {hero.name}
                    </h3>

                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {hero.story}
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center gap-4">
                      <div className="h-1 w-16 bg-[#FE7F73] rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Adoption Success
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Stats/Info */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      className="w-5 h-5 text-[#FE7F73]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="font-medium">Forever Home Found</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      className="w-5 h-5 text-[#FE7F73]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">Verified Story</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Write Your Own Story?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join hundreds of happy families who found their perfect companion
              through PawMart
            </p>
            <a
              href="/pets-and-supplies"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#FE7F73] text-white font-semibold text-lg rounded-full hover:bg-[#f86255] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>Browse Available Pets</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetHeros;
