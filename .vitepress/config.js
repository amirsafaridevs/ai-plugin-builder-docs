export default {
  title: 'AI Plugin Builder',
  description: 'Complete documentation for AI Plugin Builder - Build WordPress plugins with AI',
  
  themeConfig: {
     nav: [
       { text: 'Home', link: '/guide/getting-started' },
       { text: 'Documentation', link: '/guide/introduction' },
       { text: 'Examples', link: '/guide/advanced-examples' },
       { text: 'FAQ', link: '/guide/faq' }
     ],
    
     sidebar: [
       {
         text: 'Getting Started',
         items: [
           { text: 'Introduction', link: '/guide/introduction' },
           { text: 'Getting Started', link: '/guide/getting-started' }
         ]
       },
       {
         text: 'Guides',
         items: [
           { text: 'System Architecture', link: '/guide/architecture' },
           { text: 'Chat Interface', link: '/guide/chat-interface' },
           { text: 'Plugin Generation', link: '/guide/plugin-generation' },
           { text: 'Installation & Management', link: '/guide/installation-management' }
         ]
       },
       {
         text: 'Development',
         items: [
           { text: 'API & Development', link: '/guide/api-development' },
           { text: 'Security', link: '/guide/security' },
           { text: 'Configuration', link: '/guide/configuration' }
         ]
       },
       {
         text: 'Support',
         items: [
           { text: 'Troubleshooting', link: '/guide/troubleshooting' },
           { text: 'Advanced Examples', link: '/guide/advanced-examples' },
           { text: 'FAQ', link: '/guide/faq' }
         ]
       }
     ],
    
    search: {
      provider: 'local'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
     footer: {
       message: 'Built with ❤️ for the WordPress community',
       copyright: 'Copyright © 2024 AI Plugin Builder'
     },
    
     docFooter: {
       prev: 'Previous page',
       next: 'Next page'
     },
    
     outline: {
       label: 'Table of Contents'
     },
    
     lastUpdated: {
       text: 'Last updated',
       formatOptions: {
         dateStyle: 'short',
         timeStyle: 'medium'
       }
     },
    
     lang: 'en-US',
     dir: 'ltr'
  }
}

