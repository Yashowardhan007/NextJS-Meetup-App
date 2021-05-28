import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import { MongoClient } from 'mongodb'
import Head from 'next/head';
import {Fragment} from 'react'

/* const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    address: 'Some Address',
    description:'First Meetup'
    
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    address: 'Some Address for second meetup',
    description:'Second Meetup'
    
  }
] */
function Homepage(props) {
 /*  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoadedMeetups(DUMMY_MEETUPS)
  },[]) */

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Huge List of Meetup Locations"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
    
  )
  
}
/* export async function getServerSideProps(context)
{
  const req = context.req;
  const res = context.res;
  return {
    props: {
        meetups:DUMMY_MEETUPS
      }
    }  
} */
export async function getStaticProps() {
  //fetch data from API
   const client = await MongoClient.connect('mongodb+srv://Yashowardhan_Dole:yash@123@cluster0.xyvoi.mongodb.net/meetups?retryWrites=true&w=majority ');

   const db = client.db() //get hold of the database
   const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find().toArray();
   client.close()
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        
      }))
    },
    revalidate:1
  }
}
export default Homepage