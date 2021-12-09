const TaskListItem = ({ title }: { title: string }) => {
  return (
    <li className='hover-bordered'>
      <a>
        <span className='w-2 h-2 rounded-full bg-secondary mr-4'></span> {title}
      </a>
    </li>
  );
};

export default TaskListItem;
