// @ts-nocheck

import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Integration With break_eternity.js',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        eMath.js seamlessly integrates with the break_eternity.js library, 
        providing essential tools for incremental game development.
      </>
    ),
  },
  {
    title: 'Advanced Formatting Capabilities',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        eMath.js offers advanced formatting capabilities, 
        allowing developers to manipulate and present numerical data in a variety of formats. 
        It vastly simplifies the process of displaying and managing numerical data.
      </>
    ),
  },
  {
    title: 'Various Management Classes',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        eMath.js provides dedicated classes for managing boosts, currency, and attributes. 
        These classes offer a structured and organized way to handle these crucial elements in incremental games.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
