import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {format} from 'date-fns'
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import Head from 'next/head'
function Search({searchResults}) {
    console.log(searchResults)
    const router = useRouter()
    const {location, startDate, endDate, noOfGuests} = router.query;
    const formatedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formatedEndDate = format(new Date(endDate), 'dd MMMM yy')
    const range = `${formatedStartDate} - ${formatedEndDate}`
    
    return (
        <div>
            <Head>
                <title>Airbnb Clone</title>
                <link rel="icon" href="/airbnb.ico" />
            </Head>
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`}/>
                <main className='flex'>
                    <section className='flex-grow pt-14 px-6'>
                        <p className='text-xs'>300+ Stays - {range} - for {noOfGuests} guests</p>
                        <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
                        <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-500 whitespace-nowrap'>
                            <p className='button'>Cancellation Flexibility</p>
                            <p className='button'>Type of Place</p>
                            <p className='button'>Places</p>
                            <p className='button'>Rooms and beeds</p>
                            <p className='button'>More filters</p>
                        </div>
                        <div className='flex flex-col'>
                            {
                                searchResults?.map(({img, location, title, description, star, price, total}, index)=>(
                                    <InfoCard img={img} location={location} title={title} description={description} star={star} price={price} total={total} key={index}/>
                                ))
                            }
                        </div>
                        
                    </section>
                    <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                        <Map searchResults={searchResults}/>
                    </section>
                </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps(){
    const searchResults = await fetch('https://links.papareact.com/isz').then(res=> res.json())
    return{
        props:{
            searchResults
        }
    }
}