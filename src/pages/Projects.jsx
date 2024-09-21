import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSmoothScroll from '../hooks/useSmoothScroll';

const ProjectEntry = ({ title, description, date, imageSrc, content, additionalInfo }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAdditionalInfo = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="item_container project_item" style={{ marginBottom: '20px' }}>
            <h4 className="header header_margin project_title">{title}</h4>
            <p className="proj_desc">{description}</p>
            <span style={{ fontSize: '18px', fontStyle: 'italic', display: 'block', marginBottom: '20px' }}>{date}</span>
            <div className="proj_content">
                <div className="proj_image">
                    <img style={{ width: '320px', height: 'auto' }} src={imageSrc} alt={`${title} project`} />
                </div>
                <div className="proj_text">
                    <p className="paragraph" style={{ fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: content }} />
                    {additionalInfo && (
                        <p
                            className="learn_more"
                            onClick={toggleAdditionalInfo}
                            style={{ marginBottom: '0px' }}
                        >
                            {isExpanded ? "Show less" : "Build list"}
                        </p>
                    )}
                </div>
            </div>
            {isExpanded && additionalInfo && (
                <div className="additional_info">
                    <div dangerouslySetInnerHTML={{ __html: additionalInfo }} />
                </div>
            )}
        </div>
    );
};

