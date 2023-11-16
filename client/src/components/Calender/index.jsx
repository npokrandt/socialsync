import { Scheduler } from "@aldabil/react-scheduler";

const Calender = ({ events = [] }) => {
  return <Scheduler view="month" events={events} onConfirm={(e, a) => console.log(e, a)} />;
};

export default Calender;
