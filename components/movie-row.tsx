// No direct CSS import here, styles are global via app/globals.css

interface Movie {
  title: string
  genre: string
  image: string
  cssClass?: string // New optional property for CSS class
}

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#00ff88] text-shadow-sm">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-track-[#1a1a1a] scrollbar-thumb-gradient-to-r scrollbar-thumb-from-[#00ff88] scrollbar-thumb-to-[#00ddff] movie-row-scroll-container">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="min-w-[200px] w-[200px] h-[356px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#00ff88]/30 relative group bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
          >
            <div
              className={`movie-poster-base ${movie.cssClass || ""}`}
              style={!movie.cssClass ? { backgroundImage: `url(${movie.image})` } : {}}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                <p className="text-[#00ddff] text-sm">{movie.genre}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