function Projects() {
    useSmoothScroll();

    const projectsData = {
        "Current": [
            {
                title: "Personal Website",
                description: "My own website to showcase some of the things I do to the world.",
                date: "Sept 2022 - Present",
                imageSrc: "/projects/website.webp",
                content: `
                  V3: Re-implementation into a React single page application.<br><br>
                  V2: New design with a Three.js-animated starfield background.<br><br>
                  V1: 5 HTML files, 1 CSS file, 1 font, 0 frameworks. That's it! Clean and simple. Color palette
                  inspired by <a style="color: var(--dark-gray_color); font-style: italic;" 
                  href="https://github.com/daltonmenezes/aura-theme/tree/main" target="_blank" rel="noopener noreferrer">Aura Theme</a>.
                  <br><br>
                  <a class="check_it_out"
                  href="https://github.com/ZackGoldblum/zackgoldblum.github.io" target="_blank" rel="noopener noreferrer">Check it out!</a>`
            }
        ],
        "2024-2025": [
            {
                title: "Custom Hardline Liquid Cooled PC",
                description: "My first foray into building liquid cooled computers.",
                date: "Aug 2024",
                imageSrc: "/projects/liquid_cooled_pc.webp",
                content: `I've been building computers for over a decade (since I was 14 years old). In fact, it
                  was this skill that landed me my first job as an assistant technician at a local IT
                  company. As a kid, I loved to disassemble old tech products to see what was inside
                  — although I had no idea how any of it worked. But going the other
                  direction to build something functional was a whole new paradigm. I did figure it out
                  though, because that first computer I built is still next to me, and still running!
                  Since then, I've built computers for friends, several machine learning servers, and now
                  my second (and first ever liquid cooled) PC. This build was significantly more
                  challenging, but worth it for the experience gain and seeing the meticulous planning
                  finally come together. There are a couple things to improve: my 90° bends could
                  use some practice and one of the GPU tubing runs will need to be re-routed next time I
                  do maintenance. Overall, I'm proud of this build and glad I took it on.`,
                additionalInfo: `
                  <div style="line-height: 1.2;">
                      <span class="proj_desc" style="color: var(--white_color)">Computer Components</span> <br>
                      - <em>1x</em> Gigabyte GeForce RTX 4090 Gaming OC <br>
                      - <em>1x</em> AMD Ryzen 7 7800X3D <br>
                      - <em>1x</em> NZXT N7 B650E - White <br>
                      - <em>1x</em> Corsair Vengeance DDR5 RAM 64GB (2x32GB) 6000MHz CL30 - White <br>
                      - <em>1x</em> Samsung 990 Pro 2TB <br>
                      - <em>1x</em> Seasonic Vertex GX-1000 | 1000W | 80+ Gold <br>
                      - <em>1x</em> Corsair 4000D Airflow - White <br>
                      - <em>6x</em> EK-Loop Fan FPT 120 D-RGB - White (27mm Thickness) <br>
                      - <em>1x</em> Corsair iCUE Commander Core XT <br>
                      - <em>1x</em> EK-Loop PCI-E 4.0 Riser Cable <br>
                      - <em>1x</em> D-RGB 6-Way Splitter Cable <br>
                      - <em>1x</em> ARGB Adapter Cable <br>
                  </div>
                  <div style="line-height: 1.2; margin-top: 20px;">
                      <span class="proj_desc" style="color: var(--white_color)">Liquid Cooling Loop Components</span> <br>
                      - <em>1x</em> EK-Quantum Vector² Master RTX 4090 D-RGB - Nickel + Plexi <br>
                      - <em>1x</em> EK-Quantum Kinetic FLT 80 DDC PWM D-RGB - Plexi <br>
                      - <em>1x</em> EK-Quantum Velocity² D-RGB - AM5 Nickel + Plexi <br>
                      - <em>1x</em> EK-Quantum Surface P360M - White (44mm Thickness) <br>
                      - <em>1x</em> EK-Quantum Surface P240M - White (44mm Thickness) <br>
                      - <em>10x</em> EK-Quantum Torque HDC 12mm - Satin Titanium <br>
                      - <em>6x</em> EK-Quantum Torque Rotary 90° - Satin Titanium <br>
                      - <em>4x</em> EK-Quantum Torque Micro Plug - Satin Titanium <br>
                      - <em>1x</em> EK-Quantum Torque Double Rotary Offset 21mm Fitting - Satin Titanium <br>
                      - <em>1x</em> EK-Quantum Torque Extender Static MF 28mm - Satin Titanium <br>
                      - <em>1x</em> EK-Quantum Torque Extender Static MF 7mm - Satin Titanium <br>
                      - <em>1x</em> EK-Quantum Torque Drain Valve - Satin Titanium <br>
                      - <em>1x</em> EK-Loop Angled Bracket - 120/120mm <br>
                      - <em>6x</em> EK-Loop Hard Tube 12mm 0.8m - Acrylic <br>
                      - <em>1x</em> EK-CryoFuel Mystic Fog (Premix 1000mL) <br>
                  </div>
                  <div style="line-height: 1.2; margin-top: 20px;">
                      <span class="proj_desc" style="color: var(--white_color)">Equipment</span> <br>
                      - <em>1x</em> EK-Loop Heat Gun 1500W <br>
                      - <em>1x</em> EK-Loop Leak Tester Flex <br>
                      - <em>1x</em> Corsair Hydro X Series XT Hardline Bending Toolkit
                  </div>`
            },
            {
                title: "Sociail Chat | Sociail",
                description: "Bringing together the best of human and AI collaboration.",
                date: "June 2023 - March 2024",
                imageSrc: "/projects/sociail_chat.webp",
                content: `My time at Sociail marked my first true entrepreneurial experience. I joined the
                  founding team immediately after graduation and developed the initial prototype
                  of Sociail Chat, our collaborative AI product. As the startup grew, I found myself
                  leading a multinational software development team and guiding the product through
                  successive iterations until a limited release. Approaching launch, my focus
                  shifted from technical development to product design and delivering an excellent user
                  experience. I also had co-founder responsibilities around building the company itself
                  — interviewing and onboarding team members, establishing our culture,
                  and creating the 'operating system' of Sociail. There is so much more to share, and
                  eventually I'll write something long-form that conveys how truly foundational this
                  experience was.
                  <br><br>
                  <a class="check_it_out" href="https://www.sociail.com/" target="_blank" rel="noopener noreferrer">Check it out!</a>`
            }
        ],
        "2023-2024": [
            {
                title: "Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging | Neuroergonomics and Neuroengineering Lab",
                description: "Master's thesis research project under Dr. Hasan Ayaz.",
                date: "Dec 2021 - June 2023",
                imageSrc: "/projects/kernel_flow.webp",
                content: `For my master's thesis, I investigated a miniaturized time-domain functional
                  near-infrared spectroscopy (TD-fNIRS) neuroimaging system, Kernel Flow, for assessing
                  the neural correlates of cognitive function. This was the <u>first</u> comprehensive
                  cognitive study using TD-fNIRS and whole-head optical brain monitoring, as well as the
                  <u>first</u> cognitive study with Kernel Flow. Through this project, I developed and
                  verified an experimental setup for investigating the neural correlates of cognitive
                  tasks and designed open-source tools to facilitate optical neuroimaging research.
                  <br><br>
                  <a class="check_it_out" href="https://doi.org/10.17918/00001784" target="_blank" rel="noopener noreferrer">Check it out!</a>
                  <br>
                  <a class="check_it_out" style="padding-top: 10px; display: inline-block;" href="https://github.com/AyazLab/KernelFlow_Experiment" target="_blank" rel="noopener noreferrer">GitHub (Experiment)</a> |
                  <a class="check_it_out" href="https://github.com/AyazLab/KernelFlow_Analysis" target="_blank" rel="noopener noreferrer">GitHub (Analysis)</a>`
            },
            {
                title: "Novel Medical Devices for Neurocritical Care Monitoring | Moberg Analytics",
                description: "Capturing contextual data and environmental factors in the neuro-ICU.",
                date: "March 2022 - June 2023",
                imageSrc: "/projects/moberg_medical_devices.webp",
                content: `In collaboration with UT Southwestern Medical Center, I designed and developed devices to 
                  capture intracranial pressure (ICP) context as well as light, temperature, and noise levels 
                  in neuro-ICU rooms. After the Stopcock Position Sensor for ICP context was clinically 
                  validated at UT Southwestern Medical Center, I initiated a joint effort with a Drexel <em>Senior 
                  Design</em> team to overhaul the devices and verify the sensors for environmental data capture.
                  <br><br><a class="check_it_out" href="https://doi.org/10.1093/milmed/usad136" target="_blank" rel="noopener noreferrer">Check it out!</a>`
            }
        ],
        "2022-2023": [
            {
                title: "Neurocritical Care Patient Outcome Predictor | Drexel University",
                description: "A GUI-based tool for clinicians to predict the outcome of a neurocritical care patient.",
                date: "Sept 2022 - Dec 2022",
                imageSrc: "/projects/neuro_outcome_predictor.webp",
                content: `Final project for the <em>Advanced Biocomputational Languages</em> graduate class taught by Dr.
                  Ahmet Sacan. We created a GUI for clinicians that predicts the outcome of a neurocritical care
                  patient. The parameters input for the current patient are compared to a database of
                  retrospectively collected patient and medical data using a k-nearest neighbors algorithm. The
                  utilized database is the Medical Information Mart for Intensive Care (MIMIC)-IV.
                  <br><br><a class="check_it_out"
                  href="https://github.com/ZackGoldblum/Neurocritial-Care-Patient-Outcome-Predictor" target="_blank" rel="noopener noreferrer">Check it
                  out!</a>`
            },
            {
                title: "TrachTalk | Drexel University",
                description: "An independently operable pediatric tracheostomy cuff controller.",
                date: "Sept 2021 - March 2022",
                imageSrc: "/projects/trachtalk.webp",
                content: `<em>Junior Design</em> project for a device that inflates or deflates a tracheostomy cuff at the
                  press of a button. The inflation pressure is set by a clinician using the dial and is maintained
                  while the patient is breathing. The patient presses the button when he or she wishes to speak
                  and the cuff deflates. This work was presented at several Drexel Biomed events at which I
                  participated on a Q&A panel for prospective students.
                  <br><br><a class="check_it_out" href="/projects/trachtalk_project.pdf">Check it out!</a>`
            },
            {
                title: "BrainTech Podcast | YouTube and Spotify",
                description: "I hosted and produced the BrainTech Podcast.",
                date: "Aug 2021 - March 2022",
                imageSrc: "/projects/braintech_podcast.webp",
                content: `Through conversations with researchers, engineers, business leaders, and thinkers in brain
                  technology, I hope to inspire students who will shape the future of this field. This podcast
                  was spun out of the <em>Brain Technology Convergence</em> graduate course taught by Dr. Banu
                  Onaral. Four episodes were created as initial run. I would like to return to this project at
                  some point and do more with the BrainTech channel.
                  <br><br><a class="check_it_out" href="https://www.youtube.com/@braintechyoutube" target="_blank" rel="noopener noreferrer">Check it
                  out!</a>`
            }
        ],
        "2021-2022": [
            {
                title: "Real-Time EEG-Based BCI Motor Imagery Classifier | Drexel University",
                description: "This software acquires 8-channel EEG data from the OpenBCI Ultracortex Mark IV headset, creates left vs. right-hand motor imagery datasets, and classifies user intention in near real-time.",
                date: "March 2021 - June 2021",
                imageSrc: "/projects/BCI_project.webp",
                content: `Final project for the <em>Neural Networks</em> graduate course taught by Dr. Hualou Liang. We
                  evaluated the classification accuracies of several convolutional neural network models from Army Research
                  Laboratory (ARL) EEGModels project and then trained our own to classify motor imagery intention
                  from my OpenBCI headset. The software handles EEG data acquisition from the headset,
                  pre-processing, and visualization, as well as dataset creation and real-time classification using our model.
                  <br><br><a class="check_it_out"
                  href="https://github.com/ZackGoldblum/BMES725-BCI-Motor-Imagery" target="_blank" rel="noopener noreferrer">Check it out!</a>`
            }
        ],
        "2020-2021": [
            {
                title: "NeoPET | Johns Hopkins University MedHacks 2020",
                description: "The Novel application for Parkinson's and Essential Tremor (NeoPET) provides an innovative way of tracking Parkinson's and Essential Tremor symptoms and treatment responses through a smartphone.",
                date: "Sept 2020 - Sept 2020",
                imageSrc: "/projects/neoPET_project.webp",
                content: `Collaborated with students from UMN to create a mobile app for Parkinson's and Essential Tremor
                  patients that uses machine learning to analyze and quantify symptom severity. We leveraged
                  accelerometer, gyroscope, and keystroke data streams from a smartphone to train the model and
                  create visualizations for clinicians to remotely monitor disease progression over time.
                  Built on Android and Google Firebase.
                  <br><br><a class="check_it_out" href="https://devpost.com/software/neopet-2pgzxt" target="_blank" rel="noopener noreferrer">Check it
                  out!</a>`
            }
        ]
    };

    return (
        <div>
            {Object.entries(projectsData).map(([year, projects]) => (
                <React.Fragment key={year}>
                    <h3><br /><u>{year}</u></h3>
                    {projects.map((project, index) => (
                        <ProjectEntry key={index} {...project} />
                    ))}
                </React.Fragment>
            ))}
            <div style={{ textAlign: 'center' }}>
                <a className="back_to_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href="#">
                    <p className="item_container" style={{ maxWidth: '20%' }}> Back to top ▲</p>
                </a>
            </div>
        </div>
    );
}
export default Projects;

ProjectEntry.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string
};