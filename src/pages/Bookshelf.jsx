import PropTypes from 'prop-types';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Book = ({ title, author, imageSrc, rating, titlePadTop, authorBottomPosition, size = 'S' }) => {
    const titleStyle = titlePadTop ? { paddingTop: `${titlePadTop}px` } : {};
    const authorStyle = authorBottomPosition ?
        { marginBottom: `${authorBottomPosition}px` } :
        {};

    // Special case for XXS size
    if (size === 'XS' || size === 'XXS' || size === 'XXXS') {
        return (
            <div className={`grid_item_${size}`}>
                <p className="book_title book_title_xs" style={titleStyle}>{title}</p>
                <p className="book_author book_author_xs" style={authorStyle}>{author}</p>
                <div className="book_img_container_xs">
                    <img className="book_img book_img_xs" src={imageSrc} alt={`${title} book cover`} />
                </div>
            </div>
        );
    }

    // Regular layout for other sizes
    return (
        <div className={`grid_item_${size}`}>
            <p className="book_title" style={titleStyle}>{title}</p><br />
            <p className="book_author" style={authorStyle}>{author}</p><br />
            <div className="book_img_container">
                <img className="book_img" src={imageSrc} alt={`${title} book cover`} /><br />
            </div>
            {rating && (
                <div className="star_style_container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                            key={star}
                            icon={star <= rating ? faStar : star - 0.5 <= rating ? faStarHalfStroke : faStarRegular}
                            className={`star_icon ${star <= Math.ceil(rating) ? 'star_style_blue' : 'star_style_white'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const YearSection = ({ year, books, isLast, subtitle }) => (
    <>
        <h3><br /><u>{year}</u></h3>
        {subtitle && <p className="year_subtitle">{subtitle}</p>}
        <div className="grid-container">
            {books.map((book, index) => (
                <Book key={index} {...book} />
            ))}
        </div>
        {!isLast && <br />}
    </>
);

function Bookshelf() {
    useSmoothScroll();

    const bookshelfData = {
        "2025-2026": [
            { title: "Biomega 1", author: "Tsutomu Nihei", imageSrc: "/books/biomega_1.webp", rating: 4, size: "S", titlePadTop: 12 },
            { title: "Abaddon's Gate", author: "James S.A. Corey", imageSrc: "/books/abaddons_gate.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "Caliban's War", author: "James S.A. Corey", imageSrc: "/books/calibans_war.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "Leviathan Wakes", author: "James S.A. Corey", imageSrc: "/books/leviathan_wakes.webp", rating: 5, size: "S", titlePadTop: 12 },
            { title: "NOiSE", author: "Tsutomu Nihei", imageSrc: "/books/noise.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "Black Hole Blues", author: "Janna Levin", imageSrc: "/books/black_hole_blues.webp", rating: 3.5, size: "S" },
            { title: "Abundance", author: "Ezra Klein & Derek Thompson", imageSrc: "/books/abundance.webp", rating: 4.5, size: "S", titlePadTop: 12, authorBottomPosition: -8 },
            { title: "Zero to One", author: "Peter Thiel", imageSrc: "/books/zero_to_one.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "Sleep and the Soul", author: "Greg Egan", imageSrc: "/books/sleep_and_the_soul.webp", rating: 3.5, size: "L", titlePadTop: 22 },
            { title: "The Techno-Optimist Manifesto", author: "Marc Andressen", imageSrc: "/books/the_techno-optimist_manifesto.webp", rating: 3.5, size: "L", titlePadTop: 10 },
            { title: "The Quantum Thief", author: "Hannu Rajaniemi", imageSrc: "/books/the_quantum_thief.webp", rating: 3.5, size: "L", titlePadTop: 22 },
            { title: "The Metamorphosis of Prime Intellect", author: "Roger Williams", imageSrc: "/books/the_metamorphosis_of_prime_intellect.webp", rating: 4.0, size: "L" },
            { title: "The Return of the King", author: "J. R. R. Tolkien", imageSrc: "/books/the_return_of_the_king.webp", rating: 5, size: "S" },
            { title: "The Two Towers", author: "J. R. R. Tolkien", imageSrc: "/books/the_two_towers.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "The Fellowship of the Ring", author: "J. R. R. Tolkien", imageSrc: "/books/the_fellowship_of_the_ring.webp", rating: 4, size: "S" },
            { title: "The Hobbit", author: "J. R. R. Tolkien", imageSrc: "/books/the_hobbit.webp", rating: 4, size: "S", titlePadTop: 12 },
        ],
        "2024-2025": [
            { title: "Quanta and Fields", author: "Sean Carroll", imageSrc: "/books/the_biggest_ideas_quanta_and_fields.webp", rating: 4, size: "S" },
            { title: "Space, Time, and Motion", author: "Sean Carroll", imageSrc: "/books/the_biggest_ideas_space_time_and_motion.webp", rating: 4.5, size: "S" },
            { title: "Shutter Island", author: "Dennis Lehane", imageSrc: "/books/shutter_island.webp", rating: 5, size: "S", titlePadTop: 12 },
            { title: "Axiomatic", author: "Greg Egan", imageSrc: "/books/axiomatic.webp", rating: 4, size: "S", titlePadTop: 12 },
            { title: "Welcome to the Universe in 3D: A Visual Tour", author: "Neil deGrasse Tyson", imageSrc: "/books/welcome_to_the_universe_in_3d.webp", rating: 3.5, size: "M" },
            { title: "Diaspora", author: "Greg Egan", imageSrc: "/books/diaspora.webp", rating: 4.5, size: "M", titlePadTop: 22 },
            { title: "Permutation City", author: "Greg Egan", imageSrc: "/books/permutation_city.webp", rating: 4, size: "M", titlePadTop: 10 },
            { title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", imageSrc: "/books/do_androids_dream_of_electric_sheep.webp", rating: 3.5, size: "M" },
            { title: "Mona Lisa Overdrive", author: "William Gibson", imageSrc: "/books/mona_lisa_overdrive.webp", rating: 4, size: "S" },
            { title: "Count Zero", author: "William Gibson", imageSrc: "/books/count_zero.webp", rating: 5, size: "S", titlePadTop: 12 },
            { title: "Neuromancer", author: "William Gibson", imageSrc: "/books/neuromancer.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "Burning Chrome", author: "William Gibson", imageSrc: "/books/burning_chrome.webp", rating: 4, size: "S", titlePadTop: 12 },
            { title: "Thinking in Systems", author: "Donella H. Meadows", imageSrc: "/books/thinking_in_systems.webp", rating: 4, size: "S" },
            { title: "Reincarnation Blues", author: "Michael Poore", imageSrc: "/books/reincarnation_blues.webp", rating: 3.5, size: "S" },
            { title: "The Lovecraft Compendium", author: "H. P. Lovecraft", imageSrc: "/books/the_lovecraft_compendium.webp", rating: 3.5, size: "S" },
            { title: "BLAME! 6", author: "Tsutomu Nihei", imageSrc: "/books/blame_6.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "BLAME! 5", author: "Tsutomu Nihei", imageSrc: "/books/blame_5.webp", rating: 4.5, size: "S", titlePadTop: 12 },
            { title: "BLAME! 4", author: "Tsutomu Nihei", imageSrc: "/books/blame_4.webp", rating: 4, size: "S", titlePadTop: 12 },
        ],
        "2023-2024": [
            { title: "BLAME! 3", author: "Tsutomu Nihei", imageSrc: "/books/blame_3.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "BLAME! 2", author: "Tsutomu Nihei", imageSrc: "/books/blame_2.webp", rating: 4.5, size: "S", titlePadTop: 10 },
            { title: "BLAME! 1", author: "Tsutomu Nihei", imageSrc: "/books/blame_1.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "Those Who Resist", author: "N. C. Scrimgeour", imageSrc: "/books/those_who_resist.webp", rating: 4, size: "S" },
            { title: "Those Once Forgotten", author: "N. C. Scrimgeour", imageSrc: "/books/those_once_forgotten.webp", rating: 4.5, size: "M", titlePadTop: 10 },
            { title: "Those Left Behind", author: "N. C. Scrimgeour", imageSrc: "/books/those_left_behind.webp", rating: 4, size: "M", titlePadTop: 10 },
            { title: "Children of Memory", author: "Adrian Tchaikovsky", imageSrc: "/books/children_of_memory.webp", rating: 4, size: "M", titlePadTop: 10 },
            { title: "What is ChatGPT Doing and Why Does It Work?", author: "Stephen Wolfram", imageSrc: "/books/what_is_chatgpt_doing_and_why_does_it_work.webp", rating: 4, size: "M" },
            { title: "Apex", author: "Ramez Naam", imageSrc: "/books/apex.webp", rating: 5, size: "S", authorBottomPosition: 10, titlePadTop: 12 },
            { title: "Crux", author: "Ramez Naam", imageSrc: "/books/crux.webp", rating: 5, size: "S", authorBottomPosition: 10, titlePadTop: 12 },
            { title: "Nexus", author: "Ramez Naam", imageSrc: "/books/nexus.webp", rating: 5, size: "S", authorBottomPosition: 10, titlePadTop: 12 },
            { title: "Exhalation", author: "Ted Chiang", imageSrc: "/books/exhalation.webp", rating: 5, size: "S", authorBottomPosition: 10, titlePadTop: 12 },
            { title: "Stories of Your Life and Others", author: "Ted Chiang", imageSrc: "/books/stories_of_your_life_and_others.webp", rating: 4.5, size: "M", titlePadTop: 10 },
            { title: "Animal Farm", author: "George Orwell", imageSrc: "/books/animal_farm.webp", rating: 4.5, size: "M", titlePadTop: 22 },
            { title: "The Exodus Betrayal", author: "N. C. Scrimgeour", imageSrc: "/books/the_exodus_betrayal.webp", rating: 3.5, size: "M", titlePadTop: 10 },
            { title: "You Look Like a Thing and I Love You", author: "Janelle Shane", imageSrc: "/books/you_look_like_a_thing_and_i_love_you.webp", rating: 5, size: "M" },
            { title: "Livewired", author: "David Eagleman", imageSrc: "/books/livewired.webp", rating: 4.5, size: "S", titlePadTop: 10 },
            { title: "Project Hail Mary", author: "Andy Weir", imageSrc: "/books/project_hail_mary.webp", rating: 5, size: "S" },
            { title: "The Alchemist", author: "Paulo Coelho", imageSrc: "/books/the_alchemist.webp", rating: 3.5, size: "S", titlePadTop: 10 },
        ],
        "2022-2023": [
            { title: "Chapterhouse: Dune", author: "Frank Herbert", imageSrc: "/books/chapterhouse_dune.webp", rating: 3.5, size: "M", authorBottomPosition: 16 },
            { title: "Heretics of Dune", author: "Frank Herbert", imageSrc: "/books/heretics_of_dune.webp", rating: 4, size: "M", authorBottomPosition: 16 },
            { title: "God Emperor of Dune", author: "Frank Herbert", imageSrc: "/books/god_emperor_of_dune.webp", rating: 3, size: "M", authorBottomPosition: 16 },
            { title: "Children of Dune", author: "Frank Herbert", imageSrc: "/books/children_of_dune.webp", rating: 4, size: "M", authorBottomPosition: 16 },
            { title: "Dune Messiah", author: "Frank Herbert", imageSrc: "/books/dune_messiah.webp", rating: 3, size: "M", titlePadTop: 10, authorBottomPosition: 16 },
            { title: "Dune", author: "Frank Herbert", imageSrc: "/books/dune.webp", rating: 5, size: "M", titlePadTop: 10, authorBottomPosition: 16 },
            { title: "To Hold Up the Sky", author: "Cixin Liu", imageSrc: "/books/to_hold_up_the_sky.webp", rating: 4, size: "M", authorBottomPosition: 16 },
            { title: "The Wandering Earth", author: "Cixin Liu", imageSrc: "/books/the_wandering_earth.webp", rating: 3.5, size: "M", authorBottomPosition: 16 },
            { title: "Pale Blue Dot", author: "Carl Sagan", imageSrc: "/books/pale_blue_dot.webp", rating: 4, size: "S", titlePadTop: 12 },
            { title: "Cosmos", author: "Carl Sagan", imageSrc: "/books/cosmos.webp", rating: 4, size: "S", titlePadTop: 12 },
            { title: "Brave New World", author: "Aldous Huxley", imageSrc: "/books/brave_new_world.webp", rating: 3, size: "S", titlePadTop: 12 },
            { title: "The Martian", author: "Andy Weir", imageSrc: "/books/the_martian.webp", rating: 4.5, size: "S", titlePadTop: 12 },
        ],
        "2021-2022": [
            { title: "Minus 148", author: "Art Davidson", imageSrc: "/books/minus_148.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "Of Mice and Men", author: "John Steinbeck", imageSrc: "/books/of_mice_and_men.webp", rating: 3.5, size: "S", titlePadTop: 10 },
            { title: "Children of Ruin", author: "Adrian Tchaikovsky", imageSrc: "/books/children_of_ruin.webp", rating: 4.5, size: "S" },
            { title: "Children of Time", author: "Adrian Tchaikovsky", imageSrc: "/books/children_of_time.webp", rating: 5, size: "S" },
            { title: "21 Lessons for the 21st Century", author: "Yuval Noah Harari", imageSrc: "/books/21_lessons_for_the_21st_century.webp", rating: 4, size: "M" },
            { title: "Homo Deus", author: "Yuval Noah Harari", imageSrc: "/books/homo_deus.webp", rating: 3.5, size: "M", titlePadTop: 22 },
            { title: "Ball Lightning", author: "Cixin Liu", imageSrc: "/books/ball_lightning.webp", rating: 3.5, size: "M", titlePadTop: 22 },
            { title: "Death's End", author: "Cixin Liu", imageSrc: "/books/deaths_end.webp", rating: 4, size: "M", titlePadTop: 22 },
            { title: "The Dark Forest", author: "Cixin Liu", imageSrc: "/books/the_dark_forest.webp", rating: 5, size: "S", titlePadTop: 10 },
            { title: "Three Body Problem", author: "Cixin Liu", imageSrc: "/books/three_body_problem.webp", rating: 4, size: "S" },
        ],
        "2020-2021": [
            { title: "For Whom the Bell Tolls", author: "Ernest Hemingway", imageSrc: "/books/for_whom_the_bell_tolls.webp", rating: 5, size: "M", titlePadTop: 10 },
            { title: "Mostly Harmless", author: "Douglas Adams", imageSrc: "/books/mostly_harmless.webp", rating: 3.5, size: "M", titlePadTop: 22 },
            { title: "So Long, and Thanks for all the Fish", author: "Douglas Adams", imageSrc: "/books/so_long_and_thanks_for_all_the_fish.webp", rating: 2.5, size: "M" },
            { title: "Life, the Universe and Everything", author: "Douglas Adams", imageSrc: "/books/life_the_universe_and_everything.webp", rating: 3.5, size: "M" },
            { title: "The Restaurant at the End of the Universe", author: "Douglas Adams", imageSrc: "/books/the_restaurant_at_the_end_of_the_universe.webp", rating: 4, size: "L", titlePadTop: 10 },
            { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", imageSrc: "/books/the_hitchhikers_guide_to_the_galaxy.webp", rating: 5, size: "L" },
            { title: "Einstein's Dreams", author: "Alan Lightman", imageSrc: "/books/einsteins_dreams.webp", rating: 4, size: "L", titlePadTop: 22 },
            { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", imageSrc: "/books/astrophysics_for_people_in_a_hurry.webp", rating: 3.5, size: "L", titlePadTop: 10 },
            { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", imageSrc: "/books/surely_youre_joking_mr_feynman.webp", rating: 4, size: "S", authorBottomPosition: -24 },
        ],
        "Earlier Reading": {
            subtitle: "Books from school and growing up, though I'm sure I've forgotten many. They're in approximate order as best I can recall.",
            books: [
                { title: "11/22/63", author: "Stephen King", imageSrc: "/books/11_22_63.webp", size: "XXS", authorBottomPosition: 0, titlePadTop: 10 },
                { title: "Ready Player One", author: "Ernest Cline", imageSrc: "/books/ready_player_one.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Future of the Mind", author: "Michio Kaku", imageSrc: "/books/the_future_of_the_mind.webp", size: "XXS" },
                { title: "MaddAddam", author: "Margaret Atwood", imageSrc: "/books/maddaddam.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Year of the Flood", author: "Margaret Atwood", imageSrc: "/books/the_year_of_the_flood.webp", size: "XXS" },
                { title: "Oryx and Crake", author: "Margaret Atwood", imageSrc: "/books/oryx_and_crake.webp", size: "XXS", titlePadTop: 10 },
                { title: "When Breath Becomes Air", author: "Paul Kalanithi", imageSrc: "/books/when_breath_becomes_air.webp", size: "XXS" },
                { title: "The Devil in the White City", author: "Erik Larson", imageSrc: "/books/the_devil_in_the_white_city.webp", size: "XXS" },
                { title: "Make Your Bed", author: "William H. McRaven", imageSrc: "/books/make_your_bed.webp", size: "XXS", titlePadTop: 10 },
                { title: "David and Goliath", author: "Malcolm Gladwell", imageSrc: "/books/david_and_goliath.webp", size: "XXS" },
                { title: "Outliers", author: "Malcolm Gladwell", imageSrc: "/books/outliers.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Tipping Point", author: "Malcolm Gladwell", imageSrc: "/books/the_tipping_point.webp", size: "XXS" },
                { title: "Blink", author: "Malcolm Gladwell", imageSrc: "/books/blink.webp", size: "XXS", titlePadTop: 10 },
                { title: "Frankenstein", author: "Mary Shelley", imageSrc: "/books/frankenstein.webp", size: "XXS", titlePadTop: 10 },
                { title: "1984", author: "George Orwell", imageSrc: "/books/1984.webp", size: "XXS", titlePadTop: 10 },
                { title: "Farenheit 451", author: "Ray Bradbury", imageSrc: "/books/farenheit_451.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "Bel Canto", author: "Ann Patchett", imageSrc: "/books/bel_canto.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "The Kite Runner", author: "Khaled Hosseini", imageSrc: "/books/the_kite_runner.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "The Catcher in the Rye", author: "J. D. Salinger", imageSrc: "/books/the_catcher_in_the_rye.webp", size: "XS", authorBottomPosition: 16 },
                { title: "The Great Gatsby", author: "F. Scott Fitzgerald", imageSrc: "/books/the_great_gatsby.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "Lord of the Flies", author: "William Golding", imageSrc: "/books/lord_of_the_flies.webp", size: "XS", authorBottomPosition: 16 },
                { title: "The Book Thief", author: "Markus Zusak", imageSrc: "/books/the_book_thief.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "The Pearl", author: "John Steinbeck", imageSrc: "/books/the_pearl.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "The Giver", author: "Lois Lowry", imageSrc: "/books/the_giver.webp", size: "XS", authorBottomPosition: 16, titlePadTop: 10 },
                { title: "To Kill a Mockingbird", author: "Harper Lee", imageSrc: "/books/to_kill_a_mockingbird.webp", size: "XS", authorBottomPosition: 16 },
                { title: "Inkdeath", author: "Cornelia Funke", imageSrc: "/books/inkdeath.webp", size: "XXS", titlePadTop: 10 },
                { title: "Inkspell", author: "Cornelia Funke", imageSrc: "/books/inkspell.webp", size: "XXS", titlePadTop: 10 },
                { title: "Inkheart", author: "Cornelia Funke", imageSrc: "/books/inkheart.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Death Cure", author: "James Dashner", imageSrc: "/books/the_death_cure.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Scorch Trials", author: "James Dashner", imageSrc: "/books/the_scorch_trials.webp", size: "XXS" },
                { title: "The Maze Runner", author: "James Dashner", imageSrc: "/books/the_maze_runner.webp", size: "XXS", authorBottomPosition: 6 },
                { title: "Terminal", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/terminal.webp", size: "XXS" },
                { title: "Spiral", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/spiral.webp", size: "XXS" },
                { title: "Closer", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/closer.webp", size: "XXS" },
                { title: "Freefall", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/freefall.webp", size: "XXS" },
                { title: "Deeper", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/deeper.webp", size: "XXS" },
                { title: "Tunnels", author: "Roderick Gordon & Brian Williams", imageSrc: "/books/tunnels.webp", size: "XXS" },
                { title: "Pathfinder", author: "Orson Scott Card", imageSrc: "/books/pathfinder.webp", size: "XXS", authorBottomPosition: 6 },
                { title: "Ender's Game", author: "Orson Scott Card", imageSrc: "/books/enders_game.webp", size: "XXS", authorBottomPosition: 6 },
                { title: "Execution", author: "Alexander Gordon Smith", imageSrc: "/books/execution.webp", size: "XXS" },
                { title: "Fugitives", author: "Alexander Gordon Smith", imageSrc: "/books/fugitives.webp", size: "XXS" },
                { title: "Death Sentence", author: "Alexander Gordon Smith", imageSrc: "/books/death_sentence.webp", size: "XXS" },
                { title: "Solitary", author: "Alexander Gordon Smith", imageSrc: "/books/solitary.webp", size: "XXS" },
                { title: "Lockdown", author: "Alexander Gordon Smith", imageSrc: "/books/lockdown.webp", size: "XXS" },
                { title: "Flesh & Bone", author: "Jonathan Maberry", imageSrc: "/books/flesh_and_bone.webp", size: "XXS", authorBottomPosition: 6 },
                { title: "Dust & Decay", author: "Jonathan Maberry", imageSrc: "/books/dust_and_decay.webp", size: "XXXS" },
                { title: "Rot & Ruin", author: "Jonathan Maberry", imageSrc: "/books/rot_and_ruin.webp", size: "XXXS" },
                { title: "Mockingjay", author: "Suzanne Collins", imageSrc: "/books/mockingjay.webp", size: "XXXS" },
                { title: "Catching Fire", author: "Suzanne Collins", imageSrc: "/books/catching_fire.webp", size: "XXXS" },
                { title: "The Hunger Games", author: "Suzanne Collins", imageSrc: "/books/the_hunger_games.webp", size: "XXXS" },
                { title: "The House of Hades", author: "Rick Riordan", imageSrc: "/books/the_house_of_hades.webp", size: "XXS" },
                { title: "The Mark of Athena", author: "Rick Riordan", imageSrc: "/books/the_mark_of_athena.webp", size: "XXS" },
                { title: "The Son of Neptune", author: "Rick Riordan", imageSrc: "/books/the_son_of_neptune.webp", size: "XXS" },
                { title: "The Lost Hero", author: "Rick Riordan", imageSrc: "/books/the_lost_hero.webp", size: "XXS", titlePadTop: 10 },
                { title: "The Last Olympian", author: "Rick Riordan", imageSrc: "/books/the_last_olympian.webp", size: "XXS" },
                { title: "The Battle of the Labyrinth", author: "Rick Riordan", imageSrc: "/books/the_battle_of_the_labyrinth.webp", size: "XXS" },
                { title: "The Titan's Curse", author: "Rick Riordan", imageSrc: "/books/the_titans_curse.webp", size: "XXS" },
                { title: "The Sea of Monsters", author: "Rick Riordan", imageSrc: "/books/the_sea_of_monsters.webp", size: "XXS" },
                { title: "The Lightning Thief", author: "Rick Riordan", imageSrc: "/books/the_lightning_thief.webp", size: "XXS" },
                { title: "The Phantom Tollbooth", author: "Norton Juster", imageSrc: "/books/the_phantom_tollbooth.webp", size: "XXS" },
            ]
        }
    };

    return (
        <div>
            {Object.entries(bookshelfData).map(([year, data], index, array) => (
                <YearSection
                    key={year}
                    year={year}
                    books={Array.isArray(data) ? data : data.books}
                    subtitle={Array.isArray(data) ? null : data.subtitle}
                    isLast={index === array.length - 1}
                />
            ))}
            <div style={{ textAlign: 'center' }}>
                <br />
                <a className="back_to_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href="#">
                    <p className="item_container" style={{ maxWidth: '20%' }}> Back to top ▲</p>
                </a>
            </div>
        </div>
    );
}

export default Bookshelf;

Book.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    rating: PropTypes.number,
    titlePadTop: PropTypes.number,
    authorBottomPosition: PropTypes.number,
    size: PropTypes.string
};

YearSection.propTypes = {
    year: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        rating: PropTypes.number
    })).isRequired,
    isLast: PropTypes.bool,
    subtitle: PropTypes.string
};