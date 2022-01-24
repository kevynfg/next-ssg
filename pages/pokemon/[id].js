import Link from "next/link";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "bulbasaur" } },
      { params: { id: "charmander" } },
      { params: { id: "pikachu" } },
    ],
    fallback: true,
    revalidate: 10
  };
}

export async function getStaticProps({ params }) {
  console.log('got in', params);
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Couldn't fetch pokemons");
    })

  return {
    props: {
        pokemon,
    },
  };
}

export default function Pokemon({pokemon}) {
  if (!pokemon) {
    console.log('verificar se entrou no loading')
    return <p>Loading...</p>
  }
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <h2>
        <Link href="/">
          <a>Return</a>
        </Link>
      </h2>
    </div>
  );
}
