import { Button, Container, Text } from "@chakra-ui/react"
function App() {
  const handleChange = (e)=>{
    console.log(e.target.value);
  }
  const debounceSearch = (func, timeout = 300)=>{
    let timer;
    return (...args)=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{
        func.apply(this, args);
      }, timeout)
    }
  };
  const betterSearch = debounceSearch((e)=>handleChange(e));
  console.log(betterSearch);
  return (
    <Container minWidth={'100dvw'} minH={'100dvh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <input placeholder="search" onChange ={(e)=>betterSearch(e)}></input>
    </Container>
  )
}

export default App
