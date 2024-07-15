import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

const TimelineEntry = ({ date, imageUrl, imageAlt, title, subheader, subtitle, bullets, positions }) => (
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
                <a href={imageUrl}>
                    <img className="image_thumbnail" src={imageUrl} alt={imageAlt} />
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
            date: "Sept 2023-<br>Present",
            imageUrl: "/about/litt_lab_thumbnail.webp",
            imageAlt: "Litt Lab thumbnail",
            title: "Research Specialist",
            subheader: "Litt Lab, University of Pennsylvania",
            subtitle: "Center for Neuroengineering and Therapeutics",
            bullets: ["Translational neuroengineering research for epilepsy patient care under Brian Litt, MD.<br><br>"]
        },
        {
            date: "June 2023-<br>March 2024",
            imageUrl: "/about/sociail_thumbnail.webp",
            imageAlt: "Sociail thumbnail",
            title: "Co-Founder, Technology Lead",
            subheader: "Sociail",
            bullets: ["Part of the executive leadership team focused on bringing together the best of human and AI collaboration.<br>"]
        },
        {
            date: "Dec 2021-<br>Sept 2023",
            imageUrl: "/about/ayaz_lab_thumbnail.webp",
            imageAlt: "Ayaz Lab thumbnail",
            title: "Research Assistant",
            subheader: "Neuroergonomics and Neuroengineering Lab, Drexel University",
            subtitle: "Cognitive Neuroengineering and Quantitative Experimental Research (CONQUER) Collaborative",
            bullets: [
                "<b>Thesis:</b> 'Evaluation of Cognitive Function using Time - Domain Optical Neuroimaging'<br>",
                "— Designed and implemented a comprehensive cognitive study time-synchronized with TD-fNIRS data acquisition<br>",
                "— Developed neuroimaging data processing, visualization, and analysis tools for TD-fNIRS<br>",
                "— Enrolled and recorded behavioral, physiological, and neuroimaging data from 15 participants<br>",
                "— Evaluated the neural correlates of cognitive function across a battery of eight cognitive tasks<br><br>"
            ]
        },
        {
            date: "June 2020-<br>June 2023",
            imageUrl: "/about/moberg_analytics_thumbnail.webp",
            imageAlt: "Moberg Analytics thumbnail",
            positions: [
                {
                    title: "Lead Engineer",
                    subheader: "Moberg Analytics <span style=\"font-size: 18px; font-style: italic;\">(March 2022 - June 2023)</span>",
                    bullets: [
                        "— Managed a collaboration to create contextual neuro-ICU sensors and a data aggregation system<br>",
                        "— Led the development of a medical device for validating intracranial pressure recordings from conception through clinical trials<br>",
                        "— Created an evaluation framework and assessed medical devices for performance in Prolonged Casualty Care"
                    ]
                },
                {
                    title: "Software Engineer",
                    subheader: "Moberg Analytics <span style=\"font-size: 18px; font-style: italic;\">(June 2020 - March 2022)</span>",
                    bullets: [
                        "— Developed a cloud-based platform for neurophysiological data harmonization, visualization, and analytics<br>",
                        "— Established a common data format for a 1+ TB neurocritical care patient data repository<br>",
                        "— Published an open-source Python package to aid researchers and developers working with HDF5 files"
                    ]
                }
            ]
        },
        {
            date: "Sept 2019-<br>March 2020",
            imageUrl: "/about/intact_vascular_thumbnail.webp",
            imageAlt: "Intact Vascular thumbnail",
            title: "Product Research & Development Engineer",
            subheader: "Intact Vascular",
            bullets: [
                "— Performed product verification and validation activities for a novel stent-delivery system<br>",
                "— Completed CAD designs and requirement testing<br>",
                "— Improved UX aspects of the device and optimized the manufacturing assembly process<br><br>"
            ]
        },
        {
            date: "Sept 2018-<br>June 2023",
            imageUrl: "/about/drexel_thumbnail.webp",
            imageAlt: "Drexel University thumbnail",
            title: "Biomedical Engineering Graduate",
            subheader: "Drexel University",
            subtitle: "School of Biomedical Engineering, Science and Health Systems + Pennoni Honors College",
            bullets: [
                "— BS in Biomedical Engineering <code class=\"tag_style tag_style_numeric\">GPA 3.85</code><br>",
                "— MS in Biomedical Engineering <code class=\"tag_style tag_style_numeric\">GPA 4.00</code><br>",
                "— Neuroengineering concentration + neuroscience minor<br>",
                "— Graduated with Honors from the Pennoni Honors College<br>",
                "— BIOMED student advisory board + student ambassador<br>"
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
                    I am an engineer and scientist doing research at the intersection of artificial intelligence and
                    neurotechnology.
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
                        <div className="flex_container">
                            <div id="left" className="box">
                                <a href="https://cnt.upenn.edu/">
                                    <img src="/about/cnt.webp" alt="Center for Neuroengineering and Therapeutics image" width="333" height="80" />
                                </a>
                            </div>
                            <div id="middle" className="box">
                                <a href="https://littlab.seas.upenn.edu/">
                                    <img src="/about/littlab.webp" alt="Litt Lab image" width="278" height="80" />
                                </a>
                            </div>
                        </div>
                    </div>
                </Section>
                <br />
                <Section title="Certifications">
                    <div>
                        <h4 className="header about_header">Biomedical Research</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            CITI Program <span style={{ fontSize: '18px' }}>(Sept 2023 - N/A)</span>
                        </p>
                        <a className="check_it_out" href="https://www.citiprogram.org/verify/?w05306b68-a365-4ec3-ba07-d8522b3b0dfd-58123920">Check it out!</a>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Good Clinical Practice</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            CITI Program <span style={{ fontSize: '18px' }}>(Sept 2023 - Sept 2026)</span>
                        </p>
                        <a className="check_it_out" href="https://www.citiprogram.org/verify/?w4c47456a-6a05-400a-b30c-adee6ec9d829-58147870">Check it out!</a>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Human Subjects Research - Social Behavioral</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            CITI Program <span style={{ fontSize: '18px' }}>(Feb 2022 - Feb 2025)</span>
                        </p>
                        <a className="check_it_out" href="https://www.citiprogram.org/verify/?w098eae68-b03c-4ce7-b76a-cafb17f52784-47523437">Check it out!</a>
                    </div>
                </Section>
                <br />
                <Section title="Tutoring and Mentorship">
                    <div>
                        <h4 className="header about_header">Physics Tutor - Electricity & Magnetism</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Private <span style={{ fontSize: '18px' }}>(March 2023 - June 2023)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Peer Mentor - Brain Technology Convergence</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University BMES T580 <span style={{ fontSize: '18px' }}>(Sept 2022 - Dec 2022)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Peer Mentor - Medical Technology Innovation</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University BMES 585 <span style={{ fontSize: '18px' }}>(Jan 2021 - March 2021)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">Physics Tutor - Newtonian Mechanics</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel Center for Learning and Academic Success <span style={{ fontSize: '18px' }}>(April 2020 - March 2021)</span>
                        </p>
                    </div>
                </Section>
                <br />
                <Section title="Volunteering">
                    <div>
                        <h4 className="header about_header">Event Manager, Philadelphia</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Pint of Science US <span style={{ fontSize: '18px' }}>(May 2024)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">BIOMED Student Advisory Board</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University School of Biomedical Engineering, Science and Health Systems <span style={{ fontSize: '18px' }}>(Aug 2022 - June 2023)</span>
                        </p>
                    </div>
                    <br />
                    <div>
                        <h4 className="header about_header">BIOMED Student Ambassador</h4>
                        <p className="timeline_subtitle" style={{ paddingBottom: '0px' }}>
                            Drexel University School of Biomedical Engineering, Science and Health Systems <span style={{ fontSize: '18px' }}>(April 2022 - June 2023)</span>
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