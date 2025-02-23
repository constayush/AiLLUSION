function SearchBar({ value, onChange }) {
  return (
    <div className="search-con w-full justify-center items-center">
        <div className="container flex gap-4 w-full border border-solid p-2 rounded-lg">


          <div className="Icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          
            <input
            className="w-full h-full outline-none focus:outline-none"
              value={value}
              onChange={onChange}
              placeholder="Mountain, City, etc"
            />


        </div>
      
    </div>
  );
}

export default SearchBar;
