import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const About = () => {
  const stats = [
    { number: "5000+", label: "Pets Adopted" },
    { number: "10,000+", label: "Happy Families" },
    { number: "500+", label: "Active Listings" },
    { number: "50+", label: "Partner Shelters" },
  ];

  const values = [
    {
      icon: "❤️",
      title: "Compassion First",
      description:
        "We believe every pet deserves a loving home and proper care.",
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description:
        "Honest listings and verified sellers for your peace of mind.",
    },
    {
      icon: "🌟",
      title: "Quality Service",
      description: "Exceptional support throughout your adoption journey.",
    },
    {
      icon: "🏡",
      title: "Community Focus",
      description:
        "Building connections between pets and their forever families.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=1",
      description: "Pet lover with 15 years in animal welfare.",
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      image: "https://i.pravatar.cc/300?img=33",
      description: "Ensuring smooth adoption processes nationwide.",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "https://i.pravatar.cc/300?img=5",
      description: "Connecting families with their perfect companions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FE7F73] to-orange-500 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              About PawMart
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Connecting loving families with pets in need since 2020
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                At PawMart, we're dedicated to making pet adoption accessible,
                transparent, and joyful. We believe every animal deserves a
                loving home, and every family deserves the companionship of a
                loyal pet.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our platform connects reputable shelters, rescue organizations,
                and responsible breeders with families ready to welcome a new
                furry member. We're not just facilitating adoptions – we're
                building lasting relationships and creating countless happy
                endings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-[#FE7F73] mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
              >
                <div className="relative inline-block mb-6">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FE7F73] via-orange-400 to-yellow-300 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
                    style={{
                      boxShadow:
                        "0 10px 25px -5px rgba(254, 127, 115, 0.4), 0 8px 10px -6px rgba(254, 127, 115, 0.3), inset 0 -3px 8px rgba(0, 0, 0, 0.1), inset 0 3px 8px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <span className="text-4xl filter drop-shadow-lg">
                      {value.icon}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate individuals dedicated to connecting pets with loving
            homes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#FE7F73] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FE7F73] to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families who found their perfect companion
              through PawMart
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/pets-and-supplies"
                className="btn bg-white text-[#FE7F73] hover:bg-gray-100 border-none text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all"
              >
                Browse Pets
              </Link>
              <Link
                to="/register"
                className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-[#FE7F73] text-lg px-8 py-3 transition-all"
              >
                Join Us Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
