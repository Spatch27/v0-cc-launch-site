import * as prismic from '@prismicio/client'

/**
 * Seed script for adding test articles to Prismic
 * 
 * To use this script:
 * 1. Get your Prismic repository's Write API token from Settings > API & Security
 * 2. Run: PRISMIC_WRITE_TOKEN=your_token npx tsx scripts/seed-prismic.ts
 */

const testArticles = [
  {
    uid: 'freedom-from-operational-drag',
    title: 'Freedom from operational drag',
    excerpt: 'How removing friction unlocks marketing velocity and enables teams to focus on what truly matters.',
    category: "What we're creating",
    publication_date: '2024-02-15',
    read_time: '8 min',
    featured_image: {
      dimensions: { width: 1200, height: 630 },
      alt: 'Abstract visualization of workflow optimization',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop'
    },
    body: [
      {
        type: 'heading2',
        text: 'The Hidden Cost of Operational Drag',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'Most marketing teams spend more time managing work than doing work. The constant context switching, tool sprawl, and approval bottlenecks create an invisible tax on productivity.',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'We call this operational drag—the accumulated friction that slows down marketing velocity and prevents teams from reaching their full potential.',
        spans: []
      },
      {
        type: 'heading2',
        text: 'What Changes When You Remove the Drag',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'When operational friction disappears, marketing teams transform. Decision-making accelerates. Creative energy flows to where it matters. Teams start shipping work that moves the needle.',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'The shift isn\'t just about efficiency—it\'s about unlocking the strategic capacity that gets buried under operational noise.',
        spans: []
      }
    ],
    seo_title: 'Freedom from Operational Drag | Committed Citizens',
    seo_description: 'Discover how removing operational friction transforms marketing teams and unlocks true velocity.'
  },
  {
    uid: 'the-product-team-model',
    title: 'The product team model for marketing',
    excerpt: 'Why marketing should operate like product teams—and how to make the transition.',
    category: "What we're creating",
    publication_date: '2024-01-28',
    read_time: '6 min',
    featured_image: {
      dimensions: { width: 1200, height: 630 },
      alt: 'Team collaboration workspace',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop'
    },
    body: [
      {
        type: 'heading2',
        text: 'From Campaigns to Continuous Delivery',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'Traditional marketing organizes around campaigns—discrete projects with clear start and end dates. But modern marketing demands continuous iteration, experimentation, and optimization.',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'Product teams have solved this problem. They ship value continuously, iterate based on data, and maintain momentum without the stop-start nature of campaigns.',
        spans: []
      },
      {
        type: 'heading2',
        text: 'The Five Principles',
        spans: []
      },
      {
        type: 'paragraph',
        text: '1. Cross-functional by default\n2. Outcome-driven, not output-driven\n3. Iterative over perfect\n4. Data-informed decision making\n5. Sustainable pace over sprints',
        spans: []
      }
    ],
    seo_title: 'Product Team Model for Marketing | Committed Citizens',
    seo_description: 'Learn how applying product team principles transforms marketing operations and drives better outcomes.'
  },
  {
    uid: 'atomic-habits-for-teams',
    title: 'Atomic Habits by James Clear',
    excerpt: 'Essential reading on how small changes compound into remarkable results—applicable to both personal and team transformation.',
    category: "What we're consuming",
    publication_date: '2024-01-10',
    read_time: '4 min',
    featured_image: {
      dimensions: { width: 1200, height: 630 },
      alt: 'Book cover of Atomic Habits',
      url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=630&fit=crop'
    },
    body: [
      {
        type: 'paragraph',
        text: 'James Clear\'s "Atomic Habits" isn\'t just another self-help book—it\'s a practical framework for understanding how systems shape behavior, and how tiny adjustments compound into transformative change.',
        spans: []
      },
      {
        type: 'heading2',
        text: 'Why It Matters for Marketing Teams',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'The principles Clear outlines apply directly to marketing operations. Instead of chasing dramatic overhauls, focus on the 1% improvements in daily workflows, decision-making processes, and team rituals.',
        spans: []
      },
      {
        type: 'paragraph',
        text: 'The compound effect of better habits—better meetings, clearer briefs, tighter feedback loops—creates the foundation for sustained high performance.',
        spans: []
      }
    ],
    seo_title: 'Atomic Habits for Marketing Teams | Committed Citizens',
    seo_description: 'How James Clear\'s Atomic Habits framework applies to building better marketing operations.'
  }
]

async function seedPrismic() {
  const writeToken = process.env.PRISMIC_WRITE_TOKEN
  
  if (!writeToken) {
    console.error('❌ PRISMIC_WRITE_TOKEN environment variable is required')
    console.error('Get your token from: https://cc-launch-site.prismic.io/settings/apps/')
    process.exit(1)
  }

  const writeClient = prismic.createClient('cc-launch-site', {
    accessToken: writeToken
  })

  console.log('🌱 Seeding Prismic with test articles...\n')

  for (const article of testArticles) {
    try {
      console.log(`Creating: ${article.title}`)
      
      // Note: The Prismic Write API uses a different structure than the read API
      // This is a simplified example - you may need to use Prismic's Management API
      // or create documents manually through their UI
      
      console.log(`  UID: ${article.uid}`)
      console.log(`  Category: ${article.category}`)
      console.log(`  Published: ${article.publication_date}`)
      console.log('  ✅ Ready to create\n')
      
    } catch (error) {
      console.error(`  ❌ Error: ${error}`)
    }
  }

  console.log('\n📝 Manual Setup Instructions:')
  console.log('1. Go to https://cc-launch-site.prismic.io')
  console.log('2. Navigate to Custom Types and add the insight_article type from customtypes/insight_article/index.json')
  console.log('3. Create new documents using the test data above')
  console.log('4. Publish each document to make it live')
}

// Run the seed script
seedPrismic().catch(console.error)
