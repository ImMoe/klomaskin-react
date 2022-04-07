import { useRef, useState } from "react"
function App() {
  const scene = useRef(null)
  const clawElement = useRef(null)
  const clawBase = useRef(null)
  const singlePizza = useRef(null)

  const [animation, setAnimation] = useState(true)
  const [pizza, setPizza] = useState(false)

  function handleClick() {
    if (pizza) return
    const clawElementValue = clawElement.current
    const clawBaseValue = clawBase.current
    const currentPosition = clawElementValue.getBoundingClientRect().left

    if (window.screen.width == 1920) {
      clawElementValue.style.transform = `translateX(${currentPosition - 550}px)`
    } else if (window.screen.width == 1440) {
      clawElementValue.style.transform = `translateX(${currentPosition - 310}px)`
    }
    else {
      clawElementValue.style.transform = `translateX(${currentPosition}px)`
    }

    setAnimation(false)

    setTimeout(() => {
      clawBaseValue.classList.add("down");
    }, 500)
    setTimeout(() => {
      clawBaseValue.classList.add("up")
      setPizza(true)
    }, 2000)
  }

  function handleReset() {
    const clawBaseValue = clawBase.current
    setAnimation(true)
    setPizza(false)
    clawBaseValue.classList.remove("down");
    clawBaseValue.classList.remove("up");
  }
  return (
    <div className="scene" onClick={() => handleClick()} onDoubleClick={() => handleReset()} ref={scene}>
      <div className={`claws ${animation ? 'movement' : ''}`} ref={clawElement}>
        <div className="claw-base" ref={clawBase}></div>
        <div className={`claw-arms ${animation ? 'clawsMove' : ''}`}>
          <div className="claw-left"></div>
          <div className="claw-right"></div>
        </div>
        <div className={`${pizza ? "single-pizza": "hidden"}`} ref={singlePizza}></div>
      </div>
      <div className="pizza-pile"></div>
      <div className="table-top"></div>
    </div>
  );
}

export default App;
