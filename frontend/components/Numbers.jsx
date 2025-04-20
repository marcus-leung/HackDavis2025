'use client'

export default function Numbers({ fact1, fact2 }) {
  const formatFact = (fact) => {
    const [first, ...rest] = fact.split(' ')
    return (
      <div className="flex flex-col items-center text-center"> 
        <span className="text-green-800 text-4xl font-bold font-roboto">{first}</span>
        <span className="text-green-700 text-lg font-bold font-roboto">{rest.join(' ')}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mt-8 mx-4"> 
      <div className="flex flex-col items-center text-center"> 
        {formatFact(fact1)}
      </div>
      <div className="flex flex-col items-center text-center"> 
        {formatFact(fact2)}
      </div>
    </div>
  )
}
