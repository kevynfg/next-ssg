import NextLink from 'next/link';

export async function getStaticProps() {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/')
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Couldn\'t fetch pokemons')
  }).then((jsonResponse) => jsonResponse.results)
  // console.log('pokemons', pokemons)

  return {
    props: {
      pokemons
    }
  }
}

export default function Home({pokemons}) {  
  if (!pokemons) {
    return <div>Loading...</div>
  }
  return (
    <div>
      Pokemons List
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index} style={{fontSize: '18px'}}>
            <NextLink href={`/pokemon/${pokemon.name}`}>
              {pokemon.name}
            </NextLink>
          </li>
        ))}
      </ul>
      {/* <NextLink href='/posts/first-post'>Go to posts</NextLink> */}
    </div>
  )
}
