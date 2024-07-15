import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

const ProjectItem = ({ title, description, date, imageSrc, content }) => (
    <div className="item_container project_item" style={{ marginBottom: '20px' }}>
        <h4 className="header header_margin project_title">{title}</h4>
        <p className="proj_desc" >{description}</p>
        <span style={{ fontSize: '18px', fontStyle: 'italic', display: 'block', marginBottom: '20px' }}>{date}</span>
        <div className="proj_content">
            <div className="proj_image">
                <img style={{ width: '320px', height: 'auto' }} src={imageSrc} alt={`${title} project`} />
            </div>
            <div className="proj_text">
                <p className="paragraph" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    </div>
);

function Projects() {
    useSmoothScroll();
    
    const projectsData = {
        "Current": [
            {
                title: "Personal Website",
                description: "My own website to showcase some of the things I do to the world.",
                date: "Sept 2022 - Present",
                imageSrc: "/projects/website.webp",
                content: `V2: Now with Three.js! And the complexity that comes with it.<br><br>
                  V1: 5 HTML files, 1 CSS file, 1 font, 0 frameworks. That's it! Clean and simple. Color palette
                  inspired by <a style="color: var(--dark-gray_color); font-style: italic;" 
                  href="https://github.com/daltonmenezes/aura-theme/tree/main">Aura Theme</a>.
                  <br><br>
                  <a class="check_it_out"
                  href="https://github.com/ZackGoldblum/zackgoldblum.github.io">Check it out!</a>`
            }
        ],
        "2023-2024": [
            {
                title: "Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging | Ayaz Lab",
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
                  <a class="check_it_out" href="https://doi.org/10.17918/00001784">Check it out!</a>
                  <br>
                  <a class="check_it_out" style="padding-top: 10px; display: inline-block;" href="https://github.com/AyazLab/KernelFlow_Experiment">GitHub (Experiment)</a> |
                  <a class="check_it_out" href="https://github.com/AyazLab/KernelFlow_Analysis">GitHub (Analysis)</a>`
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
                  <br><br><a class="check_it_out" href="https://doi.org/10.1093/milmed/usad136">Check it out!</a>`
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
                  href="https://github.com/ZackGoldblum/Neurocritial-Care-Patient-Outcome-Predictor">Check it
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
                  <br><br><a class="check_it_out" href="/projects/trachtalk_project.pdf"
                  target="_blank">Check it out!</a>`
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
                  <br><br><a class="check_it_out" href="https://www.youtube.com/@braintechyoutube">Check it
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
                  href="https://github.com/ZackGoldblum/BMES725-BCI-Motor-Imagery">Check it out!</a>`
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
                  <br><br><a class="check_it_out" href="https://devpost.com/software/neopet-2pgzxt">Check it
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
                        <ProjectItem key={index} {...project} />
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