const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
          {
              protocol: 'https',
              hostname: 'resource.fdsigaming.com'
          },
          {
            protocol: 'https',
            hostname: 'vedaimg.enjoycx.com'
          },
          {
            protocol: 'https',
            hostname: 'assets.bet4wins.net'
          },
          {
            protocol: 'https',
            hostname: 'evolution.bet4wins.net'
          },
          {
            protocol: 'https',
            hostname: 'evolution.bet4wins.org'
          },
          {
            protocol: 'https',
            hostname: 'hub88.imgix.net'
          }
      ]
  },
  experimental: {
    serverComponentsExternalPackages: ["mysql2"]
  },
  env: {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    AGENT_CODE: process.env.AGENT_CODE,
    AGENT_TOKEN: process.env.AGENT_TOKEN,
    PASSWORD_JWT: process.env.PASSWORD_JWT
  },
  async headers() {
    return [
    {
      source: "/(.*)",
      headers: [
     { key: "Access-Control-Allow-Credentials", value: "false" },
     { key: "Access-Control-Allow-Origin", value: "*" },
     { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X- Api-Version" }
    ]
    }
    ]
  }
}

module.exports = nextConfig
