import axios from "axios"
import { GetServerSideProps } from "next"

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      This is Test Page!
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (_ctx) => {

  console.log('START Fetch Call')
  await fetch('http://localhost:8000/')
  console.log('END Fetch Call, Header-Print-Server will print x-datadog-* header')
  
  console.log('START Axios Call')
  axios.get('http://localhost:8000/')
  if(process.env.MSW === 'true') {
    console.log('END Axios Call, Header-Print-Server will print x-datadog-* header')

  } else {
    console.log('END Axios Call, Header-Print-Server CANNOT print x-datadog-* header when MSW interceptor activated')

  }
  return {
    props: {}
  }
}
