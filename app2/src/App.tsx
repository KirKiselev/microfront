//@ts-nocheck
const App = () => {
  //
  const obj = {
    state: [
      {
        city: [
          {
            street: [{ house: 1 }],
          },
        ],
      },
      {
        city: [
          {
            street: [{ house: 2 }, { house: 3 }],
          },
        ],
      },
    ],
  };
  //
  function getData(path: string) {
    //
    function readIN() {
      let tmp = "";
      leftPointer += 4;
      while (path[leftPointer] != " ") {
        tmp += path[leftPointer];
        leftPointer++;
      }
      leftPointer++;
      rightPointer--;
      return tmp;
    }

    function readDOT() {
      let tmp = new Array<string>();
      let reversedArray: Array<string>;

      while (path[rightPointer] != ".") {
        tmp.push(path[rightPointer]);
        rightPointer--;
      }

      rightPointer--;
      reversedArray = tmp.reverse();

      return reversedArray.join("");
    }
    //
    let call = "";
    let leftPointer = 0;
    let rightPointer = path.length - 1;
    let readingDirection = "right";

    while (leftPointer < rightPointer) {
      if (readingDirection == "right") {
        if (path[leftPointer] == "(") {
          call += readIN();
          if (leftPointer < rightPointer) {
            call += "[";
            call += readDOT();
            call += "]";
          }
        }
        if (path[rightPointer] != ")") {
          readingDirection = "left";
        }
      } else {
        call += readDOT();
        if (leftPointer < rightPointer) {
          call += "[";
          call += readDOT();
          call += "]";
        }
        if (path[rightPointer] == ")") {
          readingDirection = "right";
        }
      }
    }

    console.log(call);
  }
  console.log("Input string: (in state (in street .house.0).0.city.0)");
  getData("(in state (in street .house.0).0.city.0)");
  //state[0]city[0]street[0]house
  console.log(obj.state[0].city[0].street[0].house);

  console.log("Input string: (in state (in street .house.0).0.city.1)");
  getData("(in state (in street .house.0).0.city.1)");
  //state[1]city[0]street[0]house
  console.log(obj.state[1].city[0].street[0].house);

  console.log("Input string: (in state (in street .house.1).0.city.1)");
  getData("(in state (in street .house.1).0.city.1)");
  //state[1]city[0]street[1]house
  console.log(obj.state[1].city[0].street[1].house);

  return (
    <div>
      <p> Задача 2 решена частично. Функция getData переводит строку из "странной нотации" к виду object.key в порядке обращения к ним. Результат проверки выведен в консоль.</p>
    </div>
  );
};

export default App;
