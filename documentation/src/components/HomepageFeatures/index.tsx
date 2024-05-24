/**
 * @file Declares the HomepageFeatures component.
 */
import React from "react";
// import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

/**
 * An interface representing a feature item.
 */
interface FeatureItem {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<"svg">>;
    description: JSX.Element;
}

/**
 * A list of feature items.
 */
const FeatureList: FeatureItem[] = [
    {
        title: "Integration With break_eternity.js",
        // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                eMath.js is built on top of break_eternity.js, a library for handling large numbers.
            </>
        ),
    },
    {
        title: "TypeScript Support",
        // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                eMath.js is written in TypeScript, providing type safety and intellisense in editors that support it.
                It also exports type definitions for use in your own projects.
            </>
        ),
    },
    {
        title: "Various Management Classes",
        // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                eMath.js provides various classes for managing currencies, upgrades purchasing, data saving, and more.
            </>
        ),
    },
];

type FeatureProps = FeatureItem

/**
 * @param props FeatureProps
 * @returns Feature
 */
const Feature: React.FC<FeatureProps> = (props) => {
    const { Svg, title, description } = props;
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                {Svg && <Svg className={styles.featureSvg} role="img" />}
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

/**
 * @returns HomepageFeatures
 */
const HomepageFeatures: React.FC = () => {
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
};

export default HomepageFeatures;
