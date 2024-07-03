import "./App.css";

import { useState, useRef } from "react";

type DataToRender = { refToArray: Array<number> | null; index1: null | number; index2: null | number; needToChange: null | boolean };

export const App = () => {
  const arrayRef = useRef<Array<number>>(new Array<number>());

  const [inputValue, setInputValue] = useState("");
  const [dataToRender, setDataToRender] = useState<DataToRender>({ refToArray: null, index1: null, index2: null, needToChange: null });

  function handleInputChange(event: any) {
    let pattern = /^[\d,]*$/;
    if (pattern.test(event.target.value)) {
      event.target.className = "application__inputForm__input";
      setInputValue(event.target.value);
    } else {
      event.target.className = "application__inputForm__input--warn";
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (inputValue.length !== 0) {
      inputValue
        .replace(/,+/g, ",")
        .split(",")
        .forEach((elem) => {
          if (elem != "") {
            arrayRef.current?.push(parseInt(elem));
          }
        });
    }

    if (arrayRef.current.length != 0) {
      setDataToRender({ refToArray: arrayRef.current, index1: null, index2: null, needToChange: null });
    }
  }

  async function startVisualization() {
    function delay(delay: number) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(42);
        }, delay);
      });
    }

    let tmp;
    let needSort = true;
    let arrayLength = arrayRef.current.length;
    let array = arrayRef.current;
    let addExchangeAnimation: boolean;

    while (needSort) {
      needSort = false;
      for (let i = 0; i < arrayLength; i++) {
        addExchangeAnimation = false;
        if (array[i] > array[i + 1] && array[i + 1] !== undefined) {
          tmp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = tmp;
          needSort = true;
          addExchangeAnimation = true;
        }
        setDataToRender({ refToArray: arrayRef.current, index1: i, index2: i + 1, needToChange: addExchangeAnimation });
        await delay(1000);
      }
    }
  }
  return (
    <div className="application__wrapper">
      <h1>Bubblesort visualization</h1>
      <p>Введите целые числа, разделяя их запятой</p>
      <form className="application__inputForm" onSubmit={handleSubmit}>
        <input className="application__inputForm__input" type="text" value={inputValue} onChange={handleInputChange} />
        <button className="application__inputForm__submitButton">Готово</button>
      </form>
      <div className="application__arrayPresenter">
        {dataToRender.refToArray?.map((elem, index) => {
          if (index == dataToRender.index1) {
            if (dataToRender.needToChange) {
              return <div className="application__arrayPresenter__arrayElement--active--moveRight">{elem}</div>;
            } else {
              return <div className="application__arrayPresenter__arrayElement--active">{elem}</div>;
            }
          }
          if (index == dataToRender.index2) {
            if (dataToRender.needToChange) {
              return <div className="application__arrayPresenter__arrayElement--active--moveLeft">{elem}</div>;
            } else {
              return <div className="application__arrayPresenter__arrayElement--active">{elem}</div>;
            }
          }

          return <div className="application__arrayPresenter__arrayElement">{elem}</div>;
        })}
      </div>

      <button className="application__sortButton" onClick={startVisualization}>
        Сортировка
      </button>
    </div>
  );
};

export default App;
