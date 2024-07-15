import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const BookItem = ({ title, author, imageSrc, rating, titlePadTop, authorBottomPosition, size = 'S' }) => {
    const titleStyle = titlePadTop ? { paddingTop: `${titlePadTop}px` } : {};
    const authorStyle = authorBottomPosition ?
        { marginBottom: `${authorBottomPosition}px` } :
        {};

    return (
        <div className={`grid_item_${size}`}>
            <p className="book_title" style={titleStyle}>{title}</p><br />
            <p className="book_author" style={authorStyle}>{author}</p><br />
            <div className="book_img_container">
                <img className="book_img" src={imageSrc} alt={`${title} book cover`} /><br />
            </div>
            <div className="star_style_container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={star <= rating ? faStar : star - 0.5 <= rating ? faStarHalfStroke : faStarRegular}
                        className={`star_icon ${star <= Math.ceil(rating) ? 'star_style_blue' : 'star_style_white'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const BookshelfSection = ({ year, books, isLast }) => (
    <>
        <h3><br /><u>{year}</u></h3>
        <div className="grid-container">
            {books.map((book, index) => (
                <BookItem key={index} {...book} />
            ))}
        </div>
        {!isLast && <br />}
    </>
);

function Bookshelf() {
    useSmoothScroll();

    const bookshelfData = {
        "2024-2025": [
            { title: "Neuromancer", author: "William Gibson", imageSrc: "/books/neuromancer.webp", rating: 4.5, size: "S", titlePadTop: 10 },
            { title: "Burning Chrome", author: "William Gibson", imageSrc: "/books/burning_chrome.webp", rating: 4, size: "S", titlePadTop: true },
            { title: "Thinking in Systems", author: "Donella H. Meadows", imageSrc: "/books/thinking_in_systems.webp", rating: 4, size: "S" },
            { title: "Reincarnation Blues", author: "Michael Poore", imageSrc: "/books/reincarnation_blues.webp", rating: 3.5, size: "S" },
            { title: "The Lovecraft Compendium", author: "H. P. Lovecraft", imageSrc: "/books/the_lovecraft_compendium.webp", rating: 3.5, size: "S" },
            { title: "BLAME! 6", author: "Tsutomu Nihei", imageSrc: "/books/blame_6.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "BLAME! 5", author: "Tsutomu Nihei", imageSrc: "/books/blame_5.webp", rating: 4.5, size: "S", titlePadTop: 10 },
            { title: "BLAME! 4", author: "Tsutomu Nihei", imageSrc: "/books/blame_4.webp", rating: 4, size: "S", titlePadTop: 10 },
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
            { title: "Apex", author: "Ramez Naam", imageSrc: "/books/apex.webp", rating: 5, size: "S", authorBottomPosition: 10 },
            { title: "Crux", author: "Ramez Naam", imageSrc: "/books/crux.webp", rating: 5, size: "S", authorBottomPosition: 10 },
            { title: "Nexus", author: "Ramez Naam", imageSrc: "/books/nexus.webp", rating: 5, size: "S", authorBottomPosition: 10 },
            { title: "Exhalation", author: "Ted Chiang", imageSrc: "/books/exhalation.webp", rating: 5, size: "S", authorBottomPosition: 10 },
            { title: "Stories of Your Life and Others", author: "Ted Chiang", imageSrc: "/books/stories_of_your_life_and_others.webp", rating: 4.5, size: "M", titlePadTop: true },
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
            { title: "Pale Blue Dot", author: "Carl Sagan", imageSrc: "/books/pale_blue_dot.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "Cosmos", author: "Carl Sagan", imageSrc: "/books/cosmos.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "Brave New World", author: "Aldous Huxley", imageSrc: "/books/brave_new_world.webp", rating: 3, size: "S" },
            { title: "The Martian", author: "Andy Weir", imageSrc: "/books/the_martian.webp", rating: 4.5, size: "S", titlePadTop: 10 },
        ],
        "2021-2022": [
            { title: "Minus 148", author: "Art Davidson", imageSrc: "/books/minus_148.webp", rating: 4, size: "S", titlePadTop: 10 },
            { title: "Of Mice and Men", author: "John Steinbeck", imageSrc: "/books/of_mice_and_men.webp", rating: 3.5, size: "S" },
            { title: "Children of Ruin", author: "Adrian Tchaikovsky", imageSrc: "/books/children_of_ruin.webp", rating: 4.5, size: "S" },
            { title: "Children of Time", author: "Adrian Tchaikovsky", imageSrc: "/books/children_of_time.webp", rating: 5, size: "S" },
            { title: "21 Lessons for the 21st Century", author: "Yuval Noah Harari", imageSrc: "/books/21_lessons_for_the_21st_century.webp", rating: 4, size: "M" },
            { title: "Homo Deus", author: "Yuval Noah Harari", imageSrc: "/books/homo_deus.webp", rating: 3.5, size: "M", titlePadTop: 22 },
            { title: "Ball Lightning", author: "Cixin Liu", imageSrc: "/books/ball_lightning.webp", rating: 3.5, size: "M", titlePadTop: 10 },
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
    };

    return (
        <div>
            {Object.entries(bookshelfData).map(([year, books], index, array) => (
                <BookshelfSection
                    key={year}
                    year={year}
                    books={books}
                    isLast={index === array.length - 1}
                />
            ))}
            <div style={{ textAlign: 'center' }}>
                <a className="back_to_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href="#">
                    <p className="item_container" style={{ maxWidth: '20%' }}> Back to top ▲</p>
                </a>
            </div>
        </div>
    );
}

export default Bookshelf;