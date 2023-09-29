import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import css from "./Search.module.css";
import axios from "axios";
import debounce from "lodash/debounce";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Search() {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem("search")) || "";
  });
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/search?search=${value}`
        );
        setSearchData(data.products);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDebounceFn = async (searchValue) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/search?search=${searchValue}`
      );
      setSearchData(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  const handleChange = async (e) => {
    const search = e.target.value;
    setValue(search);
    debounceFn(search);
  };

  return (
    <>
      <Header />
      <section>
        <form className={css.form}>
          <input type="text" value={value} onChange={handleChange} />
        </form>
        {isLoading && <p className={css.loader}>Loading...</p>}
        <ul className={css.list}>
          {searchData.length ? (
            searchData.map((item) => (
              <li key={item.id}>
                <LazyLoadImage
                  width="250"
                  effect="blur"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <p>&#10028;{item.rating}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      </section>
    </>
  );
}

export default Search;
