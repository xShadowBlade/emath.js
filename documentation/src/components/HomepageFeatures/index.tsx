/**
 * @file Declares the HomepageFeatures component.
 */
import React from "react";
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<"svg">>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: "Integration With break_eternity.js",
        // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                eMath.js seamlessly integrates with the break_eternity.js library,
                providing essential tools for incremental game development.
            </>
        ),
    },
    {
        title: "Advanced Formatting Capabilities",
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
        title: "Various Management Classes",
        // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                eMath.js provides dedicated classes for managing boosts, currency, and attributes.
                These classes offer a structured and organized way to handle these crucial elements in incremental games.
            </>
        ),
    },
];

interface FeatureProps extends FeatureItem {}
/**
 * @param props FeatureProps
 * @returns Feature
 */
function Feature (props: FeatureProps) {
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
}

/**
 * @returns HomepageFeatures
 */
function HomepageFeatures () {
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

export default HomepageFeatures;