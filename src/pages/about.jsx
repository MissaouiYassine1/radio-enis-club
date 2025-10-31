import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Users, Radio, Mic, Music, Award } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Ahmed Ben Salah",
      role: "Président du club",
      image: "/images/team/ahmed.jpg",
      description: "Étudiant en 4ème année génie informatique, passionné de radio depuis 3 ans."
    },
    {
      name: "Marie Dupont",
      role: "Responsable technique",
      image: "/images/team/marie.jpg",
      description: "Étudiante en 3ème année génie des télécommunications, spécialisée en audio."
    },
    {
      name: "Karim Jlassi",
      role: "Responsable programmation",
      image: "/images/team/karim.jpg",
      description: "Étudiant en 4ème année, anime l'émission 'Tech Talk' chaque semaine."
    },
    {
      name: "Sarah Melliti",
      role: "Responsable événements",
      image: "/images/team/sarah.jpg",
      description: "Étudiante en 3ème année, organise les événements culturels du club."
    }
  ];

  const missions = [
    {
      icon: Radio,
      title: "Diffuser et informer",
      description: "Proposer une programmation variée et informative pour la communauté étudiante."
    },
    {
      icon: Mic,
      title: "Former et éduquer",
      description: "Former les étudiants aux techniques radiophoniques et à la prise de parole."
    },
    {
      icon: Music,
      title: "Animer le campus",
      description: "Organiser des événements culturels et créer du lien entre les étudiants."
    },
    {
      icon: Users,
      title: "Fédérer la communauté",
      description: "Rassembler les étudiants autour de projets communs et d'échanges."
    }
  ];

  return (
    <>
      <Head>
        <title>À propos - Radio ENIS</title>
        <meta 
          name="description" 
          content="Découvrez le club radio de l'ENIS : notre histoire, notre équipe et nos missions pour animer la vie étudiante." 
        />
      </Head>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              À propos de nous
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez l'histoire du club radio de l'ENIS, notre passion pour la radio étudiante 
              et notre engagement à animer la vie du campus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Fondé en 2018, le club radio de l'ENIS est né de la passion commune 
                  de plusieurs étudiants pour l'univers de la radio et de l'audio.
                </p>
                <p>
                  Ce qui a débuté comme un petit projet étudiant est rapidement devenu 
                  une plateforme essentielle pour l'expression étudiante et l'animation 
                  culturelle du campus.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de diffuser régulièrement, d'organiser 
                  des événements culturels et de former de nouveaux talents à 
                  l'art radiophonique.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl h-80 flex items-center justify-center">
                <Award className="h-24 w-24 text-white opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos missions */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nos missions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Le club radio s'engage sur plusieurs fronts pour enrichir la vie étudiante 
              et développer les compétences de ses membres.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <mission.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {mission.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {mission.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Rencontrez les membres passionnés qui font vivre le club radio au quotidien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Rejoindre */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous souhaitez nous rejoindre ?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Que vous soyez passionné de technique, d'animation ou simplement curieux, 
              il y a toujours une place pour vous au club radio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Postuler maintenant
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Nous rencontrer
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;