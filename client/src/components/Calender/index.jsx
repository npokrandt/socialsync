import { Scheduler } from "@aldabil/react-scheduler";
import { useParams } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import AuthService from '../../utils/auth'
import {ADD_EVENT, UPDATE_EVENT, DELETE_EVENT} from '../../utils/mutations'

const Calender = ({ events = [] }) => {

  const [addEvent] = useMutation(ADD_EVENT)
  const [updateEvent] = useMutation(UPDATE_EVENT)
  const [deleteEvent] = useMutation(DELETE_EVENT)

  const loggedUserId = AuthService.getProfile()?.data?._id;
  const {userId} = useParams()

  const handleEventChange = async (event, action) => {
    if (userId === loggedUserId) {

      if (action === 'create'){
        
        event['eventName'] = event['title']
        event['startTime'] = event['start']
        event['endTime'] = event['end']
        
        delete event['title']
        delete event['start']
        delete event['end']
        delete event['event_id']
        
        try {
          await addEvent({
            variables: {eventInput: event, userId}
          })
          
        } catch (err){
          console.error(err);
        }
        
      } else if (action === 'edit') {
        event['eventName'] = event['title']
        event['startTime'] = event['start']
        event['endTime'] = event['end']
        
        const eventId = event.event_id
        
        delete event['title']
        delete event['start']
        delete event['end']
        delete event['event_id']
        
        try {
          await updateEvent({
            variables: {eventInput: event, eventId}
          })
          
        } catch (err){
          console.error(err);
        }
      }
    } else {
      alert('You cannot modify an event for your friend!')
    }
  }

  const handleDelete = async (id) => {
    if (userId === loggedUserId) {
      const eventId = id
      try {
        await deleteEvent({
          variables: {eventId}
        })

      } catch (err){
        console.error(err);
      }
    } else {
      alert('You cannot modify an event for your friend!')
    }
  }

   return <Scheduler view="month" events={events} onConfirm={handleEventChange} onDelete={handleDelete}/>;
}; 

export default Calender; 
