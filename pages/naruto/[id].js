import Link from "next/link";
import fs from 'fs';
import path from 'path'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    //   { params: { id: '3' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const characterId = params.id;
  console.log('characterId', characterId);
  const fileToRead = path.join(process.cwd(), 'characters.json')
  console.log('fileToRead', fileToRead);
  const data = JSON.parse(fs.readFileSync(fileToRead));
  console.log('data', data);
  const character = data.characters.find(c => c.id === characterId);
  console.log('character', character);

  return {
      props: {
          character
      }
  }
}

export default function Naruto({character}) {
    if (!character) {
        return <p>Loading...</p>
    }
    console.log('function character', character)
  return (
    <>
      <h1>{character.name}</h1>
      <h2>
        <Link href="/">
          <a>Return</a>
        </Link>
      </h2>
    </>
  );
}
