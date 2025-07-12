import PropTypes from 'prop-types';
import useSmoothScroll from '../hooks/useSmoothScroll';

const ResearchSection = ({ year, items }) => (
    <>
        <h3><br /><u>{year}</u></h3>
        {items.map((item, index) => (
            <div key={index} className="item_container" style={{ marginBottom: '20px' }}>
                <code className="tag_style" style={{ background: `var(--${item.tagColor}_color)` }}>{item.tag}</code>
                <br></br>
                <h4 className="header header_margin research-title" style={{ margin: 0 }}>{item.title}</h4>
                <p className="paragraph" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
        ))}
    </>
);

function Research() {
    useSmoothScroll();

    const researchData = {
        "2025-2026": [
            {
                tag: "Talk",
                tagColor: "blue",
                title: "Turning Continuous Data into Actionable Epilepsy Care: Devices, Platforms, and Applications",
                content: '<b>Goldblum Z</b>. <em>Computational Neuroscience Meeting</em>. Florence, IT. July 5-9, 2025.'
            },
            {
                tag: "Talk",
                tagColor: "blue",
                title: "Harnessing Epilepsy Databases for Translational Science",
                content: 'Sinha N, <b>Goldblum Z</b>. <em>International Conference for Technology and Analysis of Seizures</em>. Montreal, QC. June 2-6, 2025.'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Bridging Patient Experience and Clinical Data: An LLM-Powered Chat Interface with Real-Time EEG Metrics",
                content: '<b>Goldblum Z</b>, Shi H, Novakov V, Litt B. <em>International Conference for Technology and Analysis of Seizures</em>. Montreal, QC. June 2-6, 2025.<br><a class="check_it_out" href="/research/goldblum_ictals_2025.pdf">Check it out!</a>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Scalable Multicenter Normative IEEG Atlas: Harnessing Epilepsy Databases for Translational Science",
                content: 'Liang K*, <b>Goldblum Z</b>*, Okalova T, Davis K, Litt B, Wagenaar J, Sinha N. <em>International Conference for Technology and Analysis of Seizures</em>. Montreal, QC. June 2-6, 2025.<br><i>Selected for oral presentation</i><br><i>*These authors contributed equally to this work</i><br><a class="check_it_out" href="/research/liang_ictals_2025.pdf">Check it out!</a>'
            }
        ],
        "2024-2025": [
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Pennsieve: A Collaborative Platform for Translational Neuroscience and Beyond",
                content: '<b>Goldblum Z</b>, Xu Z, Shi H, Orzechowski P, Spence J, Davis K A, Litt B, Sinha N, Wagenaar J. <em>INCF Assembly</em>. Austin, TX. September 23-25, 2024.<br><a class="check_it_out" href="/research/goldblum_pennsieve_INCF_2024.pdf">Check it out!</a>'
            },
            {
                tag: "Pre-print",
                tagColor: "light_purple",
                title: "Pennsieve: A Collaborative Platform for Translational Neuroscience and Beyond",
                content: '<b>Goldblum Z</b>, Xu Z, Shi H, Orzechowski P, Spence J, Davis K A, Litt B, Sinha N, Wagenaar J. <em>arXiv</em>. September 16, 2024. DOI: 10.48550/arXiv.2409.10509.<br><a class="check_it_out" href="https://arxiv.org/abs/2409.10509" target="_blank" rel="noopener noreferrer">Check it out!</a>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Implementing a Large Language Model Chat Interface for Epilepsy Patient Care",
                content: '<b>Goldblum Z</b>, Litt B. <em>Artificial Intelligence in Epilepsy and Neurological Disorders</em>. Park City, UT. April 1-4, 2024.<br><a class="check_it_out" href="/research/goldblum_ai_in_epilepsy_2024.pdf">Check it out!</a>'
            }
        ],
        "2023-2024": [
            {
                tag: "Publication",
                tagColor: "green",
                title: "A Novel External Ventricular Drain Sensor to Improve Acquired Brain Injury Monitoring",
                content: '<b>Goldblum Z</b>, Gruen V, Olson DM, Kanter G, Moberg D. <em>Military Medicine</em>, Volume 188, Issue Supplement_6, November/December 2023, Pages 334-339. DOI: 10.1093/milmed/usad136.<br><a class="check_it_out" href="https://doi.org/10.1093/milmed/usad136" target="_blank" rel="noopener noreferrer">Check it out!</a>'
            },
            {
                tag: "Thesis",
                tagColor: "red",
                title: "Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging",
                content: '<b>Goldblum Z</b>. <em>Master\'s Thesis, Drexel University</em>. June, 2023. DOI: 10.17918/00001784.<br><a class="check_it_out" href="https://doi.org/10.17918/00001784" target="_blank" rel="noopener noreferrer">Check it out!</a>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Assessing the Clinical Value and Deployability of TBI Monitoring Technology for Prolonged Casualty Care",
                content: 'Gomba MA, Keenan S, Moberg D, Moyer EJ, Grym G, <b>Goldblum Z</b>, Kenny K, Gruen V, Willner M. <em>Special Operations Medical Assembly</em>. Raleigh, NC. May 16, 20-23, 2023.'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Improving Neurocritical Care Monitoring with Contextual Data Sensors",
                content: 'Ruxmohan S, <b>Goldblum Z</b>, Marshall J, Nairon E, Measho D, Moberg D, Olson DM. <em>Graduate Medical Education: Neurology Research Day Conference</em>. Dallas, TX. May 11, 2023.'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Enhancing Neurocritical Care Through Multimodal Monitoring with Novel Contextual Sensors",
                content: 'Zwiebel I, Gruen V, Jose J, Wheeler K, <b>Goldblum Z</b>, Gomba MA, Moyer EJ, Moberg D. <em>Northeast Bioengineering Conference</em>. Philadelphia, PA. March 31, 2023.<br><a class="check_it_out" href="/research/senior_design_NEBEC_2023.pdf">Check it out!</a>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging",
                content: '<b>Goldblum Z</b>, Alshehri S, Curtin A, Ayaz H. <em>Northeast Bioengineering Conference</em>. Philadelphia, PA. March 30, 2023.<br><a class="check_it_out" href="/research/goldblum_NEBEC_2023.pdf">Check it out!</a>'
            }
        ],
        "2022-2023": [
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Using Contextual Data to Enhance Machine Learning in Traumatic Brain Injury: Progress from the MIND Workgroup",
                content: '<b>Goldblum Z</b>, Olson DM, Rosenthal ES, Foreman B, Moberg D. <em>Military Health System Research Symposium</em>. Kissimmee, FL. September 12, 2022.<br><a class="check_it_out" href="/research/goldblum_MHSRS_2022.pdf">Check it out!</a>'
            }
        ],
        "2021-2022": [
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Using Contextual Data to Enhance Machine Learning in Traumatic Brain Injury",
                content: '<b>Goldblum Z</b>, Olson DM, Rosenthal ES, Foreman B, Moberg D. <em>Neurocritical Care Society 19th Annual Meeting</em>. Chicago, IL. October 27, 2021.<br><i>Voted as a Poster of Distinction</i><br><a class="check_it_out" href="/research/goldblum_NCS_2021.pdf">Check it out!</a>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "Development and Validation of an Open-Source Optimum Cerebral Perfusion Pressure Tool to Guide Precision Care in Severe Traumatic Brain Injury",
                content: 'Foreman B, Li F, Rosenthal ES, Maddux C, Habboush D, <b>Goldblum Z</b>, Moberg D. <em>Neurocritical Care Society 19th Annual Meeting</em>. Chicago, IL. October 27, 2021.<br><i>Voted as a Poster of Distinction</i>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "A Robust Data Archive Format for Traumatic Brain Injury Physiology and Machine Learning",
                content: 'Habboush D, Rosenthal ES, Foreman B, <b>Goldblum Z</b>, Smielewski P, Moberg D. <em>Neurocritical Care Society 19th Annual Meeting</em>. Chicago, IL. October 27, 2021.<br><i>Voted as a Poster of Distinction</i>'
            },
            {
                tag: "Poster",
                tagColor: "orange",
                title: "MIND Collaborative Effort to Developing Meaning from Annotated Data During Continuous Multimodal Monitoring",
                content: 'Olson DM, Sharma G, Moberg D, Habboush D, <b>Goldblum Z</b>, Moyer EJ, Maddux C, Foreman B, Stover J, Rosenthal ES. <em>International Neuroscience Nursing Research Symposium</em>. Chicago, IL (virtual). August 7, 2021.'
            }
        ]
    };

    return (
        <div>
            {Object.entries(researchData).map(([year, items]) => (
                <ResearchSection key={year} year={year} items={items} />
            ))}
            <div style={{ textAlign: 'center' }}>
                <a className="back_to_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href="#">
                    <p className="item_container" style={{ maxWidth: '20%' }}> Back to top ▲</p>
                </a>
            </div>
        </div>
    );
}

export default Research;

ResearchSection.propTypes = {
    year: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        tag: PropTypes.string.isRequired,
        tagColor: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    })).isRequired
};