import React, { useCallback, useEffect, useState } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import Header from "../components/to-do-header/Header";
import List from "../components/to-do-list/List";
import Item from "../components/to-do-item/Item";
import { fetcher } from "../Files/Fetch";

export function Home() {
  const [state, setState] = useState([]);
  const [errorState, setErrorState] = useState();
  console.log(state);

  useEffect(() => {
    fetcher("/todos")
      .then((result) => {
        setState(result);
      })
      .catch((err) => {
        setErrorState(err.message);
      });
  }, []);

  const onSubmit = useCallback(
    (currentVal, callback) => {
      if (currentVal) {
        fetcher(`/todos?text=${currentVal}`, {
          method: "POST",
        }).then((res) => {
          console.log(res);
          setState((prev) => [...prev, res]);

          callback();
        });
      }
    },
    [setState]
  );

  const handleRemove = ({ _id }) => {
    fetcher(`/todos?id=${_id}`, {
      method: "DELETE",
    })
      .then(() => {
        setState((prev) => {
          return prev.filter((item) => item._id !== _id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheck = (item) => {
    fetcher(`/todos?id=${item._id}&checked=${!item.checked}`, {
      method: "PUT",
    }).then((response) => {
      console.log({ response });
      setState((prev) => {
        return prev.map((item) => {
          if (response._id === item._id) {
            return response;
          }
          return item;
        });
      });
    });
  };

  return (
    <BaseLayout>
      <Header onSubmit={onSubmit} />
      {errorState && <p>{errorState}</p>}
      <List>
        {state
          .filter((item) => !item.removed)
          .map((item, index) => (
            <Item
              index={index}
              key={item._id}
              item={item}
              onChecked={() => handleCheck(item)}
              removeItem={() => handleRemove(item)}
            />
          ))}
      </List>
    </BaseLayout>
  );
}
