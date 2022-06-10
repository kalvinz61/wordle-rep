import axios from "axios";

export async function checkDictionary(word: string) {
  try {
    const isWord = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    return true
  } catch (e) {
    return false
  }
}

export function isAlphabet(key: string){
  const char = /^[a-zA-Z]$/.test(key)
  return char ? key : null
}