import RatingCircle from "./RatingCircle"

export default function RatingsSection({ sustainabilityRating, socialGoodRating }) {
  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-xl font-semibold text-green-800 mb-4 text-center">Product Ratings</h2>
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-md border border-green-200">
        <div className="flex justify-around">
          <RatingCircle
            label="Sustainability"
            rating={sustainabilityRating}
            color="green"
            description="Environmental impact and resource usage"
          />
          <RatingCircle
            label="Social Good"
            rating={socialGoodRating}
            color="amber"
            description="Fair labor practices and community impact"
          />
        </div>
        <div className="mt-6 text-center text-sm text-green-700">
          <p>Tap on a rating circle for more details</p>
        </div>
      </div>
    </div>
  )
}
