import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUsers, faStar, faBook, faEye, faList, faCalendar, faAngleRight, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
const FictionListItem = (props) => {
  // Generate a URL slug from the title
  const slug = generateSlug(props.title);
 const dispatch=useDispatch()

  const fetchSearchResults3 = async () => {
  
      try {
        const response = await fetch('https://api.ru-novel.ru/api/bookOne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: props.title }),
        });

       if(response.ok){
        const data = await response.json();
        // console.log(data)
          dispatch(userActions.setBooksTouched())
          dispatch(userActions.setBooksDes(data.description))
      }
         
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    
  };
 
  const hadle=(e)=>{
    e.preventDefault();
       // console.log(props.title)
  }
  return (
    <div className='flex flex-col md:flex-row bg-white p-4 rounded-md shadow-md mb-6'>
      <figure className='w-full md:w-1/3 lg:w-1/4 flex justify-center items-center mb-4 md:mb-0'>
        <Link to={`/fiction/${slug}`} className='w-[40%] sm:w-[40%] md:w-[80%]'>
          <img
            src={props.image}
            alt={props.title} // Better alt text for accessibility
            className='sm:w-[80%]
             md:w-full h-auto object-cover rounded'
          />
        </Link>
      </figure>
      <div className='flex-1 md:pl-4'>
        <h2 className='text-lg font-bold text-red-600 mb-2'>
          <Link to={`/fiction/${slug}`}>{props.title}</Link>
        </h2>
        <div className='mb-4 mt-4'>
          <span className='flex flex-wrap'>
              {props.tags.map((tag) =>(
            <Link className='bg-[#5e738b] text-white text-xs px-2 py-1 rounded-full mr-2 mb-2' to="/fictions/search?tagsAdd=psychological">{tag}</Link>
              ))}
          </span>
        </div>
        <div className=' sm:flex justify-between gap-4'>
          <div>
          <div className='w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center'>
            <FontAwesomeIcon icon={faUsers} className='mr-2' />
            <span onClick={fetchSearchResults3}>{props.stats.followers}</span> <span className='ml-1'> FOLOWERS</span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center'>
            <FontAwesomeIcon icon={faStar} className='mr-2 text-yellow-500' />
            <span className='text-red-600'>{props.stats.rating.overall}</span>
            <div className='w-1/2 h-1 bg-yellow-500 rounded-full ml-2'></div>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center'>
            <FontAwesomeIcon icon={faBook} className='mr-2' />
            <span>{props.stats.pages}</span> <span className='ml-1'> PAGES</span>
          </div>
          </div>
          <div className='mr-4'>
          <div className='w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center'>
            <FontAwesomeIcon icon={faEye} className='mr-2' />
            <span>{props.stats.views}</span> <span className='ml-1'> VIEWS</span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center'>
            <FontAwesomeIcon icon={faList} className='mr-2' />
            <span>{props.stats.chapters}</span> <span className='ml-1'> CHAPTERS</span>
          </div>
          <div className='w-full sm:w-1/2 md:w-1/4 lg:w-full text-[#5e738b] font-bold mb-2 flex items-center '>
            <FontAwesomeIcon icon={faCalendar} className='mr-2' />
            <time dateTime="2022-08-01T05:00:20.0000000+00:00 " >{props.stats.updatedDate}</time>
          </div>
        </div>
           
           <div className='hidden md:block'>
            <button onClick={fetchSearchResults3}>
              <FontAwesomeIcon icon={faCaretRight} className='text-gray-500 text-2xl mr-4  mt-6' />
              </button>
           </div>

        </div>
      
      </div>
     
    </div>
  );
}

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
};

export default FictionListItem;
