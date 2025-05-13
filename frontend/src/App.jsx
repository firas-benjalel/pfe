import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoon, FiSun, FiDownload, FiMenu, FiX, FiHome, FiUser, FiFileText, FiClipboard, FiMail } from "react-icons/fi";
import cvPdf from './cv.pdf';

// Questionnaire data avec le nouveau système de scoring
const questionnaire = [
  {
    id: 1,
    question: "Vous est-il parfois arrivé d'oublier de prendre vos médicaments ?",
    options: [
      { text: "Oui", score: 0 },  // Oui = 0
      { text: "Non", score: 1 }   // Non = 1
    ]
  },
  {
    id: 2,
    question: "Négligez-vous parfois l'heure de prise d'un de vos médicaments ?",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 3,
    question: "Lorsque vous vous sentez mieux, interrompez-vous parfois votre traitement ?",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 4,
    question: "Vous est-il arrivé d'arrêter votre traitement parce que vous vous sentiez moins bien en le prenant ?",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 5,
    question: "Je ne prends les médicaments que lorsque je me sens malade.",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 6,
    question: "Ce n'est pas naturel pour mon corps ni pour mon esprit d'être équilibré par des médicaments",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 7,
    question: "Mes idées sont plus claires avec les médicaments",
    options: [
      { text: "Non", score: 0 },  // Non = 0
      { text: "Oui", score: 1 }   // Oui = 1
    ]
  },
  {
    id: 8,
    question: "En continuant à prendre les médicaments, je peux éviter de tomber à nouveau malade",
    options: [
      { text: "Non", score: 0 },
      { text: "Oui", score: 1 }
    ]
  },
  {
    id: 9,
    question: 'Avec les médicaments, je me sens bizarre, comme "un zombie"',
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  },
  {
    id: 10,
    question: "Les médicaments me rendent lourd(e) et fatigué(e)",
    options: [
      { text: "Oui", score: 0 },
      { text: "Non", score: 1 }
    ]
  }
];

// Results interpretation avec le nouveau seuil à 7
const resultsData = [
  { 
    min: 0, 
    max: 7, 
    title: "Mauvaise observance", 
    advice: "Votre score (≤7) indique une mauvaise observance thérapeutique. Il est recommandé de consulter votre médecin pour discuter des difficultés rencontrées avec votre traitement."
  },
  { 
    min: 8, 
    max: 10, 
    title: "Bonne observance", 
    advice: "Votre score (>7) indique une bonne observance thérapeutique. Continuez à prendre vos médicaments comme prescrit."
  }
];

// Team CV data
const teamData = [
  {
    name: "Ben Jalel Rayen",
    role: "Spécialiste en soins infirmiers",
    education: "licsence en soins infirmiers",
    experience: "5 ans en unités de troubles de l'humeur",
    downloadLink: cvPdf
  },
  {
    name: "Moulehi Yassine",
    role: "Spécialiste en soins infirmiers",
    education: "licsence en soins infirmiers",
    experience: "Recherche sur les interventions pour le trouble bipolaire",
    downloadLink: "/cv-marie-martin.pdf"
  }
];

const PFEPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleAnswer = (questionId, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    const scores = Object.values(answers);
    const sum = scores.reduce((total, score) => total + score, 0); // Addition simple sans filtre
    setTotalScore(sum);
    setShowResults(true);
  };

  const getResult = () => {
    return resultsData.find(r => totalScore >= r.min && totalScore <= r.max);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Navigation - Inchangé */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ObservanceMédic
              </motion.span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Accueil", icon: <FiHome /> },
                { id: "project", label: "Notre Projet", icon: <FiFileText /> },
                { id: "team", label: "Notre Équipe", icon: <FiUser /> },
                { id: "test", label: "Auto-Évaluation", icon: <FiClipboard /> }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  className={`flex items-center space-x-1 text-sm font-medium ${activeSection === item.id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}

              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Changer le thème"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </motion.button>
            </div>

            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                whileTap={{ scale: 0.9 }}
                aria-label="Ouvrir le menu"
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { id: "home", label: "Accueil", icon: <FiHome /> },
                  { id: "project", label: "Notre Projet", icon: <FiFileText /> },
                  { id: "team", label: "Notre Équipe", icon: <FiUser /> },
                  { id: "test", label: "Auto-Évaluation", icon: <FiClipboard /> }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${activeSection === item.id ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}

                <div className="px-3 py-2">
                  <motion.button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{darkMode ? <FiSun /> : <FiMoon />}</span>
                    {darkMode ? "Mode Clair" : "Mode Sombre"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content - Inchangé */}
      <main className="pt-16 pb-12">
        {/* Hero Section - Inchangé */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                  Observance Thérapeutique
                </span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium">Évaluation et amélioration de l'adhésion au traitement</span>
              </h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Une étude complète sur l'observance des traitements médicamenteux sous l'angle infirmier, axée sur l'identification des difficultés et l'amélioration de l'adhésion thérapeutique.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => scrollToSection("project")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir notre recherche
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection("test")}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-medium shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Faire l'auto-évaluation
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Project Summary Section - Inchangé */}
        <section id="project" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                <span className="border-b-4 border-indigo-600 pb-2">Notre Projet</span> de Recherche
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6">Aperçu du projet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Notre projet de fin d'études en soins infirmiers se concentre sur l'amélioration de l'observance thérapeutique dans les traitements au long cours. Nous avons développé des protocoles basés sur des preuves pour aider les infirmiers à identifier les difficultés d'observance et à mettre en œuvre des interventions appropriées.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Le projet combine une revue de littérature, des études de cas et des entretiens avec des professionnels de santé pour créer des outils pratiques utilisables au quotidien par les équipes soignantes.
                  </p>
                  <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-indigo-600">
                    <p className="text-indigo-800 dark:text-indigo-300 italic font-medium">
                      "L'amélioration de l'observance thérapeutique peut significativement améliorer les résultats pour les patients et leur qualité de vie. Les infirmiers jouent un rôle crucial dans ce processus."
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-2xl font-bold mb-6">Principaux résultats</h3>
                  <ul className="space-y-4">
                    {[
                      "Développement d'une échelle d'évaluation de l'observance en 5 points",
                      "Identification de 3 moments clés d'intervention infirmière",
                      "Création de supports éducatifs pour patients",
                      "Mise en place de protocoles de suivi ayant réduit les arrêts de traitement de 28% dans l'étude pilote"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      title: "Phase de recherche",
                      content: "6 mois de revue de littérature et collecte de données dans 3 centres cliniques"
                    },
                    {
                      title: "Méthodologie",
                      content: "Approche mixte combinant analyse quantitative de 120 dossiers patients et entretiens qualitatifs"
                    },
                    {
                      title: "Résultats",
                      content: "Protocole infirmier maintenant implémenté dans 2 hôpitaux avec des retours positifs"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-8">
                      <h4 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section - Inchangé */}
        <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                Notre <span className="text-indigo-600 dark:text-indigo-400">Équipe</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {teamData.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-300 mr-6">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-indigo-600 dark:text-indigo-400">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div>
                          <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">Formation</h4>
                          <p className="text-gray-700 dark:text-gray-300">{member.education}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">Expérience</h4>
                          <p className="text-gray-700 dark:text-gray-300">{member.experience}</p>
                        </div>
                      </div>
                      
                      <motion.a
                        href={member.downloadLink}
                        download
                        className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiDownload className="mr-2" />
                        Télécharger CV
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Questionnaire Section - Modifié pour le nouveau scoring */}
        <section id="test" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                Évaluation de l'<span className="text-indigo-600 dark:text-indigo-400">Observance</span>
              </h2>
              
              {!showResults ? (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    Ce questionnaire permet d'identifier les difficultés potentielles d'observance thérapeutique. Répondez honnêtement selon vos expériences.
                  </p>
                  
                  <div className="space-y-10">
                    {questionnaire.map((q) => (
                      <motion.div 
                        key={q.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                          {q.id}. {q.question}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {q.options.map((option, i) => (
                            <motion.div
                              key={i}
                              className={`flex items-center p-3 rounded-lg cursor-pointer border ${answers[q.id] === option.score ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                              onClick={() => handleAnswer(q.id, option.score)}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${answers[q.id] === option.score ? "border-indigo-500 bg-indigo-500" : "border-gray-400 dark:border-gray-500"}`}>
                                {answers[q.id] === option.score && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      onClick={calculateScore}
                      disabled={Object.keys(answers).length !== questionnaire.length}
                      className={`px-8 py-3 rounded-full font-medium shadow-lg ${Object.keys(answers).length === questionnaire.length ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
                      whileHover={Object.keys(answers).length === questionnaire.length ? { scale: 1.05 } : {}}
                      whileTap={Object.keys(answers).length === questionnaire.length ? { scale: 0.95 } : {}}
                    >
                      Obtenir les résultats
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Votre résultat
                    </h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
                      <div 
                        className={`h-4 rounded-full ${totalScore > 7 ? "bg-green-500" : "bg-red-500"}`} 
                        style={{ width: `${(totalScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Score: <span className="font-bold">{totalScore}/10</span>
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl mb-8 border-l-4 ${totalScore > 7 ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-red-500 bg-red-50 dark:bg-red-900/10"}`}>
                    <h4 className={`text-xl font-bold mb-3 ${totalScore > 7 ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
                      {totalScore > 7 ? "Bonne observance" : "Mauvaise observance"}
                    </h4>
                    <p className={totalScore > 7 ? "text-green-700 dark:text-green-200" : "text-red-700 dark:text-red-200"}>
                      {getResult()?.advice}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Recommandations:
                    </h4>
                    <ul className="space-y-3">
                      {totalScore > 7 ? (
                        <>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">Continuez à prendre vos médicaments comme prescrit</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">Maintenez vos rendez-vous de suivi médical</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">Prenez rendez-vous avec votre médecin pour discuter de vos difficultés</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">Notez vos prises de médicaments pour identifier les oublis</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <motion.div
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      onClick={() => setShowResults(false)}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Refaire le test
                    </motion.button>
                    
                    <motion.a
                      href="#contact"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contacter un professionnel
                    </motion.a>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Inchangé */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                Nous <span className="text-indigo-600 dark:text-indigo-400">Contacter</span>
              </h2>
              
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Entrez votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Entrez votre email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Objet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Écrivez votre message ici..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FiMail className="inline mr-2" />
                    Envoyer le message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer - Inchangé */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ObservanceMédic</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Un projet de recherche infirmière axé sur l'amélioration de l'observance thérapeutique et des résultats pour les patients.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Accueil", href: "#home" },
                  { name: "Notre Projet", href: "#project" },
                  { name: "Notre Équipe", href: "#team" },
                  { name: "Auto-Évaluation", href: "#test" }
                ].map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Ressources
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Article de recherche", href: "#" },
                  { name: "Protocole infirmier", href: "#" },
                  { name: "Guide patient", href: "#" },
                  { name: "Matériel éducatif", href: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400">contact@observancemedic.com</li>
                <li className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</li>
                <li className="text-gray-600 dark:text-gray-400">Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} ObservanceMédic. Tous droits réservés.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Changer le thème"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PFEPage;