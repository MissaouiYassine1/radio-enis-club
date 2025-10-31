import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@radioenis.tn',
      description: 'Envoyez-nous un email'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+216 XX XXX XXX',
      description: 'Du lundi au vendredi, 9h-17h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'ENIS, Université de Sfax',
      description: 'Tunisie'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61579754904455', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@ENISONAIIR', label: 'YouTube' },
  ];

  return (
    <>
      <Head>
        <title>Contact - Radio ENIS</title>
        <meta 
          name="description" 
          content="Contactez le club radio de l'ENIS pour toute question, suggestion ou demande de partenariat." 
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
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une question, une suggestion ou envie de rejoindre l'équipe ? 
              N'hésitez pas à nous contacter, nous serons ravis de vous répondre.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informations de contact */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Informations de contact
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Suivez-nous
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Formulaire de contact */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envoyez-nous un message
                </h2>

                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Message envoyé avec succès !
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        Erreur lors de l'envoi
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        Veuillez réessayer ou nous contacter par un autre moyen.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Le nom est requis' })}
                        className="input-field"
                        placeholder="Votre nom complet"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Adresse email invalide'
                          }
                        })}
                        className="input-field"
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      {...register('subject', { required: 'Le sujet est requis' })}
                      className="input-field"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="partnership">Partenariat</option>
                      <option value="technical">Problème technique</option>
                      <option value="join">Rejoindre le club</option>
                      <option value="event">Organisation d'événement</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message', { 
                        required: 'Le message est requis',
                        minLength: {
                          value: 10,
                          message: 'Le message doit contenir au moins 10 caractères'
                        }
                      })}
                      className="input-field resize-vertical"
                      placeholder="Décrivez votre demande en détail..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Bouton d'envoi */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;