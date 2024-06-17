export default function DynamicScrapingSection() {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-md space-y-4">
        <h2 className="text-lg font-semibold">DYNAMIC SCRAPING</h2>
        <div className="flex items-center space-x-4">
          <input
            type="radio"
            id="pagination"
            name="options"
            value="pagination"
            className=""
          />
          <label htmlFor="pagination" className="text-sm">
            Pagination
          </label>
          <p className="text-xs text-gray-400">
            Use pagination if the content you wish to scrape is over multiple
            pages
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <input type="checkbox" id="nextPage" className="" />
          <label htmlFor="nextPage" className="text-sm">
            Select Next Page Button
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="radio"
            id="loadMore"
            name="options"
            value="loadMore"
            className=""
          />
          <label htmlFor="loadMore" className="text-sm">
            Load More
          </label>
          <p className="text-xs text-gray-400">
            Use the load more feature if the content you wish to scrape is
            dynamically loaded with a Load More button
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <input type="checkbox" id="loadMoreButton" className="" />
          <label htmlFor="loadMoreButton" className="text-sm">
            Select Load More Button
          </label>
        </div>
      </div>
    </>
  );
}
