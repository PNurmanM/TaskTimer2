import Stopwatch from "./Stopwatch"
import React, {useState, useEffect} from 'react'

function Adding(){

    useEffect(() => {
        document.title = "Multi-Task Timer";
    }, []);

    const [task, setTask] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');


    const [watches, setWatches] = useState(() => {
       // if(window.localStorage.getItem('watches') !== null){
          //  return JSON.parse(window.localStorage.getItem('watches'));
       // }else{
            return [];
       // }
    });


  //  useEffect(() => {
  //      window.localStorage.setItem('watches', JSON.stringify(watches))
  //  },[watches]);


  //  useEffect(() => {
  //     console.log("Watches updated:", watches);
  //  }, [watches]);
    
    
    function addWatch(){

        let calculatedTime = 0;

        if(!isNaN(parseInt(seconds))){
            calculatedTime += (parseInt(seconds) * 1000);
        }
        if(!isNaN(parseInt(minutes))){
            calculatedTime += (parseInt(minutes) * 60 * 1000);
        }
        if(!isNaN(parseInt(hours))){
            calculatedTime += (parseInt(hours) * 60 * 60 * 1000);
        }
        if(isNaN(parseInt(seconds)) && isNaN(parseInt(minutes)) && isNaN(parseInt(hours))){
            calculatedTime = 60000;
        } 


        //const newWatch = {
            //watchA: <Stopwatch task={task} timing={calculatedTime}/>,
            //taskA: task,
            //timingA: calculatedTime,
        //};

        setWatches((w) => [<Stopwatch task={task} timing={calculatedTime}/>, ...w]);       
        setTask('');
        setHours('');
        setMinutes('');
        setSeconds('');
    }

    function handleTaskChange(event){
        setTask((event.target.value).charAt(0).toUpperCase() + (event.target.value).slice(1));    
    }

    function handleHChange(event){
        if(event.target.value < 100){
            setHours(event.target.value);
        }
    }

    function handleMChange(event){
        if(event.target.value < 61){
            setMinutes(event.target.value);
        }
    }

    function handleSChange(event){
        if(event.target.value < 61){
            setSeconds(event.target.value);
        }
    }

    function deleteListItem(index){
        setWatches(w => w.filter((watch, i) => i != index));
    }

    //<Stopwatch task={watch.taskA} timing={watch.timingA}/>

    return (
            <>
                <div className="addingCont">
                    <div className="addingBar">
                        <p >Task:</p>
                        <input
                             type="text"
                             placeholder="Enter a task and a time... (i love you isha)"
                             value={task}
                             onChange={handleTaskChange}
                             >
                        </input>
                    </div>
                    <div className="addingTime"> 
                        <p>H:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={hours}
                            min='0'
                            max='99'
                            onChange={handleHChange}
                        >
                        </input>
                        <p>M:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={minutes}
                            min='0'
                            max='60'
                            onChange={handleMChange}
                        >
                        </input>
                        <p>S:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={seconds}
                            min='0'
                            max='60'
                            onChange={handleSChange}
                        >
                        </input>
                        <button onClick={addWatch}>Add Task</button>
                    </div>
                </div>
                <div className="listStopDiv">
                    <ul>
                        {watches.map((watch, index) => 
                        <li key={index}>
                            <button className="deleteButton" onClick={() => deleteListItem(index)}>X</button>
                            <div>
                                {watch}
                            </div>
                        </li>)}  
                    </ul>
                </div>
                
            </>

    );
}

export default Adding