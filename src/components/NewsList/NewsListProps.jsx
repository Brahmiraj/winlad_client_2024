import { Link } from "react-router-dom";
import "./newsListProps.css";

function NewsListProps({ img, maintitle, newstitle, createdat, id, desc }) {

  const dateObject = new Date(createdat);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = dateObject.toLocaleString('en-US', options);

  return (
    <div>
      <Link to={`/news/${id}`} state={{maintitle, newstitle, createdat, desc}}>
        <div className="flex flex-col space-y-1 hover:bg-[#F5F5F5] py-2 rounded-xl px-2">
          <div className="flex flex-row items-start gap-2 2xl:gap-4">
            <img
              src={img}
              alt=""
              className="w-16 h-16 xl:w-16 xl:h-16 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <p className="text-md xl:text-lg md:text-lg special:text-2xl">
                {maintitle}
              </p>

              <p className="text-xs xl:text-sm special:text-lg">{newstitle}</p>
           
            </div>
          </div>
          <div className="flex justify-end">
          <p className="text-xs text-right mt-3">{formattedDate}</p>
          </div>
        </div>
        <hr />
      </Link>
    </div>
  );
}

export default NewsListProps;
