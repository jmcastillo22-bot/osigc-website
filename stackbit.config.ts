import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '16',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'Page',
          type: 'page',
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.json',
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              required: true,
              description: 'Page title'
            },
            { 
              name: 'description', 
              type: 'text',
              description: 'Page description for SEO'
            },
            { 
              name: 'content', 
              type: 'markdown',
              description: 'Main page content'
            }
          ]
        },
        {
          name: 'Service',
          type: 'data',
          filePath: 'content/services/{slug}.json',
          fields: [
            { name: 'name', type: 'string', required: true },
            { name: 'description', type: 'markdown' },
            { name: 'icon', type: 'image' }
          ]
        }
      ]
    })
  ]
});
