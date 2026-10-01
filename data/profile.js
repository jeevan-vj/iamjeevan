// One sentence, or null when there is nothing to announce.
const availability = null

const hero = {
  title: 'I build software that stays easy to change.',
  lede:
    'Technical lead in Auckland. I design systems and write the code, on Azure, .NET, Node, Java, Python and React.',
}

const about = {
  home: 'I lead technical work in Auckland. Most of it is solution design, and the parts of a system that are painful to change later.',
  page: 'I am a technical lead at Datacom in Auckland. I have spent a bit over ten years designing systems and writing the code, including stretches at Kinesso and Sitecore. I care about software the next person can change without a rewrite.',
  stack: 'Azure, .NET, Node, Java, Python, React',
}

const contact = {
  email: 'Jeevan90wijerathna@gmail.com',
}

const experience = [
  {
    role: 'Technical lead',
    organisation: 'Datacom',
    years: '2023–Present',
    outcome:
      'Designed customer platforms on Azure, including a gas ordering system and an AI-assisted support workflow.',
  },
  {
    role: 'Senior software engineer',
    organisation: 'Kinesso',
    years: '2020–2022',
    outcome: 'Replaced manual analytics releases with automated pipelines and a shared ETL platform.',
  },
  {
    role: 'Software engineer',
    organisation: 'Sitecore',
    years: '2017–2020',
    outcome: 'Shipped Azure Marketplace deployment, blob storage, and CDN modules for the CMS.',
  },
  {
    role: 'Software engineer',
    organisation: 'CMS',
    years: '2015–2017',
    outcome: 'Delivered a B2B commerce platform for a European office supplier.',
  },
  {
    role: 'Software engineer',
    organisation: 'Bileeta',
    years: '2013–2014',
    outcome: 'Built reporting and dashboard services for a cloud ERP.',
  },
]

module.exports = { availability, hero, about, contact, experience }
