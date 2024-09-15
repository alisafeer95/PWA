module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors', {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:4321'], // Add your development origin here
      headers: '*',
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
