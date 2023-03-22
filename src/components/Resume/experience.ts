class Experience {
  title: string;
  company: string;
  start: {
    text: string;
    value: string;
  };
  end: {
    text: string;
    value: string;
  };
  items: string[];
  constructor({
    title,
    company,
    start,
    end,
    items,
  }: {
    title: string;
    company: string;
    start: {
      text: string;
      value: string;
    };
    end: {
      text: string;
      value: string;
    };
    items: string[];
  }) {
    this.title = title;
    this.company = company;
    this.start = start;
    this.end = end;
    this.items = items;
  }
}

export type { Experience };

// @ts-expect-error reference for easy copy / paste
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars
const defaultExperience = {
  title: '',
  company: '',
  start: {
    text: '',
    value: '',
  },
  end: {
    text: '',
    value: '',
  },
  items: [],
};

const absci = new Experience({
  title: 'Full Stack Software Engineer',
  company: 'Absci',
  start: {
    text: 'January 2021',
    value: '2021-01',
  },
  end: {
    text: 'Present',
    value: '12:00',
  },
  items: [
    'Creator and core maintainer of core application development platform',
    'Build, deploy, and operate back end services using REST and WebSockets',
    'Prototype and deliver applications for data scientists, executive leaders, and individual contributors',
    'Mentor team members to deliver performant and scalable web applications',
    'Establish testing tools and standards for UI and back end services',
  ],
});

const denovium = new Experience({
  title: 'UI & Data Visualization Software Engineer',
  company: 'Absci',
  start: {
    text: 'January 2021',
    value: '2021-01',
  },
  end: {
    text: 'Present',
    value: '12:00',
  },
  items: [
    'Creator and core maintainer of core application development platform',
    'Build, deploy, and operate back end services using REST and WebSockets',
    'Prototype and deliver applications for data scientists, executive leaders, and individual contributors',
    'Mentor team members to deliver performant and scalable web applications',
    'Establish testing tools and standards for UI and back end services',
  ],
});

const esri = new Experience({
  title: 'Data Visualization Engineer',
  company: 'Esri',
  start: {
    text: 'November 2016',
    value: '2016-11',
  },
  end: {
    text: '2020-07',
    value: 'July 2020',
  },
  items: [
    "Led JavaScript app development for key corporate activities using Esri's JavaScript API",
    'Built and scaled interactive mapping applications to enable interactive exploration and analysis of complex spatial data',
    'Consulted media partners on data visualization and development best practices',
    'Collaborated with software product teams to drive product adoption and identify user needs',
    'Established and grew strategic relationships with influential media publishers',
  ],
});

export const experiences = [absci, denovium, esri];
