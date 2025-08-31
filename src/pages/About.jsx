import React from 'react';
import PropTypes from 'prop-types';
import useSmoothScroll from '../hooks/useSmoothScroll';

const TimelineEntry = ({ date, imagePath, imageUrl, imageAlt, title, subheader, subtitle, bullets, positions }) => (
    <div className="timeline_entry item_container">
        <div className="timeline_left">
            <div className="timeline_date timeline_date_right">
                {date.split('<br>').map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {index < date.split('<br>').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
            <br />
            <div className="timeline_image">
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img className="image_thumbnail" src={imagePath} alt={imageAlt} />
                </a>
            </div>
        </div>
        <div className="timeline_middle"></div>
        <div className="timeline_right">
            {positions ? (
                positions.map((position, posIndex) => (
                    <React.Fragment key={posIndex}>
                        <h2 className="timeline_title">{position.title}</h2>
                        <p className="timeline_subheader" dangerouslySetInnerHTML={{ __html: position.subheader }} />
                        {position.subtitle && <p className="timeline_subtitle">{position.subtitle}</p>}
                        {position.bullets.map((bullet, index) => (
                            <p key={index} className="timeline_bullet" dangerouslySetInnerHTML={{ __html: bullet }} />
                        ))}
                        {posIndex < positions.length - 1 && <br />}
                    </React.Fragment>
                ))
            ) : (
                <>
                    <h2 className="timeline_title">{title}</h2>
                    <p className="timeline_subheader" dangerouslySetInnerHTML={{ __html: subheader }} />
                    {subtitle && <p className="timeline_subtitle">{subtitle}</p>}
                    {bullets.map((bullet, index) => (
                        <p key={index} className="timeline_bullet" dangerouslySetInnerHTML={{ __html: bullet }} />
                    ))}
                </>
            )}
        </div>
    </div>
);

const Section = ({ title, children }) => (
    <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--white_color)', marginBottom: '15px' }}><u>{title}</u></h3>
        <div className="item_container">
            {children}
        </div>
    </div>
);

function About() {
    useSmoothScroll();

    const timelineEntries = [
        {
            date: "Sept 2025-<br>Present",
            imagePath: "/about/pennhealthtech_thumbnail.webp",
            imageUrl: "https://healthtech.upenn.edu/",
            imageAlt: "Penn Health-Tech thumbnail",
            title: "Student Fellow",
            subheader: "Penn Health-Tech, University of Pennsylvania",
            bullets: ["Penn Health-Tech is a university-wide effort to advance Penn's world-class breakthroughs into devices and health technologies."]
        },
        {
            date: "Aug 2024-<br>Present",
            imagePath: "/about/penn_thumbnail.webp",
            imageUrl: "https://be.seas.upenn.edu/",
            imageAlt: "Penn thumbnail",
            title: "Bioengineering PhD Candidate",
            subheader: "University of Pennsylvania",
            subtitle: "School of Engineering and Applied Science",
            bullets: ["Litt Lab under Brian Litt, MD.", "Ashton Fellow."]
        },
        {
            date: "June 2023-<br>Present",
            imagePath: "/about/sociail_thumbnail.webp",
            imageUrl: "https://www.sociail.com/",
            imageAlt: "Sociail thumbnail",
            positions: [
                {
                    title: "Advisor",
                    subheader: "Sociail <span style=\"font-size: 18px; font-style: italic;\">(March 2024 - Present)</span>",
                    bullets: []
                },
                {
                    title: "Co-Founder, Technology Lead",
                    subheader: "Sociail <span style=\"font-size: 18px; font-style: italic;\">(June 2023 - March 2024)</span>",
                    bullets: [
                        "— Led a multinational software development team building our collaborative AI platform, Sociail Chat<br>",
                        "— Conducted co-founder responsibilities around building the company itself, including interviewing and onboarding team members, establishing our culture, and creating the 'operating system' of Sociail"
                    ]
                }
            ]
        },
        {
            date: "Sept 2024-<br>Sept 2025",
            imagePath: "/about/nucleate_thumbnail.webp",
            imageUrl: "https://www.nucleate.xyz/",
            imageAlt: "Nucleate thumbnail",
            title: "Co-Director, Mentorships",
            subheader: "Nucleate Philadelphia",
            bullets: ["Nucleate is a student-led, non-profit organization that empowers the next generation of biotech leaders by educating today's academic trainees."]
        },
        {
            date: "Sept 2023-<br>Aug 2024",
            imagePath: "/about/litt_lab_thumbnail.webp",
            imageUrl: "https://littlab.seas.upenn.edu/",
            imageAlt: "Litt Lab thumbnail",
            title: "Research Specialist",
            subheader: "Litt Lab, University of Pennsylvania",
            subtitle: "Center for Neuroengineering and Therapeutics",
            bullets: ["Translational neuroengineering research for epilepsy patient care.<br><br>"]
        },
        {
            date: "Dec 2021-<br>Sept 2023",
            imagePath: "/about/ayaz_lab_thumbnail.webp",
            imageUrl: "https://ayazlab.com/",
            imageAlt: "Ayaz Lab thumbnail",
            title: "Research Assistant",
            subheader: "Neuroergonomics and Neuroengineering Lab, Drexel University",
            subtitle: "Cognitive Neuroengineering and Quantitative Experimental Research (CONQUER) Collaborative",
            bullets: [
                "<b>Thesis:</b> 'Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging' under Dr. Hasan Ayaz<br>",
                "— Designed and implemented a comprehensive cognitive study time-synchronized with TD-fNIRS data acquisition<br>",
                "— Developed neuroimaging data processing, visualization, and analysis tools for TD-fNIRS<br>",
                "— Enrolled and recorded behavioral, physiological, and neuroimaging data from 15 participants<br>",
                "— Evaluated the neural correlates of cognitive function across a battery of eight cognitive tasks"
            ]
        },
        {
            date: "June 2020-<br>June 2023",
            imagePath: "/about/moberg_analytics_thumbnail.webp",
            imageUrl: "https://moberganalytics.com/",
            imageAlt: "Moberg Analytics thumbnail",
            positions: [
                {
                    title: "Lead Engineer",
                    subheader: "Moberg Analytics <span style=\"font-size: 18px; font-style: italic;\">(March 2022 - June 2023)</span>",
                    bullets: [
                        "— Led the development of a medical device for validating intracranial pressure recordings from conception through clinical trials at UT Southwestern Medical Center<br>",
                        "— Managed a project to create contextual neuro-ICU sensors and a data aggregation system in collaboration with Drexel University<br>",
                        "— Created an evaluation framework and assessed medical devices for performance in Prolonged Casualty Care"
                    ]
                },
                {
                    title: "Software Engineer",
                    subheader: "Moberg Analytics <span style=\"font-size: 18px; font-style: italic;\">(June 2020 - March 2022)</span>",
                    bullets: [
                        "— Developed a cloud-based platform for neurophysiological data harmonization, visualization, and analytics<br>",
                        "— Established a common data format for a large-scale neurocritical care patient data repository<br>",
                        "— Published an open-source Python package to aid researchers and developers working with HDF5 files"
                    ]
                }
            ]
        },
        {
            date: "Sept 2019-<br>March 2020",
            imagePath: "/about/intact_vascular_thumbnail.webp",
            imageUrl: "https://www.linkedin.com/company/intactvascular/",
            imageAlt: "Intact Vascular thumbnail",
            title: "Product Research & Development Engineer",
            subheader: "Intact Vascular",
            bullets: [
                "— Performed product verification and validation activities for a novel stent-delivery system<br>",
                "— Completed CAD designs and requirement testing<br>",
                "— Improved UX aspects of the device and optimized the manufacturing assembly process"
            ]
        },
        {
            date: "Sept 2018-<br>June 2023",
            imagePath: "/about/drexel_thumbnail.webp",
            imageUrl: "https://drexel.edu/biomed/",
            imageAlt: "Drexel University thumbnail",
            title: "Biomedical Engineering Graduate",
            subheader: "Drexel University",
            subtitle: "School of Biomedical Engineering, Science and Health Systems + Pennoni Honors College",
            bullets: [
                "— BS in Biomedical Engineering <code class=\"tag_style tag_style_numeric\">GPA 3.85</code><br>",
                "— MS in Biomedical Engineering <code class=\"tag_style tag_style_numeric\">GPA 4.00</code><br>",
                "— Neuroengineering concentration + Neuroscience minor<br>",
                "— Graduated with Honors from the Pennoni Honors College<br>",
            ]
        }
    ];

    return (
        <div>
            <div className="about_container">
                <div className="about_image"></div>
                <img
                    style={{ width: '200px', height: '200px', border: '2px solid var(--white_color)' }}
                    src="/about/zack_profile_pic.webp"
                    alt="Zack Goldblum profile picture"
                />
                <div className="about_text item_container">
                    I am an engineer and scientist doing research at the intersection of neurotechnology and artificial intelligence.
                </div>
            </div>
            <br />
            <div className="timeline">
                {timelineEntries.map((entry, index) => (
                    <TimelineEntry key={index} {...entry} />
                ))}
            </div>
            <div>
                <br />
                <Section title="Current Affiliations">
                    <div id="affiliations_container">
                        <div id="left" className="box">
                            <a href="https://seas.upenn.edu/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/penn_engineering.webp" alt="Penn Engineering image" width="210" height="80" />
                            </a>
                        </div>
                        <div id="middle" className="box">
                            <a href="https://cnt.upenn.edu/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/cnt.webp" alt="Center for Neuroengineering and Therapeutics image" width="333" height="80" />
                            </a>
                        </div>
                        <div id="right" className="box">
                            <a href="https://sociail.com/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/sociail.webp" alt="Sociail image" width="144" height="80" />
                            </a>
                        </div>
                        <div id="right" className="box">
                            <a href="https://littlab.seas.upenn.edu/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/littlab.webp" alt="Litt Lab image" width="278" height="80" />
                            </a>
                        </div>
                        <div id="left" className="box">
                            <a href="https://healthtech.upenn.edu/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/pennhealthtech.webp" alt="Penn Health-Tech image" width="486" height="80" />
                            </a>
                        </div>
                        <div id="middle" className="box">
                            <a href="https://drexel.edu/biomed/resources/alumni/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/dban.webp" alt="Drexel Biomed Alumni Network image" width="250" height="80" />
                            </a>
                        </div>
                        <div id="right" className="box">
                            <a href="https://pintofscience.com/" target="_blank" rel="noopener noreferrer">
                                <img src="/about/pint_of_science.webp" alt="Pint of Science image" width="250" height="80" />
                            </a>
                        </div>
                    </div>
                </Section>
                <br />
                <Section title="Teaching and Mentorship">
                    <div>
                        <h4 className="header about_header">Co-Head TA — Brain-Computer Interfaces</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            University of Pennsylvania BE 5210 <span style={{ fontSize: '18px' }}>(Jan 2024 - Present)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Physics Tutor — Electricity & Magnetism</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Private <span style={{ fontSize: '18px' }}>(March 2023 - June 2023)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Peer Mentor — Brain Technology Convergence</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University BMES T580 <span style={{ fontSize: '18px' }}>(Sept 2022 - Dec 2022)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Peer Mentor — Medical Technology Innovation</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University BMES 585 <span style={{ fontSize: '18px' }}>(Jan 2021 - March 2021)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Physics Tutor — Newtonian Mechanics</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel Center for Learning and Academic Success <span style={{ fontSize: '18px' }}>(April 2020 - March 2021)</span>
                        </p>
                    </div>
                </Section>
                <br />
                <Section title="Volunteering">
                    <div>
                        <h4 className="header about_header">Alumni Board</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel BIOMED Alumni Network <span style={{ fontSize: '18px' }}>(July 2024 - Present)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Event Manager, Philadelphia</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Pint of Science US <span style={{ fontSize: '18px' }}>(May 2024 - Present)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Peer Reviewer</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                        PeerJ Computer Science <span style={{ fontSize: '18px' }}>(2025)</span>, Epilepsia Open <span style={{ fontSize: '18px' }}>(2024 - 2025)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Student Advisory Board</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University School of Biomedical Engineering, Science and Health Systems <span style={{ fontSize: '18px' }}>(Aug 2022 - June 2023)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Student Ambassador</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University School of Biomedical Engineering, Science and Health Systems <span style={{ fontSize: '18px' }}>(April 2022 - June 2023)</span>
                        </p>
                    </div>
                </Section>
                <br />
                <Section title="Impactful Courses">
                <div>
                        <h4 className="header about_header">Clinical Research Informatics in the Cloud</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Joost Wagenaar, University of Pennsylvania, 2025
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Applied Medical Innovation</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Katie Reuther, University of Pennsylvania, 2024
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Brain-Computer Interfaces</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px', }}>
                            Dr. Brian Litt, University of Pennsylvania, 2024
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Brain-Computer Interface Lab</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Jaimie Dougherty, Drexel University, 2023
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Neuroengineering I and II</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Catherine von Reyn, Drexel University, 2022
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Medical Technology Innovation</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Banu Onaral, Drexel University, 2022
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Brain Technology Convergence</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Banu Onaral, Drexel University, 2022
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Neural Networks</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Hualou Liang, Drexel University, 2021
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Biomedical Signal Processing</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Dr. Kurtulus Izzetoglu, Drexel University, 2021
                        </p>
                    </div>
                </Section>
            </div>
            <div style={{ textAlign: 'center' }}>
                <a className="back_to_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href="#">
                    <p className="item_container" style={{ maxWidth: '20%' }}> Back to top ▲</p>
                </a>
            </div>
        </div>
    );
}

export default About;

TimelineEntry.propTypes = {
    date: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    title: PropTypes.string,
    subheader: PropTypes.string,
    subtitle: PropTypes.string,
    bullets: PropTypes.arrayOf(PropTypes.string),
    positions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        subheader: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        bullets: PropTypes.arrayOf(PropTypes.string).isRequired
    }))
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};