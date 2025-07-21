import MovieRow from "./movie-row"

const trendingShows = [
  { title: "Stranger Things", genre: "Sci-Fi • Drama", image: "", cssClass: "show-stranger-things" },
  { title: "The Witcher", genre: "Fantasy • Action", image: "", cssClass: "show-the-witcher" },
  { title: "Dark", genre: "Mystery • Thriller", image: "", cssClass: "show-dark" },
  { title: "Money Heist", genre: "Crime • Drama", image: "", cssClass: "show-money-heist" },
  { title: "Ozark", genre: "Crime • Drama", image: "", cssClass: "show-ozark" },
  { title: "Peaky Blinders", genre: "Crime • Drama", image: "", cssClass: "show-peaky-blinders" },
  { title: "Euphoria", genre: "Drama • Teen", image: "", cssClass: "show-euphoria" },
  { title: "The Boys", genre: "Superhero • Dark", image: "", cssClass: "show-the-boys" },
]

const popularShows = [
  { title: "The Crown", genre: "Drama • History", image: "", cssClass: "show-the-crown" },
  { title: "House of Cards", genre: "Political • Drama", image: "", cssClass: "show-house-of-cards" },
  { title: "Narcos", genre: "Crime • Biography", image: "", cssClass: "show-narcos" },
  { title: "Breaking Bad", genre: "Crime • Drama", image: "", cssClass: "show-breaking-bad" },
  { title: "Vikings", genre: "Action • Drama", image: "", cssClass: "show-vikings" },
  { title: "Better Call Saul", genre: "Crime • Drama", image: "", cssClass: "show-better-call-saul" },
  { title: "Sherlock", genre: "Mystery • Crime", image: "", cssClass: "show-sherlock" },
  { title: "Friends", genre: "Comedy • Romance", image: "", cssClass: "show-friends" },
]

export default function ContentSection() {
  return (
    <section className="py-16 px-12" id="series">
      <MovieRow title="Trending Now" movies={trendingShows} />
      <MovieRow title="Popular on BingeFlix" movies={popularShows} />
    </section>
  )
}
